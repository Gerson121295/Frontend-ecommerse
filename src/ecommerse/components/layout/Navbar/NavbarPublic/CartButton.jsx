
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import './CartButton.css'

/**
 * CartButton — muestra la cantidad total (badge) desde Redux (cart.totalItems)
 */

export const CartButton = () => {
  const totalItems = useSelector((state) => state.cart?.totalItems || 0);

  const [shake, setShake] = useState(false);
  const [pop, setPop] = useState(false);

  const isDisabled = totalItems === 0;

  // Animación cuando cambia totalItems
  useEffect(() => {
    if (totalItems > 0) {
      setShake(true);
      setPop(true);

      const timer1 = setTimeout(() => setShake(false), 500);
      const timer2 = setTimeout(() => setPop(false), 300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [totalItems]);

  return (
    <Link
      to={isDisabled ? "#" : "/cart"}
      className={`nav-link position-relative cart-button ${isDisabled ? "cart-disabled" : ""}`}
      aria-disabled={isDisabled}
      onClick={(e) => isDisabled && e.preventDefault()}
      title={isDisabled ? "Carrito vacío" : "Ver carrito"}
    >
      <FaShoppingCart
        size={20}
        className={`fa-lg ${isDisabled ? "text-morado-disabled" : "text-morado"}
          ${shake ? "shake" : ""}`}
      />

      <span
        className={`badge position-absolute top-0 start-100 translate-middle badge-modern 
          ${isDisabled ? "bg-morado-disabled" : "bg-danger"} 
          ${pop ? "pop" : ""}`}
      >
        {totalItems}
      </span>
    </Link>
  );
};



