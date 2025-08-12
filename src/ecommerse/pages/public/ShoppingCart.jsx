import { FaTrashAlt } from 'react-icons/fa';


export const ShoppingCart = () => {
  return (
    <div className="container my-5">
      <h5 className="mb-4">CARRITO DE COMPRAS</h5>

      <div className="row">
        {/* Lista de productos */}
        <div className="col-lg-8">
          {/* Producto 1 */}
          <div className="d-flex border-bottom pb-3 mb-3">
            <img
              src="/src/assets/img/productos/bebidas/Coca-cola 2.5L.png"
              className="img-fluid me-3"
              alt="Producto 1"
              style={{ width: '120px', height: '90px', objectFit: 'contain' }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-1">ARAGOR 5G/10 ML * 15 AMPOLLAS BEBIBLES</h6>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-blanco-morado btn-sm">−</button>
                <input
                  type="number"
                  value="2"
                  className="form-control text-center contorno-campo-estatico"
                  style={{ width: '60px' }}
                  readOnly
                />
                <button className="btn btn-blanco-morado btn-sm">+</button>
                <span className="ms-auto fw-semibold">Q256.20</span>
                {/* <a href="#" className="ms-3 text-danger small">Eliminar</a> */}
                <button className="btn btn-link text-danger p-0 ms-3" title="Eliminar">
                    <FaTrashAlt size={16} />
                </button>

              </div>
            </div>
          </div>

          {/* Producto 2 */}
          <div className="d-flex border-bottom pb-3 mb-3">
            <img
              src="/src/assets/img/productos/bebidas/Coca Cola Light Lata.png"
              className="img-fluid me-3"
              alt="Producto 2"
              style={{ width: '120px', height: '90px', objectFit: 'contain' }}
            />
            <div className="flex-grow-1">
              <h6 className="mb-1">ALCOHOL GEL (FARBIOX) * 120ML</h6>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-blanco-morado btn-sm">−</button>
                <input
                  type="number"
                  value="1"
                  className="form-control text-center contorno-campo-estatico"
                  style={{ width: '60px' }}
                  readOnly
                />
                <button className="btn btn-blanco-morado btn-sm">+</button>
                <span className="ms-auto fw-semibold">Q10.05</span>
                {/* <a href="#" className="ms-3 text-danger small">Eliminar</a> */}
                <button className="btn btn-link text-danger p-0 ms-3" title="Eliminar">
                    <FaTrashAlt size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resumen de orden */}
        <div className="col-lg-4">
          <div className="bg-light p-4 rounded">
            <h6 className="mb-3">RESUMEN DE ORDEN</h6>
            <div className="d-flex justify-content-between mb-2">
              <span>SUBTOTAL</span>
              <span className="fw-bold">Q522.45</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>GASTOS ENVÍO</span>
              <span className="fw-bold">Q0.00</span>
            </div>
            <div className="d-flex justify-content-between border-top pt-2 mb-4">
              <span>TOTAL</span>
              <span className="fw-bold">Q522.45</span>
            </div>
            <button className="btn btn-morado w-100">PAGAR</button>
          </div>
          <div className="mt-3">
            <a href="#" className="text-decoration-none fw-semibold text-morado">
              &lt; SEGUIR COMPRANDO
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
