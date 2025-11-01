
import { createSlice } from '@reduxjs/toolkit';

//Plantilla Redux - Escribir: redux-slice

const initialState = {
    products:[],
    productSelected: null,
    isLoading: false,
    errorMessage: undefined,
    totalPages: 0,
    totalElements: 0,
}

    export const productSlice = createSlice({
        name: 'product', //nombre del slice
        initialState, //estado inicial

        reducers: {
        //Definicion de las funciones
            onSetLoading: (state, {payload}) => {
                state.isLoading = payload; //actualiza el estado de carga
            },
            onSetProducts: (state, {payload}) => {
                state.products = payload.content || payload; // Soporta Page y List
                state.totalPages = payload.totalPages || 0;
                state.totalElements = payload.totalElements || 0;
                state.isLoading = false; //finaliza el estado de carga
            },
             onSetProductSelected: (state, { payload }) => {
                state.productSelected = payload;
                state.isLoading = false;
            },
            onAddProduct: (state, {payload}) => {
                state.products.push(payload); //agrega un nuevo producto a la lista
                state.isLoading = false; //finaliza el estado de carga
            },
            onUpdateProduct: (state, {payload}) => { //payload es el producto actualizado
                state.products = state.products.map(product => 
                    product.id === payload.id ? payload : product 
                ); //actualiza el producto en la lista
                state.isLoading = false; 
            },
            onDeleteProduct: (state, {payload}) => { //payload es el id del producto a eliminar
                state.products = state.products.filter(product => product.id !== payload); //elimina el producto de la lista
                state.isLoading = false;
            },
            onClearSelectedProduct: (state) => {
                state.productSelected = null; //limpia el producto activo     
            },
            onError: (state, {payload}) => {
                state.isLoading = false;
                state.errorMessage = payload; //establece el mensaje de error
            },
            clearErrorMessage: (state) => { 
                state.errorMessage = undefined; //limpia el mensaje de error
            },
            },
    });


// Exporta las funciones para que pueda ser utilizada por otros component
export const { 
        onSetLoading,
        onSetProducts,
        onSetProductSelected,
        onAddProduct,
        onUpdateProduct,
        onDeleteProduct,
        onClearSelectedProduct,
        onError,
        clearErrorMessage,
} = productSlice.actions;


