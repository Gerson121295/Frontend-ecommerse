import { FaShoppingCart } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../../hooks/useAuthStore';
import { useSelector } from 'react-redux';
import { useCategory } from '../../../../../hooks/useCategory';
import './NavbarApp.css';
import { useEffect, useState } from 'react';
import { useProduct } from '../../../../../hooks/useProduct';
import { getEnvVariables } from '../../../../../helpers/getEnvVariables';

export const NavbarAppFull = () => {

  //extrae la ruta principal para las peticions desde .env  variables de entorno
  const { VITE_API_URL } = getEnvVariables();
  const navigate = useNavigate(); //obtener la navegacion

  //Extrae propiedades y funciones de hooks
  const { startLogout } = useAuthStore(); //extrae la funcion startLogout del hook useAuthStore
  const { categories, startLoadingAllCategories  } = useCategory();
  const { startGetProductByName} = useProduct();

  //Banderas maneja la búsqueda de productos
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

   // Obtenemos el estado auth del store
  const {status, user, isAdmin, isAssistant,  isUser} = useSelector((state) => state.auth);

  const isAuthenticated = status === 'authenticated';
  const userRoles = Array.isArray(user?.roles) ? user.roles : [];


   // Detecta cambios pero no dispara inmediatamente (DEBOUNCE)
  useEffect(() => {
    if (searchText.trim() === "") {
      setResults([]);
      //startLoadingProductspaginated(0, sizePagination, products.nombre);
      return;
    }
    const delay = setTimeout(async () => {
      const productos = await startGetProductByName(searchText);
      setResults(productos);
    }, 300);

    return () => clearTimeout(delay);
  }, [searchText]);


  useEffect(() => {
    startLoadingAllCategories(); // Cargar categorías al iniciar
  }, []); //useEffect se dispara al recargar el navegador 1 vez y carga todas las categorias

 
  const onLogout = () => {
    startLogout(); //llama la funcion startLogout del hook useAuthStore 
    navigate('/auth/login'); //navega a la pagina de login
  };

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


    //Codigo al buscar producto redirije a una pagina de resultados de la busqueda
    // Submit search (enter or button)
  const handleSubmitSearch = (e) => {
     e?.preventDefault(); // prevenir recarga de pagina, si e es definido
    const q = searchText.trim(); // obtener el texto buscado sin espacios
    if (!q) return; // si el texto esta vacio, no hacer nada

    if (searchText.trim() !== "") { //si el texto buscado no esta vacio
      //redirecciona a la pagina de busqueda con el texto buscado como query param
      //encodeURIComponent para manejar caracteres especiales, espacios, etc. por lo tanto es seguro para URLs y evita problemas de formato.
      navigate(`/search?query=${encodeURIComponent(q)}`); 
      setIsFocused(false);
      setResults([]); //limpia los resultados de busqueda
    };
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-2">
      <div className="container">

        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
          <img src="/src/assets/img/img-app/logo-moto.png" alt="Logo" height="40" />
        </Link>

        {/* Botón hamburguesa - Toggle Mobile */}
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
          
          {/* LEFT (desktop): Categories */}
          <ul className="navbar-nav me-auto d-none d-lg-flex align-items-center">
            <li className="nav-item dropdown position-relative">
              <a className="nav-link dropdown-toggle fw-semibold custom-dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categorías
              </a>
              <ul className="dropdown-menu custom-dropdown shadow">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link 
                      className="dropdown-item"
                      to={`/categories/${category.id}`}
                    >
                      {category.nombreCategoria}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          {/* Centro - Buscador */}
          {/* CENTER: Buscador (desktop) */}
          <div className="mx-auto d-none d-lg-block" style={{ maxWidth: 520, width: "100%" }}>
            <div className="search-wrapper position-relative">
              <form onSubmit={handleSubmitSearch}>
                <input
                  className="form-control contorno-campo-morado"
                  placeholder="Buscar productos..."
                  value={searchText}
                  onFocus={() => setIsFocused(true)}
                  onChange={(e) => setSearchText(e.target.value)}

                  //Codigo al buscar producto redirije a una pagina de resultados de la busqueda
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmitSearch(e);
                  }}
                  onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                />
          </form>

          {/* Dropdown de sugerencias */}
          {isFocused && results.length > 0 && (
            <ul className="search-dropdown shadow-lg">
              {results.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/productos/${item.id}`} //  /productos/:id  <- al rederigir a esta ruta renderiza el componente <InfoProduct />
                    className="dropdown-item-custom"
                    onClick={() => {
                      setSearchText("");
                      setResults([]);
                      setIsFocused(false);
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={VITE_API_URL + item.imageUrl}
                        alt={item.nombre}
                        className="search-img"
                      />
                      <span>{item.nombre}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>

          {/* RIGHT (desktop): lang / account / cart */}
          <ul className="navbar-nav ms-auto align-items-center d-none d-lg-flex">
            {/* Language */}
            <li className="nav-item dropdown me-3">
              <a className="nav-link dropdown-toggle fw-semibold" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                ES
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">ES</a></li>
                <li><a className="dropdown-item" href="#">EN</a></li>
              </ul>
            </li>


              {/* Account */}
            <li className="nav-item dropdown me-3">
              <a className="nav-link dropdown-toggle fw-semibold" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {isAuthenticated ? displayName : "Mi Cuenta"}
              </a>
              <ul className="dropdown-menu shadow">
                {!isAuthenticated ? (
                  <>
                    <li><NavLink to="/auth/login" className="dropdown-item">Iniciar Sesión</NavLink></li>
                    <li><NavLink to="/auth/register" className="dropdown-item">Registrarse</NavLink></li>
                  </>
                ) : (
                  <>
                    {hasAdminAccess && (
                      <>
                        <li><Link to="/admin/dashboard" className="dropdown-item">Administración</Link></li>
                        <li><Link to="/admin/register-user" className="dropdown-item">Registrar Usuario</Link></li>
                      </>
                    )}
                    <li><button className="dropdown-item" onClick={onLogout}>Salir</button></li>
                  </>
                )}
              </ul>
            </li>

            {/* Cart */}
            <li className="nav-item position-relative ms-2">
              <Link className="nav-link" to="/cart">
                <FaShoppingCart size={20} className="text-morado" />
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">2</span>
              </Link>
            </li>
          </ul>

      {/* ================= MOBILE CONTENT (inside collapse) ================= */}

        <div className="d-lg-none w-100 mt-2">

            {/* Row: Categorías (input style) + Buscar (stacked visually but grouped) */}
            <div className="d-flex gap-2 align-items-start mb-2">
              {/* Category as input-like (left) */}
              <div style={{ flexBasis: "48%", minWidth: 0 }}>
                <div className="nav-item">
                  <a
                    className="form-control contorno-campo-morado text-start category-as-input d-flex align-items-center"
                    data-bs-toggle="collapse"
                    href="#mobileCategoriesList"
                    role="button"
                    aria-expanded="false"
                    aria-controls="mobileCategoriesList"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span>Categorías</span>
                  </a>
                  <div className="collapse mt-2" id="mobileCategoriesList">
                    <ul className="list-unstyled mobile-categories-list shadow-sm p-2 rounded">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <Link className="dropdown-item" to={`/categories/${category.id}`}>
                            {category.nombreCategoria}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Search input (right) */}
              <div style={{ flexBasis: "52%", minWidth: 0 }} className="search-wrapper position-relative">
                <form onSubmit={handleSubmitSearch}>
                  <input
                    className="form-control contorno-campo-morado"
                    placeholder="Buscar productos..."
                    value={searchText}
                    onFocus={() => setIsFocused(true)}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSubmitSearch(e);
                    }}
                    onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                  />
                </form>

                {isFocused && results.length > 0 && (
                  <ul className="search-dropdown shadow-lg">
                    {results.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={`/productos/${item.id}`}
                          className="dropdown-item-custom"
                          onClick={() => {
                            setSearchText("");
                            setResults([]);
                            setIsFocused(false);
                          }}
                        >
                          <div className="d-flex align-items-center">
                            <img src={VITE_API_URL + item.imageUrl} alt={item.nombre} className="search-img" />
                            <span>{item.nombre}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Row: idioma, cuenta y carrito - as nav dropdowns (compact) */}
            <div className="d-flex gap-2 align-items-center">
              {/* Language */}
              <div className="nav-item dropdown flex-shrink-0">
                <a className="nav-link p-2" data-bs-toggle="dropdown" href="#!" role="button" aria-expanded="false">ES</a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">ES</a></li>
                  <li><a className="dropdown-item" href="#">EN</a></li>
                </ul>
              </div>

              {/* Account */}
              <div className="nav-item dropdown flex-grow-1">
                <a className="nav-link p-2 text-start w-100" data-bs-toggle="dropdown" href="#!" role="button" aria-expanded="false">
                  {isAuthenticated ? displayName : "Mi Cuenta"}
                </a>
                <ul className="dropdown-menu shadow">
                  {!isAuthenticated ? (
                    <>
                      <li><NavLink to="/auth/login" className="dropdown-item">Iniciar Sesión</NavLink></li>
                      <li><NavLink to="/auth/register" className="dropdown-item">Registrarse</NavLink></li>
                    </>
                  ) : (
                    <>
                      {hasAdminAccess && (
                        <>
                          <li><Link to="/admin/dashboard" className="dropdown-item">Administración</Link></li>
                          <li><Link to="/admin/register-user" className="dropdown-item">Registrar Usuario</Link></li>
                        </>
                      )}
                      <li><button className="dropdown-item" onClick={onLogout}>Salir</button></li>
                    </>
                  )}
                </ul>
              </div>

              {/* Cart */}
              <div className="flex-shrink-0">
                <Link to="/cart" className="nav-link p-2 position-relative">
                  <FaShoppingCart size={18} className="text-morado" />
                  <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">2</span>
                </Link>
              </div>
            </div>
          </div>
          {/* ================ end mobile content ================ */}
        </div>
      </div>
    </nav>   

  );
};

