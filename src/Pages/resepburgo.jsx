// src/Pages/ResepBurgo.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/style.css";
import { getReviews, sendReview } from "../api";

export default function ResepBurgo() {
  const navigate = useNavigate();
  const location = useLocation();
  const RECIPE_SLUG = "burgo";

  const [isLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // ==== TAB (BAHAN / ALTERNATIF / CARA) ====
  const [activeTab, setActiveTab] = useState("bahan");

  // ==== SEE MORE BAHAN ====
  const [bahanExpanded, setBahanExpanded] = useState(false);

  // ==== REVIEW DARI BACKEND ====
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

  // ==== SLIDER REKOMENDASI TEMPAT ====
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

  // ==== BINTANG PENILAIAN (FORM) ====
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // ==== BAHAN ALTERNATIF (accordion) ====
  const [altOpen, setAltOpen] = useState(false);
  const [altSecondaryOpen, setAltSecondaryOpen] = useState(false);

  // ==== STEP WIZARD CARA PEMBUATAN ====
  const [step, setStep] = useState(1);
  const handleSetStep = (s) => setStep(s);

  // ==== OVERLAY PERAYAAN ====
  const [celebrate, setCelebrate] = useState(false);

  const totalReviewPages = reviewPages.length;

  // ===== PREFILL USER & AMBIL REVIEW DARI BACKEND =====
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
        console.error("Gagal ambil review burgo:", err);
      }
    }

    fetchReviews();
  }, []);

  // ===== HELPER LOGIN UNTUK RATING =====
  const goLoginForRating = () => {
    localStorage.setItem(
      "redirectAfterLogin",
      location.pathname || "/resep/burgo"
    );
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

      // Tidak perlu kirim token manual; axios interceptor sudah handle Authorization header
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
      console.error("Gagal kirim review burgo:", err);
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
      {/* NAVBAR GLOBAL */}
      <Navbar />

      {/* MAIN */}
      <main className="burgo-resep-main">
        {/* HERO */}
        <section className="burgo-hero">
          <img
            src="/img/resepburgo.png"
            alt="Resep Burgo"
            className="burgo-hero-img"
          />

          {/* tombol back → ke halaman daftar resep */}
          <Link to="/resep" className="burgo-back-btn">
            <span>&larr;</span>
          </Link>

          <div className="burgo-hero-bottom">
            <div className="burgo-info-left">
              <h1>Resep Burgo</h1>
              <div className="burgo-meta">
                <span className="burgo-meta-icon">⏱</span>
                <span>35 Menit</span>
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

        {/* BAR TAB MERAH */}
        <section className="burgo-tabs-wrap">
          <div className="burgo-tabs">
            <button
              className={`burgo-tab ${activeTab === "bahan" ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab("bahan")}
            >
              Bahan
            </button>
            <button
              className={`burgo-tab ${
                activeTab === "alternatif" ? "active" : ""
              }`}
              type="button"
              onClick={() => setActiveTab("alternatif")}
            >
              Bahan Alternatif
            </button>
            <button
              className={`burgo-tab ${activeTab === "cara" ? "active" : ""}`}
              type="button"
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
                id="burgo-bahan-content"
              >
                <h3 className="burgo-card-title">Bahan Utama</h3>
                <div className="burgo-table">
                  <div className="burgo-row">
                    <span className="burgo-label">Tepung Beras</span>
                    <span className="burgo-value">100 g</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Tepung Sagu</span>
                    <span className="burgo-value">25 g</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Air</span>
                    <span className="burgo-value">300 ml</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Garam</span>
                    <span className="burgo-value">Secukupnya</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Minyak Goreng</span>
                    <span className="burgo-value">Secukupnya</span>
                  </div>
                </div>

                <h3 className="burgo-card-title">Bahan Kuah</h3>
                <div className="burgo-table">
                  <div className="burgo-row">
                    <span className="burgo-label">Santan</span>
                    <span className="burgo-value">500 ml</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Bawang Putih (halus)</span>
                    <span className="burgo-value">3 siung</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Bawang Merah (halus)</span>
                    <span className="burgo-value">5 siung</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Ketumbar</span>
                    <span className="burgo-value">1/2 sdt</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Kunyit</span>
                    <span className="burgo-value">1 ruas jari</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Serai</span>
                    <span className="burgo-value">1 batang</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Daun Salam</span>
                    <span className="burgo-value">2 lembar</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Garam</span>
                    <span className="burgo-value">1 sdt</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Gula</span>
                    <span className="burgo-value">1/2 sdt</span>
                  </div>
                </div>

                <h3 className="burgo-card-title">Pelengkap</h3>
                <div className="burgo-table">
                  <div className="burgo-row">
                    <span className="burgo-label">Bawang Goreng</span>
                    <span className="burgo-value">Secukupnya</span>
                  </div>
                  <div className="burgo-row">
                    <span className="burgo-label">Daun Bawang iris</span>
                    <span className="burgo-value">Secukupnya</span>
                  </div>
                </div>
              </div>

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

                <button
                  type="button"
                  className={`burgo-alt-item burgo-alt-item-main ${
                    altOpen ? "open" : ""
                  }`}
                  onClick={() => setAltOpen((prev) => !prev)}
                >
                  <span className="burgo-alt-title-main">
                    Pengganti Tepung Sagu
                  </span>

                  <div className="burgo-alt-main-right">
                    <img
                      src="/img/sagu.png"
                      alt="Pengganti Tepung Sagu"
                      className="burgo-alt-img-main"
                    />
                    <span className="burgo-alt-chevron">&rsaquo;</span>
                  </div>
                </button>

                <div
                  className={`burgo-alt-detail ${altOpen ? "open" : ""}`}
                >
                  <div
                    className={`burgo-alt-item burgo-alt-item-secondary ${
                      altSecondaryOpen ? "open" : ""
                    }`}
                    onClick={() =>
                      setAltSecondaryOpen((prev) => !prev)
                    }
                  >
                    <div className="burgo-alt-sec-header">
                      <div className="burgo-alt-sec-main">
                        <img
                          src="/img/tapioka.png"
                          alt="Tepung Tapioka"
                          className="burgo-alt-img-secondary"
                        />
                        <span className="burgo-alt-title-secondary">
                          Tepung Tapioka
                        </span>
                      </div>
                      <span className="burgo-alt-sec-chevron">&gt;</span>
                    </div>

                    <div className="burgo-alt-sec-body">
                      <p className="burgo-alt-desc">
                        Tepung tapioka dapat menggantikan tepung sagu
                        dengan perbandingan 1 : 1. Tekstur sedikit lebih
                        kenyal, tetapi rasa tetap netral dan cocok untuk
                        Burgo.
                      </p>
                      <p className="burgo-alt-text">
                        • Gunakan tepung tapioka halus agar adonan tetap
                        lembut.
                        <br />
                        • Jika terlalu kenyal, campur dengan sedikit tepung
                        beras.
                        <br />
                        • Aduk adonan lebih lama supaya tepung tercampur
                        rata.
                      </p>
                    </div>
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
                <div className="bw-indicator">
                  <button
                    type="button"
                    className={`bw-step-dot ${step === 1 ? "active" : ""}`}
                    onClick={() => handleSetStep(1)}
                  >
                    1
                  </button>
                  <span className="bw-line"></span>
                  <button
                    type="button"
                    className={`bw-step-dot ${step === 2 ? "active" : ""}`}
                    onClick={() => handleSetStep(2)}
                  >
                    2
                  </button>
                  <span className="bw-line"></span>
                  <button
                    type="button"
                    className={`bw-step-dot ${step === 3 ? "active" : ""}`}
                    onClick={() => handleSetStep(3)}
                  >
                    3
                  </button>
                </div>

                <div
                  className={`bw-step-panel ${step === 1 ? "active" : ""}`}
                >
                  <h3 className="bw-title">1. Membuat Lembaran Burgo</h3>
                  <ul className="bw-list">
                    <li>
                      Campurkan tepung beras, tepung sagu, garam, dan air,
                      aduk hingga tidak bergerindil.
                    </li>
                    <li>
                      Panaskan wajan datar anti lengket, olesi sedikit
                      minyak.
                    </li>
                    <li>
                      Tuang adonan tipis-tipis, ratakan. Masak hingga matang
                      (tidak perlu dibalik).
                    </li>
                    <li>
                      Gulung lembaran yang sudah matang dan potong sesuai
                      selera. Sisihkan.
                    </li>
                  </ul>
                  <div className="bw-actions">
                    <button
                      type="button"
                      className="bw-btn bw-next"
                      onClick={() => handleSetStep(2)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>

                <div
                  className={`bw-step-panel ${step === 2 ? "active" : ""}`}
                >
                  <h3 className="bw-title">2. Membuat Kuah Santan</h3>
                  <ul className="bw-list">
                    <li>Tumis bumbu halus hingga harum.</li>
                    <li>
                      Masukkan serai, daun salam, dan tuang santan encer.
                      Aduk rata.
                    </li>
                    <li>
                      Tambahkan santan kental, garam, dan gula. Masak
                      sambil diaduk agar santan tidak pecah.
                    </li>
                  </ul>
                  <div className="bw-actions">
                    <button
                      type="button"
                      className="bw-btn bw-prev-btn bw-prev"
                      onClick={() => handleSetStep(1)}
                    >
                      Kembali
                    </button>
                    <button
                      type="button"
                      className="bw-btn bw-next"
                      onClick={() => handleSetStep(3)}
                    >
                      Selanjutnya
                    </button>
                  </div>
                </div>

                <div
                  className={`bw-step-panel ${step === 3 ? "active" : ""}`}
                >
                  <h3 className="bw-title">3. Penyajian</h3>
                  <ul className="bw-list">
                    <li>Letakkan potongan burgo di mangkuk saji.</li>
                    <li>Siram dengan kuah santan panas.</li>
                    <li>
                      Sajikan selagi hangat dengan taburan bawang goreng dan
                      daun bawang.
                    </li>
                  </ul>
                  <div className="bw-actions">
                    <button
                      type="button"
                      className="bw-btn bw-finish"
                      onClick={() => setCelebrate(true)}
                    >
                      Selesai
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AREA BAGRESEP (review, form, rekomendasi) */}
        <div className="resep-bagresep-bg">
          {/* REVIEW */}
          <section className="burgo-review-section">
            <h2 className="burgo-review-title">
              Bagaimana Resep ini Menurutmu?
            </h2>

            {totalReviewPages > 0 ? (
              <>
                <div className="burgo-review-slider">
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
                          {page.map((rev, idx) => (
                            <article className="br-card" key={idx}>
                              <h3 className="br-name">
                                {rev.display_name}
                              </h3>
                              <div className="br-stars">
                                {"★".repeat(rev.rating)}
                                {"☆".repeat(5 - rev.rating)}
                              </div>
                              {rev.comment && (
                                <p className="br-text">“{rev.comment}”</p>
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
                    onClick={() =>
                      setReviewIndex(
                        (prev) => (prev + 1) % totalReviewPages
                      )
                    }
                  >
                    <span>&rarr;</span>
                  </button>
                </div>

                <div className="br-dots">
                  {reviewPages.map((_, i) => (
                    <span
                      key={i}
                      className={`br-dot ${
                        reviewIndex === i ? "active" : ""
                      }`}
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
              Berikan penilaian &amp; ceritakan pengalaman Anda tentang
              makanan khas Palembang.
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
                      Untuk memberi rating &amp; mengirim penilaian, silakan
                      login terlebih dahulu.
                    </p>
                  )}
                </div>

                <div className="bf-field">
                  <label htmlFor="bf-message">
                    Ceritakan Pengalaman Anda
                  </label>
                  <textarea
                    id="bf-message"
                    name="message"
                    rows="5"
                    placeholder="Tulis pengalaman Anda menikmati Burgo di sini..."
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

          {/* REKOMENDASI TEMPAT */}
          <section className="burgo-place-section">
            <h2 className="burgo-place-title">Rekomendasi Tempat Kuliner</h2>

            <div className="burgo-place-slider">
              <button
                className="bp-nav bp-prev"
                type="button"
                onClick={() =>
                  setPlaceIndex(
                    (prev) =>
                      (prev - 1 + totalPlacePages) % totalPlacePages
                  )
                }
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
                  {placePages.map((page, i) => (
                    <div className="bp-page" key={i}>
                      {page.map((p) => (
                        <article className="bp-card" key={p.name}>
                          <img
                            src={p.img}
                            alt={p.name}
                            className="bp-img"
                          />
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
              Kamu sudah mengikuti semua langkah membuat Burgo sampai
              selesai. Saatnya menikmati hidanganmu! 😋
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

      {/* FOOTER GLOBAL */}
      <Footer />
    </div>
  );
}
