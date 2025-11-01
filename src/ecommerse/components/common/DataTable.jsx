
import { FaEdit } from "react-icons/fa";
import { DeleteCategoryButton } from "./product/DeleteCategoryButton";
import TableActions from "./TableActions";
import './../../../styles.css'; // Importa estilos globales

const DataTable = ({ columns, data, type, 
                      onSelect, onDoubleClick,
                      currentPage, totalPages, onPageChange,
                      categorySelected 
                  }) => {

  const renderRowByType = (item) => {
    if (type === "product") {
      return (
        <>
          <td>
            <div className="d-flex align-items-center">
              <img
                src={item.image}
                alt={item.name}
                className="rounded me-2"
                width={40}
                height={40}
              />
              <div>
                <div className="fw-bold">{item.name}</div>
                <small className="text-muted">{item.description}</small>
              </div>
            </div>
          </td>
          <td><span className="badge bg btn-morado">{item.category}</span></td>
          <td>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked={item.stock}
              />
            </div>
          </td>
          <td>{item.sku}</td>
          <td>{item.price}</td>
          <td>{item.qty}</td>
          <td>
            <span className={`badge ${item.status === "Active" ? "bg-success" : "bg-secondary"}`}>
              {item.status}
            </span>
          </td>
          <td><TableActions /></td>
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
 {/*      <td>
        <div className="d-flex align-items-center">
          <img
            src={item.icon}
            alt={item.nombreCategoria}
            className="rounded me-2"
            width={40}
            height={40}
          />
            
        </div>
      </td> */}
  
      <td>
        <div className="fw-bold">{item.nombreCategoria}</div>
      </td>
     {/*  <td>
        <span className={`badge ${item.status === "Active" ? "bg-success" : "bg-secondary"}`}>
          {item.status}
        </span>
      </td> */}
      {/* <td><TableActions /></td> */}
  {/*     <td> 
        <DeleteCategoryButton category={item} /> 
        <button className="btn btn-sm btn-outline-primary me-1 contorno-campo-estatico"><FaEdit /></button>
      </td> */}
    </>
  );
}


if (type === "order") {
  return (
    <>
      <td>{item.orderCode}</td>
      <td>{item.date}</td>
      <td>
        <div className="d-flex align-items-center">
          {item.customer.avatar ? (
            <img
              src={item.customer.avatar}
              alt={item.customer.name}
              className="rounded-circle me-2"
              width={40}
              height={40}
            />
          ) : (
            <div
              className="bg-secondary text-white rounded-circle d-flex justify-content-center align-items-center me-2"
              style={{ width: 40, height: 40 }}
            >
              {item.customer.name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <div className="fw-bold">{item.customer.name}</div>
            <small className="text-muted">{item.customer.email}</small>
          </div>
        </div>
      </td>
      <td>
        <span className={`badge ${
          item.payment === "Paid"
            ? "bg-success"
            : item.payment === "Pending"
            ? "bg-warning"
            : "bg-danger"
        }`}>
          {item.payment}
        </span>
      </td>
      <td>
        <span className={`badge ${
          item.status === "Delivered"
            ? "bg-success"
            : item.status === "Out for Delivery"
            ? "bg-primary"
            : item.status === "Dispatched"
            ? "bg-warning"
            : item.status === "Ready to Pickup"
            ? "bg-info"
            : "bg-danger"
        }`}>
          {item.status}
        </span>
      </td>
      <td>
        <span className="me-2">{item.method}</span>
        <small className="text-muted">{item.maskedCard}</small>
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
              className={categorySelected?.id === item.id ? 'row-selected' : ''}
              style={{ cursor: 'pointer' }}
            >
              {renderRowByType(item)}
            </tr>
          ))}
        </tbody>
      </table>

 {/* Paginación dinámica */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
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




