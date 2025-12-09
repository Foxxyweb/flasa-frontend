import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Mengecek status login

  // Jika belum login, arahkan ke halaman login
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Jika sudah login, tampilkan halaman yang diminta
  return children;
};

export default PrivateRoute;
