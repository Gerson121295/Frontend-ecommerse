import { useDispatch, useSelector } from "react-redux";
import { Footer, ProductCard } from "../../components/layout";
import { useProduct } from "../../../hooks/useProduct";
import { useEffect } from "react";
import './Home.css'
import { NavbarApp } from "../../components/layout/Navbar/NavbarPublic";

export const Home = () => {

  const dispatch = useDispatch();

  //useProduct se le pasa el dispatch para poder usar las acciones de redux dentro del hook y asi manejar el estado global de los productos.
  const {startLoadingActiveProducts } = useProduct(dispatch);
  
  const { products, sizePagination, 
        } = useSelector((state) => state.product);

  //Carga los productos 1 vez para que la data se guarde en redux
  useEffect(() => {
    startLoadingActiveProducts(0, sizePagination); //carga inicial
  }, []);

   // Cambiar cantidad a mostrar
  const handleSizeChange = (e) => {
    const newSize = Number(e.target.value);
    startLoadingActiveProducts(0, newSize);
  };

  return (
    <>
          <NavbarApp/>

     <div className="home-wrapper">

      {/* HERO RESPONSIVO */}
        <section className="hero-full">
          <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">

            <div className="carousel-inner">

              <div className="carousel-item active" data-bs-interval="3000">
                <img src="/src/assets/img/img-app/Product-abarrotes.png" className="hero-img" />
              </div>

              <div className="carousel-item" data-bs-interval="3000">
                <img src="/src/assets/img/img-app/mapa-sin-color.png" className="hero-img" />
              </div>

              <div className="carousel-item" data-bs-interval="3000">
                <img src="/src/assets/img/img-app/logo-moto.png" className="hero-img" />
              </div>

            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
            </button>

            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
            </button>

          </div>
        </section>

         {/* CONTENIDO */}
        <section className="container mt-4">

          {/* TÍTULO + SELECT RESPONSIVO */}
          <div className="home-header-flex">
            <h3 className="section-title">Artículos más vendidos</h3>

            <select
              className="form-select shadow-sm selector-modern"
              style={{ width: "150px" }}
              value={sizePagination}
              onChange={handleSizeChange}
            >
              <option value="5">Mostrar 5</option>
              <option value="10">Mostrar 10</option>
              <option value="15">Mostrar 15</option>
            </select>
          </div>

          {/* GRID DE PRODUCTOS */}
          <div className="row justify-content-center g-4 mt-3">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </section>

      </div>
      <Footer />
    </>
  );
};

