

import { useEffect } from "react";
import { useUser } from "../../../hooks/useUser";
import DataTable from "../../components/common/DataTable";
import { UserRow } from "../../components/common/user/UserRow";

export const ManageUsers = () => {
  
  const {
      // state
        users, 
        userSelected,

        isLoading, 
        errorMessage,

        currentPage, 
        totalPages,
        totalElements, 
        sizePagination,

        // metodos
        setUserSelected,
        startLoadingUsers,
        startDeletingUser,
        clearUserSelected,
        clearUserError
  } = useUser();

  useEffect(() => {
    startLoadingUsers(currentPage, sizePagination);
  }, []); //se ejecuta una vez al iniciar

  //Al hacer clic selecciona al usuario
  const onSelect = ( user ) => {
    setUserSelected(user);
  }

  //Al hacer doble clic 
  const onDoubleClick = (user) => {
    setUserSelected(user);
  }

  //cambiar de pagina en la tabla
  const onPageChange = (newPage) => {
     startLoadingUsers(newPage, sizePagination);
  }
 
  const columns = ["Nombre","Apellido", "Username", "Contacto",  "roles", "Action"];

  return (
    <div className="container-fluid px-4 py-4">
       {isLoading ? (
              <div className="text-center py-5">Loading products...</div>
            ) : (
            <DataTable 
              columns={columns} 
              data={users } 
              //type="order" 
      
              renderRow={(item) => <UserRow user={item} /> }
                 
              onSelect={onSelect}
              onDoubleClick={onDoubleClick}
      
              currentPage={currentPage}
              totalPages={totalPages}
              totalElements={totalElements}
              onPageChange={onPageChange}
      
              itemSelected={userSelected}
      
            />
            )}
      
    </div>
  );
};





