

export const InfoProduct = () => {
  return (
    <div className="container my-5">
      <div className="row">
        {/* Imagen del producto */}
        <div className="col-md-5 mb-4">
          <img
            src="/src/assets/img/productos/bebidas/de la granja 1890ml.png"
            className="img-fluid border"
            alt="Producto principal"
          />
        </div>

        {/* Detalles del producto */}
        <div className="col-md-7">
          <h5 className="mb-3">ARAGOR 5G/10 ML * 15 AMPOLLAS BEBIBLES</h5>
          <p className="fw-bold fs-5">Precio Q 256.20</p>

          <ul className="list-unstyled mb-3">
            <li>
              <strong>SKU:</strong> 19013
            </li>
            <li>
              <strong>Categoría:</strong> MEDICAMENTOS DE MARCA
            </li>
            <li>
              <strong>Departamento:</strong> MEDICAMENTOS FARMACIA
            </li>
            <li>
              <strong>Marca:</strong> ARAGOR
            </li>
          </ul>

          {/* Controles de cantidad y botón */}
          <div className="d-flex align-items-center gap-2 mb-4">
            <button className="btn btn-morado">−</button>
            <input
              type="number"
              value="1"
              className="form-control text-center contorno-campo-estatico"
              style={{ width: "60px" }}
              readOnly
            />
            <button className="btn btn-morado">+</button>
            <button className="btn btn-morado ms-3">Agregar al carrito</button>
          </div>
        </div>
      </div>

      {/* Tabla de características */}
      <div className="mt-5">
        <h6>Features</h6>
        <div className="table-responsive">
          <table className="table table-bordered mt-3">
            <tbody>
              <tr>
                <th className="w-25">PRINCIPIO ACTIVO</th>
                <td>ACEITE MINERAL</td>
              </tr>
              <tr>
                <th>INDICACIONES</th>
                <td>ESTREÑIMIENTO. TAMBIÉN SUAVIZA LA PIEL.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
