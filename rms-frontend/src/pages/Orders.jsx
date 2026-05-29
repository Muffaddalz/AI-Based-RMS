import { useState, useEffect } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import SectionCard from "../components/SectionCard";

const API_BASE = "http://127.0.0.1:8000";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    let data = [...orders];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (order) =>
          String(order.id).toLowerCase().includes(q) ||
          String(order.customer || "")
            .toLowerCase()
            .includes(q) ||
          String(order.table || "")
            .toLowerCase()
            .includes(q),
      );
    }

    if (statusFilter !== "All") {
      data = data.filter(
        (order) =>
          String(order.status).toLowerCase() === statusFilter.toLowerCase(),
      );
    }

    setFilteredOrders(data);
  }, [orders, search, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/orders/`);
      if (!res.ok) throw new Error(`Orders API failed: ${res.status}`);

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error(`Update failed: ${res.status}`);

      setOrders((prev) =>
        prev.map((order) =>
          String(order.id) === String(orderId)
            ? { ...order, status: newStatus }
            : order,
        ),
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header
          title="Orders"
          subtitle="Track all active and completed restaurant orders"
        />

        <div className="dashboard-content">
          <div className="orders-toolbar">
            <input
              className="orders-search"
              type="text"
              placeholder="Search by order ID, customer, or table"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="orders-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {error && <div className="error-text">⚠️ {error}</div>}

          <SectionCard title="Order List">
            {loading ? (
              <div className="state-text">Loading orders...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="state-text">No orders found.</div>
            ) : (
              <div className="table-wrap">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Table</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.customer || "Walk-in Customer"}</td>
                        <td>{order.table || "-"}</td>
                        <td>₹{Number(order.total || 0).toFixed(2)}</td>
                        <td>
                          <span
                            className={`status-badge status-${order.status || "pending"}`}
                          >
                            {order.status || "pending"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="add-btn"
                            onClick={() => updateStatus(order.id, "completed")}
                          >
                            Mark Completed
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

export default Orders;
