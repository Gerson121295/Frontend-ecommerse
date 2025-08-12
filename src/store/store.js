import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";

//Store es la fuente de la verdad(informacion) los componentes podran acceder

export const store = configureStore({
    reducer: {
        //asigna el reducer del authSlice al store
        auth: authSlice.reducer, //auth apunta a los reducer de authSlice. permitiendo a auth acceder a los estados y reducers de authSlice

    },

    

})