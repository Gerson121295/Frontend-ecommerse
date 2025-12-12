import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaBox,
  FaClipboardList,
  FaUser,
  FaTimes,
} from "react-icons/fa";
import "./SidebarAdmin.css";

export const SidebarAdmin = ({ sidebarOpen, toggleSidebar }) => {

  const [openProducts, setOpenProducts] = useState(false);
  const [openOrders, setOpenOrders] = useState(false);
  const location = useLocation();

  // detectar activo
  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar-admin ${sidebarOpen ? "open" : ""}`}>
      {/* Encabezado */}
      <div className="sidebar-header">
        <Link to="/" className="sidebar-logo">
          <img src="/src/assets/img/img-app/logo-moto.png" alt="Logo" />
        </Link>

        <button className="btn-close-sidebar" onClick={toggleSidebar}>
          <FaTimes size="1.4em" />
        </button>
      </div>

      {/* Menú */}
      <ul className="sidebar-menu">

        {/* Dashboard */}
        <li>
          <Link
            to="/admin/dashboard"
            className={`sidebar-link ${isActive("/admin/dashboard") && "active"}`}
          >
            <FaChartBar className="icon" />
            <span className="text">Dashboard</span>
          </Link>
        </li>

        {/* Products */}
        <li>
          <button
            className="sidebar-btn"
            onClick={() => setOpenProducts(!openProducts)}
          >
            <FaBox className="icon" />
            <span className="text">Products</span>
          </button>

          <ul className={`submenu ${openProducts ? "open" : ""}`}>
            <li>
              <Link
                to="/admin/manage-products"
                className={`submenu-link ${
                  isActive("/admin/manage-products") && "active"
                }`}
              >
                List
              </Link>
            </li>
            {/* <li>
              <Link
                to="/admin/add-product"
                className={`submenu-link ${
                  isActive("/admin/add-product") && "active"
                }`}
              >
                Add
              </Link>
            </li> */}
            <li>
              <Link
                to="/admin/manage-categories"
                className={`submenu-link ${
                  isActive("/admin/manage-categories") && "active"
                }`}
              >
                Category
              </Link>
            </li>
          </ul>
        </li>

        {/* Orders */}
        <li>
          <button
            className="sidebar-btn"
            onClick={() => setOpenOrders(!openOrders)}
          >
            <FaClipboardList className="icon" />
            <span className="text">Orders</span>
          </button>

          <ul className={`submenu ${openOrders ? "open" : ""}`}>
            <li>
              <Link
                to="/admin/manage-orders"
                className={`submenu-link ${
                  isActive("/admin/manage-orders") && "active"
                }`}
              >
                List
              </Link>
            </li>
          </ul>
        </li>

        {/* Usuarios */}
        <li>
          <Link
            to="/admin/manage-users"
            className={`sidebar-link ${
              isActive("/admin/manage-users") && "active"
            }`}
          >
            <FaUser className="icon" />
            <span className="text">Usuarios</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

