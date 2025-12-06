import { useCategory } from "../../../../hooks/useCategory";
import Swal from "sweetalert2";
import TableActions from "../TableActions";

export const DeleteCategoryButton = ({ category }) => {

    //Se desetructura el hook useCategory para obtener la func. startDeletingCategory
    const {  startDeletingCategory } = useCategory(); //, hasCategorySelected

    //Maneja el abrir el modal al precionar el boton para agregar nueva category
    const handleDelete = async (e) => {
        //stopPropagation() evita que al hacer clic en el botón se dispare también el onSelect() del <tr>
        e.stopPropagation(); //Evita que el evento se propague a otros elementos padres

        if (!category?.id) return;

         const result = await Swal.fire({
            title: "¿Eliminar categoría?",
            text: `Se eliminará "${category.nombreCategoria}"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            customClass: {
                popup: "small-toast",
        },
        });
        if (result.isConfirmed){
            await startDeletingCategory(category.id);//version anterior(no recibia) eliminaba por hasCategorySelected
        }
    };

    return(
        <TableActions handleDelete={handleDelete} />
    );
}
