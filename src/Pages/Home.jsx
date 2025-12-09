import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar"; // Import Navbar
import Footer from "../components/footer"; // Import Footer
import "../styles/style.css";

export default function Home() {
  // === SLIDER SEJARAH (MANUAL KIRI–KANAN) ===
  const [historyPage, setHistoryPage] = useState(0);
  const totalHistoryPages = 3; // ada 3 .history-page

  const handlePrevHistory = () => {
    setHistoryPage(
      (prev) => (prev - 1 + totalHistoryPages) % totalHistoryPages
    );
  };

  const handleNextHistory = () => {
    setHistoryPage((prev) => (prev + 1) % totalHistoryPages);
  };

  const historyTrackStyle = {
    transform: `translateX(-${historyPage * 100}%)`,
  };

  // === SLIDER RESEP (AUTO GANTI) ===
  const [recipePage, setRecipePage] = useState(0);
  const totalRecipePages = 3; // ada 3 .recipe-page

  const recipeTrackStyle = {
    transform: `translateX(-${recipePage * 100}%)`,
  };

  useEffect(() => {
    const id = setInterval(() => {
      setRecipePage((prev) => (prev + 1) % totalRecipePages);
    }, 4000); // 4 detik

    return () => clearInterval(id);
  }, []);

  const handleExploreClick = () => {
    const target = document.getElementById("resep-section");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* COVER + TEKS + MANGKUK BESAR */}
      <div className="cover">
        {/* Background wave */}
        <img src="/img/cover.png" alt="Gambar Cover" />

        {/* Teks kiri */}
        <div className="cover-text">
          <h1>
            Jelajah
            <span className="cover-highlight">Kuliner Autentik</span>
            <br />
            Palembang!
          </h1>
          <p>
            Setiap makanan punya cerita. Jelajahi ragam kuliner Palembang dan
            temukan makna di balik rasanya.
          </p>
          <button type="button" className="cover-btn" onClick={handleExploreClick}>
            Eksplorasi Sekarang
          </button>
        </div>

        {/* Mangkuk super gede */}
        <div className="cover-bowl">
          <img src="/img/mangkokgede.png" alt="Pindang Ikan Besar" />
        </div>
      </div>

      {/* MENGAPA KULINER PALEMBANG ISTIMEWA */}
      <section className="why-section">
        <h2>Mengapa Kuliner Palembang Istimewa</h2>

        <div className="why-cards">
          <article className="why-card">
            <img src="/img/3.png" alt="Rasa yang Autentik" />
            <h3>Rasa yang Autentik</h3>
            <p>
              Resepnya diwariskan turun-temurun, sehingga cita rasanya tetap
              terjaga dan otentik sejak dahulu.
            </p>
          </article>

          <article className="why-card">
            <img src="/img/2.png" alt="Cerita di Balik Hidangan" />
            <h3>Cerita di Balik Hidangan</h3>
            <p>
              Setiap makanan punya makna dari hidangan sehari-hari, sajian
              perayaan, hingga simbol kekeluargaan.
            </p>
          </article>

          <article className="why-card">
            <img src="/img/4.png" alt="Perpaduan Budaya" />
            <h3>Perpaduan Budaya</h3>
            <p>
              Kuliner Palembang lahir dari akulturasi budaya Melayu, Tionghoa,
              hingga Arab, yang membuatnya kaya variasi.
            </p>
          </article>

          <article className="why-card">
            <img src="/img/1.png" alt="Bahan Lokal Berkualitas" />
            <h3>Bahan Lokal Berkualitas</h3>
            <p>
              Banyak masakan menggunakan ikan segar dari Sungai Musi dan rempah
              khas daerah, sehingga rasa lebih alami.
            </p>
          </article>
        </div>
      </section>

      {/* SEJARAH KULINER (SLIDER) */}
      <section className="history-section">
        <h2>Sejarah Kuliner Khas Palembang</h2>

        <div className="history-slider">
          <button
            className="history-nav prev"
            type="button"
            onClick={handlePrevHistory}
          >
            &#10094;
          </button>

          <div className="history-viewport">
            <div className="history-track" style={historyTrackStyle}>
              {/* HALAMAN 1 */}
              <div className="history-page">
                <article className="history-card">
                  <div className="history-card-image">
                    <img
                      src="/img/pindangikan1.png"
                      alt="Sejarah Pindang Ikan"
                    />
                    <Link to="/sejarah/pindangikan" className="play-button">
                      <span>&#9658;</span>
                    </Link>
                  </div>
                  <div className="history-card-body">
                    <h3>
                      Sejarah
                      <br />
                      Pindang Ikan
                    </h3>
                    <p>
                      Hidangan berkuah segar khas Palembang yang lahir dari
                      perpaduan rempah dan ikan sungai. Pindang menjadi simbol
                      kehangatan keluarga dan kekayaan rasa dari tepian Sungai
                      Musi.
                    </p>
                    <Link to="/sejarah/pindangikan" className="history-btn">
                      Lihat Selengkapnya
                    </Link>
                  </div>
                </article>

                <article className="history-card">
                  <div className="history-card-image">
                    <img src="/img/SEJBURGO.png" alt="Sejarah Burgo" />
                    <Link to="/sejarah/burgo" className="play-button">
                      <span>&#9658;</span>
                    </Link>
                  </div>
                  <div className="history-card-body">
                    <h3>
                      Sejarah
                      <br />
                      Burgo
                    </h3>
                    <p>
                      Lembaran beras tipis dengan kuah santan gurih hangat.
                      Dulu disajikan sebagai sarapan rumahan, kini menjadi ikon
                      sarapan khas Palembang.
                    </p>
                    <Link to="/sejarah/burgo" className="history-btn">
                      Lihat Selengkapnya
                    </Link>
                  </div>
                </article>

                <article className="history-card">
                  <div className="history-card-image">
                    <img
                      src="/img/SEJMIECELOR.png"
                      alt="Sejarah Mie Celor"
                    />
                    <Link to="/sejarah/miecelor" className="play-button">
                      <span>&#9658;</span>
                    </Link>
                  </div>
                  <div className="history-card-body">
                    <h3>
                      Sejarah
                      <br />
                      Mie Celor
                    </h3>
                    <p>
                      Mie bersantan kental dengan kaldu udang gurih yang biasa
                      dinikmati sebagai menu sarapan favorit warga Palembang.
                    </p>
                    <Link to="/sejarah/miecelor" className="history-btn">
                      Lihat Selengkapnya
                    </Link>
                  </div>
                </article>
              </div>

              {/* HALAMAN 2 */}
              <div className="history-page">
                <article className="history-card">
                  <div className="history-card-image">
                    <img
                      src="/img/SEJPINDANGTULANG.png"
                      alt="Sejarah Pindang Tulang"
                    />
                    <Link to="/sejarah/pindangtulang" className="play-button">
                      <span>&#9658;</span>
                    </Link>
                  </div>
                  <div className="history-card-body">
                    <h3>
                      Sejarah
                      <br />
                      Pindang Tulang
                    </h3>
                    <p>
                      Hidangan tulang iga sapi dengan kuah asam pedas gurih yang
                      identik dengan momen makan bersama keluarga.
                    </p>
                    <Link to="/sejarah/pindangtulang" className="history-btn">
                      Lihat Selengkapnya
                    </Link>
                  </div>
                </article>

                <article className="history-card">
                  <div className="history-card-image">
                    <img src="/img/SEJMODEL2.png" alt="Sejarah Model" />
                    <Link to="/sejarah/model" className="play-button">
                      <span>&#9658;</span>
                    </Link>
                  </div>
                  <div className="history-card-body">
                    <h3>
                      Sejarah
                      <br />
                      Model
                    </h3>
                    <p>
                      Olahan ikan berkuah bening dengan isian tahu, memadukan
                      kelembutan adonan ikan dan gurihnya kaldu udang khas
                      Palembang.
                    </p>
                    <Link to="/sejarah/model" className="history-btn">
                      Lihat Selengkapnya
                    </Link>
                  </div>
                </article>

                <article className="history-card">
                  <div className="history-card-image">
                    <img
                      src="/img/SEJMARTABAKHAR.png"
                      alt="Sejarah Martabak HAR"
                    />
                    <Link to="/sejarah/martabakhar" className="play-button">
                      <span>&#9658;</span>
                    </Link>
                  </div>
                  <div className="history-card-body">
                    <h3>
                      Sejarah
                      <br />
                      Martabak HAR
                    </h3>
                    <p>
                      Martabak telur dengan kuah kari khas yang diperkenalkan
                      Haji Abdul Rozak dan kini menjadi ikon kuliner malam
                      Palembang.
                    </p>
                    <Link to="/sejarah/martabakhar" className="history-btn">
                      Lihat Selengkapnya
                    </Link>
                  </div>
                </article>
              </div>

              {/* HALAMAN 3 */}
              <div className="history-page">
                <article className="history-card">
                  <div className="history-card-image">
                    <img src="/img/SEJ8JAM.png" alt="Sejarah Kue 8 Jam" />
                    <Link to="/sejarah/kue8jam" className="play-button">
                      <span>&#9658;</span>
                    </Link>
                  </div>
                  <div className="history-card-body">
                    <h3>
                      Sejarah
                      <br />
                      Kue 8 Jam
                    </h3>
                    <p>
                      Kue legit yang dimasak hingga delapan jam, dulu hanya
                      disajikan di acara penting dan untuk tamu kehormatan.
                    </p>
                    <Link to="/sejarah/kue8jam" className="history-btn">
                      Lihat Selengkapnya
                    </Link>
                  </div>
                </article>

                <article className="history-card">
                  <div className="history-card-image">
                    <img
                      src="/img/SEJMAKSUBA.png"
                      alt="Sejarah Kue Maksuba"
                    />
                    <Link to="/sejarah/kuemaksuba" className="play-button">
                      <span>&#9658;</span>
                    </Link>
                  </div>
                  <div className="history-card-body">
                    <h3>
                      Sejarah
                      <br />
                      Kue Maksuba
                    </h3>
                    <p>
                      Kue telur berlapis yang sangat legit, menjadi simbol
                      kemewahan dan sering dihidangkan untuk tamu istimewa.
                    </p>
                    <Link to="/sejarah/kuemaksuba" className="history-btn">
                      Lihat Selengkapnya
                    </Link>
                  </div>
                </article>

                <article className="history-card">
                  <div className="history-card-image">
                    <img
                      src="/img/SEJESKACANG.png"
                      alt="Sejarah Es Kacang Merah"
                    />
                    <Link to="/sejarah/eskacang" className="play-button">
                      <span>&#9658;</span>
                    </Link>
                  </div>
                  <div className="history-card-body">
                    <h3>
                      Sejarah
                      <br />
                      Es Kacang Merah
                    </h3>
                    <p>
                      Minuman dingin manis-gurih dari kacang merah rebus, santan,
                      dan es serut yang menyegarkan di cuaca panas.
                    </p>
                    <Link to="/sejarah/eskacang" className="history-btn">
                      Lihat Selengkapnya
                    </Link>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <button
            className="history-nav next"
            type="button"
            onClick={handleNextHistory}
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* WRAPPER BACKGROUND JEMBATAN UNTUK RESEP + REKOMENDASI */}
      <div className="bg-jembatan">
        {/* RESEP MAKANAN (SLIDER OTOMATIS) */}
        <section className="recipe-section" id="resep-section">
          <h2>Resep Makanan Khas Palembang</h2>

          <div className="recipe-slider">
            <div className="recipe-viewport">
              <div className="recipe-track" style={recipeTrackStyle}>
                {/* HALAMAN 1 */}
                <div className="recipe-page">
                  <article className="recipe-card">
                    <div className="recipe-image-wrap">
                      <img src="/img/burgo2.png" alt="Burgo" />
                    </div>
                    <h3 className="recipe-title">BURGO</h3>
                    <p className="recipe-desc">
                      Lembaran tepung beras tipis dengan kuah santan gurih yang
                      lembut di mulut.
                    </p>
                    <Link to="/resep/burgo" className="recipe-btn">
                      Lihat Resep
                    </Link>
                  </article>

                  <article className="recipe-card">
                    <div className="recipe-image-wrap">
                      <img src="/img/pindangikan2.png" alt="Pindang Ikan" />
                    </div>
                    <h3 className="recipe-title">PINDANG IKAN</h3>
                    <p className="recipe-desc">
                      Ikan sungai segar dalam kuah asam pedas yang kaya rempah.
                    </p>
                    <Link to="/resep/pindangikan" className="recipe-btn">
                      Lihat Resep
                    </Link>
                  </article>

                  <article className="recipe-card">
                    <div className="recipe-image-wrap">
                      <img src="/img/mie celor2.png" alt="Mie Celor" />
                    </div>
                    <h3 className="recipe-title">MIE CELOR</h3>
                    <p className="recipe-desc">
                      Mie tebal dengan kuah santan dan kaldu udang yang gurih dan
                      mengenyangkan.
                    </p>
                    <Link to="/resep/miecelor" className="recipe-btn">
                      Lihat Resep
                    </Link>
                  </article>
                </div>

                {/* HALAMAN 2 */}
                <div className="recipe-page">
                  <article className="recipe-card">
                    <div className="recipe-image-wrap">
                      <img src="/img/kue8jam4.jpg" alt="Kue 8 Jam" />
                    </div>
                    <h3 className="recipe-title">KUE 8 JAM</h3>
                    <p className="recipe-desc">
                      Kue legit manis yang dimasak lama hingga teksturnya lembut dan
                      kaya rasa.
                    </p>
                    <Link to="/resep/kue8jam" className="recipe-btn">
                      Lihat Resep
                    </Link>
                  </article>

                  <article className="recipe-card">
                    <div className="recipe-image-wrap">
                      <img src="/img/maksuba2.png" alt="Kue Maksuba" />
                    </div>
                    <h3 className="recipe-title">KUE MAKSUBA</h3>
                    <p className="recipe-desc">
                      Kue telur pekat berlapis dengan rasa manis yang mewah dan
                      tekstur sangat legit.
                    </p>
                    <Link to="/resep/kuemaksuba" className="recipe-btn">
                      Lihat Resep
                    </Link>
                  </article>

                  <article className="recipe-card">
                    <div className="recipe-image-wrap">
                      <img src="/img/eskacang2.png" alt="Es Kacang Merah" />
                    </div>
                    <h3 className="recipe-title">ES KACANG MERAH</h3>
                    <p className="recipe-desc">
                      Perpaduan kacang merah empuk, santan, sirup, dan es serut yang
                      menyegarkan.
                    </p>
                    <Link to="/resep/eskacang" className="recipe-btn">
                      Lihat Resep
                    </Link>
                  </article>
                </div>

                {/* HALAMAN 3 */}
                <div className="recipe-page">
                  <article className="recipe-card">
                    <div className="recipe-image-wrap">
                      <img src="/img/pindangtulang2.png" alt="Pindang Tulang" />
                    </div>
                    <h3 className="recipe-title">PINDANG TULANG</h3>
                    <p className="recipe-desc">
                      Tulang iga sapi dalam kuah asam pedas gurih dengan sensasi
                      segar nanas.
                    </p>
                    <Link to="/resep/pindangtulang" className="recipe-btn">
                      Lihat Resep
                    </Link>
                  </article>

                  <article className="recipe-card">
                    <div className="recipe-image-wrap">
                      <img src="/img/model2.png" alt="Model" />
                    </div>
                    <h3 className="recipe-title">MODEL</h3>
                    <p className="recipe-desc">
                      Olahan ikan berkuah bening dengan isian tahu dan kaldu udang
                      yang ringan.
                    </p>
                    <Link to="/resep/model" className="recipe-btn">
                      Lihat Resep
                    </Link>
                  </article>

                  <article className="recipe-card">
                    <div className="recipe-image-wrap">
                      <img src="/img/martabakhar2.png" alt="Martabak HAR" />
                    </div>
                    <h3 className="recipe-title">MARTABAK HAR</h3>
                    <p className="recipe-desc">
                      Martabak telur tipis dengan kuah kari rempah, cocok untuk
                      dinikmati malam hari.
                    </p>
                    <Link to="/resep/martabakhar" className="recipe-btn">
                      Lihat Resep
                    </Link>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REKOMENDASI TEMPAT */}
        <section className="location-section">
          <div className="location-wrapper">
            <div className="location-map-card">
              <div className="location-map-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63725.56340984267!2d104.7164176!3d-2.9760741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75e8b6d4c9a9%3A0x3039d80b220cf50!2sPalembang%2C%20Kota%20Palembang%2C%20Sumatera%20Selatan!5e0!3m2!1sid!2sid!4v1732698670000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Palembang"
                ></iframe>
              </div>
            </div>

            <div className="location-content">
              <h2>Rekomendasi Tempat Kuliner Khas Palembang</h2>
              <p>
                Dari pempek legendaris hingga hidden gems yang jarang diketahui,
                jelajahi ragam kuliner Palembang di berbagai sudut kota.
              </p>
              <Link to="/rekomendasi" className="location-btn">
                Jelajahi Di Sini
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
