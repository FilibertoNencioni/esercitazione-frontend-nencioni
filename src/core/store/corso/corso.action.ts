import axios from "axios";
import { AppThunk } from "../store";
import { Corso } from "../../../models/corso";
import { CorsoSlice, getAllSuccess, getSingleSuccess, setMessage } from "./corsoSlice";
import { Message } from "../../../models/message";


const resource_url = "https://localhost:7007/api/Corso/";

export const getAllCorsi = (): AppThunk => async (dispatch) =>{
    axios.get<Corso[]>(resource_url+"GetAll")
    .then(res=>dispatch(getAllSuccess(res.data)))
    .catch(error=>dispatch(setMessage({cod:0,info: error})));
}

export const getSingleCorso = (id:number):AppThunk =>async (dispatch) => {
    axios.get<Corso | null>(resource_url+"GetSingle?id="+id)
    .then(res=> res.data ? dispatch(getSingleSuccess(res.data)): console.log("Non esiste nessun corso con quell'id"))
    .catch(error=>dispatch(setMessage({cod:0,info: error})));
}

export const insertCorso = (corso: Corso): AppThunk =>async (dispatch) => {
    axios.post(resource_url+"Insert/", corso)
    .then(res => {
        if(res.data ===1){
            dispatch(setMessage({cod: res.data, info:"Inserimento completato con successo"}));
            dispatch(getAllCorsi());
        }else{
            dispatch(setMessage({cod: res.data, info:"Errore durante l'inserimento"}));
        }
    }).catch(error=>{
        dispatch(setMessage({cod:0,info: error}));
    })
}

export const updateCorso = (corso: Corso): AppThunk =>async (dispatch) => {
    axios.put(resource_url+"Update/", corso)
    .then(res => {
        if(res.data ===1){
            dispatch(setMessage({cod: res.data, info:"Modifica completata con successo"}));
            dispatch(getAllCorsi());
        }else{
            dispatch(setMessage({cod: res.data, info:"Errore durante la modifica"}));
        }
    }).catch(error=>{
        dispatch(setMessage({cod:0,info: error}));
    })
}

export const deleteCorso = (id: number): AppThunk =>async (dispatch) => {
    axios.delete(resource_url+"Delete?id="+id)
    .then(res => {
        if(res.data ===1){
            dispatch(setMessage({cod: res.data, info:"Eliminazione completata con successo"}));
            dispatch(getAllCorsi());
        }else{
            dispatch(setMessage({cod: res.data, info:"Errore durante l'eliminazione"}));
        }
    }).catch(error=>{
        dispatch(setMessage({cod:0,info: error}));
    })
}

export const setIsOver = (isOver: boolean, id:number): AppThunk =>async (dispatch) => {
    axios.put(resource_url+"SetIsOver?is_over="+isOver+"&id="+id)
    .then(res => {
        if(res.data ===1){
            dispatch(setMessage({cod: res.data, info:"Operazione completata con successo"}));
            dispatch(getAllCorsi());
        }else{
            dispatch(setMessage({cod: res.data, info:"Errore durante l'operazione"}));
        }
    }).catch(error=>{
        dispatch(setMessage({cod:0,info: error}));
    })
}

export const setSelectedUndefined =():AppThunk => async(dispatch) =>{
    dispatch(getSingleSuccess(undefined));
}

export const resetMessage = (): AppThunk =>async (dispatch) => {
    dispatch(setMessage(undefined));
}
