
import TableActions from "./TableActions";

const DataTable = ({ columns, data, type }) => {
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
      <td>
        <div className="d-flex align-items-center">
          <img
            src={item.icon}
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
      <td>{item.totalProducts}</td>
      <td>
        <span className={`badge ${item.status === "Active" ? "bg-success" : "bg-secondary"}`}>
          {item.status}
        </span>
      </td>
      <td><TableActions /></td>
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
            <tr key={item.id}>
              {renderRowByType(item)}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled"><button className="page-link">«</button></li>
          <li className="page-item active"><button className="page-link">1</button></li>
          <li className="page-item"><button className="page-link">2</button></li>
          <li className="page-item"><button className="page-link">»</button></li>
        </ul>
      </nav>
    </div>
  );
};

export default DataTable;




