// src/pages/EsKacangMerah.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/style.css";
import { getReviews, sendReview } from "../api";

export default function EsKacangMerah() {
  const navigate = useNavigate();
  const location = useLocation();
  const RECIPE_SLUG = "es-kacang-merah";

  // LOGIN STATE (tanpa setter)
  const [isLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // TAB
  const [activeTab, setActiveTab] = useState("bahan");

  // SEE MORE
  const [bahanExpanded, setBahanExpanded] = useState(false);

  // REVIEW DARI BACKEND
  const [reviewPages, setReviewPages] = useState([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [avgRating, setAvgRating] = useState(null);
  const [ratingCount, setRatingCount] = useState(0);

  const buildPages = (items) => {
    const pages = [];
    for (let i = 0; i < items.length; i += 3) {
      pages.push(items.slice(i, i + 3));
    }
    return pages;
  };

  // PLACE SLIDER
  const placePages = [
    [
      {
        img: "/img/beringin.png",
        name: "Pempek Beringin",
        text: "Brand pempek besar di Palembang dengan banyak cabang. Teksturnya kenyal dengan rasa ikan yang kuat.",
        link: "https://www.google.com/maps?q=Pempek+Beringin+Palembang",
      },
      {
        img: "/img/srimelayu.png",
        name: "Sri Melayu",
        text: "Restoran khas Palembang dengan menu pindang, tempoyak, tepek ikan, dan cocok untuk makan bersama keluarga.",
        link: "https://www.google.com/maps?q=Rumah+Makan+Sri+Melayu+Palembang",
      },
      {
        img: "/img/candy.jpg",
        name: "Pempek Candy",
        text: "Pempek legendaris dengan rasa autentik dan aneka jenis pempek yang lengkap.",
        link: "https://www.google.com/maps?q=Pempek+Candy+Palembang",
      },
    ],
    [
      {
        img: "/img/warungaba.jpg",
        name: "Warung Aba",
        text: "Tempat populer untuk menikmati aneka pempek dan makanan khas Palembang lainnya dengan harga terjangkau.",
        link: "https://www.google.com/maps?q=Warung+Aba+Palembang",
      },
      {
        img: "/img/celor26.jpeg",
        name: "Mie Celor 26 Ilir H. Syafe'i",
        text: "Salah satu mie celor paling terkenal dengan kuah santan gurih dan udang yang melimpah.",
        link: "https://www.google.com/maps?q=Mie+Celor+26+Ilir+H.+Syafe%27i",
      },
      {
        img: "/img/pindangbunda.jpg",
        name: "RM Pindang Meranjat Bunda",
        text: "Terkenal dengan pindang patin dan pindang tulang yang pedas segar, cocok untuk pecinta makanan berkuah.",
        link: "https://www.google.com/maps?q=Pindang+Meranjat+Bunda+Palembang",
      },
    ],
  ];
  const [placeIndex, setPlaceIndex] = useState(0);
  const totalPlacePages = placePages.length;

  // FORM STATE
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // STEP WIZARD
  const [step, setStep] = useState(1);

  // OVERLAY
  const [celebrate, setCelebrate] = useState(false);

  // BAHAN ALTERNATIF (gula)
  const [openAlt, setOpenAlt] = useState(null); // "sugar" | null

  // AMBIL REVIEW + PREFILL NAMA
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.name) setName(user.name);

    async function fetchReviews() {
      try {
        const res = await getReviews(RECIPE_SLUG);
        const { reviews = [], avgRating, ratingCount } = res.data;

        setReviewPages(buildPages(reviews));
        setAvgRating(avgRating);
        setRatingCount(ratingCount || 0);
      } catch (err) {
        console.error("Gagal ambil review es kacang merah:", err);
      }
    }

    fetchReviews();
  }, []);

  const totalReviewPages = reviewPages.length;

  // ===== HELPER: PAKSA LOGIN UNTUK RATING =====
  const goLoginForRating = () => {
    localStorage.setItem("redirectAfterLogin", location.pathname);
    alert("Silakan login terlebih dahulu untuk memberi penilaian.");
    navigate("/login");
  };

  const handleStarClick = (val) => {
    if (!isLoggedIn) {
      goLoginForRating();
      return;
    }
    setRating(val);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!isLoggedIn) {
      goLoginForRating();
      return;
    }

    if (!name || !rating) {
      setFormError("Nama dan rating wajib diisi.");
      return;
    }

    try {
      setLoadingSubmit(true);

      // pakai sendReview: token di-handle axios
      const res = await sendReview({
        recipeSlug: RECIPE_SLUG,
        displayName: name,
        rating,
        comment: message,
      });

      const { reviews = [], avgRating, ratingCount } = res.data;
      setReviewPages(buildPages(reviews));
      setAvgRating(avgRating);
      setRatingCount(ratingCount || 0);

      setFormSuccess("Terima kasih! Penilaian Anda tersimpan.");
      setMessage("");
      setRating(0);
    } catch (err) {
      console.error("Gagal kirim review es kacang merah:", err);
      setFormError(
        err.response?.data?.message ||
          "Gagal mengirim penilaian. Coba lagi nanti."
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="burgo-resep-body">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="burgo-resep-main">
        {/* HERO */}
        <section className="burgo-hero">
          <img
            src="/img/resepes.png"
            alt="Resep Es Kacang Merah"
            className="burgo-hero-img"
          />

          <Link to="/resep" className="burgo-back-btn">
            <span>&larr;</span>
          </Link>

          <div className="burgo-hero-bottom">
            <div className="burgo-info-left">
              <h1>Es Kacang Merah</h1>
              <div className="burgo-meta">
                <span className="burgo-meta-icon">⏱</span>
                <span>± 12 Jam (dengan rendam)</span>
              </div>
            </div>

            <div className="burgo-rating-pill">
              <span className="burgo-rating-star">★</span>
              <span className="burgo-rating-value">
                {avgRating || "5.0"}
              </span>
            </div>
          </div>
        </section>

        {/* TABS */}
        <section className="burgo-tabs-wrap">
          <div className="burgo-tabs">
            <button
              type="button"
              className={`burgo-tab ${
                activeTab === "bahan" ? "active" : ""
              }`}
              onClick={() => setActiveTab("bahan")}
            >
              Bahan
            </button>
            <button
              type="button"
              className={`burgo-tab ${
                activeTab === "alternatif" ? "active" : ""
              }`}
              onClick={() => setActiveTab("alternatif")}
            >
              Bahan Alternatif
            </button>
            <button
              type="button"
              className={`burgo-tab ${
                activeTab === "cara" ? "active" : ""
              }`}
              onClick={() => setActiveTab("cara")}
            >
              Cara Pembuatan
            </button>
          </div>
        </section>

        {/* KONTEN TABS */}
        <section className="burgo-content">
          {/* PANEL 1 : BAHAN */}
          {activeTab === "bahan" && (
            <div className="burgo-panel active" data-panel="bahan">
              <div className="burgo-card">
                <div
                  className={`burgo-card-inner burgo-card-inner-collapsible ${
                    bahanExpanded ? "expanded" : ""
                  }`}
                  id="burgo-bahan-content"
                >
                  {/* Bahan Utama */}
                  <h3 className="burgo-card-title">Bahan Utama</h3>
                  <div className="burgo-table">
                    <div className="burgo-row">
                      <span className="burgo-label">Kacang Merah</span>
                      <span className="burgo-value">250 g</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Gula Jawa</span>
                      <span className="burgo-value">150 g</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Air</span>
                      <span className="burgo-value">± 1.100 ml</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Gula Pasir</span>
                      <span className="burgo-value">80 g</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Tepung Maizena</span>
                      <span className="burgo-value">3 sdm</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Garam</span>
                      <span className="burgo-value">
                        Sejumput / secukupnya
                      </span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Es Batu</span>
                      <span className="burgo-value">Secukupnya</span>
                    </div>
                  </div>

                  {/* Bahan Kuah Santan */}
                  <h3 className="burgo-card-title">Bahan Kuah Santan</h3>
                  <div className="burgo-table">
                    <div className="burgo-row">
                      <span className="burgo-label">Santan Instan</span>
                      <span className="burgo-value">65 ml</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Air</span>
                      <span className="burgo-value">200 ml</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Tepung Maizena</span>
                      <span className="burgo-value">1 sdt</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Garam</span>
                      <span className="burgo-value">Secukupnya</span>
                    </div>
                  </div>

                  {/* Pelengkap */}
                  <h3 className="burgo-card-title">Pelengkap</h3>
                  <div className="burgo-table">
                    <div className="burgo-row">
                      <span className="burgo-label">Tape Singkong</span>
                      <span className="burgo-value">Secukupnya</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Susu Kental Manis</span>
                      <span className="burgo-value">Secukupnya</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Es Krim Vanilla</span>
                      <span className="burgo-value">Secukupnya</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="burgo-see-more-btn"
                  id="burgo-bahan-toggle"
                  onClick={() => setBahanExpanded((prev) => !prev)}
                >
                  {bahanExpanded ? "Ringkas" : "Lihat selengkapnya"}
                </button>
              </div>
            </div>
          )}

          {/* PANEL 2 : BAHAN ALTERNATIF */}
          {activeTab === "alternatif" && (
            <div className="burgo-panel active" data-panel="alternatif">
              <div className="burgo-card burgo-alt-card-wrapper">
                <div className="burgo-alt-wrapper">
                  <p className="burgo-alt-intro">
                    Beberapa bahan bisa diganti tanpa mengubah cita rasa
                  </p>

                  {/* PENGGANTI GULA JAWA */}
                  <div className="pi-alt-group">
                    <button
                      type="button"
                      className="pi-alt-main-btn"
                      data-target="ekmAltSugar"
                      onClick={() =>
                        setOpenAlt((prev) =>
                          prev === "sugar" ? null : "sugar"
                        )
                      }
                    >
                      <span className="pi-alt-main-text">
                        Pengganti Gula Jawa
                      </span>

                      <img
                        src="/img/gula jawa.png"
                        alt="Gula Jawa"
                        className="pi-alt-main-img"
                      />

                      <span className="pi-alt-arrow">&gt;</span>
                    </button>

                    <div
                      className={`pi-alt-sub-card ${
                        openAlt === "sugar" ? "show" : ""
                      }`}
                      id="ekmAltSugar"
                    >
                      <div className="pi-alt-sub-inner">
                        <img
                          src="/img/gula aren.png"
                          alt="Gula Aren"
                          className="pi-alt-sub-img"
                        />
                        <span className="pi-alt-sub-text">Gula Aren</span>
                      </div>
                    </div>
                  </div>

                  {/* Tambah alternatif lain di sini kalau perlu */}
                </div>
              </div>
            </div>
          )}

          {/* PANEL 3 : CARA PEMBUATAN */}
          {activeTab === "cara" && (
            <div className="burgo-panel active" data-panel="cara">
              <div className="burgo-card burgo-steps-card">
                <div className="bw-stepper">
                  {/* INDIKATOR STEP */}
                  <div className="bw-indicator">
                    <button
                      type="button"
                      className={`bw-step-dot ${step === 1 ? "active" : ""}`}
                      data-step="1"
                      onClick={() => setStep(1)}
                    >
                      1
                    </button>
                    <span className="bw-line"></span>
                    <button
                      type="button"
                      className={`bw-step-dot ${step === 2 ? "active" : ""}`}
                      data-step="2"
                      onClick={() => setStep(2)}
                    >
                      2
                    </button>
                    <span className="bw-line"></span>
                    <button
                      type="button"
                      className={`bw-step-dot ${step === 3 ? "active" : ""}`}
                      data-step="3"
                      onClick={() => setStep(3)}
                    >
                      3
                    </button>
                    <span className="bw-line"></span>
                    <button
                      type="button"
                      className={`bw-step-dot ${step === 4 ? "active" : ""}`}
                      data-step="4"
                      onClick={() => setStep(4)}
                    >
                      4
                    </button>
                  </div>

                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="bw-step-panel active" data-step="1">
                      <h3 className="bw-title">
                        1. Menyiapkan &amp; Merebus Kacang Merah
                      </h3>
                      <ul className="bw-list">
                        <li>
                          Cuci kacang merah sampai bersih, lalu rendam
                          semalaman. Setelah direndam, cuci bersih kembali.
                        </li>
                        <li>
                          Nyalakan api besar. Masak air hingga mendidih, lalu
                          masukkan kacang merah. Tutup panci dan masak selama 5
                          menit.
                        </li>
                        <li>
                          Setelah 5 menit, matikan kompor. Jangan buka tutup
                          panci, diamkan selama 30 menit.
                        </li>
                        <li>
                          Nyalakan lagi api besar dan masak kembali sekitar 7
                          menit. Ingat: selama proses ini, jangan buka tutup
                          panci agar kacang cepat empuk.
                        </li>
                      </ul>
                      <div className="bw-actions">
                        <button
                          type="button"
                          className="bw-btn bw-next"
                          data-next="2"
                          onClick={() => setStep(2)}
                        >
                          Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div className="bw-step-panel active" data-step="2">
                      <h3 className="bw-title">
                        2. Membuat Kuah Manis Kacang Merah
                      </h3>
                      <ul className="bw-list">
                        <li>
                          Di panci lain, rebus ±400 ml air dengan gula jawa dan
                          gula pasir hingga larut.
                        </li>
                        <li>
                          Tuang larutan gula ke dalam rebusan kacang merah
                          sambil disaring jika perlu, aduk rata dan biarkan
                          mendidih.
                        </li>
                        <li>
                          Masukkan larutan tepung maizena (3 sdm maizena yang
                          dilarutkan dengan sedikit air).
                        </li>
                        <li>
                          Aduk-aduk sampai kuah mengental dan kacang merah
                          terasa manis legit. Jangan lupa tes rasa, lalu
                          matikan kompor.
                        </li>
                      </ul>
                      <div className="bw-actions">
                        <button
                          type="button"
                          className="bw-btn bw-prev-btn bw-prev"
                          data-prev="1"
                          onClick={() => setStep(1)}
                        >
                          Kembali
                        </button>
                        <button
                          type="button"
                          className="bw-btn bw-next"
                          data-next="3"
                          onClick={() => setStep(3)}
                        >
                          Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <div className="bw-step-panel active" data-step="3">
                      <h3 className="bw-title">3. Membuat Kuah Santan</h3>
                      <ul className="bw-list">
                        <li>
                          Masukkan santan instan, air, dan garam ke dalam
                          panci.
                        </li>
                        <li>
                          Aduk rata di api sedang hingga santan mendidih
                          (jangan berhenti mengaduk supaya santan tidak pecah).
                        </li>
                        <li>
                          Masukkan larutan maizena (1 sdt maizena yang
                          dilarutkan dengan sedikit air).
                        </li>
                        <li>
                          Masak hingga mendidih lagi dan kuah santan terasa
                          lebih kental, lalu matikan kompor dan biarkan agak
                          hangat/dingin.
                        </li>
                      </ul>
                      <div className="bw-actions">
                        <button
                          type="button"
                          className="bw-btn bw-prev-btn bw-prev"
                          data-prev="2"
                          onClick={() => setStep(2)}
                        >
                          Kembali
                        </button>
                        <button
                          type="button"
                          className="bw-btn bw-next"
                          data-next="4"
                          onClick={() => setStep(4)}
                        >
                          Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 4 */}
                  {step === 4 && (
                    <div className="bw-step-panel active" data-step="4">
                      <h3 className="bw-title">
                        4. Penyajian Es Kacang Merah
                      </h3>
                      <ul className="bw-list">
                        <li>
                          Siapkan mangkuk saji, masukkan es batu dan scoop es
                          krim vanilla secukupnya.
                        </li>
                        <li>
                          Tambahkan kacang merah beserta sedikit kuah
                          manisnya sesuai selera.
                        </li>
                        <li>
                          Masukkan tape singkong, lalu tuang kuah santan
                          kental, sedikit air rebusan kacang merah, dan susu
                          kental manis sesuai selera.
                        </li>
                        <li>
                          Aduk perlahan hingga tercampur, lalu sajikan segera
                          selagi dingin dan segar.
                        </li>
                      </ul>
                      <div className="bw-actions">
                        <button
                          type="button"
                          className="bw-btn bw-prev-btn bw-prev"
                          data-prev="3"
                          onClick={() => setStep(3)}
                        >
                          Kembali
                        </button>
                        <button
                          type="button"
                          className="bw-btn bw-finish"
                          onClick={() => setCelebrate(true)}
                        >
                          Selesai
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========== AREA DENGAN BACKGROUND BAGRESEP ========== */}
        <div className="resep-bagresep-bg">
          {/* REVIEW */}
          <section className="burgo-review-section">
            <h2 className="burgo-review-title">
              Bagaimana Resep ini Menurutmu?
            </h2>

            {totalReviewPages > 0 ? (
              <>
                <div className="burgo-review-slider">
                  {/* panah kiri */}
                  <button
                    className="br-nav br-prev"
                    type="button"
                    onClick={() =>
                      setReviewIndex(
                        (prev) =>
                          (prev - 1 + totalReviewPages) % totalReviewPages
                      )
                    }
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
                      {reviewPages.map((page, i) => (
                        <div className="br-page" key={i}>
                          {page.map((item, idx) => (
                            <article className="br-card" key={idx}>
                              <h3 className="br-name">
                                {item.display_name}
                              </h3>
                              <div className="br-stars">
                                {"★".repeat(item.rating)}
                                {"☆".repeat(5 - item.rating)}
                              </div>
                              {item.comment && (
                                <p className="br-text">
                                  “{item.comment}”
                                </p>
                              )}
                            </article>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* panah kanan */}
                  <button
                    className="br-nav br-next"
                    type="button"
                    onClick={() =>
                      setReviewIndex(
                        (prev) => (prev + 1) % totalReviewPages
                      )
                    }
                  >
                    <span>&rarr;</span>
                  </button>
                </div>

                {/* indikator slider */}
                <div className="br-dots">
                  {reviewPages.map((_, i) => (
                    <span
                      key={i}
                      className={`br-dot ${
                        reviewIndex === i ? "active" : ""
                      }`}
                      data-index={i}
                      onClick={() => setReviewIndex(i)}
                    />
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
              Berikan penilaian &amp; ceritakan pengalaman Anda saat membuat Es
              Kacang Merah.
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
                id="burgoFeedbackForm"
                onSubmit={handleFeedbackSubmit}
              >
                {/* Nama */}
                <div className="bf-field">
                  <label htmlFor="bf-name">Masukkan Nama Anda</label>
                  <input
                    type="text"
                    id="bf-name"
                    name="name"
                    placeholder="Contoh: Naya"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Bintang */}
                <div className="bf-field">
                  <label>Pilih jumlah bintang (1–5) untuk menilai</label>
                  <div className="bf-stars" id="bfStars">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        className={`bf-star ${
                          rating >= val ? "active" : ""
                        }`}
                        data-value={val}
                        onClick={() => handleStarClick(val)}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <input
                    type="hidden"
                    name="rating"
                    id="bf-rating"
                    value={rating}
                    readOnly
                  />
                  {!isLoggedIn && (
                    <p className="bf-login-note">
                      Untuk memberi rating, silakan login terlebih dahulu.
                    </p>
                  )}
                </div>

                {/* Cerita */}
                <div className="bf-field">
                  <label htmlFor="bf-message">
                    Ceritakan Pengalaman Anda
                  </label>
                  <textarea
                    id="bf-message"
                    name="message"
                    rows="5"
                    placeholder="Tulis pengalaman Anda membuat Es Kacang Merah di sini..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                {/* Tombol */}
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
            <h2 className="burgo-place-title">Rekomendasi Tempat Kuliner</h2>

            <div className="burgo-place-slider">
              {/* panah kiri */}
              <button
                className="bp-nav bp-prev"
                type="button"
                onClick={() =>
                  setPlaceIndex(
                    (prev) => (prev - 1 + totalPlacePages) % totalPlacePages
                  )
                }
              >
                <span>&larr;</span>
              </button>

              <div className="bp-viewport">
                <div
                  className="bp-track"
                  style={{ transform: `translateX(-${placeIndex * 100}%)` }}
                >
                  {placePages.map((page, i) => (
                    <div className="bp-page" key={i}>
                      {page.map((p) => (
                        <article className="bp-card" key={p.name}>
                          <img src={p.img} alt={p.name} className="bp-img" />
                          <div className="bp-body">
                            <h3 className="bp-name">{p.name}</h3>
                            <p className="bp-text">{p.text}</p>
                            <a
                              href={p.link}
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

              {/* panah kanan */}
              <button
                className="bp-nav bp-next"
                type="button"
                onClick={() =>
                  setPlaceIndex((prev) => (prev + 1) % totalPlacePages)
                }
              >
                <span>&rarr;</span>
              </button>
            </div>
          </section>
        </div>

        {/* OVERLAY PERAYAAN */}
        <div
          className={`bw-celebrate-overlay ${celebrate ? "show" : ""}`}
          id="bwCelebrate"
          onClick={(e) => {
            if (e.target.classList.contains("bw-celebrate-overlay")) {
              setCelebrate(false);
            }
          }}
        >
          <div className="bw-celebrate-card">
            <div className="bw-celebrate-emoji">🎉</div>
            <h3 className="bw-celebrate-title">Selamat!</h3>
            <p className="bw-celebrate-text">
              Kamu sudah mengikuti semua langkah membuat Es Kacang Merah.
              Saatnya menikmati yang segar dan manis khas Palembang ini! 😋
            </p>
            <button
              type="button"
              className="bw-btn bw-close-celebrate"
              onClick={() => setCelebrate(false)}
            >
              Yeay!
            </button>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
