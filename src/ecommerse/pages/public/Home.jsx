import { Footer, NavbarApp, ProductCard } from "../../components/layout";



export const Home = () => {

  const products = [
    {
      id: 1,
      name: "GLUCERNA VAINILLA + 850 GRAMOS",
      price: 417.3,
      img: "/src/assets/img/productos/bebidas/bebida gaseosa mirinda.png", 
      offer: true,
    },
    {
      id: 2,
      name: "VICK F44 MIEL EXPECTORANTE",
      price: 66.3,
      oldPrice: 78.0,
      img: "/src/assets/img/productos/abarrotes/anchor1400g.png", 
      offer: true,
    },

    {
      id: 3,
      name: "GLUCERNA VAINILLA + 850 GRAMOS",
      price: 417.3,
      img: "/src/assets/img/productos/bebidas/bebida gaseosa mirinda.png", 
      offer: true,
    },
    {
      id: 4,
      name: "VICK F44 MIEL EXPECTORANTE",
      price: 66.3,
      oldPrice: 78.0,
      img: "/src/assets/img/productos/abarrotes/anchor1400g.png", 
      offer: true,
    },
    {
      id: 5,
      name: "GLUCERNA VAINILLA + 850 GRAMOS",
      price: 417.3,
      img: "/src/assets/img/productos/bebidas/bebida gaseosa mirinda.png", 
      offer: true,
    },
    {
      id: 6,
      name: "VICK F44 MIEL EXPECTORANTE",
      price: 66.3,
      oldPrice: 78.0,
      img: "/src/assets/img/productos/abarrotes/anchor1400g.png", 
      offer: true,
    },
    {
      id: 7,
      name: "GLUCERNA VAINILLA + 850 GRAMOS",
      price: 417.3,
      img: "/src/assets/img/productos/bebidas/bebida gaseosa mirinda.png", 
      offer: true,
    },
  ];

  return (
    <>
        <NavbarApp/>

          {/* Productos a vender */}
         <div className=" py-4" style={{ backgroundColor: '#f5f5f5' }} > 
        <div className="container">
          <img
            src='/src/assets/img/img-app/Product-abarrotes.png'
            alt="Banner promocional"
            className="img-fluid w-100 mb-4"
          />
          <h3 className="mb-4">Artículos mas vendidos</h3>

          <div
            className="row justify-content-center align-items-center g-2"
          >
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
 
      <Footer />
    </>
  );
};

