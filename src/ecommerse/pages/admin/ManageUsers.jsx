

import DataTable from "../../components/common/DataTable";
import TableToolbar from "../../components/common/TableToolbar";

export const ManageUsers = () => {
  const users = [
    {
      id: 1,
      name: "Galen Slixby",
      username: "gslixby0",
      role: "Editor",
      plan: "Enterprise",
      billing: "Auto Debit",
      status: "Inactive",
      avatar: null,
    },
    {
      id: 2,
      name: "Halsey Redmore",
      username: "hredmore1",
      role: "Author",
      plan: "Team",
      billing: "Auto Debit",
      status: "Active",
      avatar: "/src/assets/img/productos/escolar/borradorGrande.png",
    },
    {
      id: 3,
      name: "Maggy Hurran",
      username: "mhurran4",
      role: "Subscriber",
      plan: "Enterprise",
      billing: "Manual Cash",
      status: "Inactive",
      avatar: "/src/assets/img/productos/escolar/borradorSmall.png",
    },
    {
      id: 4,
      name: "Breena Gallemore",
      username: "bgallemore6",
      role: "Subscriber",
      plan: "Company",
      billing: "Auto Debit",
      status: "Active",
      avatar: '/src/assets/img/productos/escolar/cartulinaCeleste.png',
    },
  ];

  const columns = ["User", "Role", "Plan", "Billing", "Status", "Action"];

  return (
    <div className="container-fluid px-4 py-4">
      <TableToolbar buttonLabel="Add New User" />
      <DataTable columns={columns} data={users} type="user" />
    </div>
  );
};





