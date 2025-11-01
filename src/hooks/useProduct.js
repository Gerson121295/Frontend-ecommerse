import { useDispatch, useSelector } from "react-redux";

import { 
        onSetLoading,
        onSetProducts,
        onSetProductSelected,
        onAddProduct,
        onUpdateProduct,
        onDeleteProduct,
        onError,
        /* onClearSelectedProduct,
        clearErrorMessage, */
} from "../store/product/productSlice";
import ecommerseApi from "../../api/ecommerseApi";


//hook to manage product-related logic
export const useProduct = () => {

    const dispatch = useDispatch(); //hook to dispatch actions to the Redux store
    const { products, productSelected, loading, errorMessage, totalPages, totalElements } = useSelector(state => state.product); //hook to access product state from Redux store


    //Crear Productos
    const startCreateProduct = async(productData) => {
        dispatch(onSetLoading(true));
        try {
            const {data} = await ecommerseApi.post('/productos', productData); //post new product to API
            dispatch(onAddProduct(data)); //dispatch action to add product to Redux store
            return {success: true, product: data};
        } catch (error) {
            const message = error.response?.data?.message || 'Error creando producto';
            dispatch(onError(message));
            return {success: false, error: message};
        }
    };

    //Cargar/Listar todos los productos
    const startLoadingProducts = async() => {
        dispatch(onSetLoading(true));

        try {
            const {data} = await ecommerseApi.get('/productos'); //fetch products from API
            dispatch(onSetProducts(data)); //dispatch action to set products in Redux store
        } catch (error) {
            console.error(error);
            dispatch(onError('Error al cargar productos'));
        }
    };

    const startLoadingProductspaginated = async(page=0, size=10, sortBy = 'id') => {
        dispatch(onSetLoading(true));
        try {
            //const {data} = await ecommerceApi.get(`/productos/listarPaginados?page=${page}&size=${size}&sortBy=${sortBy}`); 
            const {data} = await ecommerseApi.get('/productos/listarPaginados', {
                params: { page, size, sortBy },
            });
            dispatch(onSetProducts(data)); //dispatch action to set products in Redux store
        } catch (error) {
            console.error(error);
            dispatch(onError('Error al cargar productos paginados'));
        }
    };

     // Buscar por nombre
  const startSearchByName = async (nombre, page = 0, size = 10) => {
    dispatch(onSetLoading(true));
    try {
      const { data } = await ecommerseApi.get('/productos/buscar/nombre', {
        params: { nombre, page, size },
      });
      dispatch(onSetProducts(data));
    } catch (error) {
        const message = error.response?.data?.message || 'Error al buscar producto por nombre';
        dispatch(onError(message));
    }
  };

  // Buscar por categoría
  const startSearchByCategory = async (categoriaId, page = 0, size = 10) => {
    dispatch(onSetLoading(true));
    try {
      const { data } = await ecommerseApi.get(
        `/productos/buscar/categoria/${categoriaId}`,
        { params: { page, size } }
      );
      dispatch(onSetProducts(data));
    } catch (error) {
        const message = error.response?.data?.message || 'Error al buscar productos por categoría';
        dispatch(onError(message));
    }
  };

  // Listar productos activos
  const startLoadingActiveProducts = async (page = 0, size = 10) => {
    dispatch(onSetLoading(true));
    try {
      const { data } = await ecommerseApi.get('/productos/listarActivos', {
        params: { page, size },
      });
      dispatch(onSetProducts(data));
    } catch (error) {
        const message = error.response?.data?.message || 'Error al listar productos activos';
        dispatch(onError(message));
    }
  };

  // Obtener producto por id
  const startGetProductById = async (id) => {
    dispatch(onSetLoading(true));
    try {
      const { data } = await ecommerseApi.get(`/productos/${id}`);
      dispatch(onSetProductSelected(data));
    } catch (error) {
        const message = error.response?.data?.message || 'Error al obtener producto';
      dispatch(onError(message));
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
      const message = error.response?.data?.message || 'Error al actualizar';
      dispatch(onError(message));
      return { success: false, error: message };
    }
  };

  // Eliminar producto
  const startDeleteProduct = async (id) => {
    dispatch(onSetLoading(true));
    try {
      await ecommerseApi.delete(`/productos/${id}`);
      dispatch(onDeleteProduct(id));
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Error al eliminar';
      dispatch(onError(message));
      return { success: false, error: message };
    }
  };

  return {
    // Estados
    products,
    productSelected,
    loading,
    errorMessage,
    totalPages,
    totalElements,

    // Métodos CRUD
    startCreateProduct,
    startLoadingProducts,
    startLoadingProductspaginated,
    startSearchByName,
    startSearchByCategory,
    startLoadingActiveProducts,
    startGetProductById,
    startUpdateProduct,
    startDeleteProduct,
  };
};
