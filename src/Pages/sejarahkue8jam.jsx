// src/Pages/sejarahkue8jam.jsx
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

export default function SejarahKue8Jam() {
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
  const videoURL = "https://www.youtube.com/embed/v0pxgM05CnQ?si=qu81i51eddAwOjhI"; // ganti ID-nya nanti

  const openModal = () => setIsVideoOpen(true);
  const closeModal = () => setIsVideoOpen(false);

  return (
    <div className="detail-body detail-kue8jam">
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
              <div className="detail-title-pill">Kue 8 Jam</div>
              <p className="detail-subtitle">
                "Manisnya Warisan Kuliner Keraton yang Terjaga dalam Waktu dan
                Rasa."
              </p>
            </div>
          </div>

          {/* SECTION 1 */}
          <section className="detail-section detail-section-1">
            <div className="detail-text-box">
              <h2>Apa Itu Kue 8 Jam?</h2>
              <p>
                Kue Delapan Jam atau sering disebut Kue 8 Jam adalah salah satu
                hidangan istimewa dari Palembang yang terkenal karena proses
                pembuatannya yang memakan waktu hingga delapan jam penuh.
                Terbuat dari bahan sederhana seperti telur bebek, gula,
                mentega, dan susu kental manis, kue ini dipanggang perlahan
                hingga menghasilkan tekstur lembut dan rasa manis yang kaya.
              </p>
              <p>
                Nama "Delapan Jam" bukan hanya menggambarkan lamanya proses
                pematangan, tetapi juga mencerminkan kesabaran dan ketekunan
                yang menjadi bagian penting dalam tradisi memasaknya. Biasanya,
                kue ini disajikan dalam acara istimewa seperti pernikahan, hari
                raya, atau penyambutan tamu kehormatan.
              </p>
            </div>

            <div className="detail-photo-card">
              <div className="detail-photo-inner">
                <img src="/img/SEJ8JAM.png" alt="Kue 8 Jam" />
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
                Lebih dari sekadar sajian manis, Kue Delapan Jam melambangkan
                filosofi kehidupan masyarakat Palembang yang menghargai waktu,
                kesabaran, dan dedikasi dalam menghasilkan karya terbaik.
                Proses panjang pembuatannya menjadi simbol bahwa keindahan dan
                kesempurnaan membutuhkan ketelatenan ekstra dalam setiap
                langkah.
              </p>
              <p>
                Dalam tradisi Palembang, Kue Delapan Jam sering dijadikan simbol
                kehormatan dan kebanggaan keluarga. Menyajikannya kepada tamu
                berarti mempersembahkan yang terbaik bagi orang terhormat.
                Warna cokelat keemasan dan rasa manis legitnya menggambarkan
                kemakmuran serta kehangatan yang diwariskan dari generasi ke
                generasi.
              </p>
              <p>
                Hingga kini, Kue 8 Jam tetap menjadi salah satu warisan kuliner
                yang perlu dijaga dan dipromosikan sebagai bagian dari kekayaan
                budaya Sumatera Selatan.
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
            <h2 className="detail-facts-title">Fakta Singkat Kue 8 Jam</h2>

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
                  Kue manis bertekstur legit yang dimasak lama
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Bahan Utama</span>
                <p className="detail-fact-value">
                  Telur, gula, susu, dan mentega/margarin
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Waktu Paling Pas</span>
                <p className="detail-fact-value">
                  Acara adat, hari raya, atau menjamu tamu istimewa
                </p>
              </article>
            </div>

            <article className="detail-reason-card">
              <h3 className="detail-reason-title">
                Kenapa Harus Coba Kue 8 Jam?
              </h3>
              <ul className="detail-reason-list">
                <li>
                  Proses masaknya lama sehingga menghasilkan tekstur legit dan
                  rasa yang dalam.
                </li>
                <li>
                  Aromanya kaya telur dan susu, mengingatkan pada kue-kue
                  tradisional zaman dulu.
                </li>
                <li>
                  Termasuk kue kehormatan yang dulu hanya disajikan di acara
                  penting keluarga.
                </li>
                <li>
                  Cocok dipadukan dengan teh hangat atau kopi pahit sebagai
                  teman ngobrol.
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

      {/* POPUP VIDEO KUE 8 JAM */}
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
              title="Video Kue 8 Jam"
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
