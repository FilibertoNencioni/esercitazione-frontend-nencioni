import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Frequenza } from "../../../models/frequenza";

export interface FrequenzaSlice{
    frequenze: Frequenza[],
    selectedFrequenza: Frequenza | undefined,
    state: number | undefined,
    loading: boolean
}

const initialState: FrequenzaSlice = {
    frequenze :[],
    selectedFrequenza: undefined,
    state: undefined,
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
        setState:(state, action:PayloadAction<number | undefined>)=>{
            state.state = action.payload;
        },
        setLoading:(state, action:PayloadAction<boolean>)=>{
            state.loading = action.payload;
        }
    },
});

export const {getAllSuccess, getSingleSuccess, setState, setLoading} = frequenzaSlice.actions;
