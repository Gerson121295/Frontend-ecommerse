
const TableToolbar = ({  //({ buttonLabel = "Add New", onButtonClick }) => { //version anterior recibe nombre Boton y func. onButtonClick por props
  onAddClick,                 //botón principal 
  buttonLabel = "Agregar nuevo", //texto del botón
  showExport = true,          // mostrar u ocultar botón Exportar
  placeholder = "Buscar",     // texto del input de búsqueda
  onSearchChange,             // manejar búsqueda
}) => {

  //el simbolo !! convierte una expresión en un valor booleano, sig. "no nulo" o "definido" entonces en hasSearch se verifica si se pasó la función onSearchChange
   const hasSearch = !!onSearchChange; //verifica si se pasó la función onSearchChange

  return (

     <div 
      className={`d-flex align-items-center mb-3 flex-wrap ${
        hasSearch ? "justify-content-between" : "justify-content-end"
      }`}
    >
      {/* Campo de búsqueda */}
      {hasSearch && (
        <input
          type="text"
          className="form-control me-3 contorno-campo-morado contorno-campo-estatico"
          placeholder={placeholder}
          style={{ maxWidth: "300px", flex: "1 1 auto" }}
          onChange={onSearchChange}
        />
      )}

      {/* Botones de acción */}
      <div className="d-flex gap-2 mt-2 mt-md-0">
        {showExport && (
          <button className="btn btn-blanco-morado">
            Exportar
          </button>
        )}


        {/* Solo se renderiza si se pasa una función */}
        {onAddClick && (
          <button className="btn btn-morado" onClick={onAddClick}>
            + {buttonLabel}
          </button>
        )}

      </div>
    </div>
  );
};

export default TableToolbar;


