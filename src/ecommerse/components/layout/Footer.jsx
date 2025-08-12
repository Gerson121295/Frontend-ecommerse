

export const Footer = () => {
  return (
    <footer className="bg-white py-4 border-top w-100" style={{ color: '#6c3483' }}>
      <div className="container-fluid px-5">
        <div className="row">
          {/* Logo + mensaje */}
          <div className="col-md-3 text-center text-dark mb-3 mb-md-0">
            <img
              src="/src/assets/img/img-app/logo-moto.png"
              alt="Logo"
              height="55"
              className="mb-2"
            />
            <p>Compra en confianza</p>
          </div>

          {/* Sale */}
          <div className="col-md-3">
            <h6>Sale</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">Discounts</a></li>
              <li><a href="#" className="text-dark text-decoration-none">New Products</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Register</a></li>
            </ul>
          </div>

          {/* Buying */}
          <div className="col-md-3">
            <h6>Buying</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">Loyalty Card</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Terms of Use</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-md-3">
            <h6>Support</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-dark text-decoration-none">Contact</a></li>
              <li><a href="#" className="text-dark text-decoration-none">Help</a></li>
              <li><a href="#" className="text-dark text-decoration-none">FAQ</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};



