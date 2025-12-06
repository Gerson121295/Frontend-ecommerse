
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isLoading: false,
    pedidos: [],
    pedidoSelected: null,
    errorMessage: undefined,
    
    pageNumber: 0, //currentPage: 0,  //pagina actual
    totalPages: 0,
    totalElements: 0,
    sizePagination: 10, //tamaño de pagina por defecto
};

export const pedidoSlice = createSlice({
  name: 'pedido',
  initialState,

  reducers: {
    //Definicion de las funciones

    //Establece el estado de carga
    onSetLoading: (state) => { //llamada sin payload: dispatch(onStartLoading());
      state.isLoading = true;
      state.errorMessage = undefined;
    },
    
    //establece el pedido seleccionado
    onSetOrderSelected: (state, { payload }) => {
      state.pedidoSelected = payload;
    },

    // Guarda datos del pedido en memoria del frontend (en store Redux)
    onLoadOrders: (state, { payload }) => {
      const isPage = !!payload.content;

      state.pedidos = isPage ? payload.content : payload; // payload.content || payload; // Soporta Page y List  //payload.pedidos;
      
      state.pageNumber = payload.number ?? 0;  //payload.pageNumber; //CurrentPage
      state.totalPages = payload.totalPages || 1;
      state.totalElements = payload.totalElements ?? payload.length ?? 0;
      state.sizePagination = payload.size ?? payload.content?.length ?? 10;
      state.isLoading = false;
    },

    onDeleteOrder: (state, { payload }) => {
      //state.pedidos = state.pedidos.filter(p => p.id !== payload);
      state.pedidos = state.pedidos.filter(pedido =>
        pedido.id !== payload); //elimina el producto de la lista

        // Limpia el pedido seleccionado si el que se eliminó era la seleccionada                    
        if(state.pedidoSelected?.id === payload){
            state.pedidoSelected = null;
        }
        state.isLoading = false;
    },

    //Limpia el pedido seleccionado
    onClearOrderSelected: (state) =>{
      state.pedidoSelected = null;
    },

    //onError: establece el mensaje de error y finaliza la carga ademas de limpiar el pedido seleccionado
    onError: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload; //establece el mensaje de error
    },

    // Limpia el mensaje de error y estado de error
    onClearError: (state) => {
      //state.errorMessage = undefined;  //El campo queda “no definido”
      state.errorMessage = null; //El campo queda definido pero vacío
    }
  }
});

// Exporta las funciones para que pueda ser utilizada por otros component
export const {
  onSetLoading,
  onLoadOrders,
  onSetOrderSelected,
  onDeleteOrder,
  onClearOrderSelected,
  onError,
  onClearError
} = pedidoSlice.actions;

