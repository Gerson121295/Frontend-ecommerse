
import '../../src/styles.css'

/**
 * QuantitySelector — control visual de cantidad.
 * No modifica el carrito por sí mismo; llama callbacks para que el padre decida.
 *
 * Props:
 *  - value (number) -> valor a mostrar
 *  - onIncrease () -> función a ejecutar cuando + presionado
 *  - onDecrease () -> función a ejecutar cuando - presionado
 *  - min (number) default 0
 *  - max (number) optional
 *  - className string optional
 */

export const QuantitySelector = ({
  value = 0,
  onIncrease = () => {},
  onDecrease = () => {},
  onReset = () => {},
  min = 0,
  max = undefined,
  className = "",
}) => {

  const handleDecrease = () => {
    if (value <= min) return;
    onDecrease();
  };

  const handleIncrease = () => {
    if (typeof max === "number" && value >= max) return; // Si hay max y se alcanzó, no aumenta
    onIncrease();
  };

  return (
    <div className={`d-flex align-items-center gap-2 ${className}`}>

    {onIncrease && (
      <button 
        className="btn btn-morado ms-3" 
        onClick={handleDecrease} 
        aria-label="decrease"
    >
        −
    </button>
    )}

      <input
        type="number"
        value={value}
        className="form-control text-center contorno-campo-estatico"
        /* value={value} */
        readOnly
        style={{ width: "70px" }}
      />

    {onDecrease && (
      <button 
        className="btn btn-morado ms-3" 
        onClick={handleIncrease} 
        aria-label="increase">
            +
        </button>
    )}
    {onReset && (
      <button
        className="btn btn-morado ms-3"
        onClick={onReset}
      >
        Reset
      </button>
    )}

    </div>
  );
};
