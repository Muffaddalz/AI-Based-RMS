import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import Header from "../layouts/Header";

function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("rms-user") || "null");
    if (savedUser) {
      setFormData({
        name: savedUser.name || "",
        email: savedUser.email || "",
        role: savedUser.role || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("rms-user") || "null");
    const updatedUser = { ...currentUser, ...formData };
    localStorage.setItem("rms-user", JSON.stringify(updatedUser));
    setMessage("Profile updated successfully.");
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Header title="Profile" subtitle="Manage your account details." />

        <div className="dashboard-content">
          <div
            style={{
              maxWidth: 640,
              background: "white",
              borderRadius: 12,
              padding: 24,
              boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ marginBottom: 8 }}>Account Details</h3>
            <p style={{ marginBottom: 20, color: "#6b7280" }}>
              Update your profile information and role details.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row" style={{ marginBottom: 12 }}>
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="form-row" style={{ marginBottom: 12 }}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  className="form-control"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="form-row" style={{ marginBottom: 16 }}>
                <label htmlFor="role">Role</label>
                <input
                  id="role"
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Role"
                />
              </div>

              {message && (
                <div className="success-text" style={{ marginBottom: 16 }}>
                  ✅ {message}
                </div>
              )}

              <div style={{ display: "flex", gap: 12 }}>
                <button className="primary-btn" type="submit">
                  Save Changes
                </button>
                <button
                  className="secondary-btn"
                  type="button"
                  onClick={() => navigate(-1)}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
