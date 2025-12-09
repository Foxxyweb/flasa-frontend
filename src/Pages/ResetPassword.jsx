// src/Pages/ResetPassword.jsx
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../styles/login.css";
import { resetPassword } from "../api"; // ✅ pakai nama yg benar

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams(); // token dari URL /reset-password/:token

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    if (!password || !confirmPassword) {
      setErrorMsg("Kata sandi dan konfirmasi harus diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Kata sandi dan konfirmasi tidak cocok.");
      return;
    }

    try {
      setLoading(true);

      // ✅ kirim token + password ke backend
      const res = await resetPassword(token, password);

      setSuccessMsg(
        res.data.message ||
          "Kata sandi berhasil direset. Silakan login."
      );

      // boleh kasih jeda sedikit kalau mau
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1500);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        "Token tidak valid atau sudah kedaluwarsa. Coba minta reset lagi.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-body">
      <div className="login-overlay"></div>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-logo">
            <img src="/img/logo flasa.png" alt="Logo Kuliner Palembang" />
          </div>

          <h1 className="login-title">Reset Kata Sandi</h1>
          <p className="login-subtitle">
            Masukkan kata sandi baru untuk akun Anda.
          </p>

          {errorMsg && (
            <p className="login-alert login-alert-error">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="login-alert login-alert-success">{successMsg}</p>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">Kata Sandi Baru</label>
              <div className="input-wrap">
                <span className="input-icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="input-wrap">
                <span className="input-icon">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Memproses..." : "Simpan Kata Sandi"}
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
