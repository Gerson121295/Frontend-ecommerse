
// src/components/navbar/SearchSuggestions.jsx
import { Link } from "react-router-dom";
import { getEnvVariables } from "../../../../../helpers/getEnvVariables";


const { VITE_API_URL } = getEnvVariables();

export const SearchSuggestions = ({
  isFocused,
  results, //resultados de la busqueda, tambien se puede obtener del store mediante products
  clearSearch, //funcion para limpiar la busqueda
}) => {

  const safeResults = Array.isArray(results) ? results : [];
  if (!isFocused || safeResults.length === 0) return null;

  return (
    <ul className="search-dropdown shadow-lg">
      {results.map((item) => (
        <li key={item.id}>
          <Link
            to={`/productos/${item.id}`}
            className="dropdown-item-custom"
            onClick={clearSearch}
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
  );
};

