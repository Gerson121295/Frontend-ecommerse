
import { useDispatch, useSelector } from "react-redux"
import {  onSetLoading,
  onLoadOrders,
  onSetOrderSelected,
  onDeleteOrder,
  onClearOrderSelected,
  onError,
  onClearError 
} from '../store/pedido/pedidoSlice';
import { pedidoService } from "../service/pedidoService";
import { showNotification } from "../helpers/showNotification";
import { formatDate } from "../helpers/formatDate";

export const usePedido = () => {

    //Dispatch para acceder a los reducer de archivoSlice mediante el store
    const dispatch = useDispatch();

    //hook to access pedido state from Redux store
    const { pedidos, pedidoSelected, pageNumber,  sizePagination, totalPages, totalElements, isLoading } = useSelector(state => state.pedido);
   
    //Establecer order selected
    const setOrderSelected = (pedido) => {
        dispatch(onSetOrderSelected(pedido));
    }

    //Crear pedido
    const startSavingOrder = async (pedido) => {
        dispatch(onSetLoading());

        try {
            const {data} = await pedidoService.crearPedido(pedido);
            
            //Extrae el mensaje del backend si existe, si no toma el que se define
            //const successMessage = data?.message || 'Pedido realizado exitosamente.';
            //showNotification(`Pedido creado. Número de seguimiento: ${data.numeroSeguimientoPedido}`, "success");
            //Notificacion alert reutilizable
          /*   showNotification(
                'success',
                'Pedido creado exitosamente',
                //successMessage ||'Los cambios se guardaron correctamente.',
                `Número de seguimiento: ${data.numeroSeguimientoPedido}`,
                {
                    customClass: 'toast-corporate',
                    timer: 5000,
                },                 
            ); */
            showNotification(
                "success",
                `Pedido creado. Número de seguimiento: ${data.numeroSeguimientoPedido}`,
            )
       
            return { success: true, numeroSeguimientoPedido: data.numeroSeguimientoPedido};
        } catch (error) {
            const message = error.response?.data?.error || 'Hubo un error al realizar el pedido. Por favor intenta nuevamente.';
            dispatch(onError(message));
          
            showNotification('error', 'Error', message, {
                customClass: 'toast-dark',
                timer: 2500
            });

            return { success: false, error: message};
        }
    }

    //Listar pedidos paginados
    const startLoadingOrders = async (pageNumber = 0) => {
        dispatch(onSetLoading());

        try {
            const { data } = await pedidoService.listarPedidos(pageNumber,  sizePagination);
            
            //F1-Formatear las fechas de creación antes de guardar
/*             const pedidosformateados = data.content.map(pedido => ({
                ...pedido, //esparce toda los campos 
                fechaCreacion: formatDate(pedido.fechaCreacion) //se modifica la fecha con el formato
            }));

            dispatch(
                onLoadOrders({ 
                    //permite personalizar la forma del estado al pasar manual los datos en useProduct.js se pasa completo la ...data
                    pedidos: pedidosformateados,
                    pageNumber: data.number,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    sizePagination: data.size
                })
            ); */
            //F2:
            const formattedData = {
                ...data, //pasa toda la data, una copia exacta
                //Modifica la fecha del content
                content: data.content.map(product => ({
                    ...product, //esparce todos los campos del producto
                    fechaCreacion: formatDate(product.fechaCreacion), //modifica la fecha de creacion
                })),
            };

            dispatch(onLoadOrders(formattedData)); //carga la data con fecha formateada
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || 'Error al cargar los pedidos';
            dispatch(onError(message));
        }
    }

    //Buscar por nombre de usuario
    const startSearchingByUser = async (nombreUsuario, pageNumber) => {
        dispatch(onSetLoading());

        try {
            const { data } = await pedidoService.buscarPorNombreUsuario(nombreUsuario, pageNumber);
            
            //F2-Formatear las fechas de creación antes de guardar
            const formattedDataorder = {
                ...data, //pasa toda la data(copia)

                //Modifica el content
                content: data.content.map(pedido => ({
                    ...pedido, //espace toda la data de pedido
                    fechaCreacion: formatDate(pedido.fechaCreacion), //modifica el campo de fecha creacion del pedido con el formato
                })),
            };

            //Se pasa completo la ...data el reducer los asigna - Mas profesional
            dispatch(onLoadOrders(formattedDataorder));
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || 'Error al Buscar pedido por usuario';
            dispatch(onError(message));
            //return { success: false, message };
        }
    }

    // Buscar por número de seguimiento
    const startSearchingByTrackingNumber = async (numero) => {

        dispatch(onSetLoading());

        try {
              const { data } = await pedidoService.buscarPorNumeroSeguimiento(numero);

              //F3-Pasar toda la data y modificar la fecha de creacion al enviar
                dispatch(onSetOrderSelected(
                    {
                        ...data,
                        fechaCreacion: formatDate(data.fechaCreacion)
                    }
                ));

        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || 'Error al cargar categoría';
            dispatch(onError(message));
            //return { success: false, message };
        }
    }

    // Buscar por ID
    const startSearchOrderById = async(id) => {
        dispatch(onSetLoading());
        try {
            const { data } = await pedidoService.obtenerPedidoPorId(id);

            dispatch(onSetOrderSelected(
                {
                    ...data, //pasa toda la data
                    fechaCreacion: formatDate(data.fechaCreacion) //modifica la fechaCreacion
                }
            ));
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || 'Error al cargar categoría';
            dispatch(onError(message));
            //return { success: false, message };
        }
    }
    
    // Eliminar pedido
    const startDeletingOrder = async(id) => {
        dispatch(onSetLoading());

        try {
            const { data } = await pedidoService.eliminarPedido(id);

            //Extrae el mensaje del backend si existe, o usa uno por defecto
            const successMessage = data?.mensaje || 'Pedido eliminado correctamente.';
            dispatch(onDeleteOrder(id));

            showNotification(
                'success',
                'Producto Eliminado',
                successMessage || 'Se ha eliminado correctamente.',
                {
                    timer: 2500,
                    onClose: () => startLoadingOrders(pageNumber),
                    customClass: 'toast-corporate',
                }                
            )
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || 'Error al eliminar el pedido';
            dispatch(onError(message));
            //return { success: false, message };
        }
    }

   //Limpiar producto Seleccionado
     const clearOrderSelected = () => {
       dispatch(onClearOrderSelected());
     }
   
     //limpiar los errores
     const clearOrderError = () =>{
       dispatch(onClearError());
     }

    //Propiedades y metodos del hook a exportar
    return {
        // state
        pedidos,
        pedidoSelected,
        pageNumber,
        totalPages,
        totalElements,
        sizePagination,
        isLoading,

        //metodos
        setOrderSelected,
        startSavingOrder,
        startLoadingOrders,
        startSearchingByUser,
        startSearchingByTrackingNumber,
        startSearchOrderById,
        startDeletingOrder,

        clearOrderSelected,
        clearOrderError
    }
}