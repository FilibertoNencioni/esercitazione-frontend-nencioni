import axios from "axios";
import { AppThunk } from "../store";
import { Frequenza } from "../../../models/frequenza";
import { getAllSuccess, getSingleSuccess, setMessage, setLoading, setFiltered } from "../frequenza/frequenzaSlice";

const resource_url = "https://localhost:7007/api/Frequenza/";

export const getAllFrequenza = (): AppThunk => async (dispatch) =>{
    axios.get<Frequenza[]>(resource_url+"GetAll")
    .then(res=>dispatch(getAllSuccess(res.data)))
    .catch(error=>dispatch(setMessage({cod:0,info: error.message})));
}

export const getSingleFrequenza = (id_c:number, cod_fiscale:string): AppThunk => async (dispatch) =>{
    axios.get<Frequenza>(resource_url+"GetSingle?id_c="+id_c+"&cod_fiscale="+cod_fiscale)
    .then(res=>dispatch(getSingleSuccess(res.data)))
    .catch(error=>dispatch(setMessage({cod:0,info: error.message})));
}

export const insertFrequenza = (frequenza: Frequenza): AppThunk =>async (dispatch) => {
    axios.post(resource_url+"Insert/", frequenza)
    .then(res => {
        if(res.data ===1){
            dispatch(setMessage({cod: res.data, info:"Inserimento completato con successo"}));
            dispatch(getAllFrequenza());
        }else{
            dispatch(setMessage({cod: res.data, info:"Errore durante l'inserimento"}));
        }
    }).catch(error=>{
        dispatch(setMessage({cod:0,info: error.message}));
    })
}

export const deleteFrequenza = (id_c:number, cod_fiscale:string): AppThunk =>async (dispatch) => {
    axios.delete(resource_url+"Delete?id_c="+id_c+"&cod_fiscale="+cod_fiscale)
    .then(res => {
        if(res.data ===1){
            dispatch(setMessage({cod: res.data, info:"Eliminazione completata con successo"}));
            dispatch(getAllFrequenza());
        }else{
            dispatch(setMessage({cod: res.data, info:"Errore durante l'eliminazione"}));
        }
    }).catch(error=>{
        dispatch(setMessage({cod:0,info: error.message}));
    })
}

export const setSelectedUndefined =():AppThunk => async(dispatch) =>{
    dispatch(getSingleSuccess(undefined));
}

export const resetMessage = (): AppThunk =>async (dispatch) => {
    dispatch(setMessage(undefined));
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
      }).catch(()=>{
        dispatch(setMessage({cod:0,info:"Errore durante la creazione dell'attestato "}));
      }).finally(()=>dispatch(setLoading(false)));
}

export const setFilteredFrequenze = (frequenze:Frequenza[]): AppThunk =>async (dispatch) => {
    dispatch(setFiltered(frequenze));
}
