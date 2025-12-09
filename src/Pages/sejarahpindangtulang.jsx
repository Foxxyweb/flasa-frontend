// src/Pages/PindangTulangDetail.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/style.css";

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
    href: "burgo-sejarah.html",
  },
  {
    id: 3,
    img: "/img/geserpindangikan.png",
    title: "Pindang Ikan",
    desc: "Ikan segar dalam kuah asam pedas yang menyegarkan.",
    href: "pindang-ikan.html",
  },
  {
    id: 4,
    img: "/img/geserpindangtulang.png",
    title: "Pindang Tulang",
    desc: "Tulang iga sapi dalam kuah asam pedas gurih.",
    href: "pindang-tulang.html",
  },
  {
    id: 5,
    img: "/img/gesermiecelor.png",
    title: "Mie Celor",
    desc: "Mie bersantan kental dengan udang dan telur rebus.",
    href: "mie-celor.html",
  },
  {
    id: 6,
    img: "/img/gesermodel.png",
    title: "Model",
    desc: "Olahan ikan dengan kuah bening yang ringan.",
    href: "model.html",
  },
  {
    id: 7,
    img: "/img/gesermaksuba.png",
    title: "Kue Maksuba",
    desc: "Kue telur pekat berlapis yang lembut dan manis.",
    href: "kue-maksuba.html",
  },
  {
    id: 8,
    img: "/img/geserkue8jam.png",
    title: "Kue 8 Jam",
    desc: "Kue legit khas Palembang yang dimasak berjam-jam.",
    href: "kue-8jam.html",
  },
  {
    id: 9,
    img: "/img/gesereskacang.png",
    title: "Es Kacang Merah",
    desc: "Segarnya kacang merah, santan, dan es serut manis.",
    href: "es-kacang-merah.html",
  },
  {
    id: 10,
    img: "/img/gesermartabakhar.png",
    title: "Martabak HAR",
    desc: "Martabak telur dengan kuah kari khas Palembang.",
    href: "martabak-har.html",
  },
];

