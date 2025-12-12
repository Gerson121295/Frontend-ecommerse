
import { useDispatch, useSelector } from "react-redux";
import { onClearError, onClearUserSelected, onDeleteUser, onError, onLoadUsers, onSetLoading, onSetUserSelected } from "../store/user/userSlice";
import { userService } from "../service/userService";
import { showNotification } from "../helpers/showNotification";

export const useUser = () => {

    //Dispatch para acceder a los reducer de archivoSlice mediante el store
    const dispatch = useDispatch();

    //hook to access pedido state from Redux store
    const {
        users, userSelected,
        isLoading, errorMessage,
        currentPage, totalPages,
        totalElements, sizePagination
    } = useSelector(state => state.user);

    // Sets selected user
    const setUserSelected = (user) => {
        dispatch(onSetUserSelected(user));
    }

    //Lists users
    const startLoadingUsers = async(page=currentPage, size = sizePagination ) => { //sortBy = 'id'
        dispatch(onSetLoading());

        try {
            const { data } = await userService.listarUsuarios(page, size);

            dispatch(onLoadUsers(data));
            return data;

        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || 'Error al cargar los pedidos';
            dispatch(onError(message));
            return [];
        }
    }

    const startDeletingUser = async(id) => {

        try {
            const {data} = await userService.eliminarUsuario(id);
            
            //Extrae el mensaje del backend si existe, o usa uno por defecto
            const successMessage = data?.mensaje || 'Usuario eliminado correctamente.';
            
            dispatch(onDeleteUser(id));
            
            showNotification(
                'success',
                'Usuario Eliminado',
                successMessage || 'Se ha eliminado correctamente.',
                {
                    timer: 2500,
                    onClose: () => startLoadingUsers(currentPage, sizePagination),
                    customClass: 'toast-corporate',
                }                
            );

            return { success: true, message: successMessage };
        } catch (error) {
            const message = error.response?.data?.error  || 'Error al eliminar al usuario';
            dispatch(onError(message));
        
            showNotification('error', 'Error', message, {
                customClass: 'toast-dark',
                timer: 2500
            });
        
            return { success: false, error: message };
    }
}

    const clearUserSelected = () => {
        dispatch(onClearUserSelected());
    }

    const clearUserError = () => {
        dispatch(onClearError());
    }

    return {
        // state
        users, 
        userSelected,

        isLoading, 
        errorMessage,

        currentPage, 
        totalPages,
        totalElements, 
        sizePagination,

        // metodos
        setUserSelected,
        startLoadingUsers,
        startDeletingUser,
        clearUserSelected,
        clearUserError
    }
}

