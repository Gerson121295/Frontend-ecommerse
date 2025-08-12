

import TableToolbar from "../../components/common/TableToolbar";
import DataTable from "../../components/common/DataTable";

export const ManageOrders = () => {
  const orders = [
    {
      id: 5434,
      orderCode: "#5434",
      date: "Mon May 16 2022, 2:11 AM",
      customer: {
        name: "Gabrielle Feyer",
        email: "gfeyer0@nyu.edu",
        avatar: "/src/assets/img/productos/escolar/lapiceroAzulBic.png"
      },
      payment: "Paid",
      status: "Delivered",
      method: "PayPal",
      maskedCard: "...@gmail.com"
    },
    {
      id: 6745,
      orderCode: "#6745",
      date: "Wed May 03 2023, 7:26 PM",
      customer: {
        name: "Jackson Deignan",
        email: "jdeignan1@dell.com",
        avatar: "/src/assets/img/productos/mascotas/alimiau454g.png"
      },
      payment: "Cancelled",
      status: "Delivered",
      method: "PayPal",
      maskedCard: "...@gmail.com"
    },
   
  ];

  const columns = ["Order", "Date", "Customers", "Payment", "Status", "Method", "Action"];

  return (
    <div className="container-fluid px-4 py-4">
      <TableToolbar buttonLabel="Add Order" />
      <DataTable columns={columns} data={orders} type="order" />
    </div>
  );
};





