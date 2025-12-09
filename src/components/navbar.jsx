import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Cek status login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Mendapatkan status login dari localStorage
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus); // Set state login berdasarkan status
  }, []);

  const isActive = (path) => {
    // Menentukan apakah path saat ini aktif
    if (path === "/home") return location.pathname === "/home";
    if (path === "/sejarah") return location.pathname === "/sejarah";
    if (path === "/resep") return location.pathname === "/resep";
    return false;
  };

  // Fungsi untuk logout
  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false"); // Mengubah status login menjadi false
    setIsLoggedIn(false); // Update state login
    navigate("/home"); // Setelah logout, arahkan ke halaman home
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* Logo dari public/img */}
        <img src="/img/logo flasa.png" alt="Logo Kuliner Palembang" />
      </div>

      <ul className="navbar-menu">
        <li>
          <Link
            to="/home"
            className={isActive("/home") ? "active" : ""}
          >
            Beranda
          </Link>
        </li>
        <li>
          <Link
            to="/sejarah"
            className={isActive("/sejarah") ? "active" : ""}
          >
            Sejarah
          </Link>
        </li>
        <li>
          <Link
            to="/resep"
            className={isActive("/resep") ? "active" : ""}
          >
            Resep
          </Link>
        </li>
        {/* Tombol Login atau Logout */}
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
