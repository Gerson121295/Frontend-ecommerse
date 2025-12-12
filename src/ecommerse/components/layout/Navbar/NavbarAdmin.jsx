
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../hooks/useAuthStore';
import './NavbarAdmin.css';

export const NavbarAdmin = ({ sidebarOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();
  const { user, startLogout } = useAuthStore();

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onLogout = () => {
    startLogout();
    navigate('/auth/login');
  };

  return (
   /*  <nav className="navbar-admin shadow-sm px-3"> 
     <div className="container-fluid d-flex justify-content-between align-items-center">  */
      
     <nav className={`navbar-admin shadow-sm px-3 ${sidebarOpen ? "sidebar-open" : ""}`}>
      
      <div className="container-fluid navbar-layout">
      {/* Área izquierda (botón hamburguesa o espacio vacío) */}
      <div className="navbar-left">
        {/* Botón Hamburguesa (oculto cuando sidebarOpen = true) */}
        {!sidebarOpen && (
          <button className="btn-menu" onClick={toggleSidebar}>
            <FaBars size="1.4em" />
          </button>
        )}
      </div>

        {/* Título centrado */}
        <h4 
          //className="navbar-title mb-0"
          className={` ${sidebarOpen ? "navbar-title mb-0" : "navbar-title2 mb-0"}`}
        >Administración</h4>

        {/* Usuario */}
        <div className="navbar-right" ref={dropdownRef}>
          <div
            className="navbar-user-wrapper"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <FaUserCircle className="navbar-user-icon" />
            <span className="navbar-user-name">{user.username}</span>
          </div>

          {/* Dropdown */}
          <div className={`navbar-dropdown ${openMenu ? "open" : ""}`}>
            <button className="dropdown-item">
              <FaUserCircle className="me-2" /> Mi Perfil
            </button>

            <NavLink to="/" className="dropdown-item">Home</NavLink>

            <button className="dropdown-item text-danger" onClick={onLogout}>
              Salir
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};


