import axios from "axios";
import { Studente } from "../../../models/studente";
import { AppThunk } from "../store";
import { getAllSuccess, getSingleSuccess, setMessage } from "./studenteSlice";

const resource_url = "https://localhost:7007/api/Studente/";

export const getAllStudenti = (): AppThunk => async (dispatch) =>{
    axios.get<Studente[]>(resource_url+"GetAll")
    .then(res=>dispatch(getAllSuccess(res.data)))
    .catch(error=>dispatch(setMessage({cod:0,info: error.message})));
}

export const getSingleStudente = (cod_fiscale: string): AppThunk => async (dispatch) =>{

    axios.get<Studente>(resource_url+"GetSingle?cod_fiscale="+cod_fiscale)
    .then(res=>dispatch(getSingleSuccess(res.data)))
    .catch(error=>dispatch(setMessage({cod:0,info: error.message})));
    
}
export const setSelectedUndefined =():AppThunk => async(dispatch) =>{
    dispatch(getSingleSuccess(undefined));
}
export const insertStudente = (studente: Studente): AppThunk =>async (dispatch) => {
    axios.post(resource_url+"Insert/", studente)
    .then(res => {
        if(res.data ===1){
            dispatch(setMessage({cod: res.data, info:"Inserimento completato con successo"}));
            dispatch(getAllStudenti());
        }else{
            dispatch(setMessage({cod: res.data, info:"Errore durante l'inserimento"}));
        }
    }).catch(error=>dispatch(setMessage({cod:0,info: error.message})));
}

export const updateStudente = (studente: Studente): AppThunk =>async (dispatch) => {
    axios.put(resource_url+"Update/", studente)
    .then(res => {
        if(res.data ===1){
            dispatch(setMessage({cod: res.data, info:"Modifica completata con successo"}));
            dispatch(getAllStudenti());
        }else{
            dispatch(setMessage({cod: res.data, info:"Errore durante la modifica"}));
        }
    }).catch(error=>{
        dispatch(setMessage({cod:0,info: error.message}));
    })
}

export const deleteStudente = (cod_fiscale: string): AppThunk =>async (dispatch) => {
    axios.delete(resource_url+"Delete?cod_fiscale="+cod_fiscale)
    .then(res => {
        if(res.data ===1){
            dispatch(setMessage({cod: res.data, info:"Eliminazione completata con successo"}));
            dispatch(getAllStudenti());
        }else{
            dispatch(setMessage({cod: res.data, info:"Errore durante l'eliminazione"}));
        }
    }).catch(error=>{
        dispatch(setMessage({cod:0,info: error.message}));
    })
}

export const resetMessage = (): AppThunk =>async (dispatch) => {
    dispatch(setMessage(undefined));
}
