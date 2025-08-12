
import FormSection from "./FormSection";

const ProductOrganizer = () => {

  return (
    <FormSection title="Organize">
      <div className="mb-3">
        <label className="form-label">Vendor</label>
        <select className="form-select">
          <option>Choose...</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <div className="d-flex">
          <select className="form-select me-2">
            <option>Choose...</option>
          </select>
          <button className="btn btn-outline-primary">+</button>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Collection</label>
        <select className="form-select">
          <option>Choose...</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Status</label>
        <select className="form-select">
          <option>Choose...</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Enter Tags</label>
        <input type="text" className="form-control contorno-campo-estatico contorno-campo-morado" placeholder="Fashion, Trending, Summer" />
      </div>
    </FormSection>
  );
};

export default ProductOrganizer;
