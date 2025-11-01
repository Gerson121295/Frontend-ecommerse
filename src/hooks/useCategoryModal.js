import { useDispatch, useSelector } from "react-redux";
import { onCloseCategoryModal, onOpenCategoryModal } from "../store/ui/categoryModalSlice";


export const useCategoryModal = () => {

    const {isCategoryModalOpen} = useSelector(state => state.categoryModal);

        //Dispatch para acceder a los reducer de categoryModalSlice mediante el store
    const dispatch = useDispatch();

    //Funcion para abrir el modal
    const openCategoryModal = () => {
        dispatch(onOpenCategoryModal()); //despachar la accion para abrir el modal
    }

    //Funcion para cerrar el modal
    const closeCategoryModal = () => {
        dispatch(onCloseCategoryModal()); //despachar la accion para cerrar el modal
    }

    //Toggle: Si esta abierto el modal, al dar clic afuera se cierre y si no esta abierto al dar 2 clic en el evento o nota se abra
    const toggleCategoryModal = () => {
        (isCategoryModalOpen) ? closeCategoryModal() : openCategoryModal();
    }

    //propiedades y metodos o funciones que retorna el Hook
    return {
        //Propiedades
        isCategoryModalOpen,

        //Metodos o funciones
        openCategoryModal,
        closeCategoryModal,
        toggleCategoryModal,
    }

}