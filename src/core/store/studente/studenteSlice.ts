import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../../models/message";
import { Studente } from "../../../models/studente";

export interface StudenteSlice{
    studenti: Studente[],
    selectedStudente: Studente | undefined,
    message: Message | undefined
}

const initialState: StudenteSlice = {
    studenti : [],
    selectedStudente : undefined,
    message: undefined, //1 = Good 
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
        setMessage:(state, action:PayloadAction<Message | undefined>)=>{
            state.message = action.payload;
        }
    },
});

export const {getAllSuccess, getSingleSuccess, setMessage} = studenteSlice.actions;
