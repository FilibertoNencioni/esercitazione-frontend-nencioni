import axios from "axios";
import { AppThunk } from "../store";
import { Corso } from "../../../models/corso";
import { CorsoSlice, getAllSuccess, getSingleSuccess, setState } from "./corsoSlice";


const resource_url = "https://localhost:7007/api/Corso/";

export const getAllCorsi = (): AppThunk => async (dispatch) =>{
    axios.get<Corso[]>(resource_url+"GetAll")
    .then(res=>dispatch(getAllSuccess(res.data)))
    .catch(error=>console.log("errore nel fetch "+error));
}

export const getSingleCorso = (id:number):AppThunk =>async (dispatch) => {
    axios.get<Corso | null>(resource_url+"GetSingle?id="+id)
    .then(res=> res.data ? dispatch(getSingleSuccess(res.data)): console.log("Non esiste nessun corso con quell'id"))
    .catch(error => console.log("Errore nel fetch singolo "+error))
}

export const insertCorso = (corso: Corso): AppThunk =>async (dispatch) => {
    axios.post(resource_url+"Insert/", corso)
    .then(res => {
        dispatch(setState(res.data));
        if(res.data ===1){
            dispatch(getAllCorsi());
        }
    })
}

export const updateCorso = (corso: Corso): AppThunk =>async (dispatch) => {
    axios.put(resource_url+"Update/", corso)
    .then(res => {
        dispatch(setState(res.data));
        if(res.data ===1){
            dispatch(getAllCorsi());
        }
    })
}

export const deleteCorso = (id: number): AppThunk =>async (dispatch) => {
    axios.delete(resource_url+"Delete?id="+id)
    .then(res => {
        dispatch(setState(res.data));
        if(res.data ===1){
            dispatch(getAllCorsi());
        }
    })
}

export const setIsOver = (isOver: boolean, id:number): AppThunk =>async (dispatch) => {
    axios.put(resource_url+"SetIsOver?is_over="+isOver+"&id="+id)
    .then(res => {
        dispatch(setState(res.data));
        if(res.data ===1){
            dispatch(getAllCorsi());
        }
    })
}

export const setSelectedUndefined =():AppThunk => async(dispatch) =>{
    dispatch(getSingleSuccess(undefined));
}

export const resetState = (): AppThunk =>async (dispatch) => {
    dispatch(setState(undefined));
}
