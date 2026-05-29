import { FiBell, FiSearch, FiSettings } from "react-icons/fi";

function Header({ title, subtitle }) {
  return (
    <header className="dashboard-header">
      <div className="header-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        <label className="search-box" aria-label="Search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search here..." />
        </label>

        <button className="icon-btn" aria-label="Notifications">
          <FiBell />
        </button>

        <button className="icon-btn" aria-label="Settings">
          <FiSettings />
        </button>

        <div className="admin-chip">
          <div className="admin-chip-avatar">AD</div>
          <div className="admin-chip-text">
            <strong>Admin</strong>
            <span>Restaurant Manager</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
