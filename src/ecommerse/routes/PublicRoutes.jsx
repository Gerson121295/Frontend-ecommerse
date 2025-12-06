import { Navigate } from "react-router-dom";
import { Categories, Home, InfoProduct, Register, ShoppingCart } from "../pages/public";
import { ProductByCategoryPage } from "../pages/public/productByCategoryPage";
import { SearchResultsPage } from "../pages/public/SearchResultsPage";
import { Orders } from "../pages/public/Orders";


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
        path:"/categories/:categoriaId",  //id definido en ProductByCategoryPage en params para acceder al id
        element:<ProductByCategoryPage/>
    },
/*     {
        path: "/checkout",
        element: <Checkout />,
    }, */

    {
        path: "/orders",
        element: <Orders />,
    }, 
    {
        path: "/productos/:id", // Asumiendo que mostrarás producto por ID
        element: <InfoProduct />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path:"/search",
        element: <SearchResultsPage />
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