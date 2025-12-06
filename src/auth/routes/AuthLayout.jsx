import { Navigate, Outlet } from "react-router-dom"
import { Footer} from "../../ecommerse/components/layout"
import { useAuthStore } from "../../hooks/useAuthStore";
import {useEffect } from "react";
import { NavbarApp } from "../../ecommerse/components/layout/Navbar/NavbarPublic";

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