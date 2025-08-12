import { Navigate } from "react-router-dom";
import { Categories, Checkout, Home, InfoProduct, Register, ShoppingCart } from "../pages/public";


export const PublicRoutes = [
    { // Objeto de ruta en el router
        path: "/", //URL que renderiza la página
        element: <Home />, // Componente a renderizar
    },
    {
        path: "/categories",
        element: <Categories />,
    },
    {
        path: "/checkout",
        element: <Checkout />,
    },
    {
        path: "/product/:id", // Asumiendo que mostrarás producto por ID
        element: <InfoProduct />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/cart",
        element: <ShoppingCart />,
    },
     { //SI entro a esta ruta EcommerseRoutes y no estoy dentro del / cualquier otra ruta va a redirigir al /
        path: "*", //Si se coloca un "/" o  "*" en una ruta, quiere decir que redirige a /
        element: <Navigate to={"/"} />
    },

];