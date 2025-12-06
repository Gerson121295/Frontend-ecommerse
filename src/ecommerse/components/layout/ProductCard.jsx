import { useNavigate } from "react-router-dom";
import { getEnvVariables } from "../../../helpers/getEnvVariables";
import './ProductCard.css'
import "../../../styles.css"
import { BsCartPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {  addToCart } from "../../../store/cart/cartSlice";
import { showNotification } from "../../../helpers/showNotification";
import { onUpdateProduct } from "../../../store/product/productSlice";

//extrae la ruta principal para las peticions desde .env  variables de entorno
const { VITE_API_URL } = getEnvVariables();

export const ProductCard = ({ product }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch(); // Hook de Redux para despachar acciones de estado como addToCart que esta en el slice cartSlice.js

  //¿El Producto ya esta en el carrito?
  const cartItem = useSelector(
    (state) => state.cart.cart.find((i) => i.id === product.id)
  );

  //extrae propiedades y funciones del hook counter
/*   const { counter, increaseBy, decreaseBy } = useCounter(
    //Data enviada al hook useCounter
    {
      product,
      value: cartItem?.cantidad || 0,
      onChange: ({ count }) => {
        if(count === 0 ){
          dispatch(removeItem(product.id))
          return;
        }  

      if(count > (cartItem?.cantidad || 0 )){
        dispatch(increase(product.id));
      } else {
        dispatch(decrease(product.id));
      }
    },
}) */

  const handleAdd = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        nombre: product.nombre,
        precioUnitario: product.precioUnitario,
        imageUrl: product.imageUrl,
        cantidad: product.unidadesEnStock, //maxCount: product.unidadesEnStock
      })
    );

    //Notificacion alert reutilizable
      showNotification(
        'success',
        'Producto agregado al carrito',
        'Revisa el carrito para completar tu compra.',
        {
          customClass: 'toast-corporate',
          timeOut: 3500,
        }
          );
  };

  //Funcion  goToProduct redirige a la url /productos/id_Producto_seleccionado definido en PublicRoutes y este renderiza el componente InfoProduct.jsx
  const goToProduct = () => {
    navigate(`/productos/${product.id}`);
  }

 /*  const addToCart = (e) => {
    e.stopPropagation(); // evita abrir el producto
    alert("Agregado al carrito");
  }; */

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
       <div className="product-card-premium" onClick={goToProduct}>

          <div className="premium-img-container" >
          <img 
            src={VITE_API_URL + product.imageUrl} 
            className="premium-img"
            alt={product.nombre} 
          />
          {/* Overlay oscuro */}
          <div className="premium-overlay">
            <button className="btn-premium-view">Ver producto</button>
          </div>
        </div>

        {/* Información del producto */}
          <div className="premium-info p-3 d-flex align-items-center justify-content-between">
            <div style={{ minWidth: 0 }}>
              <h6 className="fw-bold text-truncate mb-1">{product.nombre}</h6>
              <p className="price-premium m-0">Q {product.precioUnitario}</p>
            </div>
           {/* Botón agregar al carrito flotante */}

          <button 
            className="btn-premium-cart" 
            onClick={handleAdd}
            title="Agregar al carrito"
            aria-label="Agregar al carrito"
          >
            {/* <i className="bi bi-cart-plus"></i> */}
            <BsCartPlus className="ms-2" size={22} />
          </button>
        </div>
        
      </div>
    </div>
  );
};



