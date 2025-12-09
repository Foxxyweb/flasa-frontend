import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import { registerUser } from "../api"; // ⬅️ penting: impor dari api.js

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg("Semua field harus diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Kata sandi dan konfirmasi kata sandi tidak cocok.");
      return;
    }

    try {
      setLoading(true);

      // 🔥 panggil API lewat api.js
      const res = await registerUser({ name, email, password });

      // kalau sukses, biasanya backend kirim { message: "..." }
      setSuccessMsg(res.data.message || "Registrasi berhasil, silakan login.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);

      // ambil pesan error dari backend kalau ada
      const msg =
        err.response?.data?.message ||
        "Registrasi gagal. Silakan coba lagi.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
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
            {/* file di public/img/logo flasa.png */}
            <img src="/img/logo flasa.png" alt="Logo Kuliner Palembang" />
          </div>

          {/* Judul */}
          <h1 className="login-title">Buat Akun</h1>
          <p className="login-subtitle">
            Daftar untuk mulai menjelajahi sejarah dan resep kuliner khas
            Palembang.
          </p>

          {/* Notifikasi error / sukses */}
          {errorMsg && <p className="login-alert login-alert-error">{errorMsg}</p>}
          {successMsg && (
            <p className="login-alert login-alert-success">{successMsg}</p>
          )}

          {/* FORM REGISTER */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <i className="fa-regular fa-user"></i>
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nama Lengkap"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Konfirmasi Kata Sandi</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Memproses..." : "Daftar"}
            </button>
          </form>

          {/* Link untuk login */}
          <p className="login-footer-text">
            Sudah punya akun? <Link to="/login">Masuk di sini</Link>
          </p>

          <p className="login-footer-text">
            © 2025 Kuliner Palembang. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
}
