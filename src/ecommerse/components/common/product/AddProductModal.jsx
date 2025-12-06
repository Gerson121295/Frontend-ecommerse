
import { useEffect, useState } from 'react';
import { useProduct } from '../../../../hooks/useProduct';
import { useForm } from '../../../../hooks/useForm';
import { useProductModal } from '../../../../hooks/useProductModal';
import { BaseModal } from '../BaseModal';
import { useCategory } from '../../../../hooks/useCategory';
import { useSelector } from 'react-redux';
import { ImagePicker } from './ImagePicker';


//Formulario para crear Producto
const productFormFields = {
      nombre: '',
      descripcion: '',
      imageUrl: '',
      unidadesEnStock: 0,
      precioUnitario: 0,
      categoriaId: 0,
    }

//Validacion de campos del form Producto
const productFormValidations = {
    nombre: [(v) => v.trim().length > 0, 'El nombre es obligatorio'],
    descripcion: [(v) => v.trim().length > 0, 'La descripción es obligatoria'],
    imageUrl: [(v) => v.trim().length > 0, 'La URL de imagen es obligatoria'],
    unidadesEnStock: [(v) => v > 0, 'Debe haber al menos 1 unidad'],
    precioUnitario: [(v) => v > 0, 'El precio debe ser mayor que 0'],
    categoriaId: [(v) => v > 0, 'Debe seleccionar una categoría'],
  };

export const AddProductModal = () => {

  const { isProductModalOpen, closeProductModal } = useProductModal();
  const { productSelected, startSavingProduct } = useProduct();
  
  const {  startLoadingAllCategories, startGettingCategoryByName } = useCategory(); //categories = [],
  const { categories = [] } = useSelector((state) => state.category);

  const [originalProduct, setOriginalProduct] = useState(null);

//Estado para detectar si hubo cambios en el form
  const [hasChanges, setHasChanges] = useState(false);
 
  //Se llama al hook useForm y se envia la data(productFormFields, productFormValidations) y se extrae la data(prop y func)
  const {
    //campos del formulario
    formState, 
    //Funciones
    setFormState,
    onInputChange,
    onResetForm,
    onResetTouched,
    onBlurField,
    //validaciones
    isFormValid,
    touched,
    nombreValid,
    descripcionValid,
    imageUrlValid,
    unidadesEnStockValid,
    precioUnitarioValid,
    categoriaIdValid,
  } = useForm(
    productFormFields,
    productFormValidations
  );

  //se extrae los campos del form mediante formState
  const { nombre, descripcion, imageUrl, unidadesEnStock, precioUnitario, categoriaId } = formState;

//Función para cargar categorías y datos del producto seleccionado sola cuando cambia el producto seleccionado y modal este abierto
//F1- Definir una función dentro del useEffect es válido si: Esa función solo se usa dentro del efecto y no se requiere afuera
/*   useEffect(() => {
    const fetchData = async () => {
      await startLoadingAllCategories(); //Cargar todas las categorías antes de setear el producto

      if (productSelected) { // Si hay un producto seleccionado
        let categoriaIdEncontrada = 0;

        //Buscar el ID real de la categoría según el nombre
        if (productSelected.categoria) { 
          const categoria = await startGettingCategoryByName(productSelected.categoria);
          if (categoria) categoriaIdEncontrada = categoria.id;
        }

        // Crear una copia del producto con el ID de categoría encontrado
        const productoConCategoria = {
          ...productSelected,
          categoriaId: categoriaIdEncontrada,
        };

        // Establece en el formulario y guardar copia original
        setFormState(productoConCategoria);
        setOriginalProduct(productoConCategoria);
        onResetTouched();
      } else {
        // Si es un nuevo producto (modo agregar) 
        onResetForm(); //onResetForm ya tien agregado funcion onResetTouch 
        setOriginalProduct(null);
      }

      setHasChanges(false);  // Marcar que no hay cambios pendientes al abrir el modal
    };

    //Valida si el modal esta abierto llama a la funcion fetchData
    if (isProductModalOpen) {
      fetchData();
    }
  }, [productSelected, isProductModalOpen]);
 */

//Función para cargar categorías y datos del producto seleccionado sola cuando cambia el producto seleccionado y modal este abierto
//F2- Definir una función fuera del useEffect es válido si: es compleja o reutilizable(llamarla en otro lugar).
const fetchProductData = async ({
  productSelected,
  setFormState,
  setOriginalProduct,
  onResetForm,
  onResetTouched,
  startLoadingAllCategories,
  startGettingCategoryByName,
  setHasChanges
}) => {
  // Cargar todas las categorías antes de setear el producto
  await startLoadingAllCategories();

  // Si hay un producto seleccionado (modo edición)
  if (productSelected) {
    let categoriaIdEncontrada = 0;

    // Buscar el ID real de la categoría según el nombre
    if (productSelected.categoria) {
      const categoria = await startGettingCategoryByName(productSelected.categoria);
      if (categoria) categoriaIdEncontrada = categoria.id;
    }

    // Crear una copia del producto con el ID de categoría encontrado
    const productoConCategoria = { 
      ...productSelected, 
      categoriaId: categoriaIdEncontrada,
    };

    // Establece la data el formulario y guardar copia original
    setFormState(productoConCategoria);
    setOriginalProduct(productoConCategoria);
    onResetTouched(); // limpiar validaciones tocadas
  } 
  else {
    // Si es un nuevo producto (modo agregar)
    onResetForm();
    setOriginalProduct(null);
  }

  // Marcar que no hay cambios pendientes al abrir el modal
  setHasChanges(false);
};

// useEffect se dispara al abrir el modal o cambiar producto seleccionado
useEffect(() => {
  if (isProductModalOpen) {
    fetchProductData({
      productSelected,
      setFormState,
      setOriginalProduct,
      onResetForm,
      onResetTouched,
      startLoadingAllCategories,
      startGettingCategoryByName,
      setHasChanges
    });
  }
}, [productSelected, isProductModalOpen]);


  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    await startSavingProduct(formState);
    closeProductModal();
    setHasChanges(false);
  };

  const handleChange = (e) => {
    onInputChange(e);
    setHasChanges(true);
  };

  //Reset el form a datos antes de abrir y modificarlo
  const handleResetForm = () => {
  if (originalProduct) {
    setFormState(originalProduct); // restaura a los valores iniciales
  } else {
    onResetForm(); // si era producto nuevo
  }
};

  return (
    <BaseModal
      isOpen={isProductModalOpen}
      onClose={closeProductModal}
      title={productSelected ? 'Editar producto' : 'Nuevo producto'}
      hasChanges={hasChanges}
      //onReset={onResetForm} 
      onReset={handleResetForm}
    >
      {(handleClose) => (  // recibe la función handleClose que está dentro del componente BaseModal
      <form className="container" onSubmit={onSubmit} >
        <div className="form-group mb-2">
          <label>Nombre</label>
          <input
            type="text"
            className={`form-control ${touched.nombre && nombreValid ? "is-invalid" : ""}`}
            placeholder="Camisa"
            name="nombre"
            value={nombre}
            onChange={handleChange}
            onBlur={onBlurField}
          />
          {touched.nombre && nombreValid && <small className="text-danger">{nombreValid}</small>}
        </div>

        {/* Descripción */}
        <div className="form-group mb-2">
          <label>Descripción</label>
          <textarea
            className={`form-control ${touched.descripcion && descripcionValid ? "is-invalid" : ""}`}
            placeholder="Descripción breve del producto"
            name="descripcion"
            value={descripcion}
            onChange={handleChange}
            onBlur={onBlurField}
          />
          {touched.descripcion && descripcionValid && (
            <small className="text-danger">{descripcionValid}</small>
          )}
        </div>

      <div>
        <ImagePicker
          value={imageUrl}
          touched={touched}
          imageUrlValid={imageUrlValid}
          onImageChange={(url) =>
            handleChange({ target: { name: "imageUrl", value: url } })
          }
          onBlur={(e) =>
            onBlurField({ target: { name: "imageUrl" } })
          }
        />
      </div>

        {/* Unidades en stock */}
        <div className="row mt-3">
         <div className="col-md-6">
          <label className="form-label">Unidades en stock</label>
          <input
            type="number"
            name="unidadesEnStock"
            className={`form-control ${touched.unidadesEnStock && unidadesEnStockValid ? "is-invalid" : ""}`}
            value={unidadesEnStock}
            onChange={handleChange}
            onBlur={onBlurField}
          />
          {touched.unidadesEnStock && unidadesEnStockValid && (
            <small className="text-danger">{unidadesEnStockValid}</small>
          )}
        </div>

        {/* Precio unitario */}
         <div className="col-md-6">
          <label className="form-label">Precio unitario (Q)</label>
          <input
            type="number"
            step="0.01"
            name="precioUnitario"
            className={`form-control ${touched.precioUnitario && precioUnitarioValid ? "is-invalid" : ""}`}
            value={precioUnitario}
            onChange={handleChange}
            onBlur={onBlurField}
          />
          {touched.precioUnitario && precioUnitarioValid && (
            <small className="text-danger">{precioUnitarioValid}</small>
          )}
        </div>
        </div>

        {/* Categoría */}
        <div className="form-group mb-3">
          <label className="form-label">Categoría</label>
          <select
            className={`form-select ${touched.categoriaId && categoriaIdValid ? "is-invalid" : ""}`}
            name="categoriaId"
            //value={categoriaId}
            value={String(categoriaId ?? '')} //asegurar tipo String
            onChange={handleChange}
            onBlur={onBlurField}
          >
            <option value="">Seleccione una categoría</option>

            {categories.length === 0 ? (
              <option disabled value="">
                Cargando categorías...
              </option>
            ) : (
              categories.map((cat) => (
                //<option key={cat.id} value={cat.id}>
                <option key={cat.id} value={String(cat.id)}>
                  {cat.nombreCategoria}
                </option>
              ))
            )}
          </select>

          {touched.categoriaId && categoriaIdValid && (
            <small className="text-danger">{categoriaIdValid}</small>
          )}
        </div>

        {/* Botones */}
        <div className="modal-footer px-0 border-0 d-flex justify-content-end gap-2 mt-2">
          <button 
            type="submit" 
            className="btn btn-outline-primary"
             disabled={!isFormValid} //El botón solo se activa si TODOS los campos pasan sus validaciones.
            >
            <i className="far fa-save"></i> 
            <span> Guardar</span>
          </button>
          <button 
            type="button" 
            className="btn btn-outline-danger" 
            onClick={handleClose}  // usa la lógica de confirmación de alerta de sweetalert2 definido en BaseModal
          >
            <i className="fa-solid fa-xmark"></i> 
            <span>Cancelar</span>
          </button>
        </div>
      </form>
       )}
    </BaseModal>
  );
};
