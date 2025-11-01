import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./auth/authSlice";
import { productSlice } from "./product/productSlice";
import { categorySlice } from "./category/categorySlice";
import { categoryModalSlice } from "./ui/categoryModalSlice";

//Store es la fuente de la verdad(informacion) los componentes podran acceder

export const store = configureStore({
    reducer: {
        //asigna el reducer del authSlice al store
        auth: authSlice.reducer, //auth apunta a los reducer de authSlice. permitiendo a auth acceder a los estados y reducers de authSlice
        product: productSlice.reducer, //product apunta a los reducer de productSlice
        category: categorySlice.reducer, //category apunta a los reducer de categorySlice   
        categoryModal: categoryModalSlice.reducer, 
    },

})

   // +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 
