import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout, AuthRoutes } from "../auth/routes";
import { PrivateLayout, PrivateRoutes, PublicLayout, PublicRoutes } from "../ecommerse/routes";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";


//Rutas de la aplicación
//RouterProvider es un componente que permite crear un router para la aplicación, y se le pasa el router creado con createBrowserRouter
//createBrowserRouter es una función que permite crear un router para la aplicación, y se le pasa un array de objetos que definen las rutas de la aplicación
//Cada objeto tiene una propiedad path que define la ruta, y una propiedad element que define el componente que se renderiza cuando se accede a esa ruta
//Si el usuario no esta autenticado, redirige a la ruta de /auth/login  
const router = createBrowserRouter([

     //Si no esta autenticado hace el Login
    //Login
    {
        path:"auth/*", //Cualquier path que entre o incie con /auth -> va a mostrar o renderizar el elemento <LoginPage/>
        element: <AuthLayout />, //realiza la proteccion de rutas y validacion del User si esta Logeado entra a: / la App
        children: AuthRoutes //rutas de auth
    },

    //Usuario autenticado 
    { 
        path: "/", //cualquier ruta que no sea las que ya esten definidas(que no sea auth/*)
        element: <PublicLayout />, //proteccion de rutas con validaciones
        children: PublicRoutes  //rutas de calendar
    },

    {
        path: "admin/*", //Cualquier path que entre o incie con /admin -> va a mostrar o renderizar el elemento <DashboardAdmin/>
        element: <PrivateLayout />, //realiza la proteccion de rutas y validacion del User si esta Logeado entra a: /admin/dashbord
        children: PrivateRoutes //rutas de admin
    },


  /*  //si no esta autenticado el User redirecciona a la ruta de /auth/login, las rutas anteriores estarán condicionadas para validar si se esta autenticado
        { 
        path: "/*", //cualquier ruta que no sea las que ya esten definidas(que no sea auth/*)
        element: <Navigate to="/auth/login" />,
    }, */  

]);

    export const AppRouter = () => {

        //console.log(getEnvVariables()); //ver variables de entorno configuradas.
    
    //Se extrae propiedades y func del hook useAuthStore para validar el estado de autenticacion del User
    const { status, checkAuthToken }  = useAuthStore();

    useEffect(() => {
        //Verifica el token del usuario al iniciar la app
        checkAuthToken(); //verifica el token del usuario al iniciar la app
    }, []); //se ejecuta una sola vez al iniciar la app

    //Si el estado es 'checking' no renderiza nada
    if (status === 'checking') {
        return <h3>Revisando autenticacion...</h3>; //muestra un mensaje de carga mientras se verifica el token
    }

        return < RouterProvider router={router} />

    }

    


