// src/Pages/sejaraheskacang.jsx
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

export default function SejarahEsKacangMerah() {
  // slider auto 5 detik
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
  const videoURL = "https://www.youtube.com/embed/HYQqC8GQGzM?si=VaAdoU3XGSxxUuyX"; // ganti ID nanti

  const openModal = () => setIsVideoOpen(true);
  const closeModal = () => setIsVideoOpen(false);

  return (
    <div className="detail-body detail-eskacang">
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
              <div className="detail-title-pill">Es Kacang Merah</div>
              <p className="detail-subtitle">
                "Kesegaran Manis yang Menyatu dalam Tradisi dan Hangatnya
                Kebersamaan Keluarga Palembang."
              </p>
            </div>
          </div>

          {/* SECTION 1 : Apa itu Es Kacang Merah ? */}
          <section className="detail-section detail-section-1">
            <div className="detail-text-box">
              <h2>Apa Itu Es Kacang Merah?</h2>
              <p>
                Es Kacang Merah adalah salah satu minuman tradisional khas
                Palembang yang terkenal dengan rasa manis, segar, dan tampilan
                yang menggugah selera. Minuman ini dibuat dari kacang merah
                rebus yang dimasak hingga lembut, lalu disajikan bersama
                serutan es, sirup manis, susu kental manis, dan kadang
                ditambahkan sedikit santan.
              </p>
              <p>
                Rasa manis dan gurihnya berpadu sempurna, menciptakan sensasi
                menyegarkan yang cocok dinikmati di siang hari yang panas.
                Dulu, es ini sering disajikan dalam acara keluarga atau
                perayaan besar sebagai simbol kehangatan dan kebersamaan.
              </p>
            </div>

            <div className="detail-photo-card">
              <div className="detail-photo-inner">
                <img src="/img/SEJESKACANG.png" alt="Es Kacang Merah" />
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

          {/* SECTION 2 : Filosofi dan warisan */}
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
                Lebih dari sekadar minuman pelepas dahaga, Es Kacang Merah
                merupakan bagian dari identitas kuliner masyarakat Palembang.
                Setiap bahan yang digunakan mencerminkan keseimbangan antara
                rasa manis dan lembutnya kehidupan sederhana namun penuh makna.
              </p>
              <p>
                Dalam budaya Palembang, menyajikan Es Kacang Merah untuk tamu
                adalah tanda sambutan hangat dan keramahan tuan rumah. Warna
                merahnya melambangkan semangat, kebahagiaan, dan kasih sayang
                dalam keluarga.
              </p>
              <p>
                Hingga kini, Es Kacang Merah tetap menjadi simbol cita rasa
                tradisional yang tak lekang oleh waktu, menyatukan generasi
                lewat kesegaran dan manisnya nostalgia.
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
              Fakta Singkat Es Kacang Merah
            </h2>

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
                  Minuman dingin / dessert es yang menyegarkan
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Bahan Utama</span>
                <p className="detail-fact-value">
                  Kacang merah, santan, susu/sirup, dan es serut
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Waktu Paling Pas</span>
                <p className="detail-fact-value">
                  Siang hari, cuaca panas, atau setelah menyantap makanan berat
                </p>
              </article>
            </div>

            <article className="detail-reason-card">
              <h3 className="detail-reason-title">
                Kenapa Harus Coba Es Kacang Merah?
              </h3>
              <ul className="detail-reason-list">
                <li>
                  Perpaduan kacang merah empuk dengan kuah manis gurih yang
                  unik.
                </li>
                <li>
                  Menyegarkan, tapi tetap terasa “tradisional” karena memakai
                  santan dan kacang.
                </li>
                <li>
                  Porsi dan topping bisa bervariasi, dari sederhana sampai versi
                  modern.
                </li>
                <li>
                  Cocok sebagai penutup setelah menikmati kuliner Palembang yang
                  kaya rempah.
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

      {/* POPUP VIDEO ES KACANG MERAH */}
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
              title="Video Es Kacang Merah"
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
