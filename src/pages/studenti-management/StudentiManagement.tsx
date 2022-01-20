import { Text, ICommandBarItemProps, CommandBar, SelectionMode, MarqueeSelection, mergeStyles, MessageBar, MessageBarType } from "@fluentui/react";
import { DetailsList, DetailsListLayoutMode, Selection, IColumn } from '@fluentui/react/lib/DetailsList';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import {useDispatch, useSelector} from "react-redux";
import { Studente } from "../../models/studente";
import {RootState} from "../../core/store/store";
import { getAllStudenti, getSingleStudente, setSelectedUndefined, resetMessage, deleteStudente } from "../../core/store/studente/studente.action";
import React, { useEffect, useState } from "react";
import AddStudenteModal from "./Modal/AddStudenteModal";
import UpdateStudenteModal from "./Modal/UpdateStudenteModal";
import { confirmNotification } from "../../utils";

interface IDetailsListItem{
    key: number;
    cod_fiscale: string,
    nome: string,
    cognome: string,
    data_nascita: string,
    comune_nascita: string,
    num_tel: string,
    indirizzo_res: string,
    civico_res: string,
    cap_res:number
}

const textfieldClass = mergeStyles({
    display: 'block',
    marginBottom: '10px',
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };


const StudentiManagement = () =>{
    const[showAddModal, setShowAddModal] = useState(false);
    const[showUpdateModal, setShowUpdateModal] = useState(false);

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
            key:'deleteItem',
            text:'Elimina',
            iconProps: { iconName: 'Delete' },
            disabled: true,
            onClick:(()=>{
               confirmNotification({
                    title: 'Elimina Studente',
                    html: '<p> Si è sicuri di eliminare lo studente con codice fiscale '+selectedStudente!.cod_fiscale+'? </p>',
                    confirmButtonText: "Elimina",
                    cancelButtonText: "Annulla",
                    icon: "question",
                    }).then((res) => {
                    if (res.isConfirmed) {
                        dispatch(deleteStudente(selectedStudente!.cod_fiscale));
                    }
               }) 
            })
        },
    ];
    const dispatch = useDispatch();
    const { studenti } = useSelector((state: RootState)=>state.studente);
    const {selectedStudente} = useSelector((state: RootState)=>state.studente);
    const {message} = useSelector((state: RootState)=> state.studente);
    const[filteredStudenti, setFiteredStudenti] = useState<Studente[]>(studenti);

    const _columns: IColumn[] = [
        { key: 'column1', name: 'Codice Fiscale', fieldName: 'cod_fiscale', minWidth: 50, maxWidth: 100, isResizable: true },
        { key: 'column2', name: 'Nome', fieldName: 'nome', minWidth: 50, maxWidth: 100, isResizable: true},
        { key: 'column3', name: 'Cognome', fieldName: 'cognome', minWidth: 50, maxWidth: 100, isResizable: true },
        { key: 'column4', name: 'Data di nascita', fieldName: 'data_nascita', minWidth: 50, maxWidth: 100, isResizable: true, onRender:(item)=>{return(<p>{item.data_nascita.toString().slice(0,10).replaceAll("-","/")}</p>)} },
        { key: 'column5', name: 'Comune di nascita', fieldName: 'comune_nascita', minWidth: 50, maxWidth: 100, isResizable: true },
        { key: 'column6', name: 'Numero di telefono', fieldName: 'num_tel', minWidth: 50, maxWidth: 100, isResizable: true },
        { key: 'column7', name: 'Residenza', fieldName: 'indirizzo_res', minWidth: 50, maxWidth: 100, isResizable: true, onRender:(item)=>{
            const residenza = item.indirizzo_res+" "+item.civico_res+", "+item.cap_res;
            return <p>{residenza}</p>
        } },
    ];

    useEffect(()=>{
        dispatch(getAllStudenti());
    },[]);

    useEffect(()=>{
        setFiteredStudenti(studenti);
    },[studenti])

    const selection = new Selection({
        onSelectionChanged: () => {
            const selected = selection.getSelection()[0] as IDetailsListItem;
            if(selected !== undefined){
                dispatch(getSingleStudente(selected.cod_fiscale));
            }else{
                dispatch(setSelectedUndefined());
            }
        },
        
    });  

    useEffect(()=>{
        console.log(selectedStudente);
        console.log(_items);
        if(selectedStudente !== undefined){
            _items[1].disabled=false;
            _items[2].disabled = false;
        }else{
            _items[1].disabled=true;
            _items[2].disabled = true; 
        }
    },[selectedStudente])

    function onFilter(e:React.FormEvent<HTMLInputElement | HTMLTextAreaElement>){
        const value = (e.target as HTMLTextAreaElement).value.toLowerCase();
        //filteredStudenti.splice(0, filteredStudenti.length);
        setFiteredStudenti(studenti.filter((item)=>item.nome.toLocaleLowerCase().includes(value) || item.cognome.toLocaleLowerCase().includes(value) || item.cod_fiscale.toLocaleLowerCase().includes(value)));
        console.log(studenti);
    };
    
    return(
        <div>
            <div className="page-title">
                <Text variant="xxLarge"> Studenti </Text>
            </div>
            <TextField
                        className={textfieldClass}
                        label="Filtra per nome, cognome o codice fiscale"
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
                    items={filteredStudenti}
                    columns={_columns}
                    layoutMode={DetailsListLayoutMode.justified}
                    styles={{root:{padding:0}}}
                    selection={selection}
                    selectionMode = {SelectionMode.single}
                    selectionPreservedOnEmptyClick={true} 
                />

                <AddStudenteModal showModal={showAddModal} onCloseModal={()=>setShowAddModal(false)}/>
                <UpdateStudenteModal showModal={showUpdateModal} onCloseModal={()=> setShowUpdateModal(false)} />
            </div>
            <div className="footer">
                {message?.cod===0 && <MessageBar messageBarType={MessageBarType.error} dismissButtonAriaLabel="Close" onDismiss={()=>dispatch(resetMessage())}> {message.info} </MessageBar>}
                {message?.cod===1 && <MessageBar messageBarType={MessageBarType.success} dismissButtonAriaLabel="Close" onDismiss={()=>dispatch(resetMessage())}> {message.info} </MessageBar>}

            </div>
        </div>

    )
}
export default StudentiManagement;
