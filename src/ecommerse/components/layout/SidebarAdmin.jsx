

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaBox, FaClipboardList, FaUser, FaTimes } from 'react-icons/fa';
import './SidebarAdmin.css';

export const SidebarAdmin = ({ toggleSidebar }) => {
  const [openProducts, setOpenProducts] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);

  return (
    <div
      className="sidebar-admin bg-white border-end shadow-sm p-3"
      /* style={{
        width: '250px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        overflowY: 'auto',
        transition: 'transform 0.3s ease-in-out',
      }} */
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* <h6 className="text-muted fw-semibold mb-0" color="#4a148c" size="1.5em"  >eCommerce</h6> */}
        <img src="/src/assets/img/img-app/logo-moto.png" alt="" />
        <button className="btn btn-sm" onClick={toggleSidebar}>
          <FaTimes color="#4a148c" size="1.5em"  />
        </button>
      </div>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/admin/dashboard" className="nav-link text-dark">
            <FaChartBar className="me-2 sidebar-toggle-icon" />
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <button
            className="btn btn-link text-start w-100 text-dark"
            onClick={() => setOpenProducts(!openProducts)}
          >
            <FaBox className="me-2 sidebar-toggle-icon" />
            Products
          </button>
          {openProducts && (
            <ul className="nav flex-column ms-4">
              <li className="nav-item">
                <Link to="/admin/manage-products" className="nav-link text-dark">
                  List
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/add-product" className="nav-link text-dark">
                  Add
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/manage-categories" className="nav-link text-dark">
                  Category
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item mb-2">
          <button
            className="btn btn-link text-start w-100 text-dark"
            onClick={() => setOpenOrders(!openOrders)}
          >
            <FaClipboardList className="me-2 sidebar-toggle-icon" />
            Orders
          </button>
          {openOrders && (
            <ul className="nav flex-column ms-4">
              <li className="nav-item">
                <Link to="/admin/manage-orders" className="nav-link text-dark">
                  List
                </Link>
              </li>
             {/*  <li className="nav-item">
                <Link to="/admin/orders/details" className="nav-link text-dark">
                  Details
                </Link>
              </li> */}
            </ul>
          )}
        </li>

        <li className="nav-item">
          <Link to="/admin/manage-users" className="nav-link text-dark fw-bold">
            <FaUser className="me-2 sidebar-toggle-icon" />
            Usuarios
          </Link>
        </li>
      </ul>
    </div>
  );
};



