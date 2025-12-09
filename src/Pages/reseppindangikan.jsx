// src/Pages/reseppindangikan.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/style.css";
import { getReviews, sendReview } from "../api";

export default function ResepPindangIkan() {
  const navigate = useNavigate();
  const RECIPE_SLUG = "pindangikan";

  // TAB: bahan / alternatif / cara
  const [activeTab, setActiveTab] = useState("bahan");

  // "Lihat selengkapnya" bahan
  const [bahanExpanded, setBahanExpanded] = useState(false);

  // Slider review (index halaman)
  const [reviewIndex, setReviewIndex] = useState(0);

  // Slider tempat kuliner
  const [placeIndex, setPlaceIndex] = useState(0);

  // RATING CARD
  const [avgRating, setAvgRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);

  // REVIEW DATA (dibagi per halaman isi 3 kartu)
  const [reviewPages, setReviewPages] = useState([]);

  // Rating form
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // Step wizard (1-4)
  const [step, setStep] = useState(1);

  // Overlay perayaan
  const [celebrateOpen, setCelebrateOpen] = useState(false);

  // Toggle alternatif ikan patin
  const [piAltOpen, setPiAltOpen] = useState(false);

  // ============================
  // HELPER: Bagi review jadi halaman isi 3
  // ============================
  const buildPages = (items) => {
    const pages = [];
    for (let i = 0; i < items.length; i += 3) {
      pages.push(items.slice(i, i + 3));
    }
    return pages;
  };

  // ============================
  // LOAD REVIEW DARI BACKEND
  // ============================
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.name) setName(user.name);

    async function fetchReviews() {
      try {
        const res = await getReviews(RECIPE_SLUG);
        const { reviews = [], avgRating, ratingCount } = res.data;

        setAvgRating(avgRating);
        setRatingCount(ratingCount || 0);
        setReviewPages(buildPages(reviews));
      } catch (err) {
        console.error("Gagal mengambil review:", err);
      }
    }

    fetchReviews();
  }, []);

  // DATA REKOMENDASI TEMPAT
  const placePages = [
    [
      {
        name: "Pempek Beringin",
        img: "/img/beringin.png",
        text: "Brand pempek besar di Palembang dengan banyak cabang. Teksturnya kenyal dengan rasa ikan yang kuat.",
        link: "https://www.google.com/maps?q=Pempek+Beringin+Palembang",
      },
      {
        name: "Sri Melayu",
        img: "/img/srimelayu.png",
        text: "Restoran khas Palembang dengan menu pindang, tempoyak, tepek ikan, dan cocok untuk makan bersama keluarga.",
        link: "https://www.google.com/maps?q=Rumah+Makan+Sri+Melayu+Palembang",
      },
      {
        name: "Pempek Candy",
        img: "/img/candy.jpg",
        text: "Pempek legendaris dengan rasa autentik dan aneka jenis pempek yang lengkap.",
        link: "https://www.google.com/maps?q=Pempek+Candy+Palembang",
      },
    ],
    [
      {
        name: "Warung Aba",
        img: "/img/warungaba.jpg",
        text: "Tempat populer untuk menikmati aneka pempek dan makanan khas Palembang lainnya dengan harga terjangkau.",
        link: "https://www.google.com/maps?q=Warung+Aba+Palembang",
      },
      {
        name: "Mie Celor 26 Ilir H. Syafe'i",
        img: "/img/celor26.jpeg",
        text: "Salah satu mie celor paling terkenal dengan kuah santan gurih dan udang yang melimpah.",
        link: "https://www.google.com/maps?q=Mie+Celor+26+Ilir+H.+Syafe%27i",
      },
      {
        name: "RM Pindang Meranjat Bunda",
        img: "/img/pindangbunda.jpg",
        text: "Terkenal dengan pindang patin dan pindang tulang yang pedas segar, cocok untuk pecinta makanan berkuah.",
        link: "https://www.google.com/maps?q=Pindang+Meranjat+Bunda+Palembang",
      },
    ],
  ];

  // Handler slider review
  const handleReviewPrev = () => {
    setReviewIndex((prev) =>
      reviewPages.length === 0 ? 0 : (prev - 1 + reviewPages.length) % reviewPages.length
    );
  };

  const handleReviewNext = () => {
    setReviewIndex((prev) =>
      reviewPages.length === 0 ? 0 : (prev + 1) % reviewPages.length
    );
  };

  // Handler slider tempat
  const handlePlacePrev = () => {
    setPlaceIndex((prev) => (prev - 1 + placePages.length) % placePages.length);
  };

  const handlePlaceNext = () => {
    setPlaceIndex((prev) => (prev + 1) % placePages.length);
  };

  // Step wizard
  const goToStep = (s) => setStep(s);

  const handleFinish = () => {
    setCelebrateOpen(true);
  };

  // ============================
  // SUBMIT REVIEW / RATING
  // ============================
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk memberi penilaian.");
      localStorage.setItem("redirectAfterLogin", "/resep/pindangikan");
      navigate("/login");
      return;
    }

    if (!name || !rating) {
      setFormError("Nama dan rating wajib diisi.");
      return;
    }

    try {
      setLoadingSubmit(true);

      // token TIDAK perlu diambil, sudah otomatis dari interceptor
      const res = await sendReview(RECIPE_SLUG, {
      displayName: name,
      rating: Number(rating),
      comment: message,
    });

      const { reviews = [], avgRating, ratingCount } = res.data;

      setAvgRating(avgRating);
      setRatingCount(ratingCount || 0);
      setReviewPages(buildPages(reviews));
      setFormSuccess("Terima kasih! Penilaian Anda tersimpan.");

      // reset komentar saja, nama & rating boleh tetap
      setMessage("");
    } catch (err) {
      console.error("Gagal mengirim penilaian:", err);
      setFormError(
        err.response?.data?.message || "Gagal mengirim penilaian. Coba lagi."
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="burgo-resep-body">
      <Navbar />

      <main className="burgo-resep-main">
        {/* HERO */}
        <section className="burgo-hero">
          <img
            src="/img/reseppindang.png"
            alt="Resep Pindang Ikan"
            className="burgo-hero-img"
          />

          {/* tombol back */}
          <Link to="/resep" className="burgo-back-btn">
            <span>&larr;</span>
          </Link>

          {/* judul + waktu + rating */}
          <div className="burgo-hero-bottom">
            <div className="burgo-info-left">
              <h1>Pindang Ikan Patin</h1>
              <div className="burgo-meta">
                <span className="burgo-meta-icon">⏱</span>
                <span>45 Menit</span>
              </div>
            </div>

            <div className="burgo-rating-pill">
              <span className="burgo-rating-star">★</span>
              <span className="burgo-rating-value">
                {avgRating || "4.9"}
              </span>
            </div>
          </div>
        </section>

        {/* TAB MERAH */}
        <section className="burgo-tabs-wrap">
          <div className="burgo-tabs">
            <button
              className={`burgo-tab ${activeTab === "bahan" ? "active" : ""}`}
              onClick={() => setActiveTab("bahan")}
            >
              Bahan
            </button>
            <button
              className={`burgo-tab ${activeTab === "alternatif" ? "active" : ""}`}
              onClick={() => setActiveTab("alternatif")}
            >
              Bahan Alternatif
            </button>
            <button
              className={`burgo-tab ${activeTab === "cara" ? "active" : ""}`}
              onClick={() => setActiveTab("cara")}
            >
              Cara Pembuatan
            </button>
          </div>
        </section>

        {/* KONTEN TABS */}
        <section className="burgo-content">
          {/* PANEL 1 : BAHAN */}
          <div
            className={`burgo-panel ${activeTab === "bahan" ? "active" : ""}`}
            data-panel="bahan"
          >
            <div className="burgo-card">
              <div
                className={`burgo-card-inner burgo-card-inner-collapsible ${
                  bahanExpanded ? "expanded" : ""
                }`}
              >
                {/* Bahan Utama */}
                <h3 className="burgo-card-title">Bahan Utama</h3>
                <div className="burgo-table">
                  <div className="burgo-row">
                    <span className="burgo-label">Ikan Patin</span>
                    <span className="burgo-value">
                      500–700 g, potong 4–5 bagian
                    </span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Air</span>
                    <span className="burgo-value">1 liter</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Serai</span>
                    <span className="burgo-value">2 batang</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Daun Jeruk</span>
                    <span className="burgo-value">3 lembar</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Daun Salam</span>
                    <span className="burgo-value">3 lembar</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Nanas</span>
                    <span className="burgo-value">¼ buah, potong-potong</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Cabai Rawit</span>
                    <span className="burgo-value">10 buah utuh</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Tomat</span>
                    <span className="burgo-value">2 buah, potong</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Daun Kemangi</span>
                    <span className="burgo-value">1 ikat</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Air Asam Jawa</span>
                    <span className="burgo-value">1 sdm, dilarutkan</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Garam &amp; Gula</span>
                    <span className="burgo-value">Secukupnya</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Minyak Sayur</span>
                    <span className="burgo-value">3 sdm (untuk menumis)</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Lengkuas</span>
                    <span className="burgo-value">2 ruas jari, memar</span>
                  </div>
                </div>

                {/* Bahan Halus */}
                <h3 className="burgo-card-title">Bahan Halus</h3>
                <div className="burgo-table">
                  <div className="burgo-row">
                    <span className="burgo-label">Bawang Merah</span>
                    <span className="burgo-value">8 siung</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Bawang Putih</span>
                    <span className="burgo-value">4 siung</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Jahe</span>
                    <span className="burgo-value">2 ruas jari</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Kunyit Bakar</span>
                    <span className="burgo-value">2 ruas jari</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Cabai Merah Keriting</span>
                    <span className="burgo-value">5 buah</span>
                  </div>
                </div>

                {/* Pelengkap */}
                <h3 className="burgo-card-title">Pelengkap</h3>
                <div className="burgo-table">
                  <div className="burgo-row">
                    <span className="burgo-label">Nasi Putih</span>
                    <span className="burgo-value">Secukupnya</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Sambal Terasi</span>
                    <span className="burgo-value">Secukupnya</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Bawang Goreng</span>
                    <span className="burgo-value">Secukupnya</span>
                  </div>
                </div>
              </div>

              {/* tombol lihat selengkapnya */}
              <button
                type="button"
                className="burgo-see-more-btn"
                onClick={() => setBahanExpanded((prev) => !prev)}
              >
                {bahanExpanded ? "Ringkas" : "Lihat selengkapnya"}
              </button>
            </div>
          </div>

          {/* PANEL 2 : BAHAN ALTERNATIF */}
          <div
            className={`burgo-panel ${
              activeTab === "alternatif" ? "active" : ""
            }`}
            data-panel="alternatif"
          >
            <div className="burgo-card burgo-alt-card-wrapper">
              <div className="burgo-alt-wrapper">
                <p className="burgo-alt-intro">
                  Beberapa bahan bisa diganti tanpa mengubah cita rasa
                </p>

                {/* KOTAK BESAR: IKAN PATIN */}
                <div className="pi-alt-card pi-alt-card-main">
                  <div className="pi-alt-text">
                    <span className="pi-alt-name-main">Ikan Patin</span>
                  </div>

                  <img
                    src="/img/patin.png"
                    alt="Ikan Patin"
                    className="pi-alt-img"
                  />

                  <button
                    type="button"
                    className={`pi-alt-arrow-btn ${piAltOpen ? "active" : ""}`}
                    onClick={() => setPiAltOpen((prev) => !prev)}
                  >
                    &gt;
                  </button>
                </div>

                {/* IKAN GABUS & BAUNG */}
                <div className={`pi-alt-row ${piAltOpen ? "show" : ""}`}>
                  <div className="pi-alt-card">
                    <div className="pi-alt-text">
                      <span className="pi-alt-name">Ikan Gabus</span>
                    </div>
                    <img
                      src="/img/gabus.png"
                      alt="Ikan Gabus"
                      className="pi-alt-img"
                    />
                  </div>

                  <div className="pi-alt-card">
                    <div className="pi-alt-text">
                      <span className="pi-alt-name">Ikan Baung</span>
                    </div>
                    <img
                      src="/img/baung.png"
                      alt="Ikan Baung"
                      className="pi-alt-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PANEL 3 : CARA PEMBUATAN */}
          <div
            className={`burgo-panel ${activeTab === "cara" ? "active" : ""}`}
            data-panel="cara"
          >
            <div className="burgo-card burgo-steps-card">
              <div className="bw-stepper">
                {/* INDIKATOR STEP */}
                <div className="bw-indicator">
                  {[1, 2, 3, 4].map((s) => (
                    <span key={s} className="bw-indicator-item">
                      <button
                        type="button"
                        className={`bw-step-dot ${step === s ? "active" : ""}`}
                        onClick={() => goToStep(s)}
                      >
                        {s}
                      </button>
                      {s !== 4 && <span className="bw-line"></span>}
                    </span>
                  ))}
                </div>

                {/* STEP 1 */}
                <div
                  className={`bw-step-panel ${step === 1 ? "active" : ""}`}
                >
                  <h3 className="bw-title">1. Persiapan Bahan</h3>
                  <ul className="bw-list">
                    <li>
                      <strong>Ikan Patin:</strong> Bersihkan 1 ekor ikan patin
                      (sekitar 700 g), potong menjadi 4–5 bagian. Lumuri dengan
                      1 sdm air jeruk nipis dan 1 sdt garam, diamkan sebentar
                      agar tidak amis.
                    </li>
                    <li>
                      <strong>Bumbu Halus:</strong> Haluskan 8 siung bawang
                      merah, 4 siung bawang putih, 2 ruas kunyit bakar, 2 ruas
                      jahe, dan 5 buah cabai merah keriting.
                    </li>
                    <li>
                      <strong>Bumbu Cemplung:</strong> Memarkan 2 batang serai
                      dan 2 ruas lengkuas. Siapkan 3 lembar daun salam, 3 lembar
                      daun jeruk, serta 10 buah cabai rawit utuh.
                    </li>
                    <li>
                      <strong>Pelengkap:</strong> Potong-potong ¼ buah nanas dan
                      2 buah tomat, petik 1 ikat daun kemangi, lalu larutkan 1
                      sdm asam jawa dengan sedikit air.
                    </li>
                  </ul>
                  <div className="bw-actions">
                    <button
                      type="button"
                      className="bw-btn bw-next"
                      onClick={() => goToStep(2)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>

                {/* STEP 2 */}
                <div
                  className={`bw-step-panel ${step === 2 ? "active" : ""}`}
                >
                  <h3 className="bw-title">2. Proses Memasak Bumbu</h3>
                  <ul className="bw-list">
                    <li>Panaskan 3 sdm minyak sayur dalam panci besar.</li>
                    <li>Tumis bumbu halus hingga harum dan matang.</li>
                    <li>
                      Masukkan serai, lengkuas, daun salam, dan daun jeruk, aduk
                      rata hingga bumbu benar-benar wangi.
                    </li>
                  </ul>
                  <div className="bw-actions">
                    <button
                      type="button"
                      className="bw-btn bw-prev-btn bw-prev"
                      onClick={() => goToStep(1)}
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      className="bw-btn bw-next"
                      onClick={() => goToStep(3)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>

                {/* STEP 3 */}
                <div
                  className={`bw-step-panel ${step === 3 ? "active" : ""}`}
                >
                  <h3 className="bw-title">3. Memasak Ikan dan Kuah</h3>
                  <ul className="bw-list">
                    <li>Tuang 1 liter air ke dalam panci, didihkan.</li>
                    <li>
                      Masukkan potongan ikan patin, biarkan mendidih perlahan
                      agar ikan tidak hancur.
                    </li>
                    <li>Tambahkan nanas, tomat, dan cabai rawit utuh.</li>
                    <li>
                      Bumbui dengan garam, gula, dan air asam jawa secukupnya.
                    </li>
                    <li>
                      Masak hingga ikan matang dan kuah meresap, sekitar 10–15
                      menit.
                    </li>
                  </ul>
                  <div className="bw-actions">
                    <button
                      type="button"
                      className="bw-btn bw-prev-btn bw-prev"
                      onClick={() => goToStep(2)}
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      className="bw-btn bw-next"
                      onClick={() => goToStep(4)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>

                {/* STEP 4 */}
                <div
                  className={`bw-step-panel ${step === 4 ? "active" : ""}`}
                >
                  <h3 className="bw-title">4. Penyajian (±5 Menit)</h3>
                  <ul className="bw-list">
                    <li>Angkat ikan dan tuang bersama kuahnya ke mangkuk saji.</li>
                    <li>
                      Taburkan daun kemangi segar dan bawang goreng di atasnya.
                    </li>
                    <li>
                      Sajikan hangat dengan nasi putih atau sambal terasi.
                    </li>
                  </ul>
                  <div className="bw-actions">
                    <button
                      type="button"
                      className="bw-btn bw-prev-btn bw-prev"
                      onClick={() => goToStep(3)}
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      className="bw-btn bw-finish"
                      onClick={handleFinish}
                    >
                      Selesai
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AREA DENGAN BACKGROUND BAGRESEP */}
        <div className="resep-bagresep-bg">
          {/* REVIEW SECTION */}
          <section className="burgo-review-section">
            <h2 className="burgo-review-title">
              Bagaimana Resep ini Menurutmu?
            </h2>

            {reviewPages.length > 0 ? (
              <>
                <div className="burgo-review-slider">
                  <button
                    className="br-nav br-prev"
                    type="button"
                    onClick={handleReviewPrev}
                  >
                    <span>&larr;</span>
                  </button>

                  <div className="br-viewport">
                    <div
                      className="br-track"
                      style={{
                        transform: `translateX(-${reviewIndex * 100}%)`,
                      }}
                    >
                      {reviewPages.map((page, idx) => (
                        <div className="br-page" key={idx}>
                          {page.map((item, i) => (
                            <article className="br-card" key={i}>
                              <h3 className="br-name">{item.display_name}</h3>
                              <div className="br-stars">
                                {"★".repeat(item.rating)}
                                {"☆".repeat(5 - item.rating)}
                              </div>
                              {item.comment && (
                                <p className="br-text">“{item.comment}”</p>
                              )}
                            </article>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="br-nav br-next"
                    type="button"
                    onClick={handleReviewNext}
                  >
                    <span>&rarr;</span>
                  </button>
                </div>

                <div className="br-dots">
                  {reviewPages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`br-dot ${
                        reviewIndex === idx ? "active" : ""
                      }`}
                      onClick={() => setReviewIndex(idx)}
                    ></span>
                  ))}
                </div>

                {avgRating && (
                  <p className="avg-rating-text">
                    Rata-rata {avgRating} dari 5 ({ratingCount} penilaian)
                  </p>
                )}
              </>
            ) : (
              <p className="no-review-text">
                Belum ada review. Jadilah yang pertama menilai resep ini!
              </p>
            )}
          </section>

          {/* FORM PENILAIAN */}
          <section className="burgo-feedback-section">
            <h2 className="burgo-feedback-title">Beri Penilaian</h2>
            <p className="burgo-feedback-subtitle">
              Berikan penilaian &amp; ceritakan pengalaman Anda memasak
              Pindang Ikan.
            </p>

            <div className="burgo-feedback-card">
              {formError && (
                <p className="form-alert form-alert-error">{formError}</p>
              )}
              {formSuccess && (
                <p className="form-alert form-alert-success">
                  {formSuccess}
                </p>
              )}

              <form
                className="burgo-feedback-form"
                onSubmit={handleFeedbackSubmit}
              >
                <div className="bf-field">
                  <label htmlFor="bf-name">Masukkan Nama Anda</label>
                  <input
                    type="text"
                    id="bf-name"
                    name="name"
                    placeholder="Contoh: Rani"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="bf-field">
                  <label>Pilih jumlah bintang (1–5) untuk menilai</label>
                  <div className="bf-stars">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        type="button"
                        key={val}
                        className={`bf-star ${rating >= val ? "active" : ""}`}
                        onClick={() => setRating(val)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="rating" value={rating} readOnly />
                </div>

                <div className="bf-field">
                  <label htmlFor="bf-message">
                    Ceritakan Pengalaman Anda
                  </label>
                  <textarea
                    id="bf-message"
                    name="message"
                    rows="5"
                    placeholder="Tulis pengalaman Anda memasak Pindang Ikan di sini."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="bf-actions">
                  <button
                    type="reset"
                    className="bf-btn-outline"
                    onClick={() => {
                      const user = JSON.parse(
                        localStorage.getItem("user") || "{}"
                      );
                      setName(user.name || "");
                      setRating(0);
                      setMessage("");
                      setFormError("");
                      setFormSuccess("");
                    }}
                  >
                    Bersihkan
                  </button>
                  <button
                    type="submit"
                    className="bf-btn-solid"
                    disabled={loadingSubmit}
                  >
                    {loadingSubmit ? "Mengirim..." : "Kirim"}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* REKOMENDASI TEMPAT KULINER */}
          <section className="burgo-place-section">
            <h2 className="burgo-place-title">
              Rekomendasi Tempat Kuliner
            </h2>

            <div className="burgo-place-slider">
              <button
                className="bp-nav bp-prev"
                type="button"
                onClick={handlePlacePrev}
              >
                <span>&larr;</span>
              </button>

              <div className="bp-viewport">
                <div
                  className="bp-track"
                  style={{
                    transform: `translateX(-${placeIndex * 100}%)`,
                  }}
                >
                  {placePages.map((page, idx) => (
                    <div className="bp-page" key={idx}>
                      {page.map((item, i) => (
                        <article className="bp-card" key={i}>
                          <img
                            src={item.img}
                            alt={item.name}
                            className="bp-img"
                          />
                          <div className="bp-body">
                            <h3 className="bp-name">{item.name}</h3>
                            <p className="bp-text">{item.text}</p>
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bp-btn"
                            >
                              Lihat Lokasi
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="bp-nav bp-next"
                type="button"
                onClick={handlePlaceNext}
              >
                <span>&rarr;</span>
              </button>
            </div>
          </section>
        </div>

        {/* OVERLAY PERAYAAN */}
        <div
          className={`bw-celebrate-overlay ${celebrateOpen ? "show" : ""}`}
          onClick={(e) => {
            if (e.target.classList.contains("bw-celebrate-overlay")) {
              setCelebrateOpen(false);
            }
          }}
        >
          <div className="bw-celebrate-card">
            <div className="bw-celebrate-emoji">🎉</div>
            <h3 className="bw-celebrate-title">Selamat!</h3>
            <p className="bw-celebrate-text">
              Kamu sudah mengikuti semua langkah memasak Pindang Ikan. Saatnya
              menikmati hidanganmu! 😋
            </p>
            <button
              type="button"
              className="bw-btn bw-close-celebrate"
              onClick={() => setCelebrateOpen(false)}
            >
              Yeay!
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
