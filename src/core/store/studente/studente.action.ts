import axios from "axios";
import { Studente } from "../../../models/studente";
import { AppThunk } from "../store";
import { getAllSuccess, getSingleSuccess, setState } from "./studenteSlice";

const resource_url = "https://localhost:7007/api/Studente/";

export const getAllStudenti = (): AppThunk => async (dispatch) =>{
    axios.get<Studente[]>(resource_url+"GetAll")
    .then(res=>dispatch(getAllSuccess(res.data)))
    .catch(error=>console.log("errore nel fetch "+error));
}

export const getSingleStudente = (cod_fiscale: string): AppThunk => async (dispatch) =>{

    axios.get<Studente>(resource_url+"GetSingle?cod_fiscale="+cod_fiscale)
    .then(res=>dispatch(getSingleSuccess(res.data)))
    .catch(error => console.log("errore nel getSingleStudente "+error));
    
}
export const setSelectedUndefined =():AppThunk => async(dispatch) =>{
    dispatch(getSingleSuccess(undefined));
}
export const insertStudente = (studente: Studente): AppThunk =>async (dispatch) => {
    axios.post(resource_url+"Insert/", studente)
    .then(res => {
        dispatch(setState(res.data));
        if(res.data ===1){
            dispatch(getAllStudenti());
        }
    })
}

export const updateStudente = (studente: Studente): AppThunk =>async (dispatch) => {
    axios.put(resource_url+"Update/", studente)
    .then(res => {
        dispatch(setState(res.data));
        if(res.data ===1){
            dispatch(getAllStudenti());
        }
    })
}

export const deleteStudente = (cod_fiscale: string): AppThunk =>async (dispatch) => {
    axios.delete(resource_url+"Delete?cod_fiscale="+cod_fiscale)
    .then(res => {
        dispatch(setState(res.data));
        if(res.data ===1){
            dispatch(getAllStudenti());
        }
    })
}

export const resetState = (): AppThunk =>async (dispatch) => {
    dispatch(setState(undefined));
}
