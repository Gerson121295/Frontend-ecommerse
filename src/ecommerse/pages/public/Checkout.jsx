import { useDispatch, useSelector } from 'react-redux';
import '../public/Checkout.css';
import { usePedido } from '../../../hooks/usePedido';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import { showNotification } from '../../../helpers/showNotification';
import '../../../../src/styles.css'
import { clearCart } from '../../../store/cart/cartSlice';

/*
--Realizar pedido -> Data a enviar al Backend (No se envia nombre ya que el usuario esta registrado y se le asinga el pedido)
- POST http://localhost:8080/pedidos
{
  "direccionDeEnvio": {
    "aldea": "Cuchilla",
    "sector": "iglesias",
    "municipio": "NUEVO_SAN_CARLOS",
    "departamento": "RETALHULEU",
    "pais": "GUATEMALA"
  },
  "productosOrdenados": [
    {
      "productoId": 2,
      "cantidad": 1
    },
    {
      "productoId": 3,
      "cantidad": 1
    }
  ],
  "comentario": "Por favor entregar en la mañana temprano antes de las 6PM"
}

//Respuesta
{ "numeroSeguimientoPedido": "541b0b1a-be8f-4536-94fc-77915d857669"}

*/

//Lista de municipios para el select
const MUNICIPIOS = [
  "RETALHULEU",
  "SAN_SEBASTIAN",
  "SANTA_CRUZ_MULUA",
  "SAN_MARTIN_ZAPOTITLAN",
  "SAN_FELIPE",
  "SAN_ANDRES_VILLA_SECA",
  "CHAMPERICO",
  "NUEVO_SAN_CARLOS",
  "EL_ASINTAL",
];

//Formulario de checkout
const checkoutFormFields = {
  aldea: "",
  sector: "",
  municipio: "", //Seleccionar de la lista MUNICIPIOS
  departamento: "RETALHULEU", //valor por defecto
  pais: "GUATEMALA", //valor por defecto
  comentario: "", //opcional
};

//Validaciones del formulario de checkout
const checkoutFormValidations = {
  aldea: [
    (value) => value.trim().length >= 3 && value.trim().length <= 30,
    "La aldea debe tener entre 3 y 30 caracteres",
  ],
  sector: [
    (value) => value.trim().length >= 3 && value.trim().length <= 30,
    "El sector debe tener entre 3 y 30 caracteres",
  ],
  municipio: [
    (value) => MUNICIPIOS.includes(value),
    "El municipio seleccionado no es válido",
  ],
  comentario: [
    (value) => value.trim().length === 0 || (value.trim().length >= 5 && value.trim().length <= 100),
    "El comentario debe tener entre 5 y 100 caracteres (opcional)",
  ]
};


export const Checkout = () => {

  const navigate = useNavigate(); //obtener la navegacion
  const dispatch = useDispatch(); //disparador de acciones del store definidas en los slices
  const { startSavingOrder } = usePedido();

   const { cart, totalAmount } = useSelector((state) => state.cart); //obtener el estado del carrito desde el store
   const { user } = useSelector((state) => state.auth); //obtener el estado del usuario desde el store

   //se llama al customHook useForm el cual se envia checkoutFormFields como estado inicial, para validaciones checkoutFormValidations y se extrae propiedades y func.
    const {
      aldea,
      sector,
      municipio,
      departamento,
      pais,
      comentario, 
      onInputChange: onCheckoutInputChange, //funcion que se llama cuando hay un cambio en un input
      
      //extrae funciones y propiedades de validacion del useForm
      onBlurField, //funcion que se llama cuando un campo pierde el foco
      onResetForm,
      onResetTouched,
      aldeaValid,
      sectorValid,
      municipioValid,
      //departamentoValid,
      //paisValid,
      comentarioValid, 
      isFormValid, //indica si el formulario es valido
      touched
    } = useForm(checkoutFormFields, checkoutFormValidations);

    //Valida si el usuario esta autenticado(registrado e inicio sesion)
    const token = localStorage.getItem("token");

  if (!token) {
    showNotification("info", "Inicia sesión", "Necesitas iniciar sesión para finalizar la compra");
    navigate("/auth/login");
    return null;
  }

  //Metodo para limpiar el formulario y el carrito despues de realizar el pedido
  const clearAfterOrder = () => { //se llama despues de realizar el pedido en onSubmitOrder
    dispatch(clearCart()); //limpia el carrito
    onResetForm(); //limpia el formulario
    onResetTouched(); //limpia los campos tocados
    
  };

  //Metodo para realizar el pedido
  const onSubmitOrder = async (event) => {
    event.preventDefault();
    //Validar el formulario
    if (!isFormValid) {
      showNotification("error", "Error", "Por favor completa correctamente el formulario de checkout.");
      return;
    }
    //Construir el objeto pedido a enviar al backend
    const pedidoData = {
      direccionDeEnvio: {
        aldea,
        sector,
        municipio,
        departamento,
        pais,
      },
      productosOrdenados: cart.map((item) => ({
        productoId: item.id,
        cantidad: item.cantidad,
      })),
      comentario,
    };

    //Llamar al metodo startCrearPedido del hook usePedido
    const { success, numeroSeguimientoPedido, message } = await startSavingOrder(pedidoData);

    if (success) {
      //navigate(`/order/success/${numeroSeguimientoPedido}`);
      navigate('/orders');
      clearAfterOrder(); //limpiar el formulario y el carrito
    }
  };

  //Render del formulario de checkout
  return (
    <div className="container my-5">
      <div className="row">
        {/* Formulario */}
        <div className="col-lg-8">
          <div className="border p-4 rounded shadow-sm">
            <h4 className="fw-bold mb-4" style={{ color: '#6c3483' }}>
              Información de Contacto: {user?.nombre || user?.username || ""}
            </h4>

          <form 
            onSubmit={onSubmitOrder} >
          <div className="col-md-7">
          {/* <form className="card p-4" onSubmit={handleSubmit}> */}
            <h5>Datos de envío</h5>

            {/* MUNICIPIO */}
            <div className="mb-3">
              <label 
                  htmlFor="municipio" 
                  className="form-label fw-semibold" 
                  style={{ color: '#6c3483' }}
              >
                Municipio *
              </label>
              <select
                name="municipio"
                value={municipio}
                onChange={onCheckoutInputChange} //llama a la funcion onInputChange del hook useForm
                onBlur={onBlurField} //llama a la funcion onBlurField del hook useForm

                className={`form-select contorno-campo-morado ${
                        touched.municipio && !!municipioValid ? "is-invalid" : ""
                      }`}
                required
              >
                <option value="">Seleccione...</option>
                {MUNICIPIOS.map((m) => (
                  <option key={m} value={m}>
                    {m.replace(/_/g, " ")}
                  </option>
                ))}
              </select>
               <div className="invalid-feedback">
                    {touched.municipio && municipioValid}
                </div>
            </div>

            {/* ALDEA */}
            <div className="mb-3">
              <label 
                htmlFor="aldea" 
                className="form-label fw-semibold" 
                style={{ color: '#6c3483' }}
              >
                Aldea *
              </label>
              <input
                type="text"
                name="aldea"
                value={aldea}
                onChange={onCheckoutInputChange} //llama a la funcion onInputChange del hook useForm
                onBlur={onBlurField} //llama a la funcion onBlurField del hook useForm
                
                placeholder="Ej: Aldea X"
                className={`form-control contorno-campo-morado ${
                  touched.aldea && !!aldeaValid ? "is-invalid" : ""
                  }`}
                required
              />
                <div className="invalid-feedback">
                  {touched.aldea && aldeaValid}
                </div>
            </div>

            {/* SECTOR */}
            <div className="mb-3">
                            <label 
                  htmlFor="sector" 
                  className="form-label fw-semibold" 
                  style={{ color: '#6c3483' }}
              >
                Sector / Referencia *
              </label>
              <input
                type="text"
                name="sector"
                value={sector}
                onChange={onCheckoutInputChange} //llama a la funcion onInputChange del hook useForm
                onBlur={onBlurField} //llama a la funcion onBlurField del hook useForm

                className={`form-control contorno-campo-morado ${
                  touched.sector && !!sectorValid ? "is-invalid" : ""
                  }`}
                placeholder="Ej: Cerca del campo o iglesia"
              />
                <div className="invalid-feedback">
                  {touched.sector && sectorValid}
                </div>
            </div>

            {/* CAMPOS FIJOS */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label 
                  htmlFor="departamento" 
                  className="form-label fw-semibold" 
                  style={{ color: '#6c3483' }}
              >
                Departamento *
              </label>
                <input
                  type="text"
                  name='departamento'
                  value="RETALHULEU"
                  className="form-control contorno-campo-morado"
                  disabled
                />

              </div>
              <div className="col-md-6 mb-3">
                <label 
                  htmlFor="pais" 
                  className="form-label fw-semibold" 
                  style={{ color: '#6c3483' }}
                >
                  País *
                </label>
                <input
                  type="text"
                  name='pais'
                  value="GUATEMALA"
                  className="form-control contorno-campo-morado"
                  disabled
                />
              </div>
            </div>

            {/* COMENTARIO */}
            <div className="mb-3">
              <label 
                htmlFor="pais" 
                className="form-label fw-semibold" 
                style={{ color: '#6c3483' }}
              >
                Comentario (opcional)
              </label>
              <textarea
                type="text"
                name="comentario"
                value={comentario}
                onChange={onCheckoutInputChange} //llama a la funcion onInputChange del hook useForm                
                onBlur={onBlurField} //llama a la funcion onBlurField del hook useForm
                className={`form-control contorno-campo-morado ${
                  touched.comentario && !!comentarioValid ? "is-invalid" : ""
                  }`}
                rows="3"
                placeholder="Indicaciones de entrega"
              />
                <div className="invalid-feedback">
                  {touched.comentario && comentarioValid}
                </div>
            </div>

              <div className="text-center">
                <button 
                  className="btn fw-bold btn-blanco-morado" //btn btn-morado
                  //value="Realizar Pedido Q {totalAmount}"
                  type="submit" 
                  disabled={!isFormValid}
                >
                {`Realizar Pedido Q ${totalAmount}`}
              </button>
              
              </div>
              </div>
            </form>
          </div>
        </div>

       {/* Resumen de orden */}
      <div className="col-lg-4 mt-4 mt-lg-0">
        <div className="bg-light p-4 rounded shadow-sm">
          <h6 className="mb-3 fw-bold text-uppercase">Resumen de orden</h6>

          {/* Lista de productos */}
          <div className="mb-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-start mb-2"
              >
                <div>
                  <span className="d-block fw-semibold">{item.nombre}</span>
                  <small className="text-muted">
                    {item.cantidad} x {item.precioUnitario.toFixed(2)}
                  </small>
                </div>

                <span className="fw-bold">
                  {(item.precioUnitario * item.cantidad).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Subtotal */}
          <div className="d-flex justify-content-between border-top pt-2">
            <span className="fw-semibold">Subtotal</span>
            <span className="fw-bold">{totalAmount}</span>
          </div>

          {/* Total */}
          <div className="d-flex justify-content-between border-top pt-2 mb-3">
            <span className="fw-semibold">Total</span>
            <span className="fw-bold fs-5">{totalAmount}</span>
          </div>

        </div>

        <div className="mt-3">
          <Link to={"/"} className="text-decoration-none fw-semibold text-morado">
            &lt; Seguir comprando
          </Link>
        </div>
      </div>

      </div>
    </div>
  );
};
