
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    categories: [],
    currentPage: 0,
    totalPages: 0,
    errorMessage: null,
    categorySelected: null,
}

    export const categorySlice = createSlice({
        name: 'category', //nombre del slice
        initialState,

        reducers: {
            
            //Establecer activo o seleccionado la categoria, recibe el payload
            onSetCategorySelected: (state, {payload}) => { //recibe el state y action(se desestructura y obtiene el payload)
                state.categorySelected = payload;
            },

            //Se agrega una nueva categoria y limpia la seleccionada
            onAddNewCategory: (state, { payload }) => {
                state.categories.push(payload); //agrega una nueva categoria a la lista
                state.categorySelected = null; //limpia la categoria seleccionada
            },

            //Actualiza la categoria seleccionada
            onUpdateCategory: (state, { payload }) => {
                //Forma 1:
                /* state.categories = state.categories.map(category => 
                    category.id === payload.id ? payload : category
                ); */

                //Forma 2:
                //const index = state.categories.findIndex(cat => cat.id === payload.id);
                //if (index !== -1) state.categories[index] = payload;
                
                //Forma 3:
                state.categories = state.categories.map(category =>{ //map regresa un nuevo arreglo con las modificaciones realizadas
                    //Si el evento actual que se recorre de arreglo de events (event.id) es igual al id del evento que se recibe(payload.id) retorna el event para realizar la actualizacion
                    if(category.id === payload.id){
                        return payload; //retorna el evento actualizado
                    }
                    return category; //si no es igual, retorna el evento sin modificar
                })
                //state.isLoading = false;
            },

            onDeleteCategory: (state) => {   //, { payload }) => {
                
                //Forma 1: - Recibe el id mendiante payload
                //state.categories = state.categories.filter(category => category.id !== payload);

                //Forma 2: - No recibe payload
                //valida si existe categoryselected(categoria seleccionada) proceder a filtrar y eliminar
                if(state.activeEvent){
                    state.categories = state.categories.filter(category => //filter recorre cada categoria y regresa un nuevo arreglo con todos los datos de las categorias excepto por la categoria con el id de la categoria Seleccionada, esa categoria se elimina
                        category.id !== state.categorySelected.id //Filter regresa un nuevo arreglo con todos las categorias cuyo id sea diferente a la categoria Seleccionada. El id de la categoria Seleccionada se eliminará
                    );
                    state.categorySelected = null; //limpia la categoria seleccionada, para no tener una categoria seleccionada que ya no existe
                }
            },

            // Guarda los datos en memoria del frontend (en tu store Redux).
            onLoadCategories: (state, { payload }) => {
                state.isLoading = false;
                state.categories = payload.content; // Guarda las categorías en memoria (Redux) - las categorias son el payload que se recibe, Se agrega .content porque el backend regresa un objeto Page(paginacion)
                state.currentPage = payload.number; //Guarda la página actual
                state.totalPages = payload.totalPages; //Guarda el total de páginas
            },


            onError: (state, { payload }) => {
                state.errorMessage = payload;
                state.isLoading = false;
            },

            onClearError: (state) => {
                state.errorMessage = null;
            },
        },
    });

// Exporta las funciones para que pueda ser utilizada por otros component
export const { 
        onSetCategorySelected,
        onAddNewCategory,
        onUpdateCategory,
        onDeleteCategory,
        onLoadCategories,
        onError,
        onClearError,
    } = categorySlice.actions;
