import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { Footer, NavbarAdmin, SidebarAdmin } from "../components/layout";
import { FaBars } from "react-icons/fa";
import { useAuthStore } from "../../hooks/useAuthStore";


export const PrivateLayout = () => {

    // Estado para controlar la visibilidad del sidebar
    const [sidebarOpen, setSidebarOpen] = useState(true);

    //Se extrae propiedades y func del hook useAuthStore para validar el estado de autenticacion del User
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        //Verifica el token del usuario al iniciar la app   
        checkAuthToken(); //verifica el token del usuario al iniciar la app
    }, []) //se ejecuta una sola vez al iniciar la app

    if(status === 'not-authenticated') return <Navigate to="/auth/login" />; //si el usuario no esta autenticado redirige a la ruta de login

    //Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }; 

    return(
        <>

         {/* Sidebar (encima) */}
              {sidebarOpen && <SidebarAdmin toggleSidebar={toggleSidebar} />}
        
              {/* Botón flotante para abrir si está cerrado */}
              {!sidebarOpen && (
                <button
                  onClick={toggleSidebar}
                  className="btn position-fixed top-0 start-0 m-3"
                  style={{ zIndex: 2000 }}
                >
                  <FaBars color="#4a148c" size="1.5em"  />
                </button>
              )}
        
              {/* Contenedor principal desplazable */}
              <div
                /* className="main-content" */
                className="d-flex flex-column min-vh-100"
                style={{
                  marginLeft: sidebarOpen ? "250px" : "0", 
                  transition: "margin-left 0.3s ease",
        
                 /*  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh", */
                }}
              >
                <NavbarAdmin sidebarOpen={sidebarOpen} />


        <Outlet />

         </div>
       <Footer />

        </>
    )
}