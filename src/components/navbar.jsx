import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // ⬅ TAMBAHAN

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);

    // ⬅ BACA ROLE USER DARI localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUserRole(parsed.role || null); // role: "admin" / "user"
    }
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user"); // ⬅ BERSIHKAN USER ROLE SAAT LOGOUT

    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/img/logo flasa.png" alt="Logo Kuliner Palembang" />
      </div>

      <ul className="navbar-menu">
        <li>
          <Link to="/home" className={isActive("/home") ? "active" : ""}>
            Beranda
          </Link>
        </li>

        <li>
          <Link to="/sejarah" className={isActive("/sejarah") ? "active" : ""}>
            Sejarah
          </Link>
        </li>

        <li>
          <Link to="/resep" className={isActive("/resep") ? "active" : ""}>
            Resep
          </Link>
        </li>

        {/* ⬇⬇⬇ MENU KHUSUS ADMIN ⬇⬇⬇ */}
       {isLoggedIn && userRole === "admin" && (
  <li>
    <Link
      to="/admin"                         // ⬅ ganti dari "/admin/dashboard"
      className={isActive("/admin") ? "active" : ""}
    >
      Dashboard
    </Link>
  </li>
)}

        {/* ⬆⬆⬆ MENU KHUSUS ADMIN ⬆⬆⬆ */}

        {/* LOGIN / LOGOUT */}
        <li>
          {!isLoggedIn ? (
            <Link to="/login" className="navbar-login">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="navbar-logout">
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
