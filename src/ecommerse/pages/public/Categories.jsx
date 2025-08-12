


export const Categories = () => {
  return (
    <div className="container my-5">
      {/* Título y filtros */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0" style={{ color: '#6c3483' }}>
          ACEITES
        </h4>
        <div className="d-flex align-items-center gap-2">
          <label className="fw-semibold me-1 mb-0">Sort by:</label>
          <select className="form-select form-select-sm" style={{ width: '120px' }}>
            <option>A - Z</option>
            <option>Z - A</option>
            <option>Mayor precio</option>
            <option>Menor precio</option>
          </select>

          <label className="fw-semibold ms-3 me-1 mb-0">See:</label>
          <div className="btn-group" role="group">
            <button className="btn btn-outline-secondary btn-sm active">
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Result count */}
      <p className="text-muted">4 results.</p>

      {/* Productos */}
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 g-4">
        {[
          {
            nombre: '*BILAXTEN 20 MG TAB 90 TAB',
            precio: 'Q218.30',
            imagen: '/src/assets/img/productos/abarrotes/anchor1400g.png',
          },
          {
            nombre: 'LEVETIRACETAM (MK) 1G * 30 TABLETAS - 5807',
            precio: 'Q362.61',
            imagen: '/src/assets/img/productos/abarrotes/Arroz Blanco Molinero.png',
          },
          {
            nombre: 'TADALAFILO (MK) 20MG * 4 TABLETA - 5955',
            precio: 'Q172.40',
            imagen: '/src/assets/img/productos/abarrotes/CafeIncasa100g.png',
          },
          {
            nombre: 'ACEITE MINERAL * 120 ML (MEDIC)',
            precio: 'Q10.65',
            imagen: '/src/assets/img/productos/abarrotes/sopaInstantLakCamaron.png',
          },
        ].map((producto, idx) => (
          <div className="col" key={idx}>
            <div className="card border-0 text-center h-100">
              <img src={producto.imagen} alt={producto.nombre} className="card-img-top img-fluid" />
              <div className="card-body px-2 py-3">
                <p className="fw-semibold small">{producto.nombre}</p>
                <p className="fw-bold">{producto.precio}</p>
              </div>
              <div className="card-footer bg-transparent border-0 pb-3">
                <button
                  className="btn btn-morado btn-sm w-100 d-flex justify-content-center align-items-center"
                >
                  <i className="bi bi-cart-plus me-2"></i> Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


