
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import './TableActions.css';

const TableActions = ({handleDelete, handleEdit, handleViewInfo}) => {
  
  //Solo renderiza los botones que se le pasen.
  return (
    <div className="table-actions">
      {handleDelete && (
        <button
          aria-label="btn-delete"
          className="btn btn-sm btn-outline-danger contorno-campo-estatico"
          onClick={handleDelete}
        >
          <FaTrash />
        </button>
      )}

      {handleEdit && (
        <button
          aria-label="btn-edit"
          className="btn btn-sm btn-outline-primary contorno-campo-estatico"
          onClick={handleEdit}
        >
          <FaEdit />
        </button>
      )}

      {handleViewInfo && (
        <button
          aria-label="btn-view"
          className="btn btn-sm btn-outline-info contorno-campo-estatico"
          onClick={handleViewInfo}
        >
          <FaEye />
        </button>
      )}
    </div>
  );
};

export default TableActions;

