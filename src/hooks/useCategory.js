import { useDispatch, useSelector } from "react-redux";
import ecommerseApi from "../../api/ecommerseApi";
import './../styles.css';

import { 
        onSetCategorySelected,
        onAddNewCategory,
        onUpdateCategory,
        onDeleteCategory,
        onLoadCategories,
        onError,
        onClearError,
} from "../store/category/categorySlice";
import Swal from "sweetalert2";

export const useCategory = () => {

    //useSelector permite acceder al estado de categorías desde el store de Redux y obtener los estados de category ->reducers de categorySlice
    const{
        isLoading, categories, currentPage, totalPages,
        errorMessage, categorySelected,
    } = useSelector(state => state.category);

    //const { user } = useSelector(state => state.auth); //Obtener el usuario autenticado desde el store auth

    //Dispatch para acceder a los reducer de categoryModalSlice mediante el store
    const dispatch = useDispatch(); 

    //Establecer la categoría seleccionada
    const setCategorySelected = (category) => { //recibe la categoría seleccionada
        dispatch( onSetCategorySelected(category) ); //dispara la acción para establecer la categoría seleccionada en el store
    };
   

    //Cargar las categorías que estan en la DB mediante el Backend - (Cuando inicia con start. Es porque inicia el proceso de grabacion guardar)
    const startLoadingCategories = async (page = 0, size = 5, sortBy = "nombreCategoria") => {
        
        try {
            //peticion get para mostrar los eventos guardados en la BD
            //const {data} = await ecommerseApi.get('/categorias'); //sin paginacion
            const {data} = await ecommerseApi.get(`/categorias/paginadas?page=${page}&size=${size}&sortBy=${sortBy}`); 
            dispatch( onLoadCategories(data)); // Guarda las categorías en memoria (Redux)
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || 'Error al cargar categoría';
            dispatch(onError(message));
            //return { success: false, message };
        }
    };

    //Crea o actualiza categoria
    const startSavingCategory = async(categoria) => { //recibe la 
        
        try {
            //Si la categoria tiene id entonces se va a actualizar, si no se va crear una nueva categoria
            if(categoria.id){
            
            //actualiza la categoria, metodo put se envia la ruta/id y data a actualizar
            const {data} = await ecommerseApi.put(`/categorias/${categoria.id}`, categoria);
            
            //dispatch( onUpdateCategory(data) ); //se actualiza despues de la notificación

            Swal.fire({
                    icon: 'success',
                    title: 'Categoría actualizada',
                    text: 'Los cambios se guardaron correctamente.',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    background: '#f0f0f0',
                    color: '#333',
                    customClass: {
                        popup: 'toast-corporate'
                    }
                }).then(() => {
                    dispatch(onUpdateCategory(data)); //actualiza la categoria despues de cerrar la notificación
                });

            return; //para que ya no siga ejecutando  y evitar definir el siguiente else
            }//else{

            //creando categoria - no tiene id la data que es enviada por lo tanto se creará categoria y el backend creará el id y lo retornará
            const {data} = await ecommerseApi.post(`/categorias`, categoria);  //peticion POST recibe la ruta y la data de la categoria a guardar. de resp desestructuramos para obtener la data
            
            //actualizando categoria, se envia datos del evento y el usuario activo
  /*           dispatch( 
                onAddNewCategory(data) //envia data de categoria 
                //onAddNewCategory({...categoria}) 
            );  
 */
             Swal.fire({
                icon: 'success',
                title: 'Categoría creada',
                text: 'Se ha agregado correctamente.',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                background: '#f0f0f0',
                color: '#333',
                customClass: {
                    popup: 'toast-corporate'
                }
            })
            .then(() => {
                dispatch(onAddNewCategory(data)); //agrega la nueva categoria despues de cerrar la notificación
            });

            //return { success: true, category: data };
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || 'Error al crear categoría';
            dispatch(onError(message));

             Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                background: '#f8d7da',
                color: '#721c24',
                customClass: {
                    popup: 'toast-dark'
                }
            });
            //return { success: false, message };
        }
    
    };

    //Actualizar categoría
/*     const startUpdatingCategory = async(id, updatedCategory) => {
        try {
            const {data} = await ecommerseApi.put(`/categorias/${id}`, updatedCategory);
            dispatch( onUpdateCategory(data) );
            //return { success: true, category: data };
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || 'Error al actualizar categoría';
            dispatch(onError(message));
            //return { success: false, message };
        }
    }; */

    //Eliminar categoría
    const startDeletingCategory = async() => { //F1 recibe (id)
        
        try {
            //await ecommerseApi.delete(`/categorias/${id}`);
            //dispatch( onDeleteCategory(id) );

            await ecommerseApi.delete(`/categorias/${categorySelected.id}`);
            dispatch( onDeleteCategory(categorySelected.id) );
            //await startLoadingCategories(currentPage, 5); // vuelve a cargar data actualizada

            Swal.fire({
                icon: 'success',
                title: 'Categoría eliminada',
                text: 'Se eliminó correctamente.',
                timer: 2000,
                showConfirmButton: false,

                toast: true,
                position: 'top-end',
                timerProgressBar: true,
                background: '#f0f0f0',
                color: '#333',
                customClass: {
                    popup: 'toast-corporate'
                }
            }).then(() => {
                // Recargar las categorías después de que se cierre la notificación
                startLoadingCategories(currentPage, 5);
            });

            //return { success: true };
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || 'Error al eliminar categoría';
            dispatch(onError(message));
            //return { success: false, message };

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message, //muestra mensaje del backend,

                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#f8d7da',
                color: '#721c24',
                customClass: {
                    popup: 'toast-dark'
                }
            });
        }
    };


        //limpiar los errores
        const clearCategoryError = () => {
            dispatch( onClearError() );
        };
    
        //Retornar funciones y estados del hook
        return {
             // Estados o Propiedades
            categories, 
            categorySelected,

            currentPage, 
            totalPages, 
            isLoading, 
            errorMessage,

           hasCategorySelected: categorySelected?.id, //si categorySelected tiene id retorna true, si no retorna false


            // Métodos
          setCategorySelected,
          startLoadingCategories,
          startSavingCategory,
          startDeletingCategory,
          clearCategoryError
        }
    };
