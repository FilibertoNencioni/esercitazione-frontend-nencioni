import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Frequenza } from "../../../models/frequenza";
import { Message } from "../../../models/message";

export interface FrequenzaSlice{
    frequenze: Frequenza[],
    selectedFrequenza: Frequenza | undefined,
    message: Message | undefined,
    loading: boolean
}

const initialState: FrequenzaSlice = {
    frequenze :[],
    selectedFrequenza: undefined,
    message: undefined,
    loading: false
}

export const frequenzaSlice = createSlice({
    name:'frequenza',
    initialState,
    reducers:{
        getAllSuccess: (state, action:PayloadAction<Frequenza[]>) =>{
            state.frequenze = action.payload;
        },
        getSingleSuccess: (state, action:PayloadAction<Frequenza | undefined>) =>{
            state.selectedFrequenza = action.payload;
        },
        setMessage:(state, action:PayloadAction<Message | undefined>)=>{
            state.message = action.payload;
        },
        setLoading:(state, action:PayloadAction<boolean>)=>{
            state.loading = action.payload;
        }
    },
});

export const {getAllSuccess, getSingleSuccess, setMessage, setLoading} = frequenzaSlice.actions;
