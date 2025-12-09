import { Link } from "react-router-dom";
import "../styles/style.css";

export default function Rekomendasi() {
  return (
    <div className="rekom-body">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/img/logo flasa.png" alt="Logo" />
        </div>
        <ul className="navbar-menu">
          <li><Link to="/home">Beranda</Link></li>
          <li><Link to="/sejarah">Sejarah</Link></li>
          <li><Link to="/resep">Resep</Link></li>
        </ul>
      </nav>

      {/* KONTEN UTAMA */}
      <main className="rekom-main">
        {/* HERO */}
        <section className="rekom-hero">
          <div className="rekom-badge">Jelajahi Palembang</div>
          <h1>Rekomendasi Tempat Kuliner Khas Palembang</h1>
          <p>
            Temukan spot terbaik untuk menikmati pempek, pindang, mie celor, dan aneka hidangan legendaris Palembang. Pilih tempat favoritmu dan langsung menuju lokasinya.
          </p>
        </section>

        {/* LAYOUT MAP + LIST */}
        <section className="rekom-content">
          {/* MAP KIRI */}
          <div className="rekom-map-card">
            <div className="rekom-map-header">
              <h2>Peta Kuliner Palembang</h2>
              <p>Zoom dan geser peta untuk menjelajahi area kuliner di sekitar kota.</p>
            </div>

            <div className="rekom-map-frame">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63725.56340984267!2d104.7164176!3d-2.9760741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75e8b6d4c9a9%3A0x3039d80b220cf50!2sPalembang%2C%20Kota%20Palembang%2C%20Sumatera%20Selatan!5e0!3m2!1sid!2sid!4v1732698670000"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Kuliner Palembang"
              ></iframe>
            </div>

            <p className="rekom-map-note">
              *Lokasi bersifat ilustratif, detail titik bisa berbeda di lapangan.
            </p>
          </div>

          {/* LIST KANAN */}
          <div className="rekom-places">
            <div className="rekom-filter-bar">
              <span>Daftar Tempat</span>
              <span className="rekom-filter-hint">Klik “Lihat lokasi di Maps” untuk membuka Google Maps</span>
            </div>

            <div className="rekom-places-list">
              {/* 1 */}
              <article className="rekom-place-card">
                <div className="rekom-place-thumb">
                  <img src="/img/beringin.png" alt="Pempek Beringin" />
                </div>
                <div className="rekom-place-content">
                  <div className="rekom-place-header">
                    <h3>Pempek Beringin</h3>
                    <span className="rekom-tag">Pempek</span>
                  </div>
                  <p className="rekom-place-desc">
                    Brand pempek besar di Palembang dengan banyak cabang. Teksturnya kenyal dengan rasa ikan yang kuat, cocok untuk oleh-oleh maupun makan di tempat.
                  </p>
                  <a
                    href="https://www.google.com/maps?q=Pempek+Beringin+Palembang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rekom-link"
                  >
                    Lihat lokasi di Maps →
                  </a>
                </div>
              </article>

              {/* 2 */}
              <article className="rekom-place-card">
                <div className="rekom-place-thumb">
                  <img src="/img/srimelayu.png" alt="Sri Melayu" />
                </div>
                <div className="rekom-place-content">
                  <div className="rekom-place-header">
                    <h3>Sri Melayu</h3>
                    <span className="rekom-tag">Restoran Khas</span>
                  </div>
                  <p className="rekom-place-desc">
                    Restoran khas Palembang dengan menu pindang, tempoyak, tepek ikan, dan lauk rumahan lainnya. Suasana nyaman untuk makan bersama keluarga.
                  </p>
                  <a
                    href="https://www.google.com/maps?q=Rumah+Makan+Sri+Melayu+Palembang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rekom-link"
                  >
                    Lihat lokasi di Maps →
                  </a>
                </div>
              </article>

              {/* 3 */}
              <article className="rekom-place-card">
                <div className="rekom-place-thumb">
                  <img src="/img/candy.jpg" alt="Pempek Candy" />
                </div>
                <div className="rekom-place-content">
                  <div className="rekom-place-header">
                    <h3>Pempek Candy</h3>
                    <span className="rekom-tag">Pempek</span>
                  </div>
                  <p className="rekom-place-desc">
                    Pempek legendaris dengan cita rasa autentik. Tersedia berbagai jenis pempek, lengkap dengan cuko yang khas.
                  </p>
                  <a
                    href="https://www.google.com/maps?q=Pempek+Candy+Palembang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rekom-link"
                  >
                    Lihat lokasi di Maps →
                  </a>
                </div>
              </article>

              {/* 4 */}
              <article className="rekom-place-card">
                <div className="rekom-place-thumb">
                  <img src="/img/warungaba.jpg" alt="Warung Aba" />
                </div>
                <div className="rekom-place-content">
                  <div className="rekom-place-header">
                    <h3>Warung Aba</h3>
                    <span className="rekom-tag">Kuliner Rakyat</span>
                  </div>
                  <p className="rekom-place-desc">
                    Tempat populer untuk menikmati aneka pempek dan makanan khas Palembang lainnya dengan harga yang ramah di kantong.
                  </p>
                  <a
                    href="https://www.google.com/maps?q=Warung+Aba+Palembang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rekom-link"
                  >
                    Lihat lokasi di Maps →
                  </a>
                </div>
              </article>

              {/* 5 */}
              <article className="rekom-place-card">
                <div className="rekom-place-thumb">
                  <img
                    src="/img/celor26.jpeg"
                    alt="Mie Celor 26 Ilir H. Syafe'i"
                  />
                </div>
                <div className="rekom-place-content">
                  <div className="rekom-place-header">
                    <h3>Mie Celor 26 Ilir H. Syafe'i</h3>
                    <span className="rekom-tag">Mie Celor</span>
                  </div>
                  <p className="rekom-place-desc">
                    Salah satu mie celor paling terkenal di Palembang, dengan kuah santan gurih, udang melimpah, dan rasa yang kaya.
                  </p>
                  <a
                    href="https://www.google.com/maps?q=Mie+Celor+26+Ilir+H.+Syafe%27i"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rekom-link"
                  >
                    Lihat lokasi di Maps →
                  </a>
                </div>
              </article>

              {/* 6 */}
              <article className="rekom-place-card">
                <div className="rekom-place-thumb">
                  <img
                    src="/img/pindangbunda.jpg"
                    alt="RM Pindang Meranjat Bunda"
                  />
                </div>
                <div className="rekom-place-content">
                  <div className="rekom-place-header">
                    <h3>RM Pindang Meranjat Bunda</h3>
                    <span className="rekom-tag">Pindang</span>
                  </div>
                  <p className="rekom-place-desc">
                    Terkenal dengan pindang patin dan pindang tulang yang pedas segar. Cocok untuk pencinta makanan berkuah dan bercita rasa kuat.
                  </p>
                  <a
                    href="https://www.google.com/maps?q=Pindang+Meranjat+Bunda+Palembang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rekom-link"
                  >
                    Lihat lokasi di Maps →
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-menu">
              <a
                href="https://wa.me/6285264092036?text=Halo%20tim%20FLASA%2C%20saya%20ingin%20bertanya%20tentang%20website%20kuliner."
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hubungi Kami
              </a>
            </div>

            <div className="footer-copy">
              © 2025 | All Rights Reserved.
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
    </div>
  );
}
