// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Scroll ke atas setiap ganti halaman
import ScrollToTop from "./components/ScrollToTop";

// ===== HALAMAN AUTH =====
import Login from "./Pages/login";
import LupaPassword from "./Pages/lupapassword";
import Register from "./Pages/register";
import ResetPassword from "./Pages/ResetPassword";

// ===== HALAMAN UTAMA =====
import Home from "./Pages/Home"; // <= diubah: Home -> home
import Sejarah from "./Pages/sejarah";
import Resep from "./Pages/resep";
import Rekomendasi from "./Pages/rekomendasi";

// ===== HALAMAN SEJARAH DETAIL =====
import SejarahPindangIkan from "./Pages/sejarahpindangikan";
import SejarahPindangTulang from "./Pages/sejarahpindangtulang";
import SejarahModel from "./Pages/sejarahmodel";
import SejarahMieCelor from "./Pages/sejarahmiecelor";
import SejarahMartabakHar from "./Pages/sejarahmartabakhar";
import SejarahKueMaksuba from "./Pages/sejarahkuemaksuba";
import SejarahKue8Jam from "./Pages/sejarahkue8jam";
import SejarahEsKacang from "./Pages/sejaraheskacang";
import SejarahBurgo from "./Pages/sejarahburgo";

// ===== HALAMAN RESEP DETAIL =====
import ResepPindangIkan from "./Pages/reseppindangikan";
import ResepPindangTulang from "./Pages/reseppindangtulang";
import ResepBurgo from "./Pages/resepburgo";
import ResepModel from "./Pages/resepmodel";
import ResepMieCelor from "./Pages/resepmiecelor";
import ResepMartabakHar from "./Pages/resepmartabakhar";
import ResepKueMaksuba from "./Pages/resepkuemaksuba";
import ResepKue8Jam from "./Pages/resepkue8jam";
import ResepEsKacang from "./Pages/resepeskacang";

// ===== ADMIN =====
import AdminDashboard from "./admin/AdminDashboard";
import AdminReviewList from "./admin/AdminReviewList";
import AdminUserList from "./admin/AdminUserList";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <>
      {/* Tidak merender apa pun, hanya scroll ke atas tiap route berubah */}
      <ScrollToTop />

      <Routes>
        {/* root langsung ke home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* ===== AUTH ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/lupapassword" element={<LupaPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<Register />} />

        {/* ===== HALAMAN UMUM ===== */}
        <Route path="/Home" element={<Home />} />
        <Route path="/sejarah" element={<Sejarah />} />
        <Route path="/resep" element={<Resep />} />
        <Route path="/rekomendasi" element={<Rekomendasi />} />

        {/* ===== ADMIN (hanya admin) ===== */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <AdminRoute>
              <AdminReviewList />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUserList />
            </AdminRoute>
          }
        />

        {/* ===== SEJARAH DETAIL ===== */}
        <Route path="/sejarah/pindangikan" element={<SejarahPindangIkan />} />
        <Route path="/sejarah/pindangtulang" element={<SejarahPindangTulang />} />
        <Route path="/sejarah/model" element={<SejarahModel />} />
        <Route path="/sejarah/miecelor" element={<SejarahMieCelor />} />
        <Route path="/sejarah/martabakhar" element={<SejarahMartabakHar />} />
        <Route path="/sejarah/kuemaksuba" element={<SejarahKueMaksuba />} />
        <Route path="/sejarah/kue8jam" element={<SejarahKue8Jam />} />
        <Route path="/sejarah/eskacang" element={<SejarahEsKacang />} />
        <Route path="/sejarah/burgo" element={<SejarahBurgo />} />

        {/* ===== RESEP DETAIL ===== */}
        <Route path="/resep/pindangikan" element={<ResepPindangIkan />} />
        <Route path="/resep/pindangtulang" element={<ResepPindangTulang />} />
        <Route path="/resep/burgo" element={<ResepBurgo />} />
        <Route path="/resep/model" element={<ResepModel />} />
        <Route path="/resep/miecelor" element={<ResepMieCelor />} />
        <Route path="/resep/kuemaksuba" element={<ResepKueMaksuba />} />
        <Route path="/resep/kue8jam" element={<ResepKue8Jam />} />
        <Route path="/resep/eskacang" element={<ResepEsKacang />} />
        <Route path="/resep/martabakhar" element={<ResepMartabakHar />} />

        {/* Fallback kalau path tidak dikenal */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
