// pages/Home.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useProduct } from '../../../hooks/useProduct';
import { useNavbarSearch } from '../../../hooks/useNavbarSearch';
import { NavbarApp } from '../../components/layout/Navbar/NavbarPublic/NavbarApp';
import { Footer } from '../../components/layout/Footer';
import { ProductCard } from '../../components/layout/ProductCard';

export const Home = () => {
  const dispatch = useDispatch();
  const { startLoadingActiveProducts } = useProduct();
  const { searchText } = useNavbarSearch(); // nos subscribimos al texto de búsqueda
  const { products, sizePagination } = useSelector(state => state.product);

  // carga inicial
  useEffect(() => {
    startLoadingActiveProducts(0, sizePagination || 10);
  }, []);

  // si el usuario borra el texto en el navbar -> recarga productos
  useEffect(() => {
    if ((searchText || '').trim() === '') {
      startLoadingActiveProducts(0, sizePagination || 10);
    }
  }, [searchText]);

  const handleSizeChange = (e) => {
    const newSize = Number(e.target.value) || 10;
    startLoadingActiveProducts(0, newSize);
  };

  return (
    <>
      <NavbarApp />
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
        
        {/* ... Contenido ... */}
        <section className="container mt-4">
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

          <div className="row justify-content-center g-4 mt-3">
            {Array.isArray(products) && products.length > 0
              ? products.map(product => <ProductCard key={product.id} product={product} />)
              : <div className="text-center">No hay productos</div>
            }
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
