import { INavLink } from "@fluentui/react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderSlice{
    pageKey: string
}

export const headerSlice = createSlice({
    name: "room-modal",
    initialState:{
        pageKey: ""      
    } as HeaderSlice,
    reducers:{
        setCurrentPage: (state, action:PayloadAction<string>) =>{
            state.pageKey = action.payload;
        }
    }
})
export const {setCurrentPage} = headerSlice.actions