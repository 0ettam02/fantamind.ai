"use client";
import { useState } from "react";
import Header from "../components/headerComponent";
import Footer from "../components/footerComponent";
import { Ruda } from "next/font/google";

const ruda = Ruda({
  subsets: ["latin"],
  weight: ["400"],
});

export default function PredizioneGol() {
  const [playerName, setPlayerName] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setError(null);
    setPrediction(null);

    try {
      const response = await fetch("https://fantamind-ai.onrender.com/predizioneGol", {
      //const response = await fetch("http://127.0.0.1:5000/predizioneGol", {

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
      <div className={`${ruda.className} h-screen flex flex-col`}>
        <Header />
        <main className="flex flex-col items-center justify-center flex-grow">
          <h1 className="text-2xl mb-4">Previsione Gol</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePredict();
            }}
            className="flex flex-col gap-4"
            aria-label="Form per la previsione dei gol"
          >
            <label htmlFor="playerName" className="sr-only">
              Nome Giocatore
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Inserisci il nome del giocatore"
              className="p-2 border border-gray-300 rounded mb-4"
            />

            <button
              type="submit"
              className="text-xl border border-black p-2 rounded-xl hover:bg-green-300 hover:duration-500 duration-500"
            >
              Calcola Previsione
            </button>
          </form>

          {error && (
            <p className="mt-4 text-red-500 font-semibold">Errore: {error}</p>
          )}

          {prediction && (
            <div className="mt-4 p-4 border rounded-xl bg-gray-50 border-black">
              <p>
                <strong>Giocatore:</strong> {prediction.giocatore}
              </p>
              <p>
                <strong>Goal Previsti:</strong> {prediction.predicted_goal}
              </p>
              <p className="text-gray-500">{prediction.message}</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}