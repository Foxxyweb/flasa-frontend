// src/Pages/sejarahmiecelor.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/style.css";

// Data untuk slider "Kuliner Palembang Lainnya"
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
    href: "/sejarah/burgo", // nanti bisa kamu sesuaikan
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

export default function SejarahMieCelor() {
  // ===== SLIDER (auto jalan 5 detik) =====
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
  const videoURL = "https://www.youtube.com/embed/4LDVd6QXjQw?si=aTVjvS0W17BQtDUY"; // ganti nanti

  const openModal = () => setIsVideoOpen(true);
  const closeModal = () => setIsVideoOpen(false);

  return (
    <div className="detail-body detail-miecelor">
      <Navbar />

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
              <div className="detail-title-pill">Mie Celor</div>
              <p className="detail-subtitle">
                "Mie tebal dengan kuah santan dan kaldu udang yang gurih, hangat,
                dan penuh cerita dari tepian Sungai Musi."
              </p>
            </div>
          </div>

          {/* SECTION 1 : Apa Itu Mie Celor */}
          <section className="detail-section detail-section-1">
            <div className="detail-text-box">
              <h2>Apa Itu Mie Celor?</h2>
              <p>
                Mie Celor adalah salah satu ikon kuliner khas Palembang yang
                terkenal dengan perpaduan mie, kuah santan kental, dan kaldu
                udang yang gurih. Hidangan ini biasanya disajikan dengan telur
                rebus, irisan seledri, bawang goreng, dan sambal sebagai
                pelengkap.
              </p>
              <p>
                Istilah <em>"celor"</em> diyakini berasal dari kata yang
                menggambarkan proses mie yang dicelup atau disiram air panas
                sebelum disajikan bersama kuah. Cara pengolahan ini membuat
                tekstur mie terasa lebih lembut namun tetap kenyal, sekaligus
                menyerap cita rasa kuah yang kaya.
              </p>
              <p>
                Mie Celor lahir dari tradisi kuliner masyarakat Palembang yang
                banyak memanfaatkan hasil laut, terutama udang, sebagai bahan
                utama kuah. Awalnya hidangan ini populer sebagai menu sarapan
                keluarga, tetapi kini menjadi salah satu kuliner wajib coba bagi
                siapa pun yang berkunjung ke Palembang.
              </p>
            </div>

            <div className="detail-photo-card">
              <div className="detail-photo-inner">
                <img src="/img/SEJMIECELOR.png" alt="Mie Celor" />
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
                Bagi banyak keluarga di Palembang, Mie Celor bukan sekadar menu
                sarapan, melainkan hidangan yang menghadirkan kehangatan
                kebersamaan. Kuahnya yang kental dan hangat sering kali dikaitkan
                dengan rasa nyaman dan kedekatan di tengah keluarga.
              </p>
              <p>
                Penggunaan santan, kaldu udang, dan bumbu rempah yang seimbang
                mencerminkan kekayaan alam sekitar Sungai Musi sekaligus
                kreativitas masyarakat dalam mengolah bahan yang ada. Kelezatan
                Mie Celor menjadi bukti bahwa hidangan tradisional dapat terus
                relevan di tengah perkembangan zaman.
              </p>
              <p>
                Hingga hari ini, Mie Celor banyak dijajakan di warung sarapan
                maupun rumah makan legendaris Palembang. Setiap mangkuk bukan
                hanya menyajikan rasa, tetapi juga cerita tentang identitas,
                sejarah, dan kebanggaan masyarakat Sumatera Selatan terhadap
                warisan kuliner mereka.
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
            <h2 className="detail-facts-title">Fakta Singkat Mie Celor</h2>

            <div className="detail-facts-grid">
              <article className="detail-fact-card">
                <span className="detail-fact-label">Asal</span>
                <p className="detail-fact-value">Palembang, Sumatera Selatan</p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Jenis Hidangan</span>
                <p className="detail-fact-value">
                  Hidangan mie bersantan kental dengan udang
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Bahan Utama</span>
                <p className="detail-fact-value">
                  Mie besar, santan, kaldu udang, tauge, dan telur rebus
                </p>
              </article>

              <article className="detail-fact-card">
                <span className="detail-fact-label">Waktu Paling Pas</span>
                <p className="detail-fact-value">
                  Sarapan atau makan siang yang mengenyangkan
                </p>
              </article>
            </div>

            <article className="detail-reason-card">
              <h3 className="detail-reason-title">
                Kenapa Harus Coba Mie Celor?
              </h3>
              <ul className="detail-reason-list">
                <li>
                  Mie tebal dan kenyal dengan kuah santan kental yang gurih dan
                  harum.
                </li>
                <li>
                  Kaldu udangnya kuat tapi tetap lembut, membuat rasanya unik dan
                  khas.
                </li>
                <li>
                  Disajikan dengan telur rebus dan tauge yang menambah tekstur dan
                  nutrisi.
                </li>
                <li>
                  Merupakan salah satu ikon sarapan khas Palembang selain pempek
                  dan burgo.
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

                    // kalau href diset & sudah ada route-nya, bisa ganti ke <Link>
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

      {/* VIDEO MODAL */}
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
              title="Video Mie Celor"
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
