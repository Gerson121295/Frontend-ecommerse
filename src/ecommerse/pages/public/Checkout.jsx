import '../public/Checkout.css';

export const Checkout = () => {
  return (
    <div className="container my-5">
      <div className="row">
        {/* Formulario */}
        <div className="col-lg-8">
          <div className="border p-4 rounded shadow-sm">
            <h4 className="fw-bold mb-4" style={{ color: '#6c3483' }}>
              Información de Contacto
            </h4>

            <form>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Nombre Completo *
                </label>
                <input type="text" className="form-control contorno-campo-morado" id="nombre" />
              </div>

              <div className="mb-3">
                <label htmlFor="telefono" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Teléfono *
                </label>
                <input type="text" className="form-control contorno-campo-morado" id="telefono" />
              </div>

              <div className="mb-4">
                <label htmlFor="correo" className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Correo Electrónico *
                </label>
                <input type="email" className="form-control contorno-campo-morado" id="correo" />
              </div>

              {/* Departamento, Municipio */}
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                    Departamento *
                  </label>
                  <select className="form-select contorno-campo-morado">
                    <option selected>Seleccione una opción</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                    Municipio *
                  </label>
                  <select className="form-select contorno-campo-morado">
                    <option selected>Seleccione una opción</option>
                  </select>
                </div>
              </div>

              {/* Zona, Barrio */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                    Zona *
                  </label>
                  <select className="form-select contorno-campo-morado">
                    <option selected>Seleccione una opción</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                    Barrio / Aldea *
                  </label>
                  <select className="form-select contorno-campo-morado">
                    <option selected>Seleccione una opción</option>
                  </select>
                </div>
              </div>

              {/* Método de entrega */}
              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ color: '#6c3483' }}>
                  Método de Entrega
                </label>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="metodoEntrega" id="domicilio" defaultChecked />
                  <label className="form-check-label" htmlFor="domicilio">
                    Entrega a Domicilio
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="metodoEntrega" id="local" />
                  <label className="form-check-label" htmlFor="local">
                    Recoger en Local
                  </label>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn fw-bold btn-blanco-morado"
                >
                  Realizar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Resumen de orden */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="bg-light p-4 rounded">
            <h6 className="mb-3">RESUMEN DE ORDEN</h6>
            <div className="d-flex justify-content-between mb-2">
              <span>SUBTOTAL</span>
              <span className="fw-bold">Q522.45</span>
            </div>
            <div className="d-flex justify-content-between border-top pt-2 mb-4">
              <span>TOTAL</span>
              <span className="fw-bold">Q522.45</span>
            </div>
           {/*  <button className="btn btn-morado w-100">Continuar</button> */}
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
