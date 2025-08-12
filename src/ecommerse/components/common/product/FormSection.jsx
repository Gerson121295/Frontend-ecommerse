
const FormSection = ({ title, children }) => (
  <div className="card mb-4 contorno-campo-estatico">
    <div className="card-header fw-semibold contorno-campo-estatico">{title}</div>
    <div className="card-body contorno-campo-estatico">{children}</div>
  </div>
);

export default FormSection;
