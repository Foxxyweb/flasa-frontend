// src/admin/AdminDashboard.jsx
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/style.css";   // kalau masih dipakai global
import "../styles/admin.css";   // ✨ style khusus admin

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="admin-layout">
      <Navbar />

      <main className="admin-main">
        {/* HEADER */}
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">Dashboard Admin</p>
            <h1 className="admin-title">
              Selamat datang, {user.name || "Admin"}
            </h1>
            <p className="admin-subtitle">
              Dari sini kamu bisa memantau review dan mengelola akun pengguna.
            </p>
            <div className="admin-hello-badge">
              <span>👋</span>
              <span>Semoga harimu menyenangkan!</span>
            </div>
          </div>
        </header>

        {/* KARTU MENU */}
        <section className="admin-grid">
          {/* Card Review */}
          <Link to="/admin/reviews" className="admin-card admin-card-primary">
            <div>
              <span className="admin-card-label">Konten</span>
              <h2 className="admin-card-title">Lihat &amp; Hapus Review</h2>
              <p className="admin-card-text">
                Cek semua ulasan makanan, moderasi komentar yang tidak pantas,
                dan pantau rating tiap resep.
              </p>
            </div>

            <div className="admin-card-footer">
              <div className="admin-pill">⭐</div>
              <div className="admin-link-cta">
                <span>Lihat daftar review</span>
                <span>→</span>
              </div>
            </div>
          </Link>

          {/* Card User */}
          <Link to="/admin/users" className="admin-card">
            <div>
              <span className="admin-card-label">Pengguna</span>
              <h2 className="admin-card-title">Kelola Akun User</h2>
              <p className="admin-card-text">
                Lihat daftar user terdaftar, atur role, dan blokir akun
                yang mencurigakan jika diperlukan.
              </p>
            </div>

            <div className="admin-card-footer">
              <div className="admin-pill">👤</div>
              <div className="admin-link-cta">
                <span>Kelola akun</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
