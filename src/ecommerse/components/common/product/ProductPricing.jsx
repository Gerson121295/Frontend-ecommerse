import FormSection from "./FormSection";

const ProductPricing = () => {
  return (
    <FormSection title="Pricing">
      <div className="mb-3">
        <label className="form-label">Base Price</label>
        <input type="number" className="form-control contorno-campo-estatico contorno-campo-morado" />
      </div>
      <div className="mb-3">
        <label className="form-label">Discounted Price</label>
        <input type="number" className="form-control contorno-campo-estatico contorno-campo-morado" defaultValue={499} />
      </div>
      <div className="form-check form-switch mb-3">
        <input className="form-check-input contorno-campo-morado" type="checkbox" id="taxSwitch" defaultChecked />
        <label className="form-check-label" htmlFor="taxSwitch">Charge tax on this product</label>
      </div>
      <div className="form-check form-switch">
        <input className="form-check-input contorno-campo-morado" type="checkbox" id="stockSwitch" defaultChecked />
        <label className="form-check-label" htmlFor="stockSwitch">In stock</label>
      </div>
    </FormSection>
  );
};

export default ProductPricing;
