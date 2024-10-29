"use client";
import { useState } from "react";
import Header from "../components/headerComponent";
import Footer from "../components/footerComponent";
import { Ruda } from "next/font/google";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function PredizioneAssist() {
  const [playerName, setPlayerName] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("https://fantamind-ai.onrender.com/seleziona_squadra", {
      //const response = await fetch("http://127.0.0.1:5000/predizioneAssist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ giocatore: playerName }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Errore sconosciuto");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-col items-center justify-center flex-grow">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Inserisci il nome del giocatore"
            className="p-2 border border-gray-300 rounded mb-4"
          />

          <button
            onClick={handlePredict}
            className="text-xl border border-black p-2 rounded-xl hover:bg-green-300 hover:duration-500 duration-500"
          >
            Calcola Previsione
          </button>

          {error && (
            <p className="mt-4 text-red-500 font-semibold">Errore: {error}</p>
          )}

          {prediction && (
            <div className="mt-4 p-4 border rounded-xl bg-gray-50 border border-black">
              <p>
                <strong>Giocatore:</strong> {prediction.giocatore}
              </p>
              <p>
                <strong>Assist Previsti:</strong> {prediction.predicted_assist}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
