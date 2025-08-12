import FormSection from "./FormSection";

const ProductImageUploader = () => {
  return (
    <FormSection title="Product Image">
      <div className="text-center">
        <p>Drag and Drop Your Image Here.</p>
        <input type="file" className="form-control mb-2 contorno-campo-estatico contorno-campo-morado" />
        <button className="btn btn-blanco-morado">Browse Image</button>
        <p className="mt-2">
          or <a href="#">Add media from URL</a>
        </p>
      </div>
    </FormSection>
  );
};

export default ProductImageUploader;
