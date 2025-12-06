
import { useEffect, useRef, useState } from "react";

/**
 * Hook useProduct para manejar un contador de productos
 * con límite máximo, mínimo 0, cambios controlados y reset.
 * @param {Object} params
 * @param {Object} params.product - Producto asociado
 * @param {Function=} params.onChange - Callback cuando cambia el contador
 * @param {number=} params.value - Valor inicial si no hay initialValues
 * @param {Object=} params.initialValues - Valores iniciales del contador
 * @param {number=} params.initialValues.count - Valor inicial del contador
 * @param {number=} params.initialValues.maxCount - Máximo permitido
 **/

export const useCounter = ({ product, onChange, value = 0, initialValues }) => {
  
  // Estado del contador
  const [counter, setCounter] = useState(
    initialValues?.count ?? value
  );

  // Ref para saber si el componente está montado
  const isMounted = useRef(false);

  /**
   * Cambia el contador sumando o restando una cantidad.
   * Si no se envía cantidad, usa 1 por defecto.
   *
   * @param {number} amount - Cantidad a incrementar (puede ser negativa)
   */
  const increaseBy = (amount = 1) => {
    let newValue = Math.max(counter + amount, 0);

    // Si hay un límite superior, se respeta
    if (initialValues?.maxCount !== undefined) {
      newValue = Math.min(newValue, initialValues.maxCount);
    }

    setCounter(newValue);

    // Notificar al padre si existe callback
    if (onChange) {
      onChange({
        count: newValue,
        product,
      });
    }
  };

  /** Decrementa en 1 o la cantidad especificada */
  const decreaseBy = (amount = 1) => {
    increaseBy(-Math.abs(amount)); // asegura que sea negativo
  };

  /** Reinicia al valor inicial */
  const reset = () => {
    setCounter(initialValues?.count ?? value);
  };

  /** Cambiar el contador manualmente   */
  const set = (newValue) => {
    let finalValue = Math.max(newValue, 0);

    if (initialValues?.maxCount !== undefined) {
      finalValue = Math.min(finalValue, initialValues.maxCount);
    }

    setCounter(finalValue);
  };

  /** Si cambia value o initialValues, actualiza el estado (solo después del montaje)  */
  useEffect(() => {
    if (!isMounted.current) return;

    setCounter(initialValues?.count ?? value);
  }, [initialValues, value]);

  // Marcar como montado
  useEffect(() => {
    isMounted.current = true;
  }, []);

  // Valores calculados
  const isMaxCountReached =
    initialValues?.maxCount !== undefined &&
    counter === initialValues.maxCount;

  return {
    // Datos
    counter,
    maxCount: initialValues?.maxCount ?? null,
    isMaxCountReached,

    // Métodos
    increaseBy,
    decreaseBy,
    reset,
    set,
  };
};