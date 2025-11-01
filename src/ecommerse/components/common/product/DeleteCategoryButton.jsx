import { FaTrash } from "react-icons/fa";
import { useCategory } from "../../../../hooks/useCategory";

export const DeleteCategoryButton = () => {

    //Se desetructura el hook useCategory para obtener la func. startDeletingCategory
    const {  startDeletingCategory, hasCategorySelected } = useCategory();

    //Maneja el abrir el modal al precionar el boton para agregar nueva category
    const handleDelete =  () => {
        //if (!category?.id) return;
        startDeletingCategory();//version anterior(no recibia) eliminaba por hasCategorySelected
    }


    return(
         <>
        <button 
            aria-label="btn-delete" //es key para tests
            className="btn btn-sm btn-outline-danger me-1 contorno-campo-estatico"
            onClick={ handleDelete }
                style={{
                //tiene evento seleccionado y no esta abierto el modal, "" VACIO, no regresar nada, muestra el boton. : "none" si no tiene evento seleccionado oculta el boton.
                //display: hasCategorySelected && !isDateModalOpen ? "" : "none" //forma de validar 1: isDateModalOpen viene del useUiStore, para que aparezca boton del modal debe estar cerrado
                display: hasCategorySelected ? '' : "none" //forma de validar 2 mejor: hasEventSelected valida que el event seleccionado tenga id(si tiene id existe y aparece el boton eliminar)
            }}
        >
            <FaTrash />              
        </button>
        </>
    );
}