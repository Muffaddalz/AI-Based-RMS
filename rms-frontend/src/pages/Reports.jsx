import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import SectionCard from "../components/SectionCard";

function Reports() {
  const reportCards = [
    { title: "Daily Sales", value: "₹12,450", note: "Compared to yesterday" },
    { title: "Orders Processed", value: "124", note: "Across all tables" },
    { title: "Low Stock Alerts", value: "3", note: "Needs restocking soon" },
    { title: "Staff on Shift", value: "9", note: "Current active team" },
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header
          title="Reports"
          subtitle="View restaurant insights and summaries"
        />

        <div className="dashboard-content">
          <section className="stats-grid">
            {reportCards.map((report, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-label">{report.title}</div>
                <div className="stat-value">{report.value}</div>
                <div className="stat-meta">{report.note}</div>
              </div>
            ))}
          </section>

          <section className="content-grid">
            <SectionCard title="Sales Summary">
              <div className="chart-placeholder">
                <div className="bar" style={{ height: "40%" }}></div>
                <div className="bar" style={{ height: "60%" }}></div>
                <div className="bar" style={{ height: "80%" }}></div>
                <div className="bar" style={{ height: "55%" }}></div>
                <div className="bar" style={{ height: "75%" }}></div>
              </div>
            </SectionCard>

            <SectionCard title="Report Notes">
              <ul className="activity-list">
                <li>Weekend sales increased by 18%.</li>
                <li>Biryani and Butter Chicken remain top sellers.</li>
                <li>Cheese and Mushrooms require urgent restock.</li>
                <li>Evening shift handled the highest order volume.</li>
              </ul>
            </SectionCard>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Reports;
