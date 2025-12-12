
import './DataTable.css'

export default function DataTable({
  columns = [],
  data = [],
  renderRow,

  onDoubleClick,
  onSelect,
  itemSelected,

  currentPage,
  totalPages,
  totalElements,
  onPageChange,
}) {
  return (
    <div className="datatable-container">
      <div className="datatable-wrapper">
        <table className="datatable">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="no-data">
                  No hay datos para mostrar
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr 
                  key={item.id} 
                  //className="datatable-row"
                  onClick={() => onSelect(item)}
                  onDoubleClick={() => onDoubleClick(item)}
                  className={itemSelected?.id === item.id ? 'row-selected' : ''} //datatable-row
                  style={{ cursor: 'pointer' }}
                >
                  {renderRow(item)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINACIÓN */}
      {totalPages > 1 && (
        <div className="datatable-pagination">
          <p className="pagination-info">
            Total: <strong>{totalElements}</strong> registros
          </p>

          <div className="pagination-controls">
            <button
              className="page-btn"
              disabled={currentPage === 0}
              onClick={() => onPageChange(currentPage - 1)}
            >
              «
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-btn ${currentPage === i ? "active" : ""}`}
                onClick={() => onPageChange(i)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page-btn"
              disabled={currentPage === totalPages - 1}
              onClick={() => onPageChange(currentPage + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
