import { ShowConfirmDialog } from "../../../../helpers/showConfirmDialog";
import { useUser } from "../../../../hooks/useUser"
import TableActions from "../TableActions";

export const DeleteUserButton = ({user}) => {
    
    const {startDeletingUser, clearUserSelected}= useUser();

  //Eliminar Pedido
  const handleDelete = async(e) => { //e
    e.stopPropagation(); //Evita que el evento se propague a otros elementos padres

    if(!user?.id) return; //si no hay id de pedido no hace nada

    ShowConfirmDialog({
      title: "¿Eliminar al usuario?",
      text: `Se eliminará al usuario: "${user.nombre}"`,
      icon: "warning",
      confirmText: "Sí, eliminar",
      cancelText: "Cancelar",
      confirmColor: "#3085d6",
      cancelColor: "#d33",
      customClass: "small-toast",
      onConfirm: async () => {
          await startDeletingUser(user.id);
      },
    })

    clearUserSelected();

  }

    return(
        <>
          <TableActions handleDelete={handleDelete} />
        </>
    )

}