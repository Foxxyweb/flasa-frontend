// src/auth.js

// Simpan token + data user ke localStorage
export function setAuth({ token, user }) {
  if (!token || !user) return;

  // Normalisasi role (lowercase + trim)
  const role = (user.role || "user").toString().toLowerCase().trim();

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify({ ...user, role }));
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userRole", role);
  localStorage.setItem("userName", user.name || "");
}

// Hapus semua data auth
export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userName");
}

// Ambil user saat ini
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Cek sudah login atau belum
export function isAuthenticated() {
  return localStorage.getItem("isLoggedIn") === "true";
}

// Cek role admin
export function isAdmin() {
  const role = (localStorage.getItem("userRole") || "")
    .toString()
    .toLowerCase()
    .trim();
  return role === "admin";
}
