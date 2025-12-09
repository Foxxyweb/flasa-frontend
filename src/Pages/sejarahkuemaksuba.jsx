// src/Pages/sejarahmaksuba.jsx
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

export default function SejarahMaksuba() {
  // slider otomatis 5 detik
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

  // video modal
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoURL = "https://www.youtube.com/embed/FRaYTc5C96s?si=peUH4EJPFJahcSbK"; // ganti ID-nya nanti

  const openModal = () => setIsVideoOpen(true);
  const closeModal = () => setIsVideoOpen(false);

  return (
    <div className="detail-body maksuba-bg">
      <Navbar />

      <main className="detail-main">
        {/* background besar */}
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
              <div className="detail-title-pill">Kue Maksuba</div>
              <p className="detail-subtitle">
                "Manisnya Kesabaran dan Keanggunan dalam Warisan Kuliner Khas
                Palembang."
              </p>
            </div>
          </div>

          {/* SECTION 1 */}
          <section className="detail-section detail-section-1">
            <div className="detail-text-box">
              <h2>Apa Itu Kue Maksuba?</h2>
              <p>
                Kue Maksuba merupakan salah satu kue tradisional khas Palembang
                yang menjadi simbol kemewahan dan kebanggaan masyarakat
                setempat. Kue ini sering hadir dalam acara-acara besar seperti
                pernikahan, hari raya, dan penyambutan tamu kehormatan.
              </p>
              <p>
                Terbuat dari bahan utama telur bebek, gula, dan mentega tanpa
                tambahan tepung yang banyak, Maksuba menghadirkan rasa manis
                yang lembut dengan tekstur berlapis yang cantik dan aroma harum
                yang menggugah selera. Proses pembuatannya membutuhkan
                ketelatenan tinggi karena setiap lapisan harus dipanggang satu
                per satu hingga matang sempurna, menciptakan cita rasa yang kaya
                dan mendalam.
              </p>
            </div>

            <div className="detail-photo-card">
              <div className="detail-photo-inner">
                <img src="/img/SEJMAKSUBA.png" alt="Kue Maksuba" />
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
                Lebih dari sekadar sajian lezat, Kue Maksuba mencerminkan
                filosofi kehidupan masyarakat Palembang yang menjunjung tinggi
                kesabaran, ketelitian, dan keindahan dalam setiap proses. Setiap
                lapisan Maksuba melambangkan tingkatan kehidupan yang harus
                dijalani dengan kesungguhan dan ketekunan.
              </p>
              <p>
                Sebagai kue yang sering disajikan untuk tamu penting, Maksuba
                juga menjadi simbol kehormatan dan penghargaan. Dalam budaya
                Palembang, menyajikan Kue Maksuba berarti mempersembahkan yang
                terbaik bagi orang yang dihormati.
              </p>
              <p>
                Keanggunan dan cita rasa manisnya menjadi warisan
                turun-temurun yang menandai kekayaan budaya serta kehangatan
                masyarakat Palembang. Hingga kini, Kue Maksuba tetap menjadi
                ikon hidangan penutup yang istimewa di setiap perayaan.
              </p>
            </div>

            <div className="detail-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </section>

          {/* FAKTA + ALASAN */}
          <section className="detail-section detail-facts-section">
            <h2 className="detail-facts-title">Fakta Singkat Kue Maksuba</h2>

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
                  Kue telur berlapis dengan tekstur sangat legit
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Bahan Utama</span>
                <p className="detail-fact-value">
                  Telur dalam jumlah banyak, gula, dan mentega
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Waktu Paling Pas</span>
                <p className="detail-fact-value">
                  Hari raya, momen spesial, atau menyambut tamu kehormatan
                </p>
              </article>
            </div>

            <article className="detail-reason-card">
              <h3 className="detail-reason-title">
                Kenapa Harus Coba Kue Maksuba?
              </h3>
              <ul className="detail-reason-list">
                <li>
                  Rasanya kaya dan pekat, cocok untuk pencinta kue telur yang
                  legit.
                </li>
                <li>
                  Proses pembuatannya telaten, tiap lapisan dipanggang perlahan.
                </li>
                <li>
                  Menjadi simbol kemewahan dalam tradisi jamuan masyarakat
                  Palembang.
                </li>
                <li>
                  Potongan kecil saja sudah cukup mengenyangkan dan memanjakan
                  lidah.
                </li>
              </ul>
            </article>
          </section>

          {/* GALERI GESER */}
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

      {/* POPUP VIDEO MAKSUBA */}
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
              title="Video Kue Maksuba"
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
