
import Swal from "sweetalert2";
import { ShowConfirmDialog } from "../../../../helpers/showConfirmDialog";
import { useProduct } from "../../../../hooks/useProduct"
import TableActions from "../TableActions";


export const DeleteProductButton = ({ product }) => {

    const { startDeleteProduct } = useProduct();

    const handleDelete = async(e) => {
         e.stopPropagation(); //Evita que el evento se propague a otros elementos padres

         if(!product?.id) return;

         ShowConfirmDialog({
            title: "¿Eliminar producto?",
            text: `Se eliminará "${product.nombre}"`,
            icon: "warning",
            confirmText: "Sí, eliminar",
            cancelText: "Cancelar",
            confirmColor: "#3085d6",
            cancelColor: "#d33",
            customClass: "small-toast",
            onConfirm: async () => {
                await startDeleteProduct(product.id);
            },
        });

        /* //Version reducida
            showConfirmDialog({
                title: "¿Eliminar producto?",
                text: `Se eliminará "$producto.nombre}"`,
                onConfirm: async () => {
                    await startDeletinproducto(product.id);
                },
            });
        */

    }

    return(
        <TableActions handleDelete={handleDelete} />
    )
}    
    
