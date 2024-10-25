from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

dataset = pd.read_csv("datasets/Statistiche_Fantacalcio_Stagione_2023_24.csv", sep=';')
dataset2 = pd.read_csv("datasets/Statistiche_Fantacalcio_Stagione_2024_25.csv", sep=';')

#conversione delle colonne di voto in float
dataset["Mv"] = dataset["Mv"].str.replace(",", ".").astype(float)
dataset2["Mv"] = dataset2["Mv"].str.replace(",", ".").astype(float)
dataset["Fm"] = dataset["Fm"].str.replace(",", ".").astype(float)
dataset2["Fm"] = dataset2["Fm"].str.replace(",", ".").astype(float)

@app.route('/seleziona_squadra', methods=['POST'])
def seleziona_squadra():
    data = request.json
    soglia_voto_minimo = float(data.get("soglia_voto_minimo"))
    soglia_voto_massimo = float(data.get("soglia_voto_massimo"))
    soglia_rp_minimi_parati = float(data.get("soglia_rp_minimi_parati"))
    soglia_rc_minimi_calciati = float(data.get("soglia_rc_minimi_calciati"))
    soglia_r_errati_max = float(data.get("soglia_r_errati_max"))
    soglia_amm_max = float(data.get("soglia_amm_max"))
    soglia_esp_max = float(data.get("soglia_esp_max"))
    soglia_au_max = float(data.get("soglia_au_max"))

    # Filtro i portieri
    portieri_selezionati = dataset[
        (dataset['Mv'] >= soglia_voto_minimo) & (dataset['Mv'] < soglia_voto_massimo) & 
        (dataset['R'] == 'P') & (dataset['Pv'] > 20) & 
        (dataset['Rp'] >= soglia_rp_minimi_parati) & 
        (dataset['Amm'] <= soglia_amm_max) & (dataset['Esp'] <= soglia_esp_max) & 
        (dataset['Au'] <= soglia_au_max)
    ].sort_values(by='Fm', ascending=False)

    # Filtro i difensori
    difensori_selezionati = dataset[
        (dataset['Fm'] >= soglia_voto_minimo) & (dataset['Fm'] < soglia_voto_massimo) & 
        (dataset['R'] == 'D') & (dataset['Pv'] > 20) &
        (dataset['Rc'] >= soglia_rc_minimi_calciati) & (dataset['R-'] <= soglia_r_errati_max) & 
        (dataset['Amm'] <= soglia_amm_max) & (dataset['Esp'] <= soglia_esp_max) & 
        (dataset['Au'] <= soglia_au_max)
    ].sort_values(by='Fm', ascending=False)

    # Filtro i centrocampisti
    centrocampisti_selezionati = dataset[
        (dataset['Fm'] >= soglia_voto_minimo) & (dataset['Fm'] < soglia_voto_massimo) & 
        (dataset['R'] == 'C') & (dataset['Pv'] > 20) &
        (dataset['Rc'] >= soglia_rc_minimi_calciati) & (dataset['R-'] <= soglia_r_errati_max) & 
        (dataset['Amm'] <= soglia_amm_max) & (dataset['Esp'] <= soglia_esp_max) & 
        (dataset['Au'] <= soglia_au_max)
    ].sort_values(by='Fm', ascending=False)

    # Filtro gli attaccanti
    attaccanti_selezionati = dataset[
        (dataset['Fm'] >= soglia_voto_minimo) & (dataset['Fm'] < soglia_voto_massimo) & 
        (dataset['R'] == 'A') & (dataset['Pv'] > 20) &
        (dataset['Rc'] >= soglia_rc_minimi_calciati) & (dataset['R-'] <= soglia_r_errati_max) & 
        (dataset['Amm'] <= soglia_amm_max) & (dataset['Esp'] <= soglia_esp_max) & 
        (dataset['Au'] <= soglia_au_max)
    ].sort_values(by='Fm', ascending=False)

    portieri_finali = portieri_selezionati.head(3)
    difensori_finali = difensori_selezionati.head(8)
    centrocampisti_finali = centrocampisti_selezionati.head(8)
    attaccanti_finali = attaccanti_selezionati.head(6)

    squadra_fantacalcio = pd.concat([portieri_finali, difensori_finali, centrocampisti_finali, attaccanti_finali])

    return jsonify(squadra_fantacalcio.to_dict(orient='records'))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)
