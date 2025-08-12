import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const NavbarApp = () => {
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
                href="#"
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
                href="#"
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
                Mi Cuenta
              </a>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                <li>
                  <Link to="/auth/login" className="dropdown-item">
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link to="/auth/register" className="dropdown-item">
                    Registrarse
                  </Link>
                </li>
                 <li>
                  <Link to="/admin/dashbord" className="dropdown-item">
                    Administracion
                  </Link>
                </li>
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


