from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error
from fuzzywuzzy import fuzz
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

#---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Caricamento dei dati
dataset1 = pd.read_csv("datasets/datasetGol.csv", sep=";")
dataset2 = pd.read_csv("datasets/Statistiche_Fantacalcio_Stagione_2024_25.csv", sep=";")

dataset1["Mv"] = dataset1["Mv"].str.replace(",", ".").astype(float)
dataset1["Fm"] = dataset1["Fm"].str.replace(",", ".").astype(float)
dataset2["Mv"] = dataset2["Mv"].str.replace(",", ".").astype(float)
dataset2["Fm"] = dataset2["Fm"].str.replace(",", ".").astype(float)

# Definizione delle variabili 
X = dataset1[["Ass", "Mv", "Fm", "Rc"]]
y = dataset1['Gf']

# Suddivisione dei dati
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Standardizzazione
ss = StandardScaler()
X_train = ss.fit_transform(X_train)
X_test = ss.transform(X_test)

# Modello di regressione lineare
model = LinearRegression()
model.fit(X_train, y_train)

# Calcolo dell'errore e valutazione del modello
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", mse)

# Funzione di previsione dei goal
def predict_goal(player_data):
    if player_data.empty:
        return None  

    player_data_normalized = ss.transform(player_data[["Ass", "Mv", "Fm", "Rc"]])
    predicted_goal = model.predict(player_data_normalized).mean()
    return predicted_goal

# Funzione per trovare il giocatore più simile
def find_similar_player(player_name):
    highest_score = -float('inf')
    most_similar_player = None
    for name in dataset2['Nome'].values:
        score = fuzz.ratio(player_name.lower(), name.lower()) 
        if score > highest_score:
            highest_score = score
            most_similar_player = dataset2[dataset2['Nome'] == name]
    return most_similar_player

# Route per fare la previsione dei goal di un giocatore
@app.route('/predizioneGol', methods=['POST'])
def predizioneGol():
    data = request.get_json()
    giocatore = data.get('giocatore')

    player_data = dataset1[dataset1['Nome'] == giocatore]
    
    if player_data.empty:
        similar_player = find_similar_player(giocatore)
        if similar_player is not None:
            giocatore = similar_player['Nome'].values[0]
            player_data = dataset1[dataset1['Nome'] == giocatore]
            message = f"Giocatore '{data.get('giocatore')}' non trovato, usando giocatore simile: {giocatore}"
        else:
            return jsonify({"error": f"Il giocatore {giocatore} non è stato trovato"}), 404
    else:
        message = f"Giocatore '{giocatore}' trovato nel dataset."

    # Calcolo del goal previsto
    predicted_goal = predict_goal(player_data)
    if predicted_goal is not None:
        return jsonify({
            "giocatore": giocatore,
            "predicted_goal": round(predicted_goal, 2),
            "message": message
        })
    else:
        return jsonify({"error": "Impossibile calcolare i goal per il giocatore indicato."}), 500

#--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Caricamento e preparazione dei dati
dataset1 = pd.read_csv("datasets/datasetGol.csv", sep=";")
dataset2 = pd.read_csv("datasets/Statistiche_Fantacalcio_Stagione_2024_25.csv", sep=";")

# Conversione dei dati numerici
dataset1["Mv"] = dataset1["Mv"].str.replace(",", ".").astype(float)
dataset1["Fm"] = dataset1["Fm"].str.replace(",", ".").astype(float)
dataset2["Mv"] = dataset2["Mv"].str.replace(",", ".").astype(float)
dataset2["Fm"] = dataset2["Fm"].str.replace(",", ".").astype(float)

# Definizione delle variabili e suddivisione dei dati
X = dataset1[["Gf", "Mv", "Fm", "Rc"]]
y = dataset1['Ass']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Standardizzazione
ss = StandardScaler()
X_train = ss.fit_transform(X_train)
X_test = ss.transform(X_test)

# Modello di regressione lineare
model = LinearRegression()
model.fit(X_train, y_train)

# Valutazione del modello
y_pred = model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
print("Mean Squared Error:", mse)

# Funzione per la previsione degli assist
def predict_assist(player_data):
    if player_data.empty:
        return None
    player_data_normalized = ss.transform(player_data[["Gf", "Mv", "Fm", "Rc"]])
    predicted_assist = model.predict(player_data_normalized).mean()
    return predicted_assist

