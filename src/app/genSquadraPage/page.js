"use client";
import { useState } from "react";
import Header from "../components/headerComponent";
import Footer from "../components/footerComponent";
import { Ruda } from "next/font/google";
import Image from "next/image";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [params, setParams] = useState({
    soglia_voto_minimo: "",
    soglia_voto_massimo: "",
    soglia_rp_minimi_parati: "",
    soglia_rc_minimi_calciati: "",
    soglia_r_errati_max: "",
    soglia_amm_max: "",
    soglia_esp_max: "",
    soglia_au_max: "",
  });

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    try {
      const response = await fetch("https://fantamind-ai.onrender.com/seleziona_squadra", {
      //const response = await fetch("http://localhost:5000/seleziona_squadra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError("Errore nel recuperare i dati");
      }
    } catch (err) {
      setError("Errore di connessione al server");
    }
  };

  return (
    <>
      <div className={`${ruda.className} flex flex-col h-screen`}>
        <Header />
        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-8 mb-8 text-2xl md:text-3xl">
            Crea la tua squadra
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 items-center justify-center"
          >
            <div className="gap-0">
              <h1 className="text-center mb-2">Soglia voto minimo</h1>
              <input
                name="soglia_voto_minimo"
                placeholder="voto minimo"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>
            <div className="gap-0">
              <h1 className="text-center mb-2">Soglia voto massimo</h1>
              <input
                name="soglia_voto_massimo"
                placeholder="voto massimo"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>
            <div className="gap-0">
              <h1 className="text-center mb-2">soglia rigori minimi parati</h1>
              <input
                name="soglia_rp_minimi_parati"
                placeholder="rigori parati minimi"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>
            <div className="gap-0">
              <h1 className="text-center mb-2">
                Soglia rigori minimi calciati
              </h1>
              <input
                name="soglia_rc_minimi_calciati"
                placeholder="rigori calciati minimi"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>
            <div className="gap-0">
              <h1 className="text-center mb-2">Soglia rigori massimi errati</h1>
              <input
                name="soglia_r_errati_max"
                placeholder="rigori sbagliati massimi"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>
            <div className="gap-0">
              <h1 className="text-center mb-2">
                Soglia ammonizioni
                <br />
                massime
              </h1>
              <input
                name="soglia_amm_max"
                placeholder="ammonizioni massime"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>
            <div className="gap-0">
              <h1 className="text-center mb-2">Soglia espulsioni massime</h1>
              <input
                name="soglia_esp_max"
                placeholder="espulsioni massime"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>
            <div className="gap-0">
              <h1 className="text-center mb-2">Soglia autogol massime</h1>
              <input
                name="soglia_au_max"
                placeholder="autogol massimi"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>
            <button
              type="submit"
              className="mb-8 text-2xl border border-black p-2 rounded-xl hover:bg-white hover:duration-500 duration-500 md:text-3xl"
            >
              Calcola Squadra
            </button>
          </form>

          {result && (
            <div>
              <h2 className="text-2xl md:text-3xl mb-2">Squadra Selezionata</h2>
              <ul className="text-center text-2xl md:text-3xl">
                <h3 className="mt-4 mb-2">Portieri</h3>
                {result.slice(0, 3).map((player) => (
                  <li
                    className="border even-columns odd-columns border-black"
                    key={player.Nome}
                  >
                    {player.Nome}
                  </li>
                ))}

                <h3 className="mt-8 mb-2">Difensori</h3>
                {result.slice(3, 11).map((player) => (
                  <li
                    className="border even-columns odd-columns border-black"
                    key={player.Nome}
                  >
                    {player.Nome}
                  </li>
                ))}

                <h3 className="mt-8 mb-2">Centrocampisti</h3>
                {result.slice(11, 19).map((player) => (
                  <li
                    className="border even-columns odd-columns border-black"
                    key={player.Nome}
                  >
                    {player.Nome}
                  </li>
                ))}

                <h3 className="mt-8 mb-2">Attaccanti</h3>
                {result.slice(19, 25).map((player) => (
                  <li
                    className="border even-columns odd-columns border-black"
                    key={player.Nome}
                  >
                    {player.Nome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && <div>{error}</div>}
        </div>
        <Footer />
      </div>
    </>
  );
}
