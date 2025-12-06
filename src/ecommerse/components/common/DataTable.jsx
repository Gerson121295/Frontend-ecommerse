
import { DeleteCategoryButton } from "./category/DeleteCategoryButton";
import TableActions from "./TableActions";
import './../../../styles.css'; // Importa estilos globales
import { EditCategoryButton } from "./category/EditCategoryButton";
import { DeleteProductButton } from "./product/DeleteProductButton";
import { EditProductButton } from "./product/EditProductButton";
import { getEnvVariables } from "../../../helpers/getEnvVariables";

//extrae la ruta principal para las peticions desde .env  variables de entorno
const { VITE_API_URL } = getEnvVariables();

const DataTable = ({ columns, data, type, 
                      onSelect, onDoubleClick,
                      currentPage, totalPages, onPageChange,
                      categorySelected,

                      totalElements, productSelected, pedidoSelected
                  }) => {

  const renderRowByType = (item) => {

    if (type === "product") {
      return (
        <>
          <td>
            <div className="d-flex align-items-center">
              <img
                src={VITE_API_URL + item.imageUrl}
                alt={item.nombre}
                className="rounded me-2"
                width={40}
                height={40}
              />
              <div>
                <div className="fw-bold">{item.nombre}</div>
                <small className="text-muted">{item.descripcion}</small>
              </div>
            </div>
          </td>
          <td><span className="badge bg btn-morado">{item.categoria}</span></td>
          <td>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked={item.activa}
              />
            </div>
          </td>
          <td>{item.codigoReferencia}</td>
          <td>{item.precioUnitario}</td>
          <td>{item.unidadesEnStock}</td>
          <td>{item.fechaCreacion}</td>
         {/*  <td>
            <span className={`badge ${item.activa === "Active" ? "bg-success" : "bg-secondary"}`}>
              {item.activa}
            </span>
          </td> */}
          <td>
            <DeleteProductButton product={item} /> 
            <EditProductButton product={item} /> 
          </td>
        </>
      );
    }

    if (type === "user") {
      return (
        <>
          <td>
            <div className="d-flex align-items-center">
              {item.avatar ? (
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="rounded-circle me-2"
                  width={40}
                  height={40}
                />
              ) : (
                <div
                  className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-2"
                  style={{ width: 40, height: 40 }}
                >
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <div className="fw-bold">{item.name}</div>
                <small className="text-muted">{item.username}</small>
              </div>
            </div>
          </td>
          <td>{item.role}</td>
          <td>{item.plan}</td>
          <td>{item.billing}</td>
          <td>
            <span className={`badge ${item.status === "Active" ? "bg-success" : "bg-secondary"}`}>
              {item.status}
            </span>
          </td>
          <td><TableActions /></td>
        </>
      );
    }

    if (type === "category") {
  return (
    <>
      <td>
        <div className="fw-bold">{item.nombreCategoria}</div>
      </td>
      <td> 
        <DeleteCategoryButton category={item} /> 
        <EditCategoryButton category={item} /> 
      </td>
    </>
  );
}

if (type === "order") {
  return (
    <>
      <td>{item.numeroSeguimiento}</td>
      <td>{item.fechaCreacion}</td>
      <td>
        <div className="d-flex align-items-center">
          <div>
            <div className="fw-bold">{item.usuario}</div>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <div>
            <div className="fw-bold">{item.precioTotal}</div>
            <small className="text-muted">{item.cantidadTotal}</small>
          </div>
        </div>
      </td>
      <td>
        <span className={`badge ${
          item.estado === "TRUE"
            ? "bg-success"
            : item.estado === "FALSE"
            ? "bg-warning"
            : "bg-danger"
        }`}>
          {item.estado}
        </span>
      </td>
      <td>
        <span className={`badge ${
          item.estadoPago === "APROBADO"
            ? "bg-success"  //? "bg-primary"
            : item.estadoPago === "PENDIENTE"
            ? "bg-warning"
            : item.estadoPago === "RECHAZADO"
            ? "bg-info"
            : "bg-danger"
        }`}>
          {item.estadoPago}
        </span>
      </td>
      <td>
        <span className="me-2">
          {/* {item.productos} */}
            {item.productos?.map(p => p.nombre).join(", ")}
        </span>
      </td>
      <td><TableActions /></td>
    </>
  );
}
    return <td colSpan={columns.length}>No renderer for type: {type}</td>;
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            {columns.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr 
              key={item.id}
              onClick={() => onSelect(item)}
              onDoubleClick={() => onDoubleClick(item)}
              //Marca visualmente la fila seleccionada
              //className={categorySelected?.id === item.id ? 'row-selected' : ''}
              //if (type === "product")             

              className={ 
                type === "product"
                  ? productSelected?.id === item.id ? 'row-selected' : ''
                  : type === "category"
                  ? categorySelected?.id === item.id ? 'row-selected' : ''
                  : pedidoSelected?.id === item.id ? 'row-selected' : ''
              }


              style={{ cursor: 'pointer' }}
            >
              {renderRowByType(item)}
            </tr>
          ))}
        </tbody>
      </table>

 {/* Paginación dinámica */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center custom-pagination">
          <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
            <button 
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              « 
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => (
            <li 
              key={i} 
              className={`page-item ${i === currentPage ? "active" : ""}`}
            >
              <button 
                className="page-link" 
                onClick={() => handlePageChange(i)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
            <button 
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              »
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DataTable;




