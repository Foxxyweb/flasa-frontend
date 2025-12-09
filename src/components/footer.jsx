// src/Components/Footer.jsx
import { Link } from 'react-router-dom';  // Pastikan Link diimpor

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <nav className="footer-menu">
            <Link to="https://wa.me/6285264092036" className="footer-link">
              Hubungi Kami
            </Link>
          </nav>

          <div className="footer-copy">
            &copy; 2025 | Semua Hak Dilindungi.
          </div>
        </div>

        <div className="footer-right">
          <a
            href="https://wa.me/6285264092036"
            className="footer-social"
            target="_blank"
            rel="noopener noreferrer"
          >
            WA
          </a>

          <a
            href="https://www.instagram.com/tim_flasaaa"
            className="footer-social"
            target="_blank"
            rel="noopener noreferrer"
          >
            IG
          </a>

          <a
            href="mailto:tim_flasa@gmail.com?subject=Halo%20Tim%20FLASA&body=Halo%2C%20saya%20ingin%20bertanya%20tentang%20website."
            className="footer-social"
          >
            EM
          </a>
        </div>
      </div>
    </footer>
  );
}
