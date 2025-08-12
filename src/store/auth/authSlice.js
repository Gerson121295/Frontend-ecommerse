
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    status: 'checking', // 'checking', 'authenticated', 'not-authenticated'
    user: {},
    errorMessage: undefined,
}

    export const authSlice = createSlice({
        name: 'auth', //nombre del slice
        initialState,
        reducers: {

        //Definir las funciones
            //Verifica si el usuario esta autenticado
            onChecking:(state) => {
                state.status = 'checking';
                state.user = {};
                state.errorMessage = undefined;
            },

            //Login del usuario
            onLogin: (state, {payload}) => { //de action se obtiene el { payload }
                state.status = 'authenticated'; //cambia el estado a authenticated
                state.user = payload; //payload será el objeto con toda la info del usuario
                state.errorMessage = undefined; //limpia el mensaje de error
            },

            //Logout del usuario
            onLogout: (state, {payload}) => {
                state.status = 'not-authenticated'; //cambia el estado a not-authenticated
                state.user = {}; //limpia el user, borrando los datos del usuario
                state.errorMessage = payload //|| undefined; //si hay un mensaje de error lo asigna, si no, lo deja como undefined
            },

            clearErrorMessage: (state) => { 
                state.errorMessage = undefined; //limpia el mensaje de error
            }

        }
    });


// Action creators are generated for each case reducer function
// Exporta las funciones para que pueda ser utilizada por otros component
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;



