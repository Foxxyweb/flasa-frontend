// src/Pages/resep.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../styles/style.css";

const RESEP_LIST = [
  // Pindang Ikan – Hidangan Utama
  {
    id: 1,
    title: "Pindang Ikan",
    kategori: "hidangan-utama",
    img: "/img/SEJPINDANGIKAN.png",
    info: "⏱ 40 Menit • 3–4 porsi",
    tag: "Hidangan Utama",
    path: "/resep/pindangikan",
  },
  // Burgo – Sarapan
  {
    id: 2,
    title: "Burgo",
    kategori: "sarapan",
    img: "/img/SEJBURGO.png",
    info: "⏱ 35 Menit • 3–4 porsi",
    tag: "Sarapan",
    path: "/resep/burgo",
  },
  // Mie Celor – Sarapan
  {
    id: 3,
    title: "Mie Celor",
    kategori: "sarapan",
    img: "/img/SEJMIECELOR.png",
    info: "⏱ 30 Menit • 2–3 porsi",
    tag: "Sarapan",
    path: "/resep/miecelor",
  },
  // Kue 8 Jam – Penutup
  {
    id: 4,
    title: "Kue 8 Jam",
    kategori: "penutup",
    img: "/img/SEJ8JAM.png",
    info: "⏱ 8 Jam • 1 loyang",
    tag: "Hidangan Penutup",
    path: "/resep/kue8jam",
  },
  // Es Kacang Merah – Penutup
  {
    id: 5,
    title: "Es Kacang Merah",
    kategori: "penutup",
    img: "/img/SEJESKACANG.png",
    info: "⏱ 20 Menit • 2–3 porsi",
    tag: "Minuman Penutup",
    path: "/resep/eskacang",
  },
  // Kue Maksuba – Penutup
  {
    id: 6,
    title: "Kue Maksuba",
    kategori: "penutup",
    img: "/img/SEJMAKSUBA.png",
    info: "⏱ 3 Jam • 1 loyang",
    tag: "Hidangan Penutup",
    path: "/resep/kuemaksuba",
  },
  // Pindang Tulang – Hidangan Utama
  {
    id: 7,
    title: "Pindang Tulang",
    kategori: "hidangan-utama",
    img: "/img/SEJPINDANGTULANG.png",
    info: "⏱ 45 Menit • 3–4 porsi",
    tag: "Hidangan Utama",
    path: "/resep/pindangtulang",
  },
  // Model – Sarapan
  {
    id: 8,
    title: "Model",
    kategori: "sarapan",
    img: "/img/SEJMODEL.png",
    info: "⏱ 40 Menit • 3–4 porsi",
    tag: "Sarapan",
    path: "/resep/model",
  },
  // Martabak Har – Sarapan / Ringan
  {
    id: 9,
    title: "Martabak Har",
    kategori: "sarapan",
    img: "/img/SEJMARTABAKHAR.png",
    info: "⏱ 50 Menit • 3–4 porsi",
    tag: "Hidangan Ringan",
    path: "/resep/martabakhar",
  },
];

export default function Resep() {
  const [filter, setFilter] = useState("semua");

  const filteredResep =
    filter === "semua"
      ? RESEP_LIST
      : RESEP_LIST.filter((r) => r.kategori === filter);

  return (
    <>
      <Navbar />

      <main className="resep-main">
        {/* HERO ATAS */}
        <section className="resep-hero">
          <div className="resep-hero-inner">
            <div className="resep-hero-left">
              <h1>
                Jelajahi Resep
                <br />
                Kuliner Palembang
              </h1>
            </div>

            <div className="resep-hero-divider" />

            <div className="resep-hero-right">
              <p>
                Sajian khas dengan rasa autentik yang turun-temurun dari generasi
                ke generasi.
              </p>
            </div>
          </div>

          {/* TAB KATEGORI */}
          <div className="resep-tabs">
            <button
              type="button"
              className={`resep-tab ${filter === "semua" ? "active" : ""}`}
              onClick={() => setFilter("semua")}
            >
              Semua
            </button>
            <button
              type="button"
              className={`resep-tab ${filter === "sarapan" ? "active" : ""}`}
              onClick={() => setFilter("sarapan")}
            >
              Sarapan
            </button>
            <button
              type="button"
              className={`resep-tab ${
                filter === "hidangan-utama" ? "active" : ""
              }`}
              onClick={() => setFilter("hidangan-utama")}
            >
              Hidangan Utama
            </button>
            <button
              type="button"
              className={`resep-tab ${filter === "penutup" ? "active" : ""}`}
              onClick={() => setFilter("penutup")}
            >
              Hidangan Penutup
            </button>
          </div>
        </section>

        {/* GRID RESEP */}
        <section className="resep-grid-section">
          <div className="resep-grid-wrap">
            {filteredResep.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="resep-card-link"
              >
                <article
                  className="resep-card"
                  data-kategori={item.kategori}
                >
                  <div className="resep-card-image">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="resep-card-body">
                    <h3>{item.title}</h3>
                    <p>{item.info}</p>
                    <span className="resep-card-tag">{item.tag}</span>
                  </div>
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
