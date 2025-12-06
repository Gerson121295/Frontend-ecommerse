import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../../hooks/useProduct";
import { useEffect } from "react";
import { Footer } from "../../components/layout";
import { getEnvVariables } from "../../../helpers/getEnvVariables";
import { NavbarApp } from "../../components/layout/Navbar/NavbarPublic";
import { AddToCartButton } from "../../components/common/product/AddToCartButton";
import { useDispatch, useSelector } from "react-redux";
import { useCounter } from "../../../hooks/useCounter";
import { addToCart, decrease, increase, removeItem } from "../../../store/cart/cartSlice";
import { QuantitySelector } from "../../../helpers/QuantitySelector";

 //extrae la ruta principal para las peticions desde .env  variables de entorno
  const { VITE_API_URL } = getEnvVariables();

export const InfoProduct = () => {
  //Cuando en ProductCard se le da clic a la imagen del producto se ejecuta la funcion goToProduct que
  //redirige la ruta /productos/id definido en PublicRoutes y este renderiza el componente InfoProduct.jsx
  //al renderizarce InfoProduct optiene el id del producto en la ruta para ejecutar la funcion startGetProductById(id) y obtiene la data del producto seleccionado

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { productSelected : product, startGetProductById} = useProduct();

  //¿El Producto ya esta en el carrito?
/*   const cartItem = useSelector(
    (state) => {
      if (!product) return null;   // <= evita el error si el producto no está cargado aún el selector retorna null, para evitar no se ejecuta el selector hasta que product este definido
      return state.cart.cart.find((i) => i.id === product.id) //Number(id) || i.id === id)
}) */;

// Obtener carrito primero
const cart = useSelector((state) => state.cart.cart);

// Calcular item SOLO cuando product ya existe
const cartItem = product  ? cart.find((i) => i.id === product.id) //si product existe busca el item en el carrito
                          : null; //si no existe product retorna null

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

  // contador local (solo UI) — value inicia en 0 o en cartItem?.cantidad si quieres
  const { 
    counter, increaseBy,
    decreaseBy, reset } = useCounter({
    product,
    value: cartItem?.cantidad ?? 0,
    initialValues: { count: cartItem?.cantidad ?? 0 },
    onChange: () => {}
  });

    useEffect(() => {
      startGetProductById(id);
    }, [id]);

    if (!product) return <p className="container mt-5">Cargando...</p>;

    // Botón principal: agrega 1 unidad al carrito (por pedido)
  const handleAddOne = () => {
    dispatch(
          addToCart({
            id: product.id,
            nombre: product.nombre,
            precioUnitario: product.precioUnitario,
            imageUrl: product.imageUrl,
            cantidad: product.unidadesEnStock, //maxCount: product.unidadesEnStock
          })
    );
  };

   // --- Métodos conectados directamente con Redux ---
  const handleIncrease = () => {
    dispatch(increase(product.id)); // Actualiza Redux el estado global
    increaseBy(1); // Actualiza UI local
  };

  const handleDecrease = () => {
    if (cartItem?.cantidad === 1) { //si la cantidad es 1
      dispatch(removeItem(product.id)); //Quita completamente del carrito
      reset(); //reset ui local
      return;
    }

    dispatch(decrease(product.id)); // Actualiza Redux el estado global
    decreaseBy(1); // Actualiza UI local
  };

  const handleReset = () => {
    if (cartItem) {
      dispatch(removeItem(product.id)); //Quita completamente del carrito
    }
    reset(); // UI
  };

  return (
    <>
    <NavbarApp />

    <div className="container my-5">

      <div className="row g-4">
         <div className="border rounded p-3 bg-light text-center">
          <img
            src={VITE_API_URL + product.imageUrl}
            className="img-fluid" //border
            alt={product.nombre}
            style={{ maxHeight: "350px", objectFit: "contain" }}
          /> 
        </div>
  

        {/* Detalles del producto */}
         <div className="col-md-7">
          <h3 className="fw-bold">{product.nombre}</h3>

          <p className="fs-3 fw-bold">Q {product.precioUnitario}</p>

          <ul className="list-unstyled fs-6 mb-3">
            <li><strong>SKU:</strong> {product.id}</li>
            <li><strong>Categoría:</strong> {product.categoria}</li>
            <li><strong>Stock:</strong> {product.unidadesEnStock}</li>
          </ul>

          <p className="text-muted">{product.descripcion}</p>

          {/* Controles de cantidad y botón */}
          <div className="d-flex align-items gap-2 mt-4">

            {/* Selector local (visual). No sincroniza automáticamente con Redux */}

            <QuantitySelector
              value={cartItem?.cantidad ?? 0}
              min={0}
              max={product.unidadesEnStock}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onReset={handleReset}
            />

{/*             <button className="btn btn-morado">−</button>
            <input
              type="number"
              value={1}
              className="form-control text-center contorno-campo-estatico"
              style={{ width: "70px" }}
              //readOnly
            />
            <button className="btn btn-morado">+</button> */}

              {/* Boton de agregar al carrito */}
    {/*           <AddToCartButton onClick={handleAddOne} className="ms-3" /> */}

                 <button
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(-1)}
                  >
                    ← Regresar
                  </button>

                {/* Mostrar cantidad actual en carrito (si existe) */}
{/*               <div className="ms-3">
                <small className="text-muted">
                  En carrito: {cartItem?.cantidad || 0}
                </small>
              </div> */}

          </div>
        </div>
      </div>

      {/* Tabla de características */}
      <div className=" m-3">
        <h5 className="fw-bold">Características del producto</h5>
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <tbody>
               <tr>
              <th className="w-25 bg-light">Código referencia</th>
              <td>{product.codigoReferencia}</td>
            </tr>

            <tr>
              <th className="bg-light">Descripción completa</th>
              <td>{product.descripcion || "N/A"}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
    <Footer />
    </>
  );
};