export default function PindangTulangDetail() {
  // ===== SLIDER GALERI =====
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(id);
  }, []);

  const trackStyle = {
    transform: `translateX(-${currentSlide * 100}%)`,
  };

  // ===== VIDEO MODAL =====
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoURL = "https://www.youtube.com/embed/QVBINhTmLzo?si=_ioTdFD_Ho6Cmwp-";

  const openModal = () => setIsVideoOpen(true);
  const closeModal = () => setIsVideoOpen(false);

  return (
    <div className="detail-body pindangtulang-bg">
      <Navbar />

      <main className="detail-main">
        {/* background besar */}
        <div
          className="detail-hero-bg"
          style={{ backgroundImage: "url('/img/baground2sjr.png')" }}
        />

        <div className="detail-wrapper">
          {/* TOP BAR */}
          <div className="detail-topbar">
            <Link to="/sejarah" className="detail-back-btn">
              <span>&larr;</span>
            </Link>

            <div className="detail-title-group">
              <div className="detail-title-pill">Pindang Tulang</div>
              <p className="detail-subtitle">
                "Kelezatan gurih asam pedas yang menggambarkan keberanian dan
                kehangatan rasa dari Bumi Sriwijaya."
              </p>
            </div>
          </div>

          {/* SECTION 1 */}
          <section className="detail-section detail-section-1">
            <div className="detail-text-box">
              <h2>Apa Itu Pindang Tulang?</h2>
              <p>
                Pindang Tulang adalah salah satu hidangan tradisional khas
                Palembang yang terkenal dengan cita rasa gurih, asam, dan pedas
                yang berpadu harmonis. Masakan ini biasanya terbuat dari
                potongan tulang sapi atau iga dengan sedikit daging yang
                direbus lama bersama bumbu rempah seperti serai, lengkuas,
                cabai, bawang, dan asam jawa.
              </p>
              <p>
                Kuahnya yang berwarna kemerahan dan aromanya yang khas
                menjadikan Pindang Tulang sebagai salah satu ikon kuliner
                Palembang yang menggugah selera. Hidangan ini sering disajikan
                dalam acara keluarga atau perayaan besar, menandakan kebersamaan
                dan semangat gotong royong masyarakat setempat.
              </p>
            </div>

            <div className="detail-photo-card">
              <div className="detail-photo-inner">
                <img src="/img/SEJPINDANGTULANG.png" alt="Pindang Tulang" />
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
                Lebih dari sekadar hidangan rumahan, Pindang Tulang mencerminkan
                karakter masyarakat Palembang yang hangat, kuat, dan penuh
                semangat. Perpaduan rasa asam, pedas, dan gurih di dalamnya
                melambangkan keseimbangan kehidupan, bahwa dalam setiap
                kesulitan selalu ada kehangatan dan kebersamaan.
              </p>
              <p>
                Dalam tradisi Palembang, memasak Pindang Tulang bersama keluarga
                menjadi bentuk kebersamaan yang mempererat hubungan antargenerasi
                keluarga. Hidangan ini juga menjadi simbol penghormatan terhadap
                tamu, sebagai wujud menyajikan dalam berbagi kenikmatan dan
                keramahan khas Palembang.
              </p>
              <p>
                Hingga kini, Pindang Tulang tetap menjadi warisan rasa yang
                menandai kekayaan kuliner dan budaya dari tanah Sriwijaya, serta
                menjadi kebanggaan masyarakat Palembang yang selalu dijaga dan
                dilestarikan.
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
            <h2 className="detail-facts-title">Fakta Singkat Pindang Tulang</h2>

            <div className="detail-facts-grid">
              <article className="detail-fact-card">
                <span className="detail-fact-label">Asal</span>
                <p className="detail-fact-value">
                  Palembang, Sumatera Selatan
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Jenis Hidangan</span>
                <p className="detail-fact-value">
                  Hidangan berkuah asam pedas berbahan tulang iga
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Bahan Utama</span>
                <p className="detail-fact-value">
                  Tulang iga sapi, nanas, cabai, dan aneka rempah
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Waktu Paling Pas</span>
                <p className="detail-fact-value">
                  Makan siang atau makan malam bersama keluarga
                </p>
              </article>
            </div>

            <article className="detail-reason-card">
              <h3 className="detail-reason-title">
                Kenapa Harus Coba Pindang Tulang?
              </h3>
              <ul className="detail-reason-list">
                <li>
                  Kuah asam pedasnya kuat, berpadu dengan lemak dari tulang iga
                  yang gurih.
                </li>
                <li>
                  Daging di sekitar tulang biasanya empuk dan kaya rasa.
                </li>
                <li>
                  Potongan nanas memberi sensasi segar yang khas pada kuahnya.
                </li>
                <li>
                  Sangat cocok disantap hangat-hangat dengan nasi putih pulen.
                </li>
              </ul>
            </article>
          </section>

          {/* SECTION 3 : GALERI GESER */}
          <section className="detail-section detail-gallery-section">
            <h2 className="detail-gallery-title">Kuliner Palembang Lainnya</h2>
            <p className="detail-gallery-subtitle">
              Geser fotonya untuk menjelajahi hidangan khas Palembang yang lain.
            </p>

            <div className="dg-slider">
              <div className="dg-viewport">
                <div className="dg-track" style={trackStyle}>
                  {SLIDES.map((slide) => {
                    const content = (
                      <>
                        <img src={slide.img} alt={slide.title} />
                        <div className="dg-caption">
                          <h3>{slide.title}</h3>
                          <p>{slide.desc}</p>
                        </div>
                      </>
                    );

                    return slide.href ? (
                      <a key={slide.id} href={slide.href} className="dg-item">
                        {content}
                      </a>
                    ) : (
                      <div key={slide.id} className="dg-item dg-intro">
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* POPUP VIDEO */}
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
              title="Video Pindang Tulang"
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
