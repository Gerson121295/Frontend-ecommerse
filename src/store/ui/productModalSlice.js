
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isProductModalOpen: false,
}

    export const productModalSlice = createSlice({
        name: 'productModal', //nombre del slice
        initialState,
        
        reducers: {

        //Definir las funciones

            //abrir modal
            onOpenProductModal: (state) => {
                state.isProductModalOpen = true; //Forma de hacerlo la actualizacion usando: react-redux mas @reduxjs/toolkit 

            /* //forma de hacer la actualizacion Si se trabaja solo con react-redux sin el @reduxjs/toolkit
                return {
                    ...state,
                    isCategoryModalOpen: true,
                } 
            */
            },

            //cerrar modal
            onCloseProductModal: (state) => {
                state.isProductModalOpen = false;
            }

        }
    });

// Exporta las funciones para que pueda ser utilizada por otros component
export const { onOpenProductModal, onCloseProductModal } = productModalSlice.actions;



