
import { FaUserCircle } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';

export const NavbarAdmin = ({ sidebarOpen }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const dropdownRef = useRef();

  const navigate = useNavigate(); //obtener la navegacion
  const {startLogout} = useAuthStore(); //extrae la funcion startLogout del hook useAuthStore


  // Cerrar el menú si se hace clic fuera
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
    startLogout(); //llama la funcion startLogout del hook useAuthStore 
    navigate('/auth/login'); //navega a la pagina de login
  };

  return (
    <nav
        className="navbar bg-white shadow-sm px-4 position-sticky top-0"
        style={{
        height: '64px',
        zIndex: 1020,
  }}

    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="flex-grow-1 d-flex justify-content-center">
          <h4
            className="fw-bold mb-0"
            style={{
              color: '#4a148c',
              transition: 'margin 0.3s ease',
            }}
          >
            Panel de Administracion
          </h4>
        </div>

        {/* 👤 Usuario */}
        <div className="d-flex align-items-center position-relative" ref={dropdownRef}>
          <div
            className="d-flex align-items-center cursor-pointer"
            onClick={() => setOpenMenu(!openMenu)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/src/assets/img/productos/abarrotes/Arroz Blanco La Cosecha.png"
              alt="User avatar"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <div className="d-none d-md-block text-start">
              <div className="fw-semibold">John Doe</div>
              <small className="text-muted">admin@sneat.com</small>
            </div>
          </div>

          {openMenu && (
            <div
              className="dropdown-menu show"
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
              }}
            >
              <button className="dropdown-item">
                <FaUserCircle className="me-2" />
                My Profile
              </button>
              <NavLink to="/" className="dropdown-item">
                  Home
              </NavLink>
              <button
                className="dropdown-item text-danger"
                onClick={onLogout}
                style={{ cursor: "pointer" }}
              >
                Salir
              </button>            
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};



