import axios from "axios";
import { AppThunk } from "../store";
import { Frequenza } from "../../../models/frequenza";
import { getAllSuccess, getSingleSuccess, setState, setLoading } from "../frequenza/frequenzaSlice";

const resource_url = "https://localhost:7007/api/Frequenza/";

export const getAllFrequenza = (): AppThunk => async (dispatch) =>{
    axios.get<Frequenza[]>(resource_url+"GetAll")
    .then(res=>dispatch(getAllSuccess(res.data)))
    .catch(error=>console.log("errore nel fetch "+error));
}

export const getSingleFrequenza = (id_c:number, cod_fiscale:string): AppThunk => async (dispatch) =>{
    axios.get<Frequenza>(resource_url+"GetSingle?id_c="+id_c+"&cod_fiscale="+cod_fiscale)
    .then(res=>dispatch(getSingleSuccess(res.data)))
    .catch(error => console.log("errore nel getSingleFrequenza ")+error);
}

export const insertFrequenza = (frequenza: Frequenza): AppThunk =>async (dispatch) => {
    axios.post(resource_url+"Insert/", frequenza)
    .then(res => {
        dispatch(setState(res.data));
        if(res.data ===1){
            dispatch(getAllFrequenza());
        }
    })
}

export const deleteFrequenza = (id_c:number, cod_fiscale:string): AppThunk =>async (dispatch) => {
    axios.delete(resource_url+"Delete?id_c="+id_c+"&cod_fiscale="+cod_fiscale)
    .then(res => {
        dispatch(setState(res.data));
        if(res.data ===1){
            dispatch(getAllFrequenza());
        }
    })
}

export const setSelectedUndefined =():AppThunk => async(dispatch) =>{
    dispatch(getSingleSuccess(undefined));
}

export const resetState = (): AppThunk =>async (dispatch) => {
    dispatch(setState(undefined));
}

export const getAttestato =(id_c: number, cod_fiscale:string):AppThunk => async(dispatch) =>{
    //aggiungere allo state di frequenza un isloading e settarlo a true al primo then e settarlo a false in finally
    axios({
        url: resource_url+"GetAttestato?id_c="+id_c+"&cod_fiscale="+cod_fiscale,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
         // dispatch(setLoading(true));
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'attestato.pdf');
        document.body.appendChild(link);
        link.click();
      }).finally(()=>dispatch(setLoading(false)));
}