import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import SectionCard from "../components/SectionCard";

function Tables() {
  const tables = [
    { tableNo: "T-01", seats: 4, status: "Occupied" },
    { tableNo: "T-02", seats: 2, status: "Available" },
    { tableNo: "T-03", seats: 6, status: "Reserved" },
    { tableNo: "T-04", seats: 4, status: "Available" },
    { tableNo: "T-05", seats: 8, status: "Occupied" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header
          title="Tables"
          subtitle="Manage table occupancy and reservations"
        />

        <div className="dashboard-content">
          <SectionCard title="Table Status">
            <div className="table-card-grid">
              {tables.map((table, index) => (
                <div className="table-status-card" key={index}>
                  <h3>{table.tableNo}</h3>
                  <p>Seats: {table.seats}</p>
                  <span
                    className={`status-badge ${
                      table.status === "Available"
                        ? "status-completed"
                        : table.status === "Reserved"
                          ? "status-pending"
                          : "status-preparing"
                    }`}
                  >
                    {table.status}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

export default Tables;
