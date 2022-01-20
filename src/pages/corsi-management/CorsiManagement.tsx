import { useDispatch, useSelector } from "react-redux";
import { Text, TextField, DetailsList, MessageBar, MessageBarType, mergeStyles, IColumn, ICommandBarItemProps, Selection, ITextFieldStyles, CommandBar, DetailsListLayoutMode, SelectionMode } from "@fluentui/react";
import { RootState } from "../../core/store/store";
import { useEffect, useState } from "react";
import { Corso } from "../../models/corso";
import { getAllCorsi, getSingleCorso, setSelectedUndefined, resetMessage, setIsOver, deleteCorso } from "../../core/store/corso/corso.action";
import { getAllDocente } from "../../core/store/docente/docente.action";
import { Icon } from '@fluentui/react/lib/Icon';
import { AddCorsoModal } from "./Modal/AddCorsoModal";
import { UpdateCorsoModal } from "./Modal/UpdateCorsoModal";
import { convertToObject } from "typescript";
import { confirmNotification } from "../../utils";

const textfieldClass = mergeStyles({
    display: 'block',
    marginBottom: '10px',
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

const CorsiManagement: React.FC = () =>{
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const dispatch = useDispatch();
    const { corsi } = useSelector((state: RootState)=>state.corso);
    const { selectedCorso } = useSelector((state: RootState)=>state.corso);
    const { message } = useSelector((state: RootState)=> state.corso);
    const { docenti } = useSelector((state:RootState) => state.docente);
    const[filteredCorsi, setFiteredCorsi] = useState<Corso[]>(corsi);
    const _items: ICommandBarItemProps[] = [
        {
            key: 'newItem',
            text:'Nuovo',
            iconProps: { iconName: 'Add' },
            onClick: (()=>setShowAddModal(true))
        },
        {
            key: 'editItem',
            text:'Modifica',
            iconProps: { iconName: 'Edit' },
            disabled: true,
            onClick: (()=> setShowUpdateModal(true))
        },
        {
            key:'setIsOverItem',
            text:'Segna come concluso',
            iconProps:{iconName: 'Completed'},
            disabled: true,
            onClick:(()=>{
                dispatch(setIsOver(true, selectedCorso!.id));
            })
        },
        {
            key:'setIsNotOverItem',
            text:'Segna come non concluso',
            iconProps:{iconName: 'ErrorBadge'},
            disabled: true,
            onClick:(()=>{
                dispatch(setIsOver(false, selectedCorso!.id));
            })
        },
        {
            key:'deleteItem',
            text:'Elimina',
            iconProps: { iconName: 'Delete' },
            disabled: true,
            onClick:(()=>{
               confirmNotification({
                    title: 'Elimina Studente',
                    html: '<p> Si è sicuri di eliminare il corso "'+selectedCorso!.nome+'"? </p>',
                    confirmButtonText: "Elimina",
                    cancelButtonText: "Annulla",
                    icon: "question",
                    }).then((res) => {
                    if (res.isConfirmed) {
                        dispatch(deleteCorso(selectedCorso!.id));
                    }
               }) 
            })
        },
        
    ];
    const _columns: IColumn[] = [
        { key: 'column1', name: 'Id', fieldName: 'id', minWidth: 40, maxWidth: 40, isResizable: true },
        { key: 'column2', name: 'Nome corso', fieldName: 'nome', minWidth: 50, maxWidth: 100, isResizable: true},
        { key: 'column3', name: 'Descrizione', fieldName: 'descrizione', minWidth: 70, maxWidth: 150, isResizable: true },
        { key: 'column4', name: 'Durata corso', fieldName: 'data_partenza', minWidth: 50, maxWidth: 150, isResizable: true, onRender:(item)=>{return(<p>{item.data_partenza.toString().slice(0,10).replaceAll("-","/")} - {item.data_conclusione.toString().slice(0,10).replaceAll("-","/")}</p>)} },
        { key: 'column5', name: 'Ore totali', fieldName: 'ore_tot', minWidth: 50, maxWidth: 100, isResizable: true },
        { key: 'column7', name: 'Docente', fieldName: 'id_d', minWidth: 50, maxWidth: 100, isResizable: true, onRender:(item)=>{
            const docente = docenti.find(elem => elem.id === item.id_d);
            return <p>{docente?.id} - {docente?.nome} {docente?.cognome}</p>
        } },
        { key: 'column6', name: 'Concluso', fieldName: 'is_over', minWidth: 50, maxWidth: 60, isResizable: true, onRender:((item)=>{
            if(item.is_over === false){
                return <Icon className="over-icons d-flex justify-content-center" iconName="ErrorBadge"/>
            }else{
                return <Icon className="over-icons d-flex justify-content-center" iconName="Completed"/>
            }
        }) },
    ];

    useEffect(()=>{
        dispatch(getAllCorsi());
        dispatch(getAllDocente());
    },[]);

    useEffect(()=>{
        setFiteredCorsi(corsi);
    },[corsi])

    const selection = new Selection({
        onSelectionChanged: () => {
            const selected = selection.getSelection()[0] as Corso;
            if(selected !== undefined){
                dispatch(getSingleCorso(selected.id));
            }else{
                dispatch(setSelectedUndefined());
            }
        },
        
    });  

    useEffect(()=>{
        if(selectedCorso !== undefined){
            _items[1].disabled=false;
            _items[4].disabled = false;
            (selectedCorso.is_over) ? _items[3].disabled=false : _items[2].disabled=false;
        }else{
            _items[1].disabled=true;
            _items[2].disabled = true; 
            _items[3].disabled = true; 
            _items[4].disabled = true; 
        }
    },[selectedCorso])

    function onFilter(e:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>){
        const value = (e.target as HTMLTextAreaElement).value.toLowerCase();
        console.log(value);
        setFiteredCorsi(corsi.filter((item)=>(item.nome.toLocaleLowerCase().includes(value) || item.id.toString().includes(value) || item.descrizione.toLowerCase().includes(value))));
    };


    return(
        <div>
            <div className="page-title">
                <Text variant="xxLarge"> Corsi </Text>
            </div>
            <TextField
                        className={textfieldClass}
                        label="Filtra per nome, descrizione o ID"
                        onChange={onFilter}
                        styles={textFieldStyles}
                        /> 
            <div className="card">
                        <div className="item-bar">
                            <CommandBar 
                            items={_items}
                            styles={{root:{padding:0}}}
                            /> 
                        
                </div>
                
                
                <DetailsList 
                    items={filteredCorsi}
                    columns={_columns}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    styles={{root:{padding:0}}}
                    selection={selection}
                    selectionMode = {SelectionMode.single}
                    selectionPreservedOnEmptyClick={true} 
                />

                <AddCorsoModal showModal={showAddModal} onCloseModal={()=>setShowAddModal(false)} />
                <UpdateCorsoModal showModal={showUpdateModal} onCloseModal={()=>setShowUpdateModal(false)} />
            </div>
            <div className="footer">
                {message?.cod===0 && <MessageBar messageBarType={MessageBarType.error} dismissButtonAriaLabel="Close" onDismiss={()=>dispatch(resetMessage())}> {message.info} </MessageBar>}
                {message?.cod===1 && <MessageBar messageBarType={MessageBarType.success} dismissButtonAriaLabel="Close" onDismiss={()=>dispatch(resetMessage())}> {message.info} </MessageBar>}

            </div>
        </div>

    )
}

export default CorsiManagement;