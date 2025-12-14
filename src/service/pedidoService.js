
import ecommerseApi from "../../api/ecommerseApi";

export const pedidoService = {

  // Crear Pedido
  crearPedido: async (pedidoData) => {
    return await ecommerseApi.post('/pedidos', pedidoData);
  },

  // Listar todos los pedidos paginados
  listarPedidos: async (page = 0, size=10) => {
    return await ecommerseApi.get(`/pedidos?page=${page}&size=${size}`);
  },

  // Buscar pedido por nombre de usuario (paginado)
  buscarPorNombreUsuario: async (nombreUsuario = '', page = 0, size=10) => {
    return await ecommerseApi.get(
      `/pedidos/usuario?nombreUsuario=${nombreUsuario}&page=${page}&size=${size}`
    );
  },

  //Obtener pedidos realizados por usuario(paginados) - mediante el usuario autenticado 
  obtenerMisPedidos : async(page=0, size) => {
    return await ecommerseApi.get(
      `/pedidos/usuario/list?page=${page}&size=${size}`
    )
  },

  // Buscar pedido por número de seguimiento
  buscarPorNumeroSeguimiento: async (numeroSeg) => {
    return await ecommerseApi.get(`/pedidos/seguimiento/${numeroSeg}`);
  },

  // Buscar pedido por ID
  obtenerPedidoPorId: async (id) => {
    return await ecommerseApi.get(`/pedidos/${id}`);
  },

  // Eliminar pedido
  eliminarPedido: async (id) => {
    return await ecommerseApi.delete(`/pedidos/${id}`);
  },

  //Obtener reporte de pedidos en pdf
  exportarReportePedidos : async ({ fechaInicio, fechaFin, soloPagados }) => {
  return await ecommerseApi.get("/pedidos/reportes/pdf-letter", {
    params: {
      fechaInicio,
      fechaFin,
      soloPagados
    },
    responseType: "blob", //IMPORTANTE para PDF
  });
},


};
