


import React, { useState } from "react";
import TableToolbar from "../../components/common/TableToolbar";
import DataTable from "../../components/common/DataTable";
import AddCategoryModal from "../../components/common/AddCategoryModal";

export const ManageCategories = () => {


    //Para AddCategoryModal
    const [showModal, setShowModal] = useState(false);

    const handleAddClick = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

  const categories = [
    {
      id: 1,
      name: "Smart Phone",
      description: "Choose from wide range of smartphones online at best prices.",
      totalProducts: "12.548",
      status: "Inactive",
      icon: "/src/assets/img/productos/escolar/borradorGrande.png",
    },
    {
      id: 2,
      name: "Clothing, Shoes, and Jewellery",
      description: "Fashion for a wide selection of clothing, shoes, jewellery and watches.",
      totalProducts: "4689",
      status: "Active",
      icon: "/src/assets/img/productos/escolar/cartulinaBlanca.png",
    },
    {
      id: 3,
      name: "Home and Kitchen",
      description: "Browse through the wide range of Home and kitchen products.",
      totalProducts: "11.297",
      status: "Active",
      icon: "/src/assets/img/productos/escolar/reglaFast.png",
    },
    {
      id: 4,
      name: "Beauty and Personal Care",
      description: "Explore beauty and personal care products, shop makeup and etc.",
      totalProducts: "9474",
      status: "Inactive",
      icon: "/src/assets/img/productos/escolar/cuadrenoArimany100h.png",
    },

  ];

  const columns = ["Categories", "Total Products", "Status", "Action"];

  return (
    <div className="container-fluid px-4 py-4">
      <TableToolbar buttonLabel="Add Category" onButtonClick={handleAddClick} />
      <DataTable columns={columns} data={categories} type="category" />
      <AddCategoryModal show={showModal} onClose={handleCloseModal} />
    </div>
  );
};
