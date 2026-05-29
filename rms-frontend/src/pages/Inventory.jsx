import { useEffect, useMemo, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";
import SectionCard from "../components/SectionCard";

const API_BASE = "http://127.0.0.1:8000";

function Inventory() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/inventory/`);
      if (!res.ok) throw new Error(`Inventory API failed: ${res.status}`);

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setItems([
        {
          id: 1,
          name: "Basmati Rice",
          category: "Grains",
          stock: 18,
          unit: "kg",
          reorderLevel: 20,
          supplier: "FreshMart",
        },
        {
          id: 2,
          name: "Chicken",
          category: "Meat",
          stock: 8,
          unit: "kg",
          reorderLevel: 10,
          supplier: "DailyCuts",
        },
        {
          id: 3,
          name: "Paneer",
          category: "Dairy",
          stock: 0,
          unit: "kg",
          reorderLevel: 6,
          supplier: "MilkZone",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const unique = [
      ...new Set(items.map((item) => item.category).filter(Boolean)),
    ];
    return ["All", ...unique];
  }, [items]);

  const getStockStatus = (item) => {
    const stock = Number(item.stock || 0);
    const reorderLevel = Number(item.reorderLevel || 0);

    if (stock <= 0) return "out";
    if (stock <= reorderLevel) return "low";
    return "in";
  };

  const filteredItems = useMemo(() => {
    let data = [...items];

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
          String(item.supplier || "")
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

    if (stockFilter !== "All") {
      data = data.filter((item) => getStockStatus(item) === stockFilter);
    }

    return data;
  }, [items, search, categoryFilter, stockFilter]);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header
          title="Inventory"
          subtitle="Track stock levels, suppliers, and reorder needs."
        />

        <div className="dashboard-content">
          <div className="page-toolbar inventory-toolbar">
            <input
              className="orders-search"
              type="text"
              placeholder="Search by item, supplier, category, or ID"
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
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="All">All Stock</option>
                <option value="in">In Stock</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </select>

              <button className="add-btn">+ Add Stock</button>
            </div>
          </div>

          {error && <div className="error-text">⚠️ {error}</div>}

          <SectionCard title="Inventory Items">
            {loading ? (
              <div className="state-text">Loading inventory...</div>
            ) : filteredItems.length === 0 ? (
              <div className="state-text">No inventory items found.</div>
            ) : (
              <div className="table-wrap">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Reorder Level</th>
                      <th>Supplier</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item) => {
                      const status = getStockStatus(item);

                      return (
                        <tr key={item.id}>
                          <td>#{item.id}</td>
                          <td>{item.name || "Untitled Item"}</td>
                          <td>{item.category || "-"}</td>
                          <td>
                            {Number(item.stock || 0)} {item.unit || ""}
                          </td>
                          <td>
                            {Number(item.reorderLevel || 0)} {item.unit || ""}
                          </td>
                          <td>{item.supplier || "-"}</td>
                          <td>
                            <span
                              className={`status-badge inventory-status-${status}`}
                            >
                              {status === "in"
                                ? "In Stock"
                                : status === "low"
                                  ? "Low Stock"
                                  : "Out of Stock"}
                            </span>
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

export default Inventory;
