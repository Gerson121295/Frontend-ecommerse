
import { DashboardCard, DashboardChart, SidebarAdmin } from "../../components/layout";

export const DashboardAdmin = () => {

  return (
       <>
       
        {/* Contenido principal  - Information Cards */}
         <main className="container-fluid px-4 py-4 flex-grow-1">
          <div className="row g-4">
            <DashboardCard title="Sales" value="$4,679" change="+28.14%" />
            <DashboardCard title="Profit" value="624k" />
            <DashboardCard title="Revenue" value="$42,389" change="+52.18%" />
            <DashboardCard title="Transactions" value="$14,854" change="+62%" />
          </div>

          <div className="row mt-4">
            <div className="col-12">
              <DashboardChart />
            </div>
          </div>
        </main> 
 
    </>

  );
};





