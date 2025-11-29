import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const loc = useLocation();
  const nav = useNavigate();

  const isAuth = loc.pathname === "/login" || loc.pathname === "/signup";

  const handleLogout = () => {
    localStorage.removeItem("user");
    nav("/login");
  };

  return (
    <nav className="navbar">
      <div onClick={() => nav("/dashboard")} style={{ cursor: "pointer" }}>
        AirTech
      </div>

      {!isAuth ? (
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/home">Take Test</Link>
          <Link to="/analytics">Analytics</Link>
          <span onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </span>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
