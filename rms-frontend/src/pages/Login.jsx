import { useState } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  {
    email: "owner@rms.com",
    password: "owner123",
    role: "owner",
    name: "Owner",
    badge: "Full system access",
  },
  {
    email: "manager@rms.com",
    password: "manager123",
    role: "manager",
    name: "Manager",
    badge: "All operations except reports",
  },
  {
    email: "staff@rms.com",
    password: "staff123",
    role: "staff",
    name: "Staff",
    badge: "Menu, orders, and tables only",
  },
];

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!matchedUser) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("rms-user", JSON.stringify(matchedUser));

    const landingPage = matchedUser.role === "staff" ? "/orders" : "/dashboard";
    navigate(landingPage);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "white",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginBottom: 8 }}>RMS Access Portal</h2>
        <p style={{ marginBottom: 20, color: "#6b7280" }}>
          Secure sign-in for restaurant operations
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="form-row" style={{ marginTop: 12 }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          {error && (
            <div className="error-text" style={{ marginTop: 12 }}>
              ⚠️ {error}
            </div>
          )}

          <button
            className="primary-btn"
            type="submit"
            style={{ width: "100%", marginTop: 16 }}
          >
            Sign In
          </button>
        </form>

        <div
          style={{
            marginTop: 16,
            padding: 12,
            background: "#f9fafb",
            borderRadius: 8,
          }}
        >
          <strong>Demo accounts</strong>
          <ul style={{ margin: "8px 0 0 16px", color: "#4b5563", padding: 0 }}>
            {users.map((user) => (
              <li key={user.email}>
                <strong>{user.name}</strong> — {user.email} / {user.password} (
                {user.badge})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
