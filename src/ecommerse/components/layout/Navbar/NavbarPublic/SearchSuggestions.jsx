

// components/SearchSuggestions.jsx
import { Link } from 'react-router-dom';
const { VITE_API_URL } = import.meta.env;

export const SearchSuggestions = ({ isFocused, results, clearSearch }) => {
  const safeResults = Array.isArray(results) ? results : [];
  if (!isFocused || safeResults.length === 0) return null;
  return (
    <ul className="search-dropdown shadow-lg">
      {safeResults.map(item => (
        <li key={item.id}>
          <Link to={`/productos/${item.id}`} className="dropdown-item-custom" onClick={clearSearch}>
            <div className="d-flex align-items-center">
              <img src={(VITE_API_URL || '') + item.imageUrl} alt={item.nombre} className="search-img" />
              <span>{item.nombre}</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
