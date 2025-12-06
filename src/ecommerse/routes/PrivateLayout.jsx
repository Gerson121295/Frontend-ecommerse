import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { Footer, SidebarAdmin } from "../components/layout";
import { FaBars } from "react-icons/fa";
import { useAuthStore } from "../../hooks/useAuthStore";
import { NavbarAdmin } from "../components/layout/Navbar/NavbarAdmin";
import { NavbarApp } from "../components/layout/Navbar/NavbarPublic";
import { useSelector } from "react-redux";

export const PrivateLayout = () => {

    // Estado para controlar la visibilidad del sidebar
    const [sidebarOpen, setSidebarOpen] = useState(true);

    //Se extrae propiedades y func del hook useAuthStore para validar el estado de autenticacion del User
    const { status, user, checkAuthToken } = useAuthStore();

     // Obtenemos el estado auth del store
  const {isAdmin, isAssistant} = useSelector((state) => state.auth); //,  isUser

  const isAuthenticated = status === 'authenticated';
  const userRoles = Array.isArray(user?.roles) ? user.roles : [];

  const hasAdminAccess =
        isAdmin || 
        isAssistant || 
        userRoles.includes('ROLE_ADMIN') || 
        userRoles.includes('ROLE_ASSISTANT');

  //const isOnlyUser = isUser || userRoles.includes('ROLE_USER');


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
        {isAuthenticated && hasAdminAccess ? ( //si esta autenticado y tiene role Admin o Assitant
            <>
            {sidebarOpen && <SidebarAdmin toggleSidebar={toggleSidebar} />}
            
            {!sidebarOpen && (
              <button
                onClick={toggleSidebar}
                className="btn position-fixed top-0 start-0 m-3"
                style={{ zIndex: 2000 }}
              >
                <FaBars color="#4a148c" size="1.5em" />
              </button>
            )}
            
            <div
              className="d-flex flex-column min-vh-100"
              style={{
                marginLeft: sidebarOpen ? "250px" : "0",
                transition: "margin-left 0.3s ease",
              }}
            >
              <NavbarAdmin sidebarOpen={sidebarOpen} />
              <Outlet />
            </div>
            <Footer />
          </>
        ) : (
          <>
            <NavbarApp/>
              <Outlet />
            <Footer />  
          </>
         
      )}
      </>
    )
}