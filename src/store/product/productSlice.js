
import { createSlice } from '@reduxjs/toolkit';

//Plantilla Redux - Escribir: redux-slice

const initialState = {
    isLoading: false,
    products:[],
    productSelected: null,
    errorMessage: undefined,
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    sizePagination: 10, //tamaño de pagina por defecto
}

    export const productSlice = createSlice({
        name: 'product', //nombre del slice
        initialState, //estado inicial

        reducers: {
        //Definicion de las funciones
            //Establece el estado de carga
            onSetLoading: (state, {payload}) => { //llamada con payload: dispatch(onSetLoading(true));
                state.isLoading = payload; //actualiza el estado de carga
            },

             //establece el producto seleccionado
             onSetProductSelected: (state, { payload }) => {
                state.productSelected = payload;
                //state.isLoading = false;
            },
    
            //Agrega un nuevo producto y limpia la seleccionada
            onAddNewProduct: (state, {payload}) => {
                state.products.push(payload); //agrega un nuevo producto a la lista
                state.productSelected = null; //limpia la categoria seleccionada
                state.isLoading = false; //finaliza el estado de carga
            },

            //Actualiza un producto existente
            onUpdateProduct: (state, {payload}) => { //payload es el producto actualizado
                state.products = state.products.map(product => 
                    product.id === payload.id ? payload : product 
                ); //actualiza el producto en la lista
                state.isLoading = false; 
            },

            //Elimina un producto por id
            onDeleteProduct: (state, {payload}) => { //payload es el id del producto a eliminar
                state.products = state.products.filter( product =>
                    product.id !== payload); //elimina el producto de la lista
                    
                    // Limpia el producto seleccionado si el que se eliminó era la seleccionada                    
                    if(state.productSelected?.id === payload){
                        state.productSelected = null;
                    }
                state.isLoading = false;
            },
            
            // Guarda los datos en memoria del frontend (en store Redux)
            onLoadProducts: (state, {payload}) => {
                /* state.products = payload.content || payload; // Soporta Page y List
                
                state.currentPage = payload.number 
                state.totalPages = payload.totalPages || 0;
                state.totalElements = payload.totalElements || 0;
                state.sizePagination = payload.size || 10
                state.isLoading = false; //finaliza el estado de carga */

                // Si payload no existe, fallback seguro
                    if (!payload) {
                        state.products = [];
                        state.currentPage = 0;
                        state.totalPages = 1;
                        state.totalElements = 0;
                        state.sizePagination = 10;
                        state.isLoading = false;
                        return;
                    }

                    const isPage = Array.isArray(payload?.content);
                    const products = isPage ? payload.content : payload;

                    // fallback si products viene null o undefined
                    const safeProducts = Array.isArray(products) ? products : [];
                    
                    state.products = safeProducts;
                    state.currentPage = isPage ? (payload.number ?? 0) : 0;
                    state.totalPages = isPage ? (payload.totalPages ?? 1) : 1;
                    state.totalElements = isPage ? (payload.totalElements ?? safeProducts.length) : safeProducts.length;
                    // never allow sizePagination to become 0
                    state.sizePagination = isPage ? (payload.size > 0 ? payload.size : 10) : (safeProducts.length > 0 ? safeProducts.length : 10);
                    state.isLoading = false;
            },

            //Limpia el producto seleccionado
            onClearSelectedProduct: (state) => {
                state.productSelected = null; //limpia el producto activo     
            },

            //Maneja errores
            onError: (state, {payload}) => {
                state.isLoading = false;
                state.errorMessage = payload; //establece el mensaje de error
            },

            //Limpia el mensaje de error
            clearErrorMessage: (state) => { 
                state.errorMessage = undefined; //limpia el mensaje de error
            },

            //Esta opcion es mejor que clearErrorMessage ya que: undefined: El campo queda “no definido” y null el campo queda definido pero vacío 
            onClearError: (state) => {
                state.errorMessage = null;
            },

            },
    });


// Exporta las funciones para que pueda ser utilizada por otros component
export const { 
    onSetLoading,
    onSetProductSelected,
    onAddNewProduct,
    onUpdateProduct,
    onDeleteProduct,
    onLoadProducts,
    onClearSelectedProduct,
    onError,
    clearErrorMessage,
    onClearError
} = productSlice.actions;


