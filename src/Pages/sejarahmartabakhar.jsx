// src/Pages/sejarahmartabakhar.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/style.css";

// Data slider "Kuliner Palembang Lainnya"
const SLIDES = [
  {
    id: 1,
    img: "/img/geserpalembang.png",
    title: "Kuliner Palembang",
    desc: "Jelajahi beragam hidangan legendaris dari Bumi Sriwijaya.",
  },
  {
    id: 2,
    img: "/img/geserburgo.png",
    title: "Burgo",
    desc: "Lembaran beras dengan kuah santan gurih berbumbu.",
    href: "/sejarah/burgo",
  },
  {
    id: 3,
    img: "/img/geserpindangikan.png",
    title: "Pindang Ikan",
    desc: "Ikan segar dalam kuah asam pedas yang menyegarkan.",
    href: "/sejarah/pindang-ikan",
  },
  {
    id: 4,
    img: "/img/geserpindangtulang.png",
    title: "Pindang Tulang",
    desc: "Tulang iga sapi dalam kuah asam pedas gurih.",
    href: "/sejarah/pindang-tulang",
  },
  {
    id: 5,
    img: "/img/gesermiecelor.png",
    title: "Mie Celor",
    desc: "Mie bersantan kental dengan udang dan telur rebus.",
    href: "/sejarah/mie-celor",
  },
  {
    id: 6,
    img: "/img/gesermodel.png",
    title: "Model",
    desc: "Olahan ikan dengan kuah bening yang ringan.",
    href: "/sejarah/model",
  },
  {
    id: 7,
    img: "/img/gesermaksuba.png",
    title: "Kue Maksuba",
    desc: "Kue telur pekat berlapis yang lembut dan manis.",
    href: "/sejarah/kue-maksuba",
  },
  {
    id: 8,
    img: "/img/geserkue8jam.png",
    title: "Kue 8 Jam",
    desc: "Kue legit khas Palembang yang dimasak berjam-jam.",
    href: "/sejarah/kue-8-jam",
  },
  {
    id: 9,
    img: "/img/gesereskacang.png",
    title: "Es Kacang Merah",
    desc: "Segarnya kacang merah, santan, dan es serut manis.",
    href: "/sejarah/es-kacang-merah",
  },
  {
    id: 10,
    img: "/img/gesermartabakhar.png",
    title: "Martabak HAR",
    desc: "Martabak telur dengan kuah kari khas Palembang.",
    href: "/sejarah/martabak-har",
  },
];

