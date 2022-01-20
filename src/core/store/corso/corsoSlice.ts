import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Corso } from "../../../models/corso";
import { Message } from "../../../models/message";

export interface CorsoSlice{
    corsi: Corso[],
    selectedCorso: Corso | undefined,
    message: Message | undefined
}

const initialState: CorsoSlice = {
    corsi : [],
    selectedCorso : undefined,
    message: undefined
}

export const corsoSlice = createSlice({
    name:'corso',
    initialState,
    reducers:{
        getAllSuccess: (state, action:PayloadAction<Corso[]>) =>{
            state.corsi = action.payload;
        },
        getSingleSuccess: (state, action:PayloadAction<Corso | undefined>) =>{
            state.selectedCorso = action.payload;
        },
        setMessage:(state, action:PayloadAction<Message | undefined>)=>{
            state.message = action.payload;
        }
    },
});
export const {getAllSuccess, getSingleSuccess, setMessage} = corsoSlice.actions;
