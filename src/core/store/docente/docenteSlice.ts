import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Docente } from "../../../models/docente";

export interface DocenteSlice{
    docenti: Docente[]
}

const initialState: DocenteSlice = {
    docenti : []
}

export const docenteSlice = createSlice({
    name:'docente',
    initialState,
    reducers:{
        getAllSuccess: (state, action:PayloadAction<Docente[]>) =>{
            state.docenti = action.payload;
        }
    },
});
export const {getAllSuccess} = docenteSlice.actions;