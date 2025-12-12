import { useDispatch, useSelector } from "react-redux";
import ecommerseApi from "../../api/ecommerseApi";

import { 
    onSetLoading,
    onSetProductSelected,
    onAddNewProduct,
    onUpdateProduct,
    onDeleteProduct,
    onLoadProducts,
    onClearSelectedProduct,
  
    onError,
    onClearError,
    //clearErrorMessage
     
} from "../store/product/productSlice";
import { showNotification } from "../helpers/showNotification";
import { formatDate } from "../helpers/formatDate";

//hook to manage product-related logic
export const useProduct = () => {

    //Dispatch para acceder a los reducer de archivoSlice mediante el store
    const dispatch = useDispatch(); //hook to dispatch actions to the Redux store
    
    //hook to access product state from Redux store
    const { products, productSelected, isLoading, errorMessage, currentPage, totalPages, totalElements, sizePagination } = useSelector(state => state.product); 

    //establecer producto seleccionado
    const setProductSelected = (product) => {
      dispatch(onSetProductSelected(product));
    }

     //Cargar/Listar todos los productos
    const startLoadingProducts = async() => {
        dispatch(onSetLoading(true));

        try {
            const {data} = await ecommerseApi.get('/productos'); //fetch products from API
            dispatch(onLoadProducts(data)); //dispatch action to set products in Redux store
        } catch (error) {
            console.error(error);
            dispatch(onError('Error al cargar productos'));
        }
    };

    const startLoadingProductspaginated = async(page=0, size = sizePagination, sortBy = 'id') => { //sortBy ordena por id(orden numerico) o nombreProduct(nombre alfabeto)
        dispatch(onSetLoading(true));
        try {
            //const {data} = await ecommerceApi.get(`/productos/listarPaginados?page=${page}&size=${size}&sortBy=${sortBy}`); 
            const {data} = await ecommerseApi.get('/productos/listarPaginados', {
                params: { page, size, sortBy },
            });
          
            //Formatear las fechas de creación antes de guardar
        const formattedData = {
          ...data, //pasa toda la data de producto(una copia)
           //Modifica el content
          content: data.content.map(product => ({ //accede a la data y recorre cada uno
          ...product, //esparce toda los campos de productos
          fechaCreacion: formatDate(product.fechaCreacion), //modifica el campo fechaCreacion
          })),
        };

        dispatch(onLoadProducts(formattedData));
            //dispatch(onLoadProducts(data)); //dispatch action to set products in Redux store
            //console.log(data);
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.error || 'Error al cargar categoría';
            dispatch(onError(message));
            //return { success: false, message };
        }
    };

    //Crea o actualiza un producto
    const startSavingProduct = async( product ) => {

      dispatch(onSetLoading(true));

      if(!product || !product.nombre?.trim()) return false;

      try {

        //Si el product tiene id - Se actualiza el producto
        if(product.id){
          const { data } = await ecommerseApi.put(`/productos/${product.id}`, product);

          // Formatea la fecha antes de guardar
        const formattedProduct = {
          ...data, //pasa todos los datos del producto
          fechaCreacion: formatDate(data.fechaCreacion), //se establece a fechaCreacion la fecha formateada
        };

          //Extrae el mensaje del backend si existe, si no toma el que se define
          const successMessage = data?.message || 'Producto Actualizado exitosamente.';

          //dispatch(onUpdateProduct(data)); 
          //Notificacion alert reutilizable
          showNotification(
            'success',
            'Producto actualizado',
            successMessage ||'Los cambios se guardaron correctamente.',
            {
              onClose: () => dispatch(onUpdateProduct(formattedProduct)),
              customClass: 'toast-corporate',
            }
          );

          return { success: true, product: formattedProduct }; //return true;
        } // else{

        //Si el product no tiene id - Se crea del producto 
        const {data} = await ecommerseApi.post('/productos', product); //post new product to API

        // Formatea la fecha antes de guardar
        const formattedProduct = {
          ...data, //pasa todos los datos del producto
          fechaCreacion: formatDate(data.fechaCreacion), //se establece a fechaCreacion la fecha formateada
        };

        //Extrae el mensaje del backend si existe, si no toma el que se define
          const successMessage = data?.message || 'Producto Agregado exitosamente.';

          //dispatch(onAddNewProduct(data)); //dispatch action to add product to Redux store
          showNotification(
            'success',
            'Producto creado',
            successMessage || 'Se ha agregado correctamente.',
            {
              onClose: () => dispatch(onAddNewProduct(formattedProduct)),
              customClass: 'toast-corporate',
            }
          );              
          
          return {success: true, product: formattedProduct}; //return true;
        
      } catch (error) {
          // Determina si era actualización (id existe) o creación (id no existe)
          const isUpdate = Boolean(product?.id);

          const message =
              error.response?.data?.error ||
              (isUpdate
                  ? 'Error al actualizar el producto'
                  : 'Error al crear el producto');

          dispatch(onError(message));

          showNotification('error', 'Error', message, {
            customClass: 'toast-dark',
            timer: 3000
          });
          return { success: false, message }; //return false;
      }

    };

/*
    //Crear Productos
    const startCreateProduct = async(productData) => {
        dispatch(onSetLoading(true));
        try {
            const {data} = await ecommerseApi.post('/productos', productData); //post new product to API
            dispatch(onAddNewProduct(data)); //dispatch action to add product to Redux store
            return {success: true, product: data};
        } catch (error) {
            const message = error.response?.data?.error || 'Error creando producto';
            dispatch(onError(message));
            return {success: false, error: message};
        }
    };

   // Actualizar producto
  const startUpdateProduct = async (id, updatedData) => {
    dispatch(onSetLoading(true));
    try {
      const { data } = await ecommerseApi.put(`/productos/${id}`, updatedData);
      dispatch(onUpdateProduct(data));
      return { success: true, product: data };
    } catch (error) {
      const message = error.response?.data?.error || 'Error al actualizar';
      dispatch(onError(message));
      return { success: false, error: message };
    }
  };

  */

     // Buscar por nombre
  const startSearchByName = async (nombre, page = 0, size = sizePagination) => {
    dispatch(onSetLoading(true));
    try {
      //const {data} = await ecommerceApi.get(`/productos/buscar/nombre?nombre=${nombre}&page=${page}&size=${size}`); 
      const { data } = await ecommerseApi.get('/productos/buscar/nombre', {
        params: { nombre, page, size },
      });
      
      dispatch(onLoadProducts(data));
      //return true;
       return data.content; 

    } catch (error) {
        const message = error.response?.data?.error || 'Error al buscar producto por nombre';
        dispatch(onError(message));
        return [];
    }
  };

  // Buscar por categoría
  const startSearchByCategory = async (categoriaId, page = 0, size = sizePagination) => {
    dispatch(onSetLoading(true));
    try {

      //const {data} = await ecommerceApi.get(`/productos/buscar/categoria?page=${page}&size=${size}`); 
      const { data } = await ecommerseApi.get(
        `/productos/buscar/categoria/${categoriaId}`,
        { params: { page, size } }
      );
      dispatch(onLoadProducts(data));
      return true;  //{ success: true, message };
    } catch (error) {
        const message = error.response?.data?.error || 'Error al buscar productos por categoría';
        dispatch(onError(message));
        return false;
    }
  };

  // Listar productos activos
  const startLoadingActiveProducts = async (page = 0, size = sizePagination || 10) => {
    dispatch(onSetLoading(true));
    try {
      //const {data} = await ecommerceApi.get(`/productos/listarActivos?page=${page}&size=${size}`); 
      const { data } = await ecommerseApi.get('/productos/listarActivos', {
        params: { page, size},
      });

         //Formatear las fechas de creación antes de guardar
        const formattedData = {
          ...data, //pasa toda la data de producto(una copia)
           //Modifica el content
          content: data.content.map(product => ({ //accede a la data y recorre cada uno
          ...product, //esparce toda los campos de productos
          fechaCreacion: formatDate(product.fechaCreacion), //modifica el campo fechaCreacion
          })),
        };

        dispatch(onLoadProducts(formattedData));

      //return data; //true
    } catch (error) {
        const message = error.response?.data?.error || 'Error al listar productos activos';
        dispatch(onError(message));
        //return []; //false;
    }
  };

  // Eliminar producto
  const startDeleteProduct = async (id) => {
    dispatch(onSetLoading(true));

    try {
      const { data } = await ecommerseApi.delete(`/productos/${id}`);

       //F2 no recibe parametro id y obtiene producto seleccionado desde el store
       //await ecommerseApi.delete(`/productos/${productSelected.id}`); 
            
      //Extrae el mensaje del backend si existe, o usa uno por defecto
      const successMessage = data?.mensaje || 'Producto eliminado correctamente.';
            
      dispatch(onDeleteProduct(id));

      //dispatch(startLoadingProductspaginated(currentPage, sizePagination));

      showNotification(
      'success',
      'Producto Eliminado',
      successMessage || 'Se ha eliminado correctamente.',
      {
        timer: 2500,
        onClose: () => startLoadingProductspaginated(currentPage, sizePagination),
        customClass: 'toast-corporate',
      }
    );

      return { success: true, message: successMessage };
    } catch (error) {
      const message = error.response?.data?.error  || 'Error al eliminar el producto';
      dispatch(onError(message));

       showNotification('error', 'Error', message, {
        customClass: 'toast-dark',
        timer: 2500
      });

      return { success: false, error: message };
    }
  };

  //Limpiar producto Seleccionado
  const clearProductSelected = () => {
    dispatch(onClearSelectedProduct());
  }

  //limpiar los errores
  const clearProductError = () =>{
    dispatch(onClearError());
  }


  // Obtener producto por id
  const startGetProductById = async (id) => {
    dispatch(onSetLoading(true));
    try {
      const { data } = await ecommerseApi.get(`/productos/${id}`);
      //console.log(data);
      dispatch(onSetProductSelected(data));
    } catch (error) {
        const message = error.response?.data?.error || 'Error al obtener producto';
      dispatch(onError(message));
    }
  };

  //Obtener producto por nombre
  const startGetProductByName = async (nombre) => {
    dispatch(onSetLoading(true));
    try {
      const { data } = await ecommerseApi.get(
        `/productos/buscar/nombre?nombre=${nombre}`
        //`/productos/buscar/nombre`,{ params: { nombre, page: 0, size: 10 }}
      );
      //console.log(data);
      //dispatch(onSetProductSelected(data));
      dispatch(onLoadProducts(data)); //Guarda la data 
      return data.content;  //return data.content; // devolvemos solo la lista.  //return true; 
    } catch (error) {
      const message = error.response?.data?.error || 'Error al obtener producto por nombre';
      dispatch(onError(message));
      return [];    //return false; //return []; //devuelve array vacio
    }
  };

  return {
    // Estados
    products, 
    productSelected, 
    isLoading, 
    errorMessage, 
    currentPage, 
    totalPages, 
    totalElements, 
    sizePagination,

    //si productSelected tiene id retorna true, si no retorna false
    hasProductSelected: productSelected?.id, 

    // Métodos CRUD
    setProductSelected,

    startSavingProduct,
    startLoadingProducts,
    startLoadingProductspaginated,
    startSearchByName,
    startSearchByCategory,
    startLoadingActiveProducts,
    startGetProductById,
    startDeleteProduct,
    startGetProductByName,

    clearProductSelected,
    clearProductError
  };
};

