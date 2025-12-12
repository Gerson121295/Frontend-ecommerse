import { useDispatch, useSelector } from "react-redux";
import DataTable from "../../components/common/DataTable";
import { useProduct } from "../../../hooks/useProduct";
import { useEffect } from "react";
import { useProductModal } from "../../../hooks/useProductModal";
import { AddProductModal } from "../../components/common/product/AddProductModal";
import { getEnvVariables } from "../../../helpers/getEnvVariables";
import { DeleteProductButton } from "../../components/common/product/DeleteProductButton";
import { EditProductButton } from "../../components/common/product/EditProductButton";
import { AdminSearchBar } from "../../components/common/search/AdminSearchBar";
import TableToolbar from "../../components/common/TableToolbar";

//extrae la ruta principal para las peticions desde .env  variables de entorno
const { VITE_API_URL } = getEnvVariables();

export const ManageProducts = () => {

  const dispatch = useDispatch();
  const {startLoadingProductspaginated, setProductSelected, 
    clearProductSelected, startSearchByName } = useProduct(dispatch);

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

  //Funcion para busqueda de productos - Admin
  const fetchSuggestions = async(query) => {

  if (!query || query.trim().length === 0 || query === "") {
    startLoadingProductspaginated(0, sizePagination); //carga inicial
    return [];
  }

  //Guarda el dato de resultado en productsByName
  const productsByName = startSearchByName(query, 0, sizePagination);

 /*  return productsByName.map((product ) => ({
     id: product.id,
      label: product.nombre,
      subtitle: `Categoría: ${product.categoria}`,
      imageUrl:  product.imageUrl,
  })) */

      //recorre products ya que startSearchByName guarda el resultado en onLoadProducts 
      return products.map((product ) => ({
        id: product.id,
          label: product.nombre,
          subtitle: `Categoría: ${product.categoria}`,
          imageUrl: product.imageUrl,
      }))

  }


  const columns = [
     "Producto", "Categoria", "Estado",
     "Codigo", "Precio", "Stock","Creacion",
     "Opciones"];

  return (
    <div className="container-fluid px-4 py-4">
    {/*   <TableToolbar 
        onAddClick={handleClicNewProduct}
        buttonLabel="Add Product" 
        placeholder="Buscar Producto"
      /> */}

         <TableToolbar 
          placeholder="Buscar producto..."
          customSearch={(
            <AdminSearchBar
              placeholder="Buscar por nombre o categoria"
              fetchSuggestions={fetchSuggestions}
              onSelectSuggestion={(item) => {
              startSearchByName(item.label); // filtra por nombre
                }}
              />
            )}
          onAddClick={handleClicNewProduct}
          buttonLabel="Add Product" 
        />


      {isLoading ? (
        <div className="text-center py-5">Loading products...</div>
      ) :(
        <DataTable 
          columns={columns} 
          data={products} 
          
          renderRow={(item) => (
            <>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={VITE_API_URL + item.imageUrl}
                    alt={item.nombre}
                    className="rounded me-2"
                    width={40}
                    height={40}
                  />
                  <div>
                    <div className="fw-bold">{item.nombre}</div>
                    <small className="text-muted">{item.descripcion}</small>
                  </div>
                </div>
              </td>
              <td><span className="badge bg btn-morado">{item.categoria}</span></td>
              <td>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked={item.activa}
                  />
                </div>
              </td>
              <td>{item.codigoReferencia}</td>
              <td>{item.precioUnitario}</td>
              <td>{item.unidadesEnStock}</td>
              <td>{item.fechaCreacion}</td>
            {/*  <td>
                <span className={`badge ${item.activa === "Active" ? "bg-success" : "bg-secondary"}`}>
                  {item.activa}
                </span>
              </td> */}
              <td>
                <DeleteProductButton product={item} /> 
                <EditProductButton product={item} /> 
              </td>
            </>
          )}

          onSelect={onSelect}
          onDoubleClick={onDoubleClick}

          currentPage={currentPage}
          totalPages={totalPages}
          totalElements={totalElements}
          onPageChange={onPageChange}

          itemSelected={productSelected}
        />
      )}

      <AddProductModal />
    </div>
  );
};



