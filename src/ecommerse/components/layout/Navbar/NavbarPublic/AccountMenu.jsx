

import { Link, Navigate, NavLink } from "react-router-dom";
import { useAuthStore } from "../../../../../hooks/useAuthStore";

export const AccountMenu = ({
  isAuthenticated,
  hasAdminAccess,
}) => {

   //Extrae propiedades y funciones de hooks
    const { startLogout } = useAuthStore(); //extrae la funcion startLogout del hook useAuthStore
    
  const onLogout = () => {
    startLogout(); //llama la funcion startLogout del hook useAuthStore 
    Navigate('/auth/login'); //navega a la pagina de login
  };

  
  return (
    <ul className="dropdown-menu custom-dropdown shadow ">
      {!isAuthenticated ?  ( //Si no esta autenticado
        <>
          <li><NavLink to="/auth/login" className="dropdown-item">Iniciar Sesión</NavLink></li>
          <li><NavLink to="/auth/register" className="dropdown-item">Registrarse</NavLink></li>
        </>

      ) : (
        <>
          {hasAdminAccess && ( //Si tiene accesos Es rol Admin o Assistant
            <>
              <li><Link to="/admin/dashboard" className="dropdown-item">Administración</Link></li>
              <li><Link to="/admin/register-user" className="dropdown-item">Registrar Usuario</Link></li>
            </>
          )}

          {/*  Si solo tiene rol Usuario */}
          <li>
            <button className="dropdown-item custom-dropdown" onClick={onLogout} >
              Salir
            </button>
          </li>
          <li><Link to="/orders" className="dropdown-item">Pedidos</Link></li>
        </>
      )}
    </ul>
  );
};





