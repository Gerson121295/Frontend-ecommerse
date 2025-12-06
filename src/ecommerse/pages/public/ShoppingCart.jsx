import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavbarApp } from '../../components/layout/Navbar/NavbarPublic';
import { Footer } from '../../components/layout';
import { getEnvVariables } from '../../../helpers/getEnvVariables';
import { decrease, increase, removeItem } from '../../../store/cart/cartSlice';
import { QuantitySelector } from '../../../helpers/QuantitySelector';
import { showNotification } from '../../../helpers/showNotification';



//extrae la ruta principal para las peticions desde .env  variables de entorno
const { VITE_API_URL } = getEnvVariables();

export const ShoppingCart = () => {
  
  const navigate = useNavigate(); //obtener la navegacion
  const dispatch = useDispatch();
  const { cart, totalAmount } = useSelector((state) => state.cart);

  const token = localStorage.getItem("token");

  const handleCheckout = () => {
    if (!token) {   //if (!localStorage.getItem("token")) {  //si no hay token redirige a login
      
      showNotification('info', 'Inicia sesión', 'Necesitas iniciar sesión para finalizar la compra', {
        customClass: 'toast-dark',
        timer: 2500
      });
      navigate("/auth/login");
      return;
    }

    navigate("/admin/checkout");
  };

  return (
    <>
    <NavbarApp />
     <div className="container my-5">

      <>
        {
          (!cart || cart.length === 0) && navigate("/")
        }
      </>

      <h5 className="mb-4">CARRITO DE COMPRAS</h5>

      <div className="row">
        <div className="col-lg-8">
          {cart.map((item) => (
            <div key={item.id} className="d-flex border-bottom pb-3 mb-3 align-items-center">
              <img
                src={item.imageUrl?.startsWith("http") ? item.imageUrl : VITE_API_URL + item.imageUrl}
                alt={item.nombre}
                style={{ width: 120, height: 90, objectFit: "contain" }}
                className="me-3"
              />

              <div className="flex-grow-1">
                <h6 className="mb-1">{item.nombre}</h6>

                <div className="d-flex align-items-center gap-2">
                  <QuantitySelector
                    value={item.cantidad}
                    onReset={null}
                    onIncrease={() => dispatch(increase(item.id))}
                    onDecrease={() => {
                      // Si queda en 1 y presiona -, se queda en 1 (según tu reducer).
                      // Si prefieres eliminar cuando llegue a 0, adapta reducer o aquí despacha removeItem.
                      if (item.cantidad <= 1) {
                        // eliminar el producto del carrito si llega a 0
                        // dispatch(removeItem(item.id));
                        // return;
                      }
                      dispatch(decrease(item.id));
                    }}
                    min={1}
                    max={item.maxCount}
                  />

                  <div className="ms-auto d-flex align-items-center">
                    <div className="fw-semibold me-3">Q {(item.precioUnitario * item.cantidad).toFixed(2)}</div>

                    <button 
                      className="btn btn-link text-danger p-0" 
                      title="Eliminar" 
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      <FaTrashAlt size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="bg-light p-4 rounded">
            <h6 className="mb-3">RESUMEN DE ORDEN</h6>
            <div className="d-flex justify-content-between mb-2">
              <span>SUBTOTAL</span>
              <span className="fw-bold">Q {totalAmount.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between border-top pt-2 mb-4">
              <span>TOTAL</span>
              <span className="fw-bold">Q {totalAmount.toFixed(2)}</span>
            </div>

            <button 
              className="btn btn-morado w-100"
              onClick={handleCheckout}
            >
              Realizar pedido
            </button>
          </div>

          <div className="mt-3">
            <a href="/" className="text-decoration-none fw-semibold text-morado">
              &lt; SEGUIR COMPRANDO
            </a>
          </div>
        </div>
      </div>
    </div>

    <Footer/>
    </>
  );
};
