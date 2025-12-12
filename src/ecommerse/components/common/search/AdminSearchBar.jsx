

import { useEffect, useState } from "react";
import './AdminSearch.css'

export const AdminSearchBar = ({
  placeholder = "Buscar...",
  fetchSuggestions,       // función async que recibe texto y devuelve array
  onSelectSuggestion,     // cuando el usuario hace clic
}) => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  // Fetch suggestions
  useEffect(() => {
    const text = searchText.trim();

    // SI EL INPUT ESTÁ VACÍO → LISTAR TODOS
    if (text.length === 0) {
      fetchSuggestions("");   // ← señal
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      const data = await fetchSuggestions(text);

      // Asegurar que results siempre sea array
      setResults(Array.isArray(data) ? data : []);
    }, 300);

    return () => clearTimeout(delay);
  }, [searchText]);

  const clearSearch = () => {
    setSearchText("");
    setResults([]);
    setIsFocused(false);
  };

  return (
    <div className="admin-search-wrapper position-relative">
      <input
        className="form-control admin-search-input"
        placeholder={placeholder}
        value={searchText}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => setSearchText(e.target.value)}
      />

        {/* Muestra las sugerencias de la busqueda - No es necesario porque la data se ve en la tabla */}
     {/*  <SearchSuggestions
        isFocused={isFocused}
        results={results}
        onSelect={onSelectSuggestion}
        clearSearch={clearSearch}
      /> */}
    </div>
  );
};

