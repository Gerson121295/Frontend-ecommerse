import { useDispatch, useSelector } from "react-redux"
import { onCloseProductModal, onOpenProductModal } from "../store/ui/productModalSlice";

export const useProductModal = () => {

    //accedemos al estado isProductModalOpen de productModal mediante useSelector
    const {isProductModalOpen} = useSelector(state => state.productModal);

    //Dispatch para acceder a los reducer de productModalSlice mediante el store
    const dispatch = useDispatch();

    //Funcion para abrir el modal
    const openProductModal = () => {
        dispatch(onOpenProductModal()); //despachar la accion para abrir el modal
    }

    //Funcion para cerrar el modal
    const closeProductModal = () => {
        dispatch(onCloseProductModal());
    }

    //Toggle: Si esta abierto el modal, al dar clic afuera se cierre y si no esta abierto al dar 2 clic en el evento o nota se abra
    const toggleProductModal = () => {
        (isProductModalOpen) ? closeProductModal : openProductModal();
    }

    //propiedades y metodos o funciones que retorna el Hook
    return {
        //Propiedades
        isProductModalOpen,

        //Metodos o Funciones
        openProductModal,
        closeProductModal,
        toggleProductModal
    }

}

