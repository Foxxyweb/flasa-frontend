import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";
import { forgotPassword } from "../api"; // POST /api/auth/forgot

export default function LupaPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMsg("Email harus diisi.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      setSuccessMsg("");

      // 🔥 PANGGIL BACKEND: POST /api/auth/forgot
      const res = await forgotPassword({ email });

      setSuccessMsg(
        res.data.message ||
          "Instruksi reset kata sandi telah dikirim ke email Anda."
      );

      // kalau mau user langsung diarahkan ke login, ini boleh dipakai
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        "Gagal mengirim instruksi reset kata sandi. Coba lagi.";
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
            <img src="/img/logo flasa.png" alt="Logo Kuliner Palembang" />
          </div>

          {/* Judul */}
          <h1 className="login-title">Lupa Kata Sandi</h1>
          <p className="login-subtitle">
            Masukkan email Anda, kami akan mengirimkan instruksi untuk mereset
            kata sandi.
          </p>

          {/* Pesan error / sukses */}
          {errorMsg && <p className="login-alert login-alert-error">{errorMsg}</p>}
          {successMsg && (
            <p className="login-alert login-alert-success">{successMsg}</p>
          )}

          {/* FORM LUPA PASSWORD */}
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Mengirim..." : "Kirim Instruksi Reset"}
            </button>
          </form>

          <p className="login-footer-text">
            Kembali ke <Link to="/login">Login</Link>
          </p>

          <p className="login-footer-text">
            © 2025 Kuliner Palembang. Semua hak cipta dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
}
