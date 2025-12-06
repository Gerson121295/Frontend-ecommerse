import { useParams} from "react-router-dom"
import { useProduct } from "../../../hooks/useProduct";
import { useEffect } from "react";
import { Footer, ProductCard } from "../../components/layout";
import { NavbarApp } from "../../components/layout/Navbar/NavbarPublic";


export const ProductByCategoryPage = () => {
    
    // useParams sirve para acceder a los parámetros dinámicos de la URL actual. 
    // Permite extraer la información de la URL, como el ID de un usuario o producto, y la devuelve como un objeto clave-valor para usarla en un componente
    const { categoriaId } = useParams();
    const { products, startSearchByCategory, isLoading,  currentPage, sizePagination } = useProduct();

    useEffect(() => {
        startSearchByCategory(categoriaId, currentPage, sizePagination );
    }, [categoriaId]); //useEffect se dispara cuando cambie id

     return (
    <>
    <NavbarApp/>

    <div className="container mt-4">
      <h3 className="mb-4 fw-bold">Productos de la categoría</h3>

      {isLoading && <p>Cargando productos...</p>}

      <div className="row">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No hay productos en esta categoría</p>
        )}
      </div>
    </div>

    <Footer />
    </>    
  );
}