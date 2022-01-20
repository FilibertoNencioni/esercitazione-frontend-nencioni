import { combineReducers, configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { corsoSlice } from "./corso/corsoSlice";
import { frequenzaSlice } from "./frequenza/frequenzaSlice";
import { headerSlice } from "./header/headerSlice";
import { studenteSlice } from "./studente/studenteSlice";
import { docenteSlice } from "./docente/docenteSlice";

const rootReducer = combineReducers({
    studente: studenteSlice.reducer,
    corso: corsoSlice.reducer,
    frequenza: frequenzaSlice.reducer,
    header: headerSlice.reducer,
    docente: docenteSlice.reducer
})

export const store =  configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

// trick to use async thunk (as AppDispatch)
export type AppDispatch = typeof store.dispatch