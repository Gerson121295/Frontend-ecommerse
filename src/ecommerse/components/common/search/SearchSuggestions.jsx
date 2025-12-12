
import { getEnvVariables } from '../../../../helpers/getEnvVariables';
import './AdminSearch.css'

//extrae la ruta principal para las peticions desde .env  variables de entorno
const { VITE_API_URL } = getEnvVariables();

export default function SearchSuggestions({
  isFocused,
  results,
  onSelect,
  clearSearch,
}) {
  //if (!isFocused || results.length === 0) return null;
   const safeResults = Array.isArray(results) ? results : [];
    if (!isFocused || safeResults.length === 0) return null;

  return (
    <ul className="admin-search-dropdown shadow-lg">
      {results.map((item) => (
        <li
          key={item.id}

          className="admin-search-item"
          onClick={() => {
            onSelect(item);
            clearSearch();
          }}
        >
          <div className="d-flex align-items-center gap-2">
            
            {/* Si trae imagen → úsala */}
            {VITE_API_URL + item.imageUrl && (
              <img src={VITE_API_URL + item.imageUrl} className="admin-search-thumb" />
            )}

            <div>
              <div className="admin-search-title">{item.label}</div>
              {item.subtitle && (
                <div className="admin-search-subtitle">{item.subtitle}</div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}


