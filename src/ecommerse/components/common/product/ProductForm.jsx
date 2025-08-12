import FormSection from "./FormSection";

const ProductForm = () => {
  return (
    <FormSection title="Product Information">
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input type="text" className="form-control contorno-campo-estatico contorno-campo-morado" placeholder="iPhone 14" />
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">SKU</label>
          <input type="text" className="form-control contorno-campo-estatico contorno-campo-morado" placeholder="FSK123U" />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Barcode</label>
          <input type="text" className="form-control contorno-campo-estatico contorno-campo-morado" placeholder="0123-4567" />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Description (Optional)</label>
        <textarea className="form-control contorno-campo-estatico contorno-campo-morado" rows="4" placeholder="Write a description..."></textarea>
      </div>
    </FormSection>
  );
};

export default ProductForm;

