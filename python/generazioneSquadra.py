from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS

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
    soglia_voto_minimo = data.get("soglia_voto_minimo", 0)
    soglia_voto_massimo = data.get("soglia_voto_massimo", 10)
    soglia_rp_minimi_parati = data.get("soglia_rp_minimi_parati", 0)
    soglia_rc_minimi_calciati = data.get("soglia_rc_minimi_calciati", 0)
    soglia_r_errati_max = data.get("soglia_r_errati_max", 10)
    soglia_amm_max = data.get("soglia_amm_max", 10)
    soglia_esp_max = data.get("soglia_esp_max", 10)
    soglia_au_max = data.get("soglia_au_max", 10)

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

if __name__ == '__main__':
    app.run(debug=True)
