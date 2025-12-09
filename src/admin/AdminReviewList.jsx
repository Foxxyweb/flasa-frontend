// src/admin/AdminReviewList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminGetAllReviews, adminDeleteReview } from "../api";

export default function AdminReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadReviews = async () => {
    try {
      setLoading(true);
      setError("");

      // GET /api/admin/reviews  -> backend mengembalikan array rows
      const res = await adminGetAllReviews();
      const list = Array.isArray(res.data) ? res.data : res.data.reviews || [];
      setReviews(list);
    } catch (err) {
      console.error("Gagal ambil review (admin):", err);
      setError(
        err.response?.data?.message || "Gagal mengambil data review."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin mau hapus review ini?")) return;

    try {
      // DELETE /api/admin/reviews/:id
      await adminDeleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Gagal hapus review:", err);
      alert(
        err.response?.data?.message || "Gagal menghapus review. Coba lagi."
      );
    }
  };

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <div>
          <h1>Daftar Review</h1>
          <p className="admin-page-subtitle">
            Lihat semua ulasan pengguna untuk seluruh resep.
          </p>
        </div>
        <Link to="/admin" className="admin-back-link">
          ← Kembali ke Dashboard
        </Link>
      </header>

      {loading && <p>Memuat data...</p>}

      {error && <p className="admin-error">{error}</p>}

      {!loading && !error && reviews.length === 0 && (
        <p>Belum ada review.</p>
      )}

      {!loading && !error && reviews.length > 0 && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Resep</th>
                <th>Nama User</th>
                <th>Rating</th>
                <th>Komentar</th>
                <th>Dibuat</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.recipe_slug}</td>
                  <td>{r.display_name}</td>
                  <td>{r.rating}</td>
                  <td>{r.comment}</td>
                  <td>{r.created_at}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-btn-danger"
                      onClick={() => handleDelete(r.id)}
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
    </div>
  );
}
