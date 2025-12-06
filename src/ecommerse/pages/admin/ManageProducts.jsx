import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/common/DataTable";
import TableToolbar from "../../components/common/TableToolbar";
import { useProduct } from "../../../hooks/useProduct";
import { useEffect } from "react";
import { useProductModal } from "../../../hooks/useProductModal";
import { AddProductModal } from "../../components/common/product/AddProductModal";


export const ManageProducts = () => {

  const dispatch = useDispatch();
  const {startLoadingProductspaginated, setProductSelected, clearProductSelected } = useProduct(dispatch);

  //Se extrae propiedades y funciones desestructurando el hook useProductModal()
  const { openProductModal } = useProductModal();

  /*
   isLoading: false,
    products:[],
    productSelected: null,
    errorMessage: undefined,
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    sizePagination: 10,
  */

  const { isLoading, productSelected, products, 
          currentPage, totalPages, totalElements, sizePagination, 
        } = useSelector((state) => state.product);

  //Carga los productos la primera vez que se renderiza
  useEffect(() => {
    startLoadingProductspaginated(0, sizePagination); //carga inicial
  }, []);

  //Maneja el abrir modal al precionar el boton agregar nuevo producto
  const handleClicNewProduct = () => {
    
    //Limpia el formulario antes de abrir el modal (resetenado sus valores)
 /*    setProductSelected({
        nombre: '',
        descripcion: '',
        imageUrl: '',
        unidadesEnStock: 0,
        precioUnitario: 0,
        categoriaId: 0,
    }); */
    clearProductSelected(); //esta agrega null al productSelected por lo tanto no aparece

    openProductModal(); //abre el modal
  }

  // Al hacer doble clic -> abrir modal con producto seleccionado
  const onDoubleClick = (product) => {
    
    setProductSelected(product); //opcional, para establecer el product seleccionado al hacer doble clic
    openProductModal();
  }

  const onSelect = (product) => {
    setProductSelected(product);
  }

  //cambiar de pagina
  const onPageChange = (newPage) => {
    startLoadingProductspaginated(newPage, sizePagination);
  }

  /*
  image_url, nombre, descripcion, 
  categoria_id, activa,  
  codigo_referencia,
  id,  precio_unitario,
  unidades_en_stock, 
  fecha_creacion, ultima_actualizacion,
*/

  const columns = [
     "Producto", "Categoria", "Estado",
     "Codigo", "Precio", "Stock","Creacion",
     "Opciones"];

  return (
    <div className="container-fluid px-4 py-4">
      <TableToolbar 
        onAddClick={handleClicNewProduct}
        buttonLabel="Add Product" 
        placeholder="Buscar Producto"
      />

      {isLoading ? (
        <div className="text-center py-5">Loading products...</div>
      ) :(
        <DataTable 
          columns={columns} 
          data={products} 
          type="product" 

          onSelect={onSelect}
          onDoubleClick={onDoubleClick}

          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={totalElements}
          onPageChange={onPageChange}

          productSelected={productSelected}
        />
      )}

      <AddProductModal />
    </div>
  );
};