# Funzione per trovare un giocatore simile
def find_similar_player(player_name):
    highest_score = -float('inf')
    most_similar_player = None
    for name in dataset2['Nome'].values:
        score = fuzz.ratio(player_name.lower(), name.lower())
        if score > highest_score:
            highest_score = score
            most_similar_player = dataset2[dataset2['Nome'] == name]
    return most_similar_player

# Route per la previsione degli assist
@app.route('/predizioneAssist', methods=['POST'])
def predizioneAssist():
    data = request.get_json()
    giocatore = data.get('giocatore')

    player_data = dataset1[dataset1['Nome'] == giocatore]

    if player_data.empty:
        similar_player = find_similar_player(giocatore)
        if similar_player is not None:
            giocatore = similar_player['Nome'].values[0]
            player_data = dataset1[dataset1['Nome'] == giocatore]
            message = f"Giocatore '{data.get('giocatore')}' non trovato, usando giocatore simile: {giocatore}"
        else:
            return jsonify({"error": f"Il giocatore {giocatore} non è stato trovato"}), 404
    else:
        message = f"Giocatore '{giocatore}' trovato nel dataset."

    # Calcolo degli assist previsti
    predicted_assist = predict_assist(player_data)
    if predicted_assist is not None:
        return jsonify({
            "giocatore": giocatore,
            "predicted_assist": round(predicted_assist, 2),
            "message": message
        })
    else:
        return jsonify({"error": "Impossibile calcolare gli assist per il giocatore indicato."}), 500



#--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# Caricamento dei dati
dataset1 = pd.read_csv("datasets/prezzi_2024_25.csv", sep=";")
dataset2 = pd.read_csv("datasets/datasetPrezzi.csv", sep=";")

# Standardizzazione e addestramento del modello
X = dataset2[['Qt.A', 'Qt.I', 'Diff.']]
y = dataset2['FVM']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Standardizzazione delle variabili
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# Modello di regressione lineare
model = LinearRegression()
model.fit(X_train, y_train)

# Valutazione del modello
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print("Mean Absolute Error:", mae)

# Funzione per la previsione dei prezzi
def predict_price(player_data):
    if player_data.empty:
        return None

    player_data_normalized = sc.transform(player_data[['Qt.A', 'Qt.I', 'Diff.']])
    predicted_price = model.predict(player_data_normalized).mean()
    return predicted_price

# Funzione per trovare un giocatore simile
def find_similar_player(player_name):
    highest_score = -float('inf')
    most_similar_player = None
    for name in dataset2['Nome'].values:
        score = fuzz.ratio(player_name.lower(), name.lower()) 
        if score > highest_score:
            highest_score = score
            most_similar_player = dataset2[dataset2['Nome'] == name]

    return most_similar_player

@app.route('/previsionePrezzo', methods=['POST'])
def predict():
    data = request.get_json()
    giocatore = data.get('giocatore')
    crediti = data.get('crediti')

    player_data = dataset1[dataset1['Nome'] == giocatore]
    
    while player_data.empty:
        similar_player = find_similar_player(giocatore)
        if similar_player is not None:
            player_data = similar_player.copy()
            giocatore = similar_player['Nome'].values[0]  
            message = f"Giocatore '{giocatore}' non trovato, usando giocatore simile: {giocatore}"
        else:
            return jsonify({"error": f"Il giocatore {giocatore} non è stato trovato"}), 404

    # Calcolo del prezzo previsto
    predicted_price = predict_price(player_data)
    if predicted_price is not None:
        if crediti == 1000:
            return jsonify({
                "giocatore": giocatore,
                "predicted_price": round(predicted_price, 2),
                "message": f"{giocatore} potrebbe costare {predicted_price:.2f}"
            })
        elif crediti == 500:
            return jsonify({
                "giocatore": giocatore,
                "predicted_price": round(predicted_price / 2, 2),
                "message": f"{giocatore} potrebbe costare {(predicted_price / 2):.2f}"
            })
    else:
        return jsonify({"error": "Impossibile calcolare il prezzo per il giocatore indicato."}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)
    #app.run(debug=True)


    
