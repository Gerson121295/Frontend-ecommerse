
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'checking', // 'checking', 'authenticated', 'not-authenticated'
    user: {},
    errorMessage: undefined,
    isAdmin: false,
    isAssistant: false,
    isUser: false
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
                state.isAdmin = false;
                state.isAssistant = false;
                state.isUser = false;
            },

            //Login del usuario
            onLogin: (state, {payload}) => { //de action se obtiene el { payload }
                state.status = 'authenticated'; //cambia el estado a authenticated
                state.user = payload; //payload será el objeto con toda la info del usuario
                state.errorMessage = undefined; //limpia el mensaje de error

                // Calculo de las banderas en base al rol del usuario
                const roles = payload.roles || []; // Aseguramos que roles sea un array, si no, será un array vacío
                state.isAdmin = roles.includes('ROLE_ADMIN'); // Verifica si en el state isAdmin es true(es Admin) entonces agrega al array roles: 'ROLE_ADMIN'
                state.isAssistant = roles.includes('ROLE_ASSISTANT');
                state.isUser = roles.includes('ROLE_USER');
            },

            //Logout del usuario
            onLogout: (state, {payload}) => {
                state.status = 'not-authenticated'; //cambia el estado a not-authenticated
                state.user = {}; //limpia el user, borrando los datos del usuario
                state.errorMessage = payload //|| undefined; //si hay un mensaje de error lo asigna, si no, lo deja como undefined

                // Limpia las banderas de roles
                state.isAdmin = false; //limpia el estado de isAdmin
                state.isAssistant = false; 
                state.isUser = false; 
            },

            clearErrorMessage: (state) => { 
                state.errorMessage = undefined; //limpia el mensaje de error
            }
        }
    });


// Action creators are generated for each case reducer function
// Exporta las funciones para que pueda ser utilizada por otros component
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;



