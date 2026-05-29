import { useEffect, useMemo, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import SectionCard from "../components/SectionCard";

const API_BASE = "http://127.0.0.1:8000";

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/menu/`);
      if (!res.ok) throw new Error(`Menu API failed: ${res.status}`);

      const data = await res.json();
      setMenuItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setMenuItems([
        {
          id: 1,
          name: "Butter Chicken",
          category: "Main Course",
          price: 389,
          status: "available",
        },
        {
          id: 2,
          name: "Paneer Tikka",
          category: "Starter",
          price: 249,
          status: "available",
        },
        {
          id: 3,
          name: "Veg Biryani",
          category: "Rice",
          price: 279,
          status: "unavailable",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const unique = [
      ...new Set(menuItems.map((item) => item.category).filter(Boolean)),
    ];
    return ["All", ...unique];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    let data = [...menuItems];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (item) =>
          String(item.name || "")
            .toLowerCase()
            .includes(q) ||
          String(item.category || "")
            .toLowerCase()
            .includes(q) ||
          String(item.id).toLowerCase().includes(q),
      );
    }

    if (categoryFilter !== "All") {
      data = data.filter(
        (item) =>
          String(item.category || "").toLowerCase() ===
          categoryFilter.toLowerCase(),
      );
    }

    if (statusFilter !== "All") {
      data = data.filter(
        (item) =>
          String(item.status || "").toLowerCase() ===
          statusFilter.toLowerCase(),
      );
    }

    return data;
  }, [menuItems, search, categoryFilter, statusFilter]);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header
          title="Menu"
          subtitle="Manage menu items, pricing, and availability."
        />

        <div className="dashboard-content">
          <div className="page-toolbar menu-toolbar">
            <input
              className="orders-search"
              type="text"
              placeholder="Search by item name, category, or ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="toolbar-actions">
              <select
                className="orders-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                className="orders-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>

              <button className="add-btn">+ Add Item</button>
            </div>
          </div>

          {error && <div className="error-text">⚠️ {error}</div>}

          <SectionCard title="Menu Items">
            {loading ? (
              <div className="state-text">Loading menu items...</div>
            ) : filteredItems.length === 0 ? (
              <div className="state-text">No menu items found.</div>
            ) : (
              <div className="table-wrap">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => {
                      const status = (item.status || "available").toLowerCase();

                      return (
                        <tr key={item.id}>
                          <td>#{item.id}</td>
                          <td>{item.name || "Untitled Item"}</td>
                          <td>{item.category || "-"}</td>
                          <td>₹{Number(item.price || 0).toFixed(2)}</td>
                          <td>
                            <span
                              className={`status-badge menu-status-${status}`}
                            >
                              {status}
                            </span>
                          </td>
                          <td>
                            <div className="table-actions">
                              <button className="table-btn secondary">
                                Edit
                              </button>
                              <button className="table-btn danger">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
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

export default Menu;
