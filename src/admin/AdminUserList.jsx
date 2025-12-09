// src/admin/AdminUserList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminGetUsers, adminDeleteUser } from "../api";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      // GET /api/admin/users
      const res = await adminGetUsers();
      const list = Array.isArray(res.data)
        ? res.data
        : res.data.users || [];

      setUsers(list);
    } catch (err) {
      console.error("Gagal ambil user (admin):", err);
      setError(
        err.response?.data?.message || "Gagal mengambil data user."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Yakin ingin menghapus user "${name}"?`)) return;

    try {
      await adminDeleteUser(id);
      // hapus dari state tanpa reload halaman
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Gagal hapus user:", err);
      alert(
        err.response?.data?.message || "Gagal menghapus user. Coba lagi nanti."
      );
    }
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value; // kalau backend sudah format string
    return d.toLocaleString("id-ID", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>Daftar User</h1>
          <p>Lihat dan kelola akun pengguna yang terdaftar.</p>
        </div>

        <Link to="/admin" className="admin-back-btn">
          ← Kembali ke Dashboard
        </Link>
      </header>

      <section className="admin-card">
        {loading && <p>Mengambil data...</p>}
        {error && <p className="admin-error">{error}</p>}

        {!loading && !error && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center" }}>
                      Belum ada user.
                    </td>
                  </tr>
                )}

                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`admin-badge ${
                          u.role === "admin"
                            ? "admin-badge-admin"
                            : "admin-badge-user"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td>{formatDate(u.created_at)}</td>
                    <td>
                      <button
                        type="button"
                        className="admin-btn admin-btn-danger"
                        onClick={() => handleDelete(u.id, u.name)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
