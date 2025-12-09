// src/Pages/sejarahburgo.jsx
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

export default function SejarahBurgo() {
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
  const videoURL = "//www.youtube.com/embed/xLExRgMCT48?si=UnbxDCAZxTUoLCDc"; // ganti ID YouTube nanti

  const openModal = () => setIsVideoOpen(true);
  const closeModal = () => setIsVideoOpen(false);

  return (
    <div className="detail-body detail-burgo">
      <Navbar />

      {/* HALAMAN DETAIL */}
      <main className="detail-main">
        {/* background blur besar */}
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
              <div className="detail-title-pill">Burgo</div>
              <p className="detail-subtitle">
                "Gulungan lembut berbahan tepung beras dengan kuah santan gurih
                yang menghangatkan pagi dan menyimpan cerita dari dapur-dapur
                Palembang."
              </p>
            </div>
          </div>

          {/* SECTION 1 : Apa Itu Burgo */}
          <section className="detail-section detail-section-1">
            <div className="detail-text-box">
              <h2>Apa Itu Burgo?</h2>
              <p>
                Burgo adalah salah satu kuliner khas Palembang yang berbentuk
                gulungan tipis dari adonan tepung beras yang kemudian disiram
                dengan kuah santan gurih. Teksturnya lembut, rasa kuahnya halus,
                dan sering dinikmati sebagai menu sarapan yang menghangatkan
                pagi.
              </p>
              <p>
                Pada awalnya, Burgo dikenal sebagai makanan rumahan yang dibuat
                dari bahan-bahan sederhana yang mudah dijumpai di dapur. Namun
                seiring berjalannya waktu, Burgo berkembang menjadi salah satu
                ikon sarapan khas Palembang yang banyak dicari, baik oleh
                masyarakat lokal maupun pendatang.
              </p>
              <p>
                Kehadiran Burgo di meja makan keluarga Palembang sering kali
                menjadi pengingat akan suasana rumah yang hangat dan akrab. Dari
                generasi ke generasi, resep dan cara penyajian Burgo tetap
                dijaga, sehingga cita rasanya tidak jauh berbeda dengan yang
                dinikmati para leluhur dulu.
              </p>
            </div>

            <div className="detail-photo-card">
              <div className="detail-photo-inner">
                <img src="/img/SEJBURGO.png" alt="Burgo" />
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

          {/* SECTION 2 : Filosofi & Warisan */}
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
                Burgo tidak hanya menggambarkan kreativitas dalam mengolah
                bahan-bahan sederhana, tetapi juga mencerminkan nilai
                kebersamaan. Hidangan ini kerap disajikan dalam porsi yang
                cukup besar untuk dinikmati bersama, terutama di pagi hari saat
                seluruh anggota keluarga berkumpul.
              </p>
              <p>
                Kuah santannya yang lembut dan tidak terlalu tajam melambangkan
                keseimbangan dan ketenangan. Tidak berlebihan, namun tetap kaya
                rasa. Sama seperti karakter masyarakat Palembang yang hangat,
                ramah, dan bersahaja.
              </p>
              <p>
                Hingga kini, Burgo tetap menjadi bagian dari identitas kuliner
                Palembang. Di tengah munculnya berbagai kuliner modern,
                keberadaan Burgo mengingatkan generasi muda akan pentingnya
                menjaga warisan rasa dan cerita yang hidup di balik setiap
                hidangan tradisional.
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
            <h2 className="detail-facts-title">Fakta Singkat Burgo</h2>

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
                  Hidangan sarapan berkuah santan gurih
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Bahan Utama</span>
                <p className="detail-fact-value">
                  Adonan tepung beras tipis dengan kuah santan berbumbu
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Waktu Paling Pas</span>
                <p className="detail-fact-value">
                  Sarapan pagi atau santap hangat bersama keluarga
                </p>
              </article>
            </div>

            <article className="detail-reason-card">
              <h3 className="detail-reason-title">Kenapa Harus Coba Burgo?</h3>
              <ul className="detail-reason-list">
                <li>
                  Tekstur lembut dengan kuah santan gurih yang hangat di perut.
                </li>
                <li>
                  Resep rumahan turun-temurun yang masih dipertahankan keluarga
                  Palembang.
                </li>
                <li>
                  Cocok sebagai menu sarapan yang ringan tapi tetap
                  mengenyangkan.
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

      {/* POPUP VIDEO BURGO */}
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
              title="Video Burgo"
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
