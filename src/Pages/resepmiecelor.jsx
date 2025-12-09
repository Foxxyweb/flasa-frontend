// src/pages/MieCelor.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/style.css";
import { getReviews, sendReview } from "../api";

export default function MieCelor() {
  const navigate = useNavigate();
  const RECIPE_SLUG = "mie-celor";

  // ==== LOGIN STATE ====
  const [isLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // ==== TAB ====
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

  // ==== FORM RATING & REVIEW ====
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  useEffect(() => {
    // prefill nama dari user yang login
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
        console.error("Gagal ambil review mie celor:", err);
      }
    }

    fetchReviews();
  }, []);

  const totalReviewPages = reviewPages.length;

  // ==== PLACE SLIDER (STATIS) ====
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

  const handleStarClick = (val) => {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk memberi penilaian.");
      localStorage.setItem("redirectAfterLogin", "/resep/miecelor");
      navigate("/login");
      return;
    }
    setRating(val);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk memberi penilaian.");
      localStorage.setItem("redirectAfterLogin", "/resep/miecelor");
      navigate("/login");
      return;
    }

    if (!name || !rating) {
      setFormError("Nama dan rating wajib diisi.");
      return;
    }

    try {
      setLoadingSubmit(true);

      // token tidak perlu dikirim manual, sudah ditangani axios interceptor
       const res = await sendReview(RECIPE_SLUG, {
      displayName: name,
      rating: Number(rating),
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
      console.error("Gagal kirim review mie celor:", err);
      setFormError(
        err.response?.data?.message ||
          "Gagal mengirim penilaian. Coba lagi nanti."
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  // ==== STEP WIZARD ====
  const [step, setStep] = useState(1);

  // ==== OVERLAY ====
  const [celebrate, setCelebrate] = useState(false);

  // ==== BAHAN ALTERNATIF ====
  const [openAlt, setOpenAlt] = useState(null); // "egg" | "head" | null

  return (
    <div className="burgo-resep-body">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="burgo-resep-main">
        {/* HERO */}
        <section className="burgo-hero">
          <img
            src="/img/resepmiecelor.png"
            alt="Resep Mie Celor"
            className="burgo-hero-img"
          />

          {/* tombol back */}
          <Link to="/resep" className="burgo-back-btn">
            <span>&larr;</span>
          </Link>

          {/* judul + waktu + rating */}
          <div className="burgo-hero-bottom">
            <div className="burgo-info-left">
              <h1>Mie Celor Telur Udang</h1>
              <div className="burgo-meta">
                <span className="burgo-meta-icon">⏱</span>
                <span>40 Menit</span>
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

        {/* TAB BAR */}
        <section className="burgo-tabs-wrap">
          <div className="burgo-tabs">
            <button
              className={`burgo-tab ${
                activeTab === "bahan" ? "active" : ""
              }`}
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
              className={`burgo-tab ${
                activeTab === "cara" ? "active" : ""
              }`}
              type="button"
              onClick={() => setActiveTab("cara")}
            >
              Cara Pembuatan
            </button>
          </div>
        </section>

        {/* KONTEN TABS */}
        <section className="burgo-content">
          {/* PANEL 1: BAHAN */}
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
                      <span className="burgo-label">
                        Mie Telur / Mie Celor
                      </span>
                      <span className="burgo-value">300 g</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Telur Rebus</span>
                      <span className="burgo-value">2 butir</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Udang Kupas</span>
                      <span className="burgo-value">200 g</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Tauge</span>
                      <span className="burgo-value">100 g</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Daun Bawang</span>
                      <span className="burgo-value">2 helai, iris</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Seledri</span>
                      <span className="burgo-value">2 helai, iris</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Bawang Goreng</span>
                      <span className="burgo-value">Secukupnya</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Jeruk Limau</span>
                      <span className="burgo-value">Untuk penyajian</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Air</span>
                      <span className="burgo-value">
                        Secukupnya untuk merebus mie
                      </span>
                    </div>
                  </div>

                  {/* Bahan Kuah Santan */}
                  <h3 className="burgo-card-title">Bahan Kuah Santan</h3>
                  <div className="burgo-table">
                    <div className="burgo-row">
                      <span className="burgo-label">Air</span>
                      <span className="burgo-value">1 liter</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Santan Kental</span>
                      <span className="burgo-value">250 ml</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">
                        Kepala &amp; Kulit Udang
                      </span>
                      <span className="burgo-value">Untuk kaldu</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Tepung Terigu</span>
                      <span className="burgo-value">2 sdm (pengental)</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">
                        Margarin / Minyak
                      </span>
                      <span className="burgo-value">2 sdm</span>
                    </div>
                  </div>

                  {/* Bumbu Halus */}
                  <h3 className="burgo-card-title">Bumbu Halus</h3>
                  <div className="burgo-table">
                    <div className="burgo-row">
                      <span className="burgo-label">Bawang Putih</span>
                      <span className="burgo-value">4 siung</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Bawang Merah</span>
                      <span className="burgo-value">3 butir</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Kemiri (sangrai)</span>
                      <span className="burgo-value">2 butir</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Merica</span>
                      <span className="burgo-value">1/2 sdt</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Garam &amp; Gula</span>
                      <span className="burgo-value">Secukupnya</span>
                    </div>
                  </div>
                </div>

                {/* tombol lihat selengkapnya */}
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

          {/* PANEL 2: BAHAN ALTERNATIF */}
          {activeTab === "alternatif" && (
            <div className="burgo-panel active" data-panel="alternatif">
              <div className="burgo-card burgo-alt-card-wrapper">
                <div className="burgo-alt-wrapper">
                  <p className="burgo-alt-intro">
                    Beberapa bahan bisa diganti tanpa mengubah cita rasa
                  </p>

                  {/* GRUP 1: PENGGANTI TELUR AYAM */}
                  <div className="pi-alt-group">
                    <button
                      type="button"
                      className="pi-alt-main-btn"
                      data-target="mcAltEgg"
                      onClick={() =>
                        setOpenAlt((prev) => (prev === "egg" ? null : "egg"))
                      }
                    >
                      <span className="pi-alt-main-text">
                        Pengganti Telur Ayam
                      </span>

                      <img
                        src="/img/telurayam.png"
                        alt="Telur Ayam"
                        className="pi-alt-main-img"
                      />

                      <span className="pi-alt-arrow">&gt;</span>
                    </button>

                    <div
                      className={`pi-alt-sub-card ${
                        openAlt === "egg" ? "show" : ""
                      }`}
                      id="mcAltEgg"
                    >
                      <div className="pi-alt-sub-inner">
                        <img
                          src="/img/telurbebek.png"
                          alt="Telur Bebek"
                          className="pi-alt-sub-img"
                        />
                        <span className="pi-alt-sub-text">Telur Bebek</span>
                      </div>
                    </div>
                  </div>

                  {/* GRUP 2: PENGGANTI KEPALA UDANG */}
                  <div className="pi-alt-group">
                    <button
                      type="button"
                      className="pi-alt-main-btn"
                      data-target="mcAltHead"
                      onClick={() =>
                        setOpenAlt((prev) => (prev === "head" ? null : "head"))
                      }
                    >
                      <span className="pi-alt-main-text">
                        Pengganti Kepala Udang
                      </span>

                      <img
                        src="/img/kepalaudang.png"
                        alt="Kepala Udang"
                        className="pi-alt-main-img"
                      />

                      <span className="pi-alt-arrow">&gt;</span>
                    </button>

                    <div
                      className={`pi-alt-sub-card ${
                        openAlt === "head" ? "show" : ""
                      }`}
                      id="mcAltHead"
                    >
                      <div className="pi-alt-sub-inner">
                        <img
                          src="/img/ayam suwir.png"
                          alt="Ayam suir"
                          className="pi-alt-sub-img"
                        />
                        <span className="pi-alt-sub-text">Ayam suir</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PANEL 3: CARA PEMBUATAN (STEP 1–3) */}
          {activeTab === "cara" && (
            <div className="burgo-panel active" data-panel="cara">
              <div className="burgo-card burgo-steps-card">
                <div className="bw-stepper">
                  {/* INDIKATOR STEP 1-2-3 */}
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
                  </div>

                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="bw-step-panel active" data-step="1">
                      <h3 className="bw-title">1. Membuat Kaldu Udang</h3>
                      <ul className="bw-list">
                        <li>
                          Rebus kepala dan kulit udang dengan 1 liter air hingga
                          mendidih dan keluar kaldunya.
                        </li>
                        <li>Saring, ambil air kaldunya, lalu sisihkan.</li>
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
                        2. Membuat Kuah Santan Kental
                      </h3>
                      <ul className="bw-list">
                        <li>Panaskan margarin atau minyak dalam panci.</li>
                        <li>
                          Tumis bumbu halus hingga harum dan matang. Masukkan
                          udang kupas, tumis sebentar.
                        </li>
                        <li>
                          Tuang kaldu udang, masak hingga mendidih lalu
                          kecilkan api.
                        </li>
                        <li>
                          Masukkan santan, aduk perlahan agar santan tidak
                          pecah.
                        </li>
                        <li>
                          Larutkan tepung terigu dengan sedikit air, masukkan ke
                          dalam kuah sebagai pengental.
                        </li>
                        <li>
                          Bumbui dengan garam, gula, dan merica. Masak hingga
                          kuah mengental dan wangi.
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
                      <h3 className="bw-title">3. Penyajian</h3>
                      <ul className="bw-list">
                        <li>Rebus mie telur hingga matang, tiriskan.</li>
                        <li>
                          Letakkan mie dalam mangkuk saji, tambahkan tauge di
                          atas mie.
                        </li>
                        <li>Siram dengan kuah santan udang yang hangat.</li>
                        <li>
                          Beri topping udang, irisan daun bawang, seledri, dan
                          bawang goreng.
                        </li>
                        <li>
                          Sajikan bersama jeruk limau, peras di atas mie celor
                          saat akan disantap.
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
          {/* REVIEW SECTION */}
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
                                <p className="br-text">“{item.comment}”</p>
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
              Berikan penilaian &amp; ceritakan pengalaman Anda memasak Mie
              Celor.
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
                    placeholder="Contoh: Rara"
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
                    placeholder="Tulis pengalaman Anda memasak Mie Celor di sini..."
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
                  style={{
                    transform: `translateX(-${placeIndex * 100}%)`,
                  }}
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

        {/* ========== OVERLAY PERAYAAN SETELAH SELESAI ========== */}
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
              Kamu sudah mengikuti semua langkah memasak Mie Celor. Saatnya
              menikmati hidanganmu! 😋
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
