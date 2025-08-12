

const TableToolbar = ({ buttonLabel = "Add New", onButtonClick }) => {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <input
        type="text"
        className="form-control me-3 contorno-campo-morado contorno-campo-estatico"
        placeholder="Buscar"
        style={{ maxWidth: "300px" }}
      />
      <div>
        <select className="form-select d-inline-block me-2" style={{ width: "auto" }}>
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <button className="btn contorno-campo-estatico me-2">Export</button>
        <button className="btn btn-morado" onClick={onButtonClick} >+ {buttonLabel}</button>
      </div>
    </div>
  );
};

export default TableToolbar;


