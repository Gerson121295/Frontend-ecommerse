
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    users: [],
    userSelected: null,
    errorMessage: null, //undefined,

    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    sizePagination: 10, //tamaño por defecto
}

    export const userSlice = createSlice({
        name: 'user', //nombre del slice
        initialState,
        reducers: {

        //Definir las funciones
           
        // Sets loading state
        onSetLoading: (state) => {
            state.isLoading = true;
        },

        // Sets selected user
        onSetUserSelected: (state, { payload }) => {
            state.userSelected = payload;
        },

        // Adds a new user and clean the user selected
        onAddNewUser: (state, {payload}) => {
            state.users.push(payload); //added new product to the list
            state.userSelected = null; //limpia el user selected
            state.isLoading = false; //finaliza el estado de carga
        },

        // Deletes a user by id
        onDeleteUser: (state, { payload }) => {
            state.users = state.users.filter( user => 
                user.id !== payload); //elimina el user de la lista
            
            //Limpia el userSelected si el que se elimino era el seleccionado
            if(state.userSelected?.id === payload){
                state.userSelected = null;
            }

            state.isLoading = false;
        },

        // Loads users (paged or unpaged) In memory of fronted(redux store)
        onLoadUsers: (state, { payload }) => {
            
            const isPage = Array.isArray(payload.content);
            const users = isPage ? payload.content : payload;

            state.users = users;
            state.currentPage = isPage ? payload.number : 0;
            state.totalPages = isPage ? payload.totalPages : 1;
            state.totalElements = isPage ? payload.totalElements : users.length;
            state.sizePagination = isPage ? payload.size : users.length;
            state.isLoading = false;
        },

        // Clears selected user
        onClearUserSelected: (state) => {
            state.userSelected = null;
        },

        // Sets error
        onError: (state, { payload }) => {
            state.isLoading = false;
            state.errorMessage = payload; //establece el mensaje de error
        },

        // Clears error
        onClearError: (state) => {
            //state.errorMessage = undefined;  //El campo queda “no definido”
            state.errorMessage = null; //El campo queda definido pero vacío
        },

    }
    });

// Exporta las funciones para que pueda ser utilizada por otros component
export const { 
    onSetLoading, 
    onSetUserSelected, 
    onAddNewUser,
    onDeleteUser,
    onLoadUsers,

    onClearUserSelected,
    onError,
    onClearError,

 } = userSlice.actions;