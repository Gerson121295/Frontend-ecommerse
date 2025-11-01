import { useCategory } from "../../../../hooks/useCategory";
import { useCategoryModal } from "../../../../hooks/useCategoryModal";


export const AddCategoryButton = ({ buttonLabel = "Agregar Nueva"}) => { //recibe por props el label del boton o si no viene se asigna "Agregar" por defecto

    //Se desetructura el hook useCategoryModal para obtener la func. opeCategoryModal
    const { openCategoryModal } = useCategoryModal();

    const { setCategorySelected } = useCategory();

    //Maneja el abrir el modal al precionar el boton para agregar nueva nueva categoria
    const handleClicNewCategory = () => {

        //Limpia el formulario antes de abrir el modal (resetenado sus valores)
        //setCategorySelected(null); //Se limpia la categoria seleccionada
        setCategorySelected({
            nombreCategoria: '',
        });

        //Se abre el modal para agregar nueva categoria
        openCategoryModal(); 
    }


  return (
    <button 
        className="btn btn-morado" 
        onClick={ handleClicNewCategory} 
    >+ 
        {buttonLabel}
    </button>
  )
}
