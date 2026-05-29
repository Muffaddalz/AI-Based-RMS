import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiShoppingBag,
  FiBookOpen,
  FiArchive,
  FiCoffee,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <FiGrid /> },
  { label: "Orders", path: "/orders", icon: <FiShoppingBag /> },
  { label: "Menu", path: "/menu", icon: <FiBookOpen /> },
  { label: "Inventory", path: "/inventory", icon: <FiArchive /> },
  { label: "Tables", path: "/tables", icon: <FiCoffee /> },
  { label: "Staff", path: "/staff", icon: <FiUsers /> },
  { label: "Reports", path: "/reports", icon: <FiBarChart2 /> },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">R</div>
        <div className="sidebar-brand-text">
          <h2>RMS Panel</h2>
          <p>Restaurant Control</p>
        </div>
      </div>

      <div className="sidebar-section-title">Main Navigation</div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <h4>Today’s Snapshot</h4>
        <p>Track orders, staff, tables, and stock from one place.</p>
      </div>
    </aside>
  );
}

export default Sidebar;
