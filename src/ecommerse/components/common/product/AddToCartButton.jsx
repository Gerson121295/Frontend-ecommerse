import '../../../../styles.css'

export const AddToCartButton = ({ onClick, children = "Agregar al carrito", className = "" }) =>{
    return (
    <button
      type="button"
      className={`btn btn-morado ms-3 ${className}`}

      onClick={onClick}
    >
      {children}
    </button>
  );
}