


import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SearchResultsPage.css";
import { useProduct } from "../../../hooks/useProduct";
import { getEnvVariables } from "../../../helpers/getEnvVariables";
import { Footer, ProductCard } from "../../components/layout";
import { NavbarApp } from "../../components/layout/Navbar/NavbarPublic";

export const SearchResultsPage = () => {

  //extrae la ruta principal para las peticions desde .env  variables de entorno
  const { VITE_API_URL } = getEnvVariables();

  const { startGetProductByName, products} = useProduct();

  // Obtener el término de búsqueda de la URL
  const { search } = useLocation(); 

  // Extraer el valor del parámetro 'query' que es el nombre del producto a buscar
  //URLSearchParams es una interfaz que proporciona métodos para trabajar con los parámetros de consulta de una URL.
  const query = new URLSearchParams(search).get("query") || ""; // Valor por defecto si no existe

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

   const fetchData = async () => { // Función asíncrona para obtener datos
      if (query.trim() === "") return; //Si no se ha escrito nada, sale con return

      //si se escribio entonces carga el loading en true
      setLoading(true);
      const data = await startGetProductByName(query); //carga la data de producto buscado
      
      setResults(data); //se utiliza o establece data cuando en el startGetProductByName se define: return data.content
      //setResults(products); //establece a results productos que vienen en redux
      setLoading(false);
    };

  useEffect(() => {
    fetchData();
  }, [query]);

  return (
    <>
    <NavbarApp />
    <div className="container py-4">

      <h3 className="fw-bold mb-4">
        Resultados para: <span className="text-primary">"{query}"</span>
      </h3>

      {loading && <p>Cargando resultados...</p>}

      {!loading && results.length === 0 && (
        <p className="text-muted no-results">No se encontraron productos.</p>
      )}

      {/* GRID DE PRODUCTOS */}


      <div className="row g-4">


{/*         {results.map(product => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card shadow-sm product-card">
              
              <img
                src={VITE_API_URL + product.imageUrl}
                className="card-img-top product-img"
                alt={product.nombre}
              />

              <div className="card-body">
                <h6 className="card-title text-dark fw-semibold">
                  {product.nombre}
                </h6>

                <p className="text-primary fw-bold mb-2">
                  Q{product.precioUnitario}
                </p>

                <Link
                  //href={`/product/${product.id}`}
                    to={`/productos/${product.id}`} //  /productos/:id
                  className="btn btn-morado w-100"
                >
                  Ver detalle
                </Link>
              </div>

            </div>
          </div>
        ))} */}

        {/* Usando el componente ProductCard para renderizar cada producto */}
        {results.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
    </div>

    <Footer />
    </>
  );
};

