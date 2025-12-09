// src/components/ScrollToTop.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // setiap path berubah, paksa scroll ke paling atas
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto", // bisa diganti "smooth" kalau mau animasi
    });
  }, [pathname]);

  return null; // komponen ini tidak merender apa-apa
}
