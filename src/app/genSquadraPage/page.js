"use client";
import { useState } from "react";
import Header from "../components/headerComponent";
import Footer from "../components/footerComponent";
import { Ruda } from "next/font/google";
import Image from "next/image";
import config from "../components/config";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function GenerazioneSquadra() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState({
    portieri: [],
    difensori: [],
    centrocampisti: [],
    attaccanti: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [playerIndex, setPlayerIndex] = useState(null);

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

        setAvailablePlayers({
          portieri: await fetchPlayers("P"),
          difensori: await fetchPlayers("D"),
          centrocampisti: await fetchPlayers("C"),
          attaccanti: await fetchPlayers("A"),
        });
      } else {
        setError("Errore nel recuperare i dati");
      }
    } catch (err) {
      setError("Errore di connessione al server");
    }
  };

  const fetchPlayers = async (role) => {
    const response = await fetch(
      //`http://localhost:5000/get_giocatori?ruolo=${role}`
      `https://fantamind-ai.onrender.com/get_giocatori?ruolo=${role}`
    );
    const players = await response.json();
    return players;
  };

  const handleOpenModal = (role, index) => {
    setSelectedRole(role);
    setPlayerIndex(index);
    setShowModal(true);
  };

  const handleSelectPlayer = (newPlayer) => {
    const updatedResult = [...result];
    updatedResult[playerIndex] = newPlayer;
    setResult(updatedResult);
    setShowModal(false);
  };

  return (
    <>
      <div className={`${ruda.className} flex flex-col h-screen`}>
        <Header />
        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-8 mb-4 text-2xl md:text-3xl">
            Crea la tua squadra
          </h1>
          <p className="mb-8 text-center">
            Compila i campi con i valori che vorresti che la tua squadra avesse
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-8 items-center justify-center"
          >
            <div className="gap-0">
              <h1 className="text-center mb-2">
                Soglia voto minimo<span className="text-red-500">*</span>
              </h1>
              <input
                name="soglia_voto_minimo"
                placeholder="6"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>

            <div className="gap-0">
              <h1 className="text-center mb-2">
                Soglia voto massimo<span className="text-red-500">*</span>
              </h1>
              <input
                name="soglia_voto_massimo"
                placeholder="8"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>

            <div className="gap-0">
              <h1 className="text-center mb-2">Soglia rigori parati minimi</h1>
              <input
                name="soglia_rp_minimi_parati"
                placeholder="1"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>

            <div className="gap-0">
              <h1 className="text-center mb-2">
                Soglia rigori calciati minimi
              </h1>
              <input
                name="soglia_rc_minimi_calciati"
                placeholder="1"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>

            <div className="gap-0">
              <h1 className="text-center mb-2">Soglia rigori errati massimi</h1>
              <input
                name="soglia_r_errati_max"
                placeholder="1"
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
                placeholder="2"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>

            <div className="gap-0">
              <h1 className="text-center mb-2">Soglia espulsioni massime</h1>
              <input
                name="soglia_esp_max"
                placeholder="1"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>

            <div className="gap-0">
              <h1 className="text-center mb-2">Soglia autogol massimi</h1>
              <input
                name="soglia_au_max"
                placeholder="0"
                onChange={handleChange}
                className="shadow-input shadow-lg rounded-lg p-4"
              />
            </div>

            <button
              type="submit"
              className="mb-8 text-2xl border border-black p-2 rounded-xl hover:bg-green-300 hover:duration-500 duration-500 md:text-3xl"
            >
              Calcola Squadra
            </button>
          </form>

          {result && (
            <div>
              <h2 className="text-2xl md:text-3xl mb-2">Squadra Selezionata</h2>
              <ul className="text-center text-2xl md:text-3xl">
                <h3 className="mt-4 mb-2">Portieri</h3>
                {result.slice(0, 3).map((player, index) => (
                  <li
                    className="border even-columns odd-columns border-black flex justify-between items-center"
                    key={player.Nome}
                  >
                    {player.Nome}
                    <button 
                      className="text-red-500" onClick={() => handleOpenModal("portieri", index)}>
                      x
                    </button>
                  </li>
                ))}

                <h3 className="mt-4 mb-2">Difensori</h3>
                {result.slice(3, 11).map((player, index) => (
                  <li
                    className="border even-columns odd-columns border-black flex justify-between items-center"
                    key={player.Nome}
                  >
                    {player.Nome}
                    <button
                      className="text-red-500" onClick={() => handleOpenModal("difensori", index + 3)}
                    >
                      x
                    </button>
                  </li>
                ))}

                <h3 className="mt-4 mb-2">Centrocampisti</h3>
                {result.slice(11, 19).map((player, index) => (
                  <li
                    className="border even-columns odd-columns border-black flex justify-between items-center"
                    key={player.Nome}
                  >
                    {player.Nome}
                    <button
                      className="text-red-500" onClick={() => handleOpenModal("centrocampisti", index + 11)
                      }
                    >
                      x
                    </button>
                  </li>
                ))}

                <h3 className="mt-4 mb-2">Attaccanti</h3>
                {result.slice(19, 25).map((player, index) => (
                  <li
                    className="border even-columns odd-columns border-black flex justify-between items-center"
                    key={player.Nome}
                  >
                    {player.Nome}
                    <button
                      className="text-red-500" onClick={() => handleOpenModal("attaccanti", index + 19)}
                    >
                      x
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {showModal && (
            <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full max-h-96 overflow-y-auto">
                <h2 className="text-center text-xl">
                  Scegli un nuovo giocatore
                </h2>
                <ul>
                  {availablePlayers[selectedRole].map((player) => (
                    <li
                      key={player.Nome}
                      className="flex justify-between items-center py-2"
                    >
                      {player.Nome} (Mv: {player.Mv}, Fm: {player.Fm})
                      <button
                        onClick={() => handleSelectPlayer(player)}
                        className="text-blue-500"
                      >
                        Seleziona
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 bg-red-500 text-white p-2 rounded-lg w-full"
                >
                  Chiudi
                </button>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
        <Footer />
      </div>
    </>
  );
}
