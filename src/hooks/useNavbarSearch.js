
// src/components/navbar/hooks/useNavbarSearch.js
import { useState, useEffect, useRef } from "react";
import { useProduct } from "./useProduct";

export const useNavbarSearch = () => {
 
    //Dispatch para acceder a los reducer de archivoSlice mediante el store
    const { startGetProductByName, startLoadingActiveProducts } = useProduct();

    //Banderas maneja la búsqueda de productos
    const [searchText, setSearchText] = useState('');
    const [results, setResults] = useState([]); // Guarda resultados de búsqueda
    const [isFocused, setIsFocused] = useState(false); // Maneja el foco del input de búsqueda

    const debounceRef = useRef(null);

  // Buscar productos mientras escribe (auto-sugerencias)
  useEffect(() => {
    // Debounce: espera 300ms después del último cambio
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const q = (searchText || '').trim();
      if (q === '') {
        // limpia sugerencias y recarga todos los productos activos
        setResults([]);
        await startLoadingActiveProducts(0, 10); // recarga global segura
        return;
      }
      const items = await startGetProductByName(q);
      setResults(items || []);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchText]);

  const handleSubmitSearch = () => {
    const q = (searchText || '').trim();
    if (!q) return;
    // navegar a /search?query=... si tienes router (no agregado aquí)
    setIsFocused(false);
    setResults([]);
  };

  return {
    searchText, setSearchText, results, isFocused, setIsFocused, handleSubmitSearch
  };
};