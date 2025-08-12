import DataTable from "../../components/common/DataTable";
import TableToolbar from "../../components/common/TableToolbar";


export const ManageProducts = () => {
  const products = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      description: "Super Retina XDR display footnote Pro Motion technology",
      category: "Electronics",
      stock: false,
      sku: "19472",
      price: "$999",
      qty: 665,
      status: "Inactive",
      image: "/src/assets/img/productos/abarrotes/anchor1400g.png"
    },
    {
      id: 2,
      name: "Echo Dot (4th Gen)",
      description: "Echo Dot Smart speaker with Alexa",
      category: "Electronics",
      stock: true,
      sku: "72836",
      price: "$25.50",
      qty: 827,
      status: "Active",
      image: "/src/assets/img/productos/abarrotes/Arroz Blanco La Cosecha.png"
    }
  ];

  const columns = ["Product", "Category", "Stock", "SKU", "Price", "Qty", "Status", "Action"];

  return (
    <div className="container-fluid px-4 py-4">
      <TableToolbar buttonLabel="Add Product" />
      <DataTable columns={columns} data={products} type="product" />
    </div>
  );
};



