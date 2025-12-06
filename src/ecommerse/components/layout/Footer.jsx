
import { BsFacebook, BsInstagram, BsTiktok } from 'react-icons/bs'; // Elige tu opción

import { useDispatch} from 'react-redux';
import './Footer.css';
import { useCategory } from '../../../hooks/useCategory';
import {  useEffect } from 'react';

export const Footer = () => { //  ({categories})  puede recibir las categorias como props o traerlas del store

  const dispatch = useDispatch();
  const { startLoadingAllCategories, categories } = useCategory(dispatch);
  //const { categories} = useSelector((state) => state.category);

   useEffect(() => {
    startLoadingAllCategories();
  }, []);

  return (
   <footer className="footer">
  <div className="footer-container">

    {/* LOGO + TEXTO */}
    <div className="footer-section footer-brand">
      <img src="/src/assets/img/img-app/logo-moto.png" alt="Pedidos Morazán" className="footer-logo" />
      <p className="footer-subtitle">Compra en confianza</p>
    </div>

    {/* CATEGORÍAS */}
    <div className="footer-section">
      <h4 className="footer-title">Categorías</h4>
      {categories.length > 0 ? (
        <ul className="footer-list">
          {categories.map((category) => (
            <li key={category.id}>{category.nombreCategoria}</li>
          ))}
        </ul>
      ) : (
        <p className="footer-text">Cargando categorías...</p>
      )}
    </div>

    {/* ENLACES */}
    <div className="footer-section">
      <h4 className="footer-title">Comprar</h4>
      <ul className="footer-list">
        <li>Términos de uso</li>
        <li>Política de privacidad</li>
      </ul>
    </div>

    {/* SUSCRIPCIÓN */}
    <div className="footer-section">
      <h4 className="footer-title">Suscríbete</h4>
    {/*   <p className="footer-text">Recibe ofertas y novedades.</p>

      <div className="footer-input-group">
        <input type="email" placeholder="Tu correo electrónico" />
        <button>OK</button>
      </div> */}

       <div className="footer-socials">
        <a href="#"><BsFacebook /></a>
        <a href="#"><BsInstagram /></a>
        <a href="#"><BsTiktok /></a>
      </div>
    </div>
  </div>

  <hr className="footer-divider" />

  <p className="footer-copy">
    © 2025 MotoShop — Todos los derechos reservados.
  </p>
</footer>
  );
};
