import { useDispatch, useSelector } from "react-redux";
import { Text, TextField, DetailsList, MessageBar, MessageBarType, mergeStyles, IColumn, ICommandBarItemProps, Selection, ITextFieldStyles, CommandBar, DetailsListLayoutMode, SelectionMode, Spinner, SpinnerSize, IContextualMenuItem } from "@fluentui/react";
import { RootState } from "../../core/store/store";
import { useEffect, useState } from "react";
import { Corso } from "../../models/corso";
import { getAllCorsi, getSingleCorso } from "../../core/store/corso/corso.action";
import { confirmNotification } from "../../utils";
import { Frequenza } from "../../models/frequenza";
import { getAllFrequenza, getSingleFrequenza, resetMessage, setSelectedUndefined, deleteFrequenza, getAttestato, setFilteredFrequenze } from "../../core/store/frequenza/frequenza.action";
import { getAllStudenti } from "../../core/store/studente/studente.action";
import { AddFrequenzaModal } from "./Modal/AddFrequenzaModal";
import { setLoading } from "../../core/store/frequenza/frequenzaSlice";
import { FilterFrequenzeModal } from "./Modal/FilterFrequenzeModal";

const textfieldClass = mergeStyles({
    display: 'block',
    marginBottom: '10px',
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

const FrequenzeManagement: React.FC = () =>{
    const [showAddModal, setShowAddModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);

    const dispatch = useDispatch();
    const { frequenze } = useSelector((state: RootState)=>state.frequenza);
    const { selectedFrequenza } = useSelector((state: RootState)=>state.frequenza);
    const { studenti } = useSelector((state: RootState)=>state.studente);
    const { corsi } = useSelector((state: RootState)=>state.corso);
    const { message } = useSelector((state: RootState)=> state.frequenza);
    const { loading } = useSelector((state: RootState)=> state.frequenza);
    const { filteredFrequenze } = useSelector((state: RootState)=> state.frequenza);

    //const[filteredFrequenze, setFilteredFrequenze] = useState<Frequenza[]>(frequenze);
    const _items: ICommandBarItemProps[] = [
        {
            key: 'newItem',
            text:'Nuovo',
            iconProps: { iconName: 'Add' },
            onClick: (()=>setShowAddModal(true))
        },
        {
            key:'deleteItem',
            text:'Elimina',
            iconProps: { iconName: 'Delete' },
            disabled: true,
            onClick:(()=>{
                const studente = studenti.find((studente)=>studente.cod_fiscale===selectedFrequenza?.cod_fiscale);
                const corso = corsi.find((corso)=> corso.id === selectedFrequenza?.id_c);
               confirmNotification({
                    title: 'Elimina Studente',
                    html: '<p> Si è sicuri di eliminare la frequenza dello studente "'+studente?.nome+" "+studente?.cognome+'" al corso "'+corso?.nome+'" ? </p>',
                    confirmButtonText: "Elimina",
                    cancelButtonText: "Annulla",
                    icon: "question",
                    }).then((res) => {
                    if (res.isConfirmed) {
                        dispatch(deleteFrequenza(selectedFrequenza!.id_c, selectedFrequenza!.cod_fiscale));
                    }
               }) 
            })
        },
        {
            key:'filterItem',
            text:'Filtra',
            iconProps:{iconName:'filter'},
            onClick:(()=>setShowFilterModal(true))
        },
        {
            key:'resetFilterItem',
            text:'Elimina filtri',
            iconProps:{iconName:'ClearFilter'},
            onClick:(()=>dispatch(setFilteredFrequenze(frequenze)))
        },
        
        
    ];
    const _farItems: ICommandBarItemProps[] = [
        {
          key: 'attestatoItem',
          text: 'Scarica Attestato',
          iconProps: { iconName: 'Certificate' },
          disabled: true,
          onClick: (() => {
              dispatch(setLoading(true));
              dispatch(getAttestato(selectedFrequenza!.id_c, selectedFrequenza!.cod_fiscale))}
              )
        }
    ];
    const _columns: IColumn[] = [
        { key: 'column1', name: 'Studente', fieldName: 'cod_fiscale', minWidth: 100, maxWidth: 300, isResizable: true, onRender:((item)=>{
            const studente = studenti.find((studente)=>studente.cod_fiscale===item.cod_fiscale);
            if(studente !== undefined){
                return <p>{item.cod_fiscale} - {studente!.nome} {studente!.cognome}</p>
            }
        }) },
        { key: 'column2', name: 'Corso', fieldName: 'nome', minWidth: 100, maxWidth: 300, isResizable: true, onRender:((item)=>{
            const corso = corsi.find((corso)=>corso.id === item.id_c);
            if(corso !== undefined){
                return <p>{item.id_c} - {corso!.nome}</p>
            }
        })},
    ];

    useEffect(()=>{
        dispatch(getAllCorsi());
        dispatch(getAllFrequenza());
        dispatch(getAllStudenti());
    },[]);

    useEffect(()=>{
        dispatch(setFilteredFrequenze(frequenze));
    },[frequenze])

    const selection = new Selection({
        onSelectionChanged: () => {
            const selected = selection.getSelection()[0] as Frequenza;
            if(selected !== undefined){
                dispatch(getSingleFrequenza(selected.id_c ,selected.cod_fiscale));
            }else{
                dispatch(setSelectedUndefined());
            }
        },
        
    });  

    useEffect(()=>{
        if(selectedFrequenza !== undefined){
            _items[1].disabled = false;  
            const corso = corsi.find(corso=>corso.id===selectedFrequenza.id_c);
            if(corso?.is_over) _farItems[0].disabled=false;
        }else{
            _items[1].disabled = true;
            _farItems[0].disabled = true;
        }
    },[selectedFrequenza])

    


    return(
        <div>
            <div className="loading" hidden={!loading}>
                <div className="loading-spinner" >
                    <Spinner label="Creazione attestato..." size={SpinnerSize.large} />
                </div>
            </div> 

            <div style={(loading) ? {filter: 'blur(8px)'} : undefined } >
            <div className="page-title">
                <Text variant="xxLarge"> Frequenze </Text>
            </div>
            
                <div className="card">
                        <div className="item-bar">
                            <CommandBar 
                            items={_items}
                            farItems={_farItems}
                            styles={{root:{padding:0}}}
                            /> 
                        
                </div>
                
                <DetailsList 
                    items={filteredFrequenze}
                    columns={_columns}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    styles={{root:{padding:0}}}
                    selection={selection}
                    selectionMode = {SelectionMode.single}
                    selectionPreservedOnEmptyClick={true} 
                />

                <AddFrequenzaModal showModal={showAddModal} onCloseModal={()=>setShowAddModal(false)} />
                <FilterFrequenzeModal showModal={showFilterModal} onCloseModal={()=>setShowFilterModal(false)} />
            </div>
            <div className="footer">
                {message?.cod===0 && <MessageBar messageBarType={MessageBarType.error} dismissButtonAriaLabel="Close" onDismiss={()=>dispatch(resetMessage())}> {message.info} </MessageBar>}
                {message?.cod===1 && <MessageBar messageBarType={MessageBarType.success} dismissButtonAriaLabel="Close" onDismiss={()=>dispatch(resetMessage())}> {message.info} </MessageBar>}

            </div>
            </div>
        </div>

    )
}

export default FrequenzeManagement;