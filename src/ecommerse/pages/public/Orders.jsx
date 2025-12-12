import { useEffect } from "react";
import { usePedido } from "../../../hooks/usePedido"
import DataTable from "../../components/common/DataTable";
import { DeleteOrderButton } from "../../components/common/order/DeleteOrderButton";
import { Footer } from "../../components/layout"
import { NavbarApp } from "../../components/layout/Navbar/NavbarPublic"
import TableToolbar from "../../components/common/TableToolbar";
import { AdminSearchBar } from "../../components/common/search/AdminSearchBar";


export const Orders = () => {

    const {
    //Estados del hook obtenidos de slice de orders
      pedidos,
      pedidoSelected,
      pageNumber,
      totalPages,
      totalElements,
      sizePagination,
      isLoading,

    //funciones
        startgetUserOrders, setOrderSelected,
        startSearchingByTrackingNumber, startSearchingByUser
    } = usePedido();

    //Cargar los pedidos 
    useEffect(() => {
        startgetUserOrders(pageNumber, sizePagination);
    }, [])

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
    startgetUserOrders(newPage, sizePagination);
  }

  const columns = ["No. Seguimiento", "Fecha", "usuario", "Total / Cantidad",  "estado",  "Pago", "Productos"];


 //   FUNCIÓN REAL DE SUGERENCIAS
  const fetchSuggestions = async (query) => {
 
    // CUANDO EL INPUT ESTA VACIO → LISTAR TODO
    if (!query || query.trim().length === 0 || query === "") {
      startgetUserOrders(0, sizePagination);
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
      } 
    } catch (e) {
      console.log("Error buscando sugerencias", e);
      return [];
    }
  };

    return(
    <>
    <NavbarApp />
     <div className="container-fluid px-4 py-4">

        <TableToolbar
                placeholder="Buscar pedido..."
                customSearch={(
                <AdminSearchBar
                    placeholder="Buscar pedido por numero de seguimiento"
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
    <Footer/>
    </>

    )
        
}