import { ShowConfirmDialog } from "../../../../helpers/showConfirmDialog";
import { usePedido } from "../../../../hooks/usePedido";
import TableActions from "../TableActions";


export const DeleteOrderButton = ({pedido}) => {

    const { startDeletingOrder, clearOrderSelected} = usePedido();
 
  //Eliminar Pedido
  const handleDelete = async(e) => { //e
    e.stopPropagation(); //Evita que el evento se propague a otros elementos padres

    if(!pedido?.id) return; //si no hay id de pedido no hace nada

    ShowConfirmDialog({
      title: "¿Eliminar producto?",
      text: `Se eliminará "${pedido.numeroSeguimiento}" del usuario: "${pedido.usuario}"`,
      icon: "warning",
      confirmText: "Sí, eliminar",
      cancelText: "Cancelar",
      confirmColor: "#3085d6",
      cancelColor: "#d33",
      customClass: "small-toast",
      onConfirm: async () => {
          await startDeletingOrder(pedido.id);
      },
    })

    clearOrderSelected();

  }


    return(
        <>
          <TableActions handleDelete={handleDelete} />
        </>
    )
} 

