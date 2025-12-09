// src/pages/Login.jsx (atau lokasi yang kamu pakai)
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import { loginUser } from "../api";      // fungsi dari api.js
import { setAuth } from "../auth";       // ⬅️ helper auth

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Email dan kata sandi harus diisi.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      // 🔥 panggil backend via api.js
      const res = await loginUser({ email, password });

      // backend diharapkan mengirim { token, user, message? }
      const data = res.data;

      if (!data?.token || !data?.user) {
        setErrorMsg("Respon server tidak sesuai. Hubungi admin.");
        return;
      }

      // ✅ simpan token & data user lewat helper auth.js
      setAuth({ token: data.token, user: data.user });

      // optional: kalau mau tetap punya role & name terpisah:
      const role = data.user.role || "user";
      const name = data.user.name || "";
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", name);

      // cek apakah sebelumnya ada halaman yg minta login dulu
      const redirectPath = localStorage.getItem("redirectAfterLogin");

      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath, { replace: true });
      } else if (role === "admin") {
        // kalau admin dan tidak ada redirect khusus -> ke dashboard admin
        navigate("/admin", { replace: true });
      } else {
        // user biasa -> ke home (atau sesuaikan rute utama)
        navigate("/home", { replace: true });
      }
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        "Login gagal. Periksa kembali email dan kata sandi.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  // optional: bersihkan error saat user mulai mengetik lagi
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errorMsg) setErrorMsg("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errorMsg) setErrorMsg("");
  };

  return (
    <div className="login-body">
      {/* Overlay dekorasi */}
      <div className="login-overlay"></div>

      {/* Wrapper tengah */}
      <div className="login-wrapper">
        <div className="login-card">
          {/* Logo */}
          <div className="login-logo">
            {/* kalau file di public/img/logo flasa.png */}
            <img src="/img/logo flasa.png" alt="Logo Kuliner Palembang" />
          </div>

          {/* Judul */}
          <h1 className="login-title">Selamat Datang</h1>
          <p className="login-subtitle">
            Masuk untuk menjelajahi sejarah dan resep kuliner khas Palembang.
          </p>

          {/* Pesan error */}
          {errorMsg && (
            <p className="login-alert login-alert-error">{errorMsg}</p>
          )}

          {/* FORM LOGIN */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <i className="fa-regular fa-envelope"></i>
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="nama@email.com"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Kata Sandi</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="form-extra">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Ingat saya</span>
              </label>

              <Link to="/lupapassword" className="forgot-link">
                Lupa kata sandi?
              </Link>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </form>

          {/* Link untuk mendaftar */}
          <p className="login-footer-text">
            Belum punya akun? <Link to="/register">Daftar di sini</Link>
          </p>

          <p className="login-footer-text">
            © 2025 Kuliner Palembang. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
}
