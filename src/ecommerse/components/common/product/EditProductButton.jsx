import { useProduct } from "../../../../hooks/useProduct";
import { useProductModal } from "../../../../hooks/useProductModal"
import TableActions from "../TableActions";

export const EditProductButton = ({ product }) => {

    const { setProductSelected } = useProduct();
    const { openProductModal } = useProductModal();

    const handleEdit = (e) => {
        e.stopPropagation(); //Evita que el evento se propague a otros elementos padres
        setProductSelected(product);
        openProductModal();
    };

    return(
        <TableActions handleEdit={handleEdit} />
    )
}