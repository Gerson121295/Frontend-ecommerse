
// src/components/navbar/hooks/useNavbarSearch.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "./useProduct";
import { useDispatch } from "react-redux";
import { onError, onLoadProducts } from "../store/product/productSlice";

export const useNavbarSearch = () => {
    const navigate = useNavigate();

    //Dispatch para acceder a los reducer de archivoSlice mediante el store
    const dispatch = useDispatch(); //hook to dispatch actions to the Redux store
    
    //Banderas maneja la búsqueda de productos
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([]); // Guarda resultados de búsqueda
    const [isFocused, setIsFocused] = useState(false); // Maneja el foco del input de búsqueda

    const { startGetProductByName, startLoadingActiveProducts } = useProduct(dispatch);

    useEffect(() => {
      startLoadingActiveProducts();
    },[])

  // Buscar productos mientras escribe (auto-sugerencias)
  useEffect(() => {
    const fetchResults = async () => {
      if (searchText.trim() === "") {
        dispatch(onLoadProducts([])); // Limpia productos en el store si el texto de búsqueda está vacío
        setResults([]); // Limpia resultados si el texto de búsqueda está vacío
        return;
      }

      try {
        const {data} = await startGetProductByName(searchText);
        dispatch(onLoadProducts(data)); // Actualiza el store con los productos obtenidos 
        setResults(Array.isArray(data) ? data : []); // Actualiza resultados de búsqueda
      } catch(error) {
        console.error(error);
        dispatch(onError('Error al cargar productos'));
      }
    };

    const delay = setTimeout(fetchResults, 300); // debounce, espera 300ms después de que el usuario deja de escribir
    return () => clearTimeout(delay); // Limpia el timeout si el componente se desmonta o searchText cambia
  }, [searchText]);//Hook se dispara cuando searchText cambia


  // Buscar y navegar al presionar ENTER
  const handleSubmitSearch = () => {  //  (e) => {
    // e?.preventDefault(); // prevenir recarga de pagina, si e es definido
    
    //if (!searchText.trim()) return;
    const q = searchText.trim(); // obtener el texto buscado sin espacios
    if (!q) return; // si el texto esta vacio, no hacer nada
    
    if (searchText.trim() !== "") { //si el texto buscado no esta vacio
    //redirecciona a la pagina de busqueda con el texto buscado como query param
    //encodeURIComponent para manejar caracteres especiales, espacios, etc. por lo tanto es seguro para URLs y evita problemas de formato.
      navigate(`/search?query=${encodeURIComponent(q)}`); 
      setIsFocused(false);
      setResults([]); //limpia los resultados de busqueda
      dispatch(onLoadProducts([])); // Limpia productos en el store si el texto de búsqueda está vacío
    };
  };

  return {
    searchText,
    results,
    isFocused,

    setSearchText,
    setIsFocused,
    setResults,
    handleSubmitSearch,
  };
};
