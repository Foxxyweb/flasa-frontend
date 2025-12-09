// src/Pages/PindangIkanDetail.jsx
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

export default function PindangIkanDetail() {
  // slider gallery
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

  // video modal
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoURL = "https://www.youtube.com/embed/QVBINhTmLzo?si=_ioTdFD_Ho6Cmwp-";

  const openModal = () => setIsVideoOpen(true);
  const closeModal = () => setIsVideoOpen(false);

  return (
    <div className="detail-body">
      <Navbar />

      <main className="detail-main">
        <div className="detail-wrapper">
          {/* TOP BAR */}
          <div className="detail-topbar">
            <Link to="/sejarah" className="detail-back-btn">
              <span>&larr;</span>
            </Link>

            <div className="detail-title-group">
              <div className="detail-title-pill">Pindang Ikan</div>
              <p className="detail-subtitle">
                "Citarasa Asam Pedas yang Mengikat Sejarah dan Kesegaran Sungai
                Musi."
              </p>
            </div>
          </div>

          {/* SECTION 1 : Apa itu Pindang Ikan ? */}
          <section className="detail-section detail-section-1">
            <div className="detail-text-box">
              <h2>Apa Itu Pindang Ikan?</h2>
              <p>
                Pindang ikan adalah salah satu manifestasi otentik dari
                kehidupan masyarakat Palembang yang erat kaitannya dengan Sungai
                Musi. Masakan ini berakar dari kebutuhan praktis masyarakat di
                masa lalu yang mencari cara cepat dan efektif untuk mengolah
                hasil tangkapan ikan air tawar yang melimpah (seperti Patin,
                Gabus, atau Baung).
              </p>
              <p>
                Pindang lahir sebagai kuliner rakyat yang tidak mengenal strata
                sosial, dibuat dengan teknik rebusan sederhana namun kaya
                rempah. Seiring waktu, hidangan ini berevolusi dan dipengaruhi
                oleh berbagai budaya yang singgah. Bahkan, pernah dikenal
                varian Pindang Serani, yang diduga muncul pada masa kolonial,
                menunjukkan bagaimana Pindang telah menjadi wadah akulturasi
                rasa di Sumatera Selatan.
              </p>
            </div>

            <div className="detail-photo-card">
              <div className="detail-photo-inner">
                <img src="/img/pindangikan1.png" alt="Pindang Ikan" />
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
                Lebih dari sekadar hidangan, Pindang Ikan merupakan cerminan
                jiwa orang Palembang. Bahan baku yang berasal dari ikan sungai
                dan rempah lokal menggambarkan kedekatan masyarakat dengan
                ekologi sungai Musi dan alam Sumatera Selatan.
              </p>
              <p>
                Penyajian yang selalu hangat melambangkan kehangatan keluarga
                dalam setiap jamuan. Di banyak keluarga, Pindang juga identik
                dengan momen berkumpul dan perayaan kecil di rumah.
              </p>
              <p>
                Kini, Pindang Ikan hadir tidak hanya di rumah, tapi juga di
                berbagai rumah makan dan restoran khas Palembang. Keberadaannya
                turut menguatkan identitas kuliner daerah, hingga akhirnya
                diakui sebagai bagian dari Warisan Budaya Tak Benda (WBTB) yang
                keberadaannya patut dijaga dan dilestarikan.
              </p>
            </div>

            <div className="detail-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </section>

          {/* SECTION 2.5 : Fakta Singkat & Kenapa Harus Coba */}
          <section className="detail-section detail-facts-section">
            <h3 className="detail-facts-title">Fakta Singkat Pindang Ikan</h3>

            <div className="detail-facts-grid">
              <div className="detail-fact-card">
                <span className="detail-fact-label">Asal</span>
                <p className="detail-fact-value">Palembang, Sumatera Selatan</p>
              </div>

              <div className="detail-fact-card">
                <span className="detail-fact-label">Jenis Hidangan</span>
                <p className="detail-fact-value">
                  Masakan utama berkuah asam pedas
                </p>
              </div>

              <div className="detail-fact-card">
                <span className="detail-fact-label">
                  Ikan yang Sering Dipakai
                </span>
                <p className="detail-fact-value">
                  Patin, Gabus, Baung, atau Ikan Sungai Lain
                </p>
              </div>

              <div className="detail-fact-card">
                <span className="detail-fact-label">Waktu Paling Pas</span>
                <p className="detail-fact-value">
                  Santap siang atau makan bersama keluarga
                </p>
              </div>
            </div>

            <div className="detail-reason-card">
              <h4 className="detail-reason-title">
                Kenapa Harus Coba Pindang Ikan?
              </h4>
              <ul className="detail-reason-list">
                <li>
                  Kuah asam pedas segar yang bikin nagih, tapi tetap ringan di
                  perut.
                </li>
                <li>
                  Menggunakan rempah lokal yang menggambarkan kekayaan rasa
                  Sumatera Selatan.
                </li>
                <li>
                  Dulu dimasak untuk mengolah hasil ikan dari Sungai Musi, kini
                  jadi ikon kuliner Palembang.
                </li>
              </ul>
            </div>
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
                      <a
                        key={slide.id}
                        href={slide.href}
                        className="dg-item"
                      >
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

      {/* POPUP VIDEO PINDANG */}
      <div
        className={`video-modal ${isVideoOpen ? "show" : ""}`}
        onClick={(e) => {
          if ( e.target.classList.contains("video-modal") ) {
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
              title="Video Pindang Ikan"
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
