import { Navigate, Outlet } from "react-router-dom"
import { Footer, NavbarApp } from "../../ecommerse/components/layout"
import { useAuthStore } from "../../hooks/useAuthStore";
import { use, useEffect } from "react";

export const AuthLayout = () => {

    //Se extrae propiedades y func del hook useAuthStore para validar el estado de autenticacion del User
    const { status, checkAuthToken }  = useAuthStore();

    useEffect(() => {
        //Verifica el token del usuario al iniciar la app   
        checkAuthToken(); //verifica el token del usuario al iniciar la app
    }, []); //se ejecuta una sola vez al iniciar la app

    if(status === 'authenticated') return <Navigate to="/" />; //si el usuario esta autenticado redirige a la ruta principal Home
    

    return(
         <>
         <NavbarApp />
         <Outlet />
         <Footer />
         </>
    )
}