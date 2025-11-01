

import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const TableActions = () => {
  return (
    <>
      <button className="btn btn-sm btn-outline-primary me-1 contorno-campo-estatico"><FaEdit /></button>
      <button className="btn btn-sm btn-outline-danger me-1 contorno-campo-estatico"><FaTrash /></button>
      <button className="btn btn-sm btn-outline-info contorno-campo-estatico"><FaEye /></button>
    </>
  );
};

export default TableActions;

