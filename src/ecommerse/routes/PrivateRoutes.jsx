import { Navigate } from "react-router-dom";
import { AddProduct, DashboardAdmin, ManageCategories, ManageOrders, ManageProducts, ManageUsers } from "../pages/admin";
import { Register } from "../pages/public";

export const PrivateRoutes = [
    { // Objeto de ruta en el router
        path: "dashboard", //URL que renderiza la página
        element: <DashboardAdmin />, // Componente a renderizar
    },
    {
        path: "manage-products",
        element: <ManageProducts />
    },
    { 
        path: "manage-users",
        element: <ManageUsers />
    },
    {
        path: "manage-orders",
        element: <ManageOrders />
    },
    {
        path: "manage-categories",
        element: <ManageCategories />
    },
    {
        path: "add-product",
        element: <AddProduct />
    },
    
    {
        path: "register-user",
        element: <Register />,
    },

    { //SI entro a esta ruta EcommerseRoutes y no estoy dentro del / cualquier otra ruta va a redirigir al /
        path: "*", //Si se coloca un "/" o  "*" en una ruta, quiere decir que redirige a /
        element: <Navigate to={"/admin/dashboard"} />
    },

];