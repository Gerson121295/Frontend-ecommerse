

import TableToolbar from "../../components/common/TableToolbar";
import DataTable from "../../components/common/DataTable";
import { usePedido } from "../../../hooks/usePedido";
import { useEffect, useState } from "react";
import { DeleteOrderButton } from "../../components/common/order/DeleteOrderButton";
import { AdminSearchBar } from "../../components/common/search/AdminSearchBar";
import { GenerateReporteModal } from "../../components/common/order/GenerateReportModal";

export const ManageOrders = () => {

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
        startLoadingOrders, setOrderSelected, //clearOrderSelected, 
        startSearchingByTrackingNumber, startSearchingByUser
  } = usePedido();

  const [isReporteModalOpen, setReporteModalOpen] = useState(false);

  //Cargar los pedidos
  useEffect(() => {
    startLoadingOrders(0,sizePagination);
  }, []); 

  // Al hacer clic -> selecciona el pedido
  const onSelect = ( pedido ) => {
    setOrderSelected(pedido);
  }

  // Al hacer doble clic -> abrir modal con producto seleccionado
  const onDoubleClick = (pedido) => {
    
    setOrderSelected(pedido); //opcional, para establecer el product seleccionado al hacer doble clic
    //openPedidoModal();
  }


  //cambiar de pagina en la tabla
  const onPageChange = (newPage) => {
    startLoadingOrders(newPage, sizePagination);
  }


  const columns = ["No. Seguimiento", "Fecha", "usuario", "Total / Cantidad",  "estado",  "Pago", "Productos", "Action"];


 //   FUNCIÓN REAL DE SUGERENCIAS
  const fetchSuggestions = async (query) => {
 
    // CUANDO EL INPUT ESTA VACIO → LISTAR TODO
    if (!query || query.trim().length === 0 || query === "") {
      startLoadingOrders(0, sizePagination);
      return [];
    } 


    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        query
      );

    try {
      if (isUUID) {
        // Buscar por seguimiento
        const result = await startSearchingByTrackingNumber(query);

        if (!result) return [];

        return [
          {
            id: result.id,
            label: `#${result.numeroSeguimiento}`,
            subtitle: `${result.usuario} - ${result.fechaCreacion}`,
            //imageUrl: null,
          },
        ];
      } //else {
        // Buscar por usuario
        const results = await startSearchingByUser(query, pageNumber, sizePagination);

        return results.map((pedido) => ({
          id: pedido.id,
          label: pedido.usuario,
          subtitle: `#${pedido.numeroSeguimiento} - ${pedido.fechaCreacion}`,
          //imageUrl: null,
        }));
      //} cierre del else
    } catch (e) {
      console.log("Error buscando sugerencias", e);
      return [];
    }
  };

  return (
    <div className="container-fluid px-4 py-4">

      <GenerateReporteModal
        isOpen={isReporteModalOpen}
        onClose={() => setReporteModalOpen(false)}
      />

      <TableToolbar 
        showExport={true}
        onExportClick={() => setReporteModalOpen(true)}
        placeholder="Buscar pedido..."
        customSearch={(
          <AdminSearchBar
            placeholder="Buscar por nombre o numero de seguimiento"
            fetchSuggestions={fetchSuggestions}
            onSelectSuggestion={(item) => {
              const clean = item.label.replace("#", "");
              startSearchingByTrackingNumber(clean);
            }}
          />
        )}
      />

       {isLoading ? (
        <div className="text-center py-5">Loading products...</div>
      ) : (
      <DataTable 
        columns={columns} 
        data={pedidos } 
        //type="order" 

        renderRow={(item) => (
          <>
            <td>{item.numeroSeguimiento}</td>
            <td>{item.fechaCreacion}</td>
            <td>
              <div className="d-flex align-items-center">
                <div>
                  <div className="fw-bold">{item.usuario}</div>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex align-items-center">
                <div>
                  <div className="fw-bold">{item.precioTotal}</div>
                  <small className="text-muted">{item.cantidadTotal}</small>
                </div>
              </div>
            </td>

            <td>
              <span className={`badge ${
                item.estado === true
                  ? "bg-success"
                  : item.estado === false
                  ? "bg-warning"
                  : "bg-danger"
                    }`}>
                {item.estado === true ? "Aprobado" : item.estado === false ? "Pendiente" : String(item.estado)}
              </span>
            </td>

            <td>
              <span className={`badge ${
                item.estadoPago === "APROBADO"
                  ? "bg-success"  //? "bg-primary"
                  : item.estadoPago === "PENDIENTE"
                  ? "bg-warning"
                  : item.estadoPago === "RECHAZADO"
                  ? "bg-info"
                  : "bg-danger"
              }`}>
                {item.estadoPago}
              </span>
            </td>

            <td>
              <span className="me-2">
                {/* {item.productos} */}
                  {item.productos?.map(p => p.nombre).join(", ")}
              </span>
            </td>

            <td>
              <DeleteOrderButton pedido={item} />
            </td>
        </>
        )}

        onSelect={onSelect}
        onDoubleClick={onDoubleClick}

        currentPage={pageNumber}
        totalPages={totalPages}
        totalElements={totalElements}
        onPageChange={onPageChange}

        itemSelected={pedidoSelected}

      />
      )}

    </div>
  );
};





