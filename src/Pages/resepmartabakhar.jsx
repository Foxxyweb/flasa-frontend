// src/Pages/resepmartabakhar.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/style.css";
import { getReviews, sendReview } from "../api";

export default function ResepMartabakHar() {
  const navigate = useNavigate();
  const RECIPE_SLUG = "martabak-har";

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

  // ==== PLACE SLIDER ====
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

  // ==== FORM RATING & REVIEW ====
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // ==== STEP WIZARD ====
  const [step, setStep] = useState(1);

  // ==== OVERLAY ====
  const [celebrate, setCelebrate] = useState(false);

  // ==== BAHAN ALTERNATIF ====
  const [openAlt, setOpenAlt] = useState(null); // "flour" | "jinten" | null

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
        console.error("Gagal ambil review martabak har:", err);
      }
    }

    fetchReviews();
  }, []);

  const totalReviewPages = reviewPages.length;

  // ==== LOGIN CHECK UNTUK RATING & FORM ====
  const handleStarClick = (val) => {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk memberi penilaian.");
      localStorage.setItem("redirectAfterLogin", "/resep/martabakhar");
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
      localStorage.setItem("redirectAfterLogin", "/resep/martabakhar");
      navigate("/login");
      return;
    }

    if (!name || !rating) {
      setFormError("Nama dan rating wajib diisi.");
      return;
    }

    try {
      setLoadingSubmit(true);

      // pakai sendReview, token di-handle axios interceptor
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
      console.error("Gagal kirim review martabak har:", err);
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

      <main className="burgo-resep-main">
        {/* HERO */}
        <section className="burgo-hero">
          <img
            src="/img/resephar.png"
            alt="Resep Martabak HAR"
            className="burgo-hero-img"
          />

          <Link to="/resep" className="burgo-back-btn">
            <span>&larr;</span>
          </Link>

          <div className="burgo-hero-bottom">
            <div className="burgo-info-left">
              <h1>Martabak HAR</h1>
              <div className="burgo-meta">
                <span className="burgo-meta-icon">⏱</span>
                <span>± 90 Menit</span>
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

        {/* TAB */}
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

        {/* KONTEN */}
        <section className="burgo-content">
          {/* BAHAN */}
          {activeTab === "bahan" && (
            <div className="burgo-panel active" data-panel="bahan">
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
                      <span className="burgo-label">
                        Tepung Terigu Protein Tinggi
                      </span>
                      <span className="burgo-value">250 g</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Air Hangat</span>
                      <span className="burgo-value">
                        Secukupnya (± 3 sdm, tambah bila perlu)
                      </span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">
                        Minyak Goreng (untuk adonan)
                      </span>
                      <span className="burgo-value">± 3 sdm</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Telur Ayam / Bebek</span>
                      <span className="burgo-value">2 butir</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Garam</span>
                      <span className="burgo-value">½ sdt</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">
                        Minyak untuk merendam adonan
                      </span>
                      <span className="burgo-value">Secukupnya</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">
                        Minyak untuk menggoreng
                      </span>
                      <span className="burgo-value">
                        ± 1 liter (sesuai ukuran wajan)
                      </span>
                    </div>
                  </div>

                  <h3 className="burgo-card-title">Bumbu Kuah Kari</h3>
                  <div className="burgo-table">
                    <div className="burgo-row">
                      <span className="burgo-label">
                        Kentang (potong dadu)
                      </span>
                      <span className="burgo-value">2 buah</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Santan Cair</span>
                      <span className="burgo-value">500 ml</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Bawang Putih</span>
                      <span className="burgo-value">3 siung</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Bawang Merah</span>
                      <span className="burgo-value">5 siung</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Ketumbar Bubuk</span>
                      <span className="burgo-value">1 sdt</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Kunyit Bubuk</span>
                      <span className="burgo-value">½ sdt</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Jinten</span>
                      <span className="burgo-value">½ sdt</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Daun Kari</span>
                      <span className="burgo-value">3 lembar</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Kayu Manis</span>
                      <span className="burgo-value">1 batang</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Garam</span>
                      <span className="burgo-value">Secukupnya</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">
                        Minyak untuk menumis
                      </span>
                      <span className="burgo-value">Secukupnya</span>
                    </div>
                  </div>

                  <h3 className="burgo-card-title">Pelengkap</h3>
                  <div className="burgo-table">
                    <div className="burgo-row">
                      <span className="burgo-label">Acar Mentimun</span>
                      <span className="burgo-value">Secukupnya</span>
                    </div>
                    <div className="burgo-row">
                      <span className="burgo-label">Sambal Cabe Rawit</span>
                      <span className="burgo-value">Sesuai selera</span>
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

          {/* BAHAN ALTERNATIF */}
          {activeTab === "alternatif" && (
            <div className="burgo-panel active" data-panel="alternatif">
              <div className="burgo-card burgo-alt-card-wrapper">
                <div className="burgo-alt-wrapper">
                  <p className="burgo-alt-intro">
                    Beberapa bahan bisa diganti tanpa mengubah cita rasa
                  </p>

                  {/* PENGGANTI TEPUNG TERIGU */}
                  <div className="pi-alt-group">
                    <button
                      type="button"
                      className="pi-alt-main-btn"
                      data-target="mhAltFlour"
                      onClick={() =>
                        setOpenAlt((prev) =>
                          prev === "flour" ? null : "flour"
                        )
                      }
                    >
                      <span className="pi-alt-main-text">
                        Pengganti Tepung Terigu
                      </span>

                      <img
                        src="/img/terigu.png"
                        alt="Tepung Terigu"
                        className="pi-alt-main-img"
                      />

                      <span className="pi-alt-arrow">&gt;</span>
                    </button>

                    <div
                      className={`pi-alt-sub-card ${
                        openAlt === "flour" ? "show" : ""
                      }`}
                      id="mhAltFlour"
                    >
                      <div className="pi-alt-sub-inner">
                        <img
                          src="/img/sagu.png"
                          alt="Tepung Serbaguna"
                          className="pi-alt-sub-img"
                        />
                        <span className="pi-alt-sub-text">
                          Tepung Serbaguna
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PENGGANTI JINTEN */}
                  <div className="pi-alt-group">
                    <button
                      type="button"
                      className="pi-alt-main-btn"
                      data-target="mhAltJinten"
                      onClick={() =>
                        setOpenAlt((prev) =>
                          prev === "jinten" ? null : "jinten"
                        )
                      }
                    >
                      <span className="pi-alt-main-text">
                        Pengganti Jinten
                      </span>

                      <img
                        src="/img/jinten.png"
                        alt="Jinten"
                        className="pi-alt-main-img"
                      />

                      <span className="pi-alt-arrow">&gt;</span>
                    </button>

                    <div
                      className={`pi-alt-sub-card ${
                        openAlt === "jinten" ? "show" : ""
                      }`}
                      id="mhAltJinten"
                    >
                      <div className="pi-alt-sub-inner">
                        <img
                          src="/img/ketumbar.png"
                          alt="Ketumbar"
                          className="pi-alt-sub-img"
                        />
                        <span className="pi-alt-sub-text">Ketumbar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CARA PEMBUATAN */}
          {activeTab === "cara" && (
            <div className="burgo-panel active" data-panel="cara">
              <div className="burgo-card burgo-steps-card">
                <div className="bw-stepper">
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
                      <h3 className="bw-title">1. Membuat Adonan Kulit</h3>
                      <ul className="bw-list">
                        <li>
                          Campurkan tepung terigu, garam, air hangat, dan
                          minyak goreng dalam wadah besar.
                        </li>
                        <li>
                          Uleni hingga adonan kalis, lembut, dan tidak lengket
                          di tangan. Tambah air sedikit demi sedikit bila
                          perlu.
                        </li>
                        <li>
                          Bagi adonan menjadi beberapa bagian kecil, bulatkan.
                        </li>
                        <li>
                          Letakkan bulatan adonan dalam wadah berisi minyak
                          goreng, rendam ± 1 jam agar lentur.
                        </li>
                        <li>
                          Sambil menunggu, siapkan bahan isian dan bumbu kuah
                          kari.
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
                      <h3 className="bw-title">2. Membuat Kuah Kari</h3>
                      <ul className="bw-list">
                        <li>
                          Tumis bawang merah dan bawang putih hingga harum dan
                          kecoklatan.
                        </li>
                        <li>
                          Masukkan ketumbar bubuk, kunyit bubuk, jinten, daun
                          kari, dan kayu manis. Aduk hingga bumbu wangi.
                        </li>
                        <li>
                          Tuang santan cair, masukkan kentang potong dadu.
                        </li>
                        <li>
                          Masak dengan api kecil sambil diaduk pelan agar
                          santan tidak pecah.
                        </li>
                        <li>
                          Bumbui dengan garam (dan sedikit gula jika suka),
                          masak hingga kentang empuk dan kuah mengental harum.
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
                      <h3 className="bw-title">3. Menggoreng Martabak</h3>
                      <ul className="bw-list">
                        <li>
                          Ambil satu bulatan adonan dari rendaman minyak,
                          tiriskan sebentar.
                        </li>
                        <li>
                          Pipihkan adonan di atas wajan datar atau meja yang
                          dioles minyak hingga tipis dan elastis.
                        </li>
                        <li>
                          Pecahkan telur (ayam/bebek) dan kocok lepas dengan
                          sedikit garam, lalu tuang di tengah lembaran adonan.
                        </li>
                        <li>
                          Lipat sisi-sisi adonan hingga menutup telur,
                          membentuk kotak.
                        </li>
                        <li>
                          Goreng martabak dalam minyak panas hingga kedua sisi
                          keemasan dan matang.
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
                      <h3 className="bw-title">4. Penyajian</h3>
                      <ul className="bw-list">
                        <li>
                          Sajikan martabak di piring saji, potong-potong sesuai
                          selera.
                        </li>
                        <li>
                          Siram dengan kuah kari kentang hangat hingga martabak
                          terlapisi kuah.
                        </li>
                        <li>
                          Tambahkan acar mentimun dan sambal cabai rawit sebagai
                          pelengkap.
                        </li>
                        <li>Martabak HAR siap dinikmati selagi hangat.</li>
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

        {/* BACKGROUND BAGRESEP */}
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
              Sudah berhasil bikin Martabak HAR versi rumahan? Share ceritamu
              di sini.
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

                <div className="bf-field">
                  <label htmlFor="bf-message">
                    Ceritakan Pengalaman Anda
                  </label>
                  <textarea
                    id="bf-message"
                    name="message"
                    rows="5"
                    placeholder="Tulis pengalaman Anda membuat Martabak HAR di sini..."
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

        {/* OVERLAY SELESAI */}
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
              Kamu sudah mengikuti semua langkah membuat Martabak HAR. Tinggal
              nikmatin martabak hangat dengan kuah kari gurih! 😋
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
