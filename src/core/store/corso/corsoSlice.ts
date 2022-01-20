import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Corso } from "../../../models/corso";

export interface CorsoSlice{
    corsi: Corso[],
    selectedCorso: Corso | undefined,
    state: number | undefined
}

const initialState: CorsoSlice = {
    corsi : [],
    selectedCorso : undefined,
    state: undefined
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
        setState:(state, action:PayloadAction<number | undefined>)=>{
            state.state = action.payload;
        }
    },
});
export const {getAllSuccess, getSingleSuccess, setState} = corsoSlice.actions;
