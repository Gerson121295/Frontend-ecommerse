

export const ProductCard = ({ product }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={product.img} className="card-img-top" alt={product.name} />
        <div className="card-body">
          {/* {product.offer && <span className="badge bg-primary">Oferta</span>} */}
          <h5 className="card-title mt-2" style={{ fontSize: "1rem" }}>
            {product.name}
          </h5>
          <p className="card-text">
            {product.oldPrice && (
              <del className="text-muted me-2">Q{product.oldPrice}</del>
            )}
            <strong>Q{product.price}</strong>
          </p>
          <button className="btn btn-sm btn-morado">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};



