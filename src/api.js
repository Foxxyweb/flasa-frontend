// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ===== INTERCEPTOR: otomatis sisipkan token =====
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================================================
   ================  AUTH API  =========================
   ===================================================== */

// LOGIN
export function loginUser(payload) {
  // payload: { email, password }
  return api.post("/auth/login", payload);
}

// REGISTER
export function registerUser(payload) {
  return api.post("/auth/register", payload);
}

// LUPA PASSWORD
export function forgotPassword(email) {
  const payload = typeof email === "string" ? { email } : email;
  return api.post("/auth/forgot-password", payload);
}

// RESET PASSWORD
export function resetPassword(token, password) {
  return api.post("/auth/reset-password", { token, password });
}

/* =====================================================
   ================  RESEP API  =========================
   ===================================================== */

export function getResepList() {
  return api.get("/resep");
}

export function getResepDetail(slug) {
  return api.get(`/resep/${slug}`);
}

/* =====================================================
   ================  REVIEW API (USER)  =================
   ===================================================== */

// GET /api/reviews/:recipeSlug
export function getReviews(recipeSlug) {
  return api.get(`/reviews/${recipeSlug}`);
}

// POST /api/reviews
export function sendReview(recipeSlug, data) {
  // data: { displayName, rating, comment }
  return api.post("/reviews", { recipeSlug, ...data });
}

/* =====================================================
   ================  ADMIN API  =========================
   ===================================================== */

// REVIEW ADMIN
// GET /api/admin/reviews
export function adminGetAllReviews() {
  return api.get("/admin/reviews");
}

// DELETE /api/admin/reviews/:id
export function adminDeleteReview(id) {
  return api.delete(`/admin/reviews/${id}`);
}

// USER ADMIN
// GET /api/admin/users
export function adminGetUsers() {
  return api.get("/admin/users");
}

// DELETE /api/admin/users/:id
export function adminDeleteUser(id) {
  return api.delete(`/admin/users/${id}`);
}

export default api;
