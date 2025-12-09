// src/Pages/sejarah.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/style.css";

const CARDS = [
  // BARIS 1
  {
    id: 1,
    title: "Pindang Ikan",
    kategori: "hidangan-utama",
    img: "/img/SEJPINDANGIKAN.png",
    link: "/sejarah/pindangikan",
  },
  {
    id: 2,
    title: "Burgo",
    kategori: "sarapan",
    img: "/img/SEJBURGO.png",
    link: "/sejarah/burgo",
  },
  {
    id: 3,
    title: "Mie Celor",
    kategori: "sarapan",
    img: "/img/SEJMIECELOR.png",
    link: "/sejarah/miecelor",
  },

  // BARIS 2
  {
    id: 4,
    title: "Kue 8 Jam",
    kategori: "penutup",
    img: "/img/SEJ8JAM.png",
    link: "/sejarah/kue8jam",
  },
  {
    id: 5,
    title: "Es Kacang",
    kategori: "penutup",
    img: "/img/SEJESKACANG.png",
    link: "/sejarah/eskacang",
  },
  {
    id: 6,
    title: "Kue Maksuba",
    kategori: "penutup",
    img: "/img/SEJMAKSUBA.png",
    link: "/sejarah/kuemaksuba",
  },

  // BARIS 3
  {
    id: 7,
    title: "Pindang Tulang",
    kategori: "hidangan-utama",
    img: "/img/SEJPINDANGTULANG.png",
    link: "/sejarah/pindangtulang",
  },
  {
    id: 8,
    title: "Model",
    kategori: "sarapan",
    img: "/img/SEJMODEL.png",
    link: "/sejarah/model",
  },
  {
    id: 9,
    title: "Martabak Har",
    kategori: "sarapan",
    img: "/img/SEJMARTABAKHAR.png",
    link: "/sejarah/martabakhar",
  },
];

export default function Sejarah() {
  const [filter, setFilter] = useState("semua");

  const filteredCards =
    filter === "semua"
      ? CARDS
      : CARDS.filter((card) => card.kategori === filter);

  return (
    <>
      <Navbar />

      <main className="sejarah-main">
        {/* HERO */}
        <section className="sejarah-hero">
          <div className="sejarah-hero-inner">
            <div className="sejarah-hero-left">
              <h1>
                Jelajahi Sejarah
                <br />
                Kuliner Palembang
              </h1>
            </div>

            <div className="sejarah-hero-divider" />

            <div className="sejarah-hero-right">
              <p>
                Sajian khas dengan rasa autentik yang turun-temurun dari
                generasi ke generasi.
              </p>
            </div>
          </div>

          {/* TAB KATEGORI */}
          <div className="sejarah-tabs">
            <button
              type="button"
              className={`sejarah-tab ${filter === "semua" ? "active" : ""}`}
              onClick={() => setFilter("semua")}
            >
              Semua
            </button>

            <button
              type="button"
              className={`sejarah-tab ${
                filter === "sarapan" ? "active" : ""
              }`}
              onClick={() => setFilter("sarapan")}
            >
              Sarapan
            </button>

            <button
              type="button"
              className={`sejarah-tab ${
                filter === "hidangan-utama" ? "active" : ""
              }`}
              onClick={() => setFilter("hidangan-utama")}
            >
              Hidangan Utama
            </button>

            <button
              type="button"
              className={`sejarah-tab ${
                filter === "penutup" ? "active" : ""
              }`}
              onClick={() => setFilter("penutup")}
            >
              Hidangan Penutup
            </button>
          </div>
        </section>

        {/* GRID KARTU */}
        <section className="sejarah-grid-section">
          <div className="sejarah-grid-wrap">
            {filteredCards.map((card) => (
              <Link
                key={card.id}
                to={card.link}
                className="sejarah-card-link"
              >
                <article className="sejarah-card">
                  <div className="sejarah-card-image">
                    <img src={card.img} alt={card.title} />
                  </div>
                  <div className="sejarah-card-footer">{card.title}</div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
