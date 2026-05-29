import { useState, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";
import OrdersTable from "../components/OrdersTable";
import TopItems from "../components/TopItems";
import { activities } from "../data/dashboardData";

const API_BASE = "http://127.0.0.1:8000";

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [orders, setOrders] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const ordersRes = await fetch(`${API_BASE}/orders/`);
      if (!ordersRes.ok) throw new Error(`Orders API: ${ordersRes.status}`);

      const ordersData = await ordersRes.json();
      const safeOrders = Array.isArray(ordersData) ? ordersData : [];
      setOrders(safeOrders);

      const totalOrders = safeOrders.length;
      const totalRevenue = safeOrders.reduce(
        (sum, order) => sum + (Number(order.total) || 0),
        0,
      );
      const pending = safeOrders.filter((o) => o.status === "pending").length;
      const completed = safeOrders.filter(
        (o) => o.status === "completed",
      ).length;

      setStats([
        {
          title: "Total Orders",
          value: totalOrders,
          change: "+12%",
          trend: "positive",
        },
        {
          title: "Revenue",
          value: `₹${totalRevenue.toFixed(2)}`,
          change: "+8%",
          trend: "positive",
        },
        {
          title: "Pending",
          value: pending,
          change: "Needs attention",
          trend: "warning",
        },
        {
          title: "Completed",
          value: completed,
          change: "+15%",
          trend: "positive",
        },
      ]);

      setTopItems([
        { name: "Butter Chicken", orders: 32, revenue: 1248 },
        { name: "Naan Basket", orders: 28, revenue: 456 },
        { name: "Biryani", orders: 25, revenue: 892 },
      ]);
    } catch (err) {
      setError(err.message);

      setStats([
        {
          title: "Total Orders",
          value: 124,
          change: "+12%",
          trend: "positive",
        },
        {
          title: "Revenue",
          value: "₹12,450",
          change: "+8%",
          trend: "positive",
        },
        {
          title: "Pending",
          value: 8,
          change: "Needs attention",
          trend: "warning",
        },
        {
          title: "Completed",
          value: 116,
          change: "+15%",
          trend: "positive",
        },
      ]);

      setOrders([]);
      setTopItems([
        { name: "Butter Chicken", orders: 32, revenue: 1248 },
        { name: "Naan Basket", orders: 28, revenue: 456 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header
          title="Dashboard"
          subtitle="Monitor restaurant performance and operations."
        />

        <div className="dashboard-content">
          {error && <div className="error-text">⚠️ {error}</div>}

          {loading ? (
            <SectionCard title="Loading Dashboard">
              <div className="state-text">
                Loading dashboard data from FastAPI...
              </div>
            </SectionCard>
          ) : (
            <>
              <section className="stats-grid">
                {stats.map((stat) => (
                  <StatCard key={stat.title} {...stat} />
                ))}
              </section>

              <section className="dashboard-row dashboard-row-main">
                <SectionCard title="Active Orders">
                  <OrdersTable orders={orders} />
                </SectionCard>

                <SectionCard title="Top Selling Items">
                  <TopItems items={topItems} />
                </SectionCard>
              </section>

              <section className="dashboard-row dashboard-row-secondary">
                <SectionCard title="Revenue Overview">
                  <div className="chart-placeholder">
                    <div className="bar" style={{ height: "55%" }}></div>
                    <div className="bar" style={{ height: "72%" }}></div>
                    <div className="bar" style={{ height: "48%" }}></div>
                    <div className="bar" style={{ height: "85%" }}></div>
                    <div className="bar" style={{ height: "64%" }}></div>
                    <div className="bar" style={{ height: "78%" }}></div>
                    <div className="bar" style={{ height: "90%" }}></div>
                  </div>
                </SectionCard>

                <SectionCard title="Recent Activity">
                  <ul className="activity-list">
                    {activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                </SectionCard>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
