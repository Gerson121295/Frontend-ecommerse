
import { Link} from 'react-router-dom';
import './NavbarApp.css';
import { useNavbarSearch } from '../../../../../hooks/useNavbarSearch';
import { DesktopNavbar } from './DesktopNavbar';
import { MobileNavbar } from './MobileNavbar';
import { useCategory } from '../../../../../hooks/useCategory';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const NavbarApp = () => {  // ({ categories, userData }) => {

  const search = useNavbarSearch(); //search objeto con funcionalidades del buscador como searchText, setSearchText, handleSubmitSearch, results, isFocused, setIsFocused

  const { categories, startLoadingAllCategories  } = useCategory();

  // Obtenemos el estado auth del store
  const {status, user, isAdmin, isAssistant, isUser} = useSelector((state) => state.auth);

  const isAuthenticated = status === 'authenticated';
  const userRoles = Array.isArray(user?.roles) ? user.roles : [];

    const hasAdminAccess =
      isAdmin || 
      isAssistant || 
      userRoles.includes('ROLE_ADMIN') || 
      userRoles.includes('ROLE_ASSISTANT');
    
      // Mostrar nombre y apellido si existen, si no mostrar username, si no mostrar 'Mi Cuenta'
    const displayName =
      user?.nombre
      ? 
    `${user.nombre}${user?.apellido ? " " + user.apellido : ""}`
    : user?.username || 'Mi Cuenta';

    useEffect(() => {
      startLoadingAllCategories(); // Cargar categorías al iniciar
    }, []); //useEffect se dispara al recargar el navegador 1 vez y carga todas las categorias
    
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2 sticky-navbar">
      <div className="container">

        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold text-dark d-flex align-items-center">
          <img src="/src/assets/img/img-app/logo-moto.png" alt="Logo" height="40" />
        </Link>

        {/* Botón mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Contenido colapsable */}
        <div className="collapse navbar-collapse" id="navbarNav">
          
          <DesktopNavbar
            categories={categories}
            search={search}
            userData={{ isAuthenticated, displayName, hasAdminAccess }}
          />

          <MobileNavbar
            categories={categories}
            search={search}
            userData={{ isAuthenticated, displayName, hasAdminAccess }}
          />
        </div>
      </div>
    </nav>
  );
};