import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../hooks/useAuthStore';
import { useSelector } from 'react-redux';

export const NavbarApp = () => {

  const navigate = useNavigate(); //obtener la navegacion

  const {startLogout} = useAuthStore(); //extrae la funcion startLogout del hook useAuthStore

  // Obtenemos el estado auth del store
  const {status, user, isAdmin, isAssistant,  isUser} = useSelector((state) => state.auth);

  const onLogout = () => {
    startLogout(); //llama la funcion startLogout del hook useAuthStore 
    navigate('/auth/login'); //navega a la pagina de login
  };

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


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">

        {/* Logo */}
      <Link to="/" className="navbar-brand">
        <img src="/src/assets/img/img-app/logo-moto.png" alt="Logo" height="40" />
      </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Contenido colapsable */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Izquierda - Categorías */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="categoriasDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorías
              </a>
              <ul className="dropdown-menu" aria-labelledby="categoriasDropdown">
                <li><a className="dropdown-item" href="#cat1">Cuidado personal</a></li>
                <li><a className="dropdown-item" href="#cat2">Vitaminas</a></li>
                <li><a className="dropdown-item" href="#cat3">Infantil</a></li>
              </ul>
            </li>
          </ul>

          {/* Centro - Buscador */}
          <form className="d-flex mx-auto" style={{ maxWidth: '500px', width: '100%' }}>
            <input
              className="form-control me-2 contorno-campo-morado"
              type="search"
              placeholder="Buscar"
              aria-label="Buscar"
            />
            <button className="btn btn-morado" type="submit">
              Buscar
            </button>
          </form>

          {/* Derecha - Idioma, Cuenta, Carrito */}
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Idioma */}
            <li className="nav-item dropdown me-3">
              <a
                className="nav-link dropdown-toggle"
                id="langDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                ES
              </a>
              <ul className="dropdown-menu" aria-labelledby="langDropdown">
                <li><a className="dropdown-item" href="#">ES</a></li>
                <li><a className="dropdown-item" href="#">EN</a></li>
              </ul>
            </li>

            {/* Cuenta */}
            <li className="nav-item dropdown me-3">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >

                {isAuthenticated ? displayName : "Mi Cuenta"}

              </a>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">

                {/* Si el usuario no esta autenticado */}
                {!isAuthenticated ? ( 
                <>
                <li>
                  <NavLink to="/auth/login" className="dropdown-item">
                    Iniciar Sesión
                  </NavLink>
                </li>

  
                <li>
                  <NavLink to="/auth/register" className="dropdown-item">
                    Registrarse
                  </NavLink>
                </li>


                </>
                ):(
                  <>
                {/* Si el usuario esta autenticado muestra las opciones de cuenta*/}
                {hasAdminAccess && (     //(isAdmin || isAssistant) && ( 
                <>
                  <li>
                    <Link to="/admin/dashboard" className="dropdown-item">
                      Administración
                    </Link>
                  </li>

                  <li>
                    <Link to="/admin/register-user" className="dropdown-item">
                      Registrar Usuario
                    </Link>
                  </li>
                </>
                )}

                 <li>
{/*                   <NavLink to="/auth/login" className="dropdown-item" onClick={ onLogout }>
                    Salir
                  </NavLink> */}
                       <button
                        className="dropdown-item"
                        onClick={onLogout}
                        style={{ cursor: "pointer" }}
                      >
                        Salir
                      </button>
                </li>

                </> 
                )}
              </ul>
            </li>

            {/* Carrito */}
            <li className="nav-item position-relative">
              <a className="nav-link" href="/cart">
                <FaShoppingCart size={20} color="#6c3483" />
                <span className="ms-1">Q285.80</span>
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: '0.6rem' }}
                >
                  2
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};