export default function SejarahMartabakHar() {
  // ===== Slider otomatis 5 detik =====
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const trackStyle = {
    transform: `translateX(-${currentSlide * 100}%)`,
  };

  // ===== Video modal =====
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoURL = "https://www.youtube.com/embed/erC3l7bI9B0?si=Ki22o0GWxv9S9iV4"; // ganti nanti

  const openModal = () => setIsVideoOpen(true);
  const closeModal = () => setIsVideoOpen(false);

  return (
    <div className="detail-body martabakhar-bg">
      <Navbar />

      <main className="detail-main">
        {/* BACKGROUND BESAR */}
        <div
          className="detail-hero-bg"
          style={{ backgroundImage: "url('/img/baground2sjr.png')" }}
        ></div>

        <div className="detail-wrapper">
          {/* TOP BAR */}
          <div className="detail-topbar">
            <Link to="/sejarah" className="detail-back-btn">
              <span>&larr;</span>
            </Link>

            <div className="detail-title-group">
              <div className="detail-title-pill">Martabak HAR</div>
              <p className="detail-subtitle">
                “Perpaduan Rasa dan Sejarah yang Menjadi Ikon Kuliner Legendaris
                Kota Palembang”
              </p>
            </div>
          </div>

          {/* SECTION 1 */}
          <section className="detail-section detail-section-1">
            <div className="detail-text-box">
              <h2>Apa Itu Martabak HAR?</h2>
              <p>
                Martabak HAR adalah salah satu kuliner khas Palembang yang
                memiliki cita rasa unik dan sejarah panjang. Nama “HAR” sendiri
                berasal dari singkatan Haji Abdul Rozak, perantau asal India
                yang memperkenalkan martabak ini di Palembang pada tahun
                1940-an.
              </p>
              <p>
                Martabak HAR dibuat dari adonan tepung tipis yang diisi telur
                ayam atau telur bebek, kemudian digoreng hingga renyah di luar
                dan lembut di dalam. Ciri khas utama dari martabak ini terletak
                pada kuah kari gurih yang disiram di atasnya — terbuat dari
                rempah pilihan, kentang, dan kuah santan yang kaya rasa. Paduan
                antara kulit martabak, telur, dan kuah kari menciptakan harmoni
                rasa yang tak terlupakan.
              </p>
            </div>

            <div className="detail-photo-card">
              <div className="detail-photo-inner">
                <img src="/img/SEJMARTABAKHAR.png" alt="Martabak HAR" />
                <button
                  className="detail-play-btn"
                  type="button"
                  onClick={openModal}
                >
                  &#9658;
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="detail-section detail-section-2">
            <div className="detail-bottom-left">
              <h3>
                Filosofi dan
                <br />
                Warisan Budaya
              </h3>
            </div>

            <div className="detail-bottom-card">
              <p>
                Lebih dari sekadar makanan, Martabak HAR adalah bukti akulturasi
                budaya antara India dan Palembang yang berpadu secara harmonis.
                Kehadiran martabak ini menunjukkan keterbukaan masyarakat
                Palembang terhadap pengaruh luar tanpa meninggalkan identitas
                lokal.
              </p>
              <p>
                Filosofinya terletak pada perpaduan rempah dan bahan sederhana
                yang menggambarkan keragaman serta kehangatan dalam kehidupan
                masyarakat Palembang. Hingga kini, Martabak HAR bukan hanya
                menjadi kuliner legendaris, tetapi juga simbol kebanggaan dan
                kenangan warga Palembang yang diwariskan lintas generasi.
              </p>
            </div>

            <div className="detail-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </section>

          {/* SECTION FAKTA + KENAPA HARUS COBA */}
          <section className="detail-section detail-facts-section">
            <h2 className="detail-facts-title">
              Fakta Singkat Martabak HAR
            </h2>

            <div className="detail-facts-grid">
              <article className="detail-fact-card">
                <span className="detail-fact-label">Asal</span>
                <p className="detail-fact-value">
                  Palembang, Sumatera Selatan (diperkenalkan keturunan India)
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Jenis Hidangan</span>
                <p className="detail-fact-value">
                  Martabak telur dengan kuah kari khas
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Bahan Utama</span>
                <p className="detail-fact-value">
                  Telur, tepung terigu, bawang, dan kuah kari sapi/ayam
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Waktu Paling Pas</span>
                <p className="detail-fact-value">
                  Makan malam atau camilan berat di malam hari
                </p>
              </article>
            </div>

            <article className="detail-reason-card">
              <h3 className="detail-reason-title">
                Kenapa Harus Coba Martabak HAR?
              </h3>
              <ul className="detail-reason-list">
                <li>
                  Telur dan kulit martabak yang tipis berpadu dengan kuah kari
                  hangat yang harum rempah.
                </li>
                <li>
                  Punya sejarah panjang sebagai salah satu ikon kuliner malam di
                  Palembang.
                </li>
                <li>
                  Cocok untuk yang suka hidangan gurih dan berbumbu kuat.
                </li>
                <li>
                  Sering dinikmati bersama cabai rawit utuh untuk sensasi pedas
                  langsung.
                </li>
              </ul>
            </article>
          </section>

          {/* SECTION 3 : GALERI GESER */}
          <section className="detail-section detail-gallery-section">
            <h2 className="detail-gallery-title">Kuliner Palembang Lainnya</h2>
            <p className="detail-gallery-subtitle">
              Geser fotonya untuk menjelajahi hidangan khas Palembang yang
              lain.
            </p>

            <div className="dg-slider">
              <div className="dg-viewport">
                <div className="dg-track" style={trackStyle}>
                  {SLIDES.map((slide) => {
                    const inner = (
                      <>
                        <img src={slide.img} alt={slide.title} />
                        <div className="dg-caption">
                          <h3>{slide.title}</h3>
                          <p>{slide.desc}</p>
                        </div>
                      </>
                    );

                    return slide.href ? (
                      <Link key={slide.id} to={slide.href} className="dg-item">
                        {inner}
                      </Link>
                    ) : (
                      <div key={slide.id} className="dg-item dg-intro">
                        {inner}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* POPUP VIDEO MARTABAK HAR */}
      <div
        className={`video-modal ${isVideoOpen ? "show" : ""}`}
        onClick={(e) => {
          if (e.target.classList.contains("video-modal")) {
            closeModal();
          }
        }}
      >
        <div className="video-modal-content">
          <button className="video-close" onClick={closeModal}>
            &times;
          </button>
          {isVideoOpen && (
            <iframe
              title="Video Martabak HAR"
              src={`${videoURL}?autoplay=1`}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
