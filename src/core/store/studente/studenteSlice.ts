import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Studente } from "../../../models/studente";

export interface StudenteSlice{
    studenti: Studente[],
    selectedStudente: Studente | undefined,
    state: number | undefined
}

const initialState: StudenteSlice = {
    studenti : [],
    selectedStudente : undefined,
    state: undefined, //1 = Good 
                      //0 = Bad
}

export const studenteSlice = createSlice({
    name:'studente',
    initialState,
    reducers:{
        getAllSuccess: (state, action:PayloadAction<Studente[]>) =>{
            state.studenti = action.payload;
        },
        getSingleSuccess: (state, action:PayloadAction<Studente | undefined>) =>{
            state.selectedStudente = action.payload;
        },
        setState:(state, action:PayloadAction<number | undefined>)=>{
            state.state = action.payload;
        }
    },
});

export const {getAllSuccess, getSingleSuccess, setState} = studenteSlice.actions;
