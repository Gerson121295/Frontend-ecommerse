
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCategoryModalOpen: false,
}

//Mantener la informacion del UI si el modal esta abierto, cerrado, navegador usado por el cliente

    export const categoryModalSlice = createSlice({
        name: 'categoryModal', //nombre del slice
        initialState,

        reducers: {
            //Abrir Modal
            onOpenCategoryModal: (state) => {
                state.isCategoryModalOpen = true; //Forma de hacerlo la actualizacion usando: react-redux mas @reduxjs/toolkit 
            
            /* //forma de hacer la actualizacion Si se trabaja solo con react-redux sin el @reduxjs/toolkit
                return {
                    ...state,
                    isCategoryModalOpen: true,
                } 
            */
            },

            //Cerrar Modal
            onCloseCategoryModal: (state) => {
                state.isCategoryModalOpen = false;
            }
        }
    });

// Action creators are generated for each case reducer function
export const { onOpenCategoryModal, onCloseCategoryModal } = categoryModalSlice.actions;
