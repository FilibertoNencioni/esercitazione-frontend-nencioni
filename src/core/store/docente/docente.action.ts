import axios from "axios";
import { AppThunk } from "../store";
import { Docente } from "../../../models/docente";
import { getAllSuccess } from "./docenteSlice";

const resource_url = "https://localhost:7007/api/Docente/";

export const getAllDocente = (): AppThunk => async (dispatch) =>{
    axios.get<Docente[]>(resource_url+"GetAll")
    .then(res=>dispatch(getAllSuccess(res.data)))
    .catch(error=>console.log("errore nel fetch "+error));
}