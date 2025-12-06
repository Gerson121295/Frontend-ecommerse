

import TableToolbar from "../../components/common/TableToolbar";
import DataTable from "../../components/common/DataTable";
import { useDispatch } from "react-redux";
import { usePedido } from "../../../hooks/usePedido";
import { useEffect } from "react";

export const ManageOrders = () => {

  const dispatch = useDispatch();
  const {
    //Estados del hook obtenidos de slice de orders
      pedidos,
      pedidoSelected,
      pageNumber,
      totalPages,
      totalElements,
      sizePagination,
      isLoading,
    //Funciones del hook 
        startLoadingOrders, setOrderSelected, clearOrderSelected 
  } = usePedido();

  //Cargar los pedidos
  useEffect(() => {
    startLoadingOrders(0,sizePagination);
  }, []); 

  // Al hacer clic -> selecciona el pedido
  const onSelect = ( pedido ) => {
    setOrderSelected(pedido);
  }

  //cambiar de pagina en la tabla
  const onPageChange = (newPage) => {
    startLoadingOrders(newPage, sizePagination);
  }

  const columns = ["No. Seguimiento", "usuario", "estado", "Total", "cantidad", "Fecha", "Pago", "Productos", "Action"];

  return (
    <div className="container-fluid px-4 py-4">
      <TableToolbar 
        placeholder="Buscar Producto"
      />

       {isLoading ? (
        <div className="text-center py-5">Loading products...</div>
      ) :(
      <DataTable 
        columns={columns} 
        data={pedidos} 
        type="order" 

        onSelect={onSelect}

        currentPage={pageNumber}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={onPageChange}

      />
      )}

    </div>
  );
};





