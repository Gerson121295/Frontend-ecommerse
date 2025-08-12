
import ActionButtons from "../../components/common/product/ActionButtons";
import ProductForm from "../../components/common/product/ProductForm";
import ProductImageUploader from "../../components/common/product/ProductImageUploader";
import ProductOrganizer from "../../components/common/product/ProductOrganizer";
import ProductPricing from "../../components/common/product/ProductPricing";
import "./AddProduct.css";

export const AddProduct = () => {
  return (
    <div className="container-fluid p-4">
      <h3 className="fw-bold mb-4 text-center">Add a new product</h3>
      <div className="row">
        <div className="col-lg-8">
          <ProductForm />
          <ProductImageUploader />
        </div>
        <div className="col-lg-4">
          <ProductPricing />
          <ProductOrganizer />
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};



