import { useCategory } from "../../../../hooks/useCategory";
import { useCategoryModal } from "../../../../hooks/useCategoryModal";
import TableActions from "../TableActions";


export const EditCategoryButton = ({category}) => {

 const { setCategorySelected } = useCategory();
    
    //se extrae propiedades y funciones desestructurando el hook useCategoryModal
    const { openCategoryModal } = useCategoryModal();

    const handleEdit = (e) => {
        e.stopPropagation(); //Evita que el evento se propague a otros elementos padres
      setCategorySelected(category);
        openCategoryModal();
    };
  
    return(
        <TableActions handleEdit={handleEdit} />
    )

}