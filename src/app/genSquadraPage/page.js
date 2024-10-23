"use client"
import { useState } from 'react';
import Header from "../components/headerComponent";
import Footer from "../components/footerComponent";

export default function Home() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const [params, setParams] = useState({
    soglia_voto_minimo: '',
    soglia_voto_massimo: '',
    soglia_rp_minimi_parati: '',
    soglia_rc_minimi_calciati: '',
    soglia_r_errati_max: '',
    soglia_amm_max: '',
    soglia_esp_max: '',
    soglia_au_max: ''
  });

  const handleChange = (e) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/seleziona_squadra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError('Errore nel recuperare i dati');
      }
    } catch (err) {
      setError('Errore di connessione al server');
    }
  };

  return (
    <>
    <div className="h-screen">
    <Header />
    
    <div>
      <h1>Seleziona Squadra Fantacalcio</h1>
      <form onSubmit={handleSubmit}>
        <input name="soglia_voto_minimo" placeholder="Soglia voto minimo" onChange={handleChange} />
        <input name="soglia_voto_massimo" placeholder="Soglia voto massimo" onChange={handleChange} />
        <input name="soglia_rp_minimi_parati" placeholder="Soglia rigori parati minimi" onChange={handleChange} />
        <input name="soglia_rc_minimi_calciati" placeholder="Soglia rigori calciati minimi" onChange={handleChange} />
        <input name="soglia_r_errati_max" placeholder="Soglia rigori sbagliati massimi" onChange={handleChange} />
        <input name="soglia_amm_max" placeholder="Soglia ammonizioni massime" onChange={handleChange} />
        <input name="soglia_esp_max" placeholder="Soglia espulsioni massime" onChange={handleChange} />
        <input name="soglia_au_max" placeholder="Soglia autogol massimi" onChange={handleChange} />
        <button type="submit">Calcola Squadra</button>
      </form>

      {result && (
  <div>
    <h2>Squadra Selezionata</h2>
    <ul>
      {result.map((player) => (
        <li key={player.Nome}>{player.Nome}</li>
      ))}
    </ul>
  </div>
)}

      {error && <div>{error}</div>}
    </div>
    </div>
    <Footer />
    </>
  );
}