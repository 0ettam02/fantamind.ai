from flask import Blueprint, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error
from fuzzywuzzy import fuzz
import matplotlib.pyplot as plt

app_routes = Blueprint('app_routes', __name__)

# Caricamento dei dataset
dataset = pd.read_csv("datasets/Statistiche_Fantacalcio_Stagione_2023_24.csv", sep=';')
dataset2 = pd.read_csv("datasets/Statistiche_Fantacalcio_Stagione_2024_25.csv", sep=';')
prezzi_dataset1 = pd.read_csv("datasets/prezzi_2024_25.csv", sep=";")
prezzi_dataset2 = pd.read_csv("datasets/datasetPrezzi.csv", sep=";")

# Preprocessing dei dati
dataset["Mv"] = dataset["Mv"].str.replace(",", ".").astype(float)
dataset2["Mv"] = dataset2["Mv"].str.replace(",", ".").astype(float)
dataset["Fm"] = dataset["Fm"].str.replace(",", ".").astype(float)
dataset2["Fm"] = dataset2["Fm"].str.replace(",", ".").astype(float)

# Funzione per la visualizzazione di un dato specifico
def plot_histogram(data, column_name):
    plt.hist(data[column_name])
    plt.title(f'Distribuzione di {column_name}')
    plt.xlabel(column_name)
    plt.ylabel('Frequenza')
    plt.show()

# Rotta per la selezione della squadra
@app_routes.route('/seleziona_squadra', methods=['POST'])
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

    # Filtro dei giocatori per ruolo
    portieri_selezionati = dataset[
        (dataset['Mv'] >= soglia_voto_minimo) & (dataset['Mv'] < soglia_voto_massimo) & 
        (dataset['R'] == 'P') & (dataset['Pv'] > 20) & 
        (dataset['Rp'] >= soglia_rp_minimi_parati) & 
        (dataset['Amm'] <= soglia_amm_max) & (dataset['Esp'] <= soglia_esp_max) & 
        (dataset['Au'] <= soglia_au_max)
    ].sort_values(by='Fm', ascending=False)

    difensori_selezionati = dataset[
        (dataset['Fm'] >= soglia_voto_minimo) & (dataset['Fm'] < soglia_voto_massimo) & 
        (dataset['R'] == 'D') & (dataset['Pv'] > 20) &
        (dataset['Rc'] >= soglia_rc_minimi_calciati) & (dataset['R-'] <= soglia_r_errati_max) & 
        (dataset['Amm'] <= soglia_amm_max) & (dataset['Esp'] <= soglia_esp_max) & 
        (dataset['Au'] <= soglia_au_max)
    ].sort_values(by='Fm', ascending=False)

    centrocampisti_selezionati = dataset[
        (dataset['Fm'] >= soglia_voto_minimo) & (dataset['Fm'] < soglia_voto_massimo) & 
        (dataset['R'] == 'C') & (dataset['Pv'] > 20) &
        (dataset['Rc'] >= soglia_rc_minimi_calciati) & (dataset['R-'] <= soglia_r_errati_max) & 
        (dataset['Amm'] <= soglia_amm_max) & (dataset['Esp'] <= soglia_esp_max) & 
        (dataset['Au'] <= soglia_au_max)
    ].sort_values(by='Fm', ascending=False)

    attaccanti_selezionati = dataset[
        (dataset['Fm'] >= soglia_voto_minimo) & (dataset['Fm'] < soglia_voto_massimo) & 
        (dataset['R'] == 'A') & (dataset['Pv'] > 20) &
        (dataset['Rc'] >= soglia_rc_minimi_calciati) & (dataset['R-'] <= soglia_r_errati_max) & 
        (dataset['Amm'] <= soglia_amm_max) & (dataset['Esp'] <= soglia_esp_max) & 
        (dataset['Au'] <= soglia_au_max)
    ].sort_values(by='Fm', ascending=False)

    #squadra finale
    squadra_fantacalcio = pd.concat([
        portieri_selezionati.head(3), 
        difensori_selezionati.head(8), 
        centrocampisti_selezionati.head(8), 
        attaccanti_selezionati.head(6)
    ])

    return jsonify(squadra_fantacalcio.to_dict(orient='records'))

# Rotta per la predizione dei goal
@app_routes.route('/predizioneGol', methods=['POST'])
def predizioneGol():
    data = request.get_json()
    giocatore = data.get('giocatore')
    player_data = dataset[dataset['Nome'] == giocatore]

    def find_similar_player(player_name):
        highest_score = -float('inf')
        most_similar_player = None
        for name in dataset2['Nome'].values:
            score = fuzz.ratio(player_name.lower(), name.lower())
            if score > highest_score:
                highest_score = score
                most_similar_player = dataset2[dataset2['Nome'] == name]
        return most_similar_player

    if player_data.empty:
        similar_player = find_similar_player(giocatore)
        if similar_player is not None:
            giocatore = similar_player['Nome'].values[0]
            player_data = dataset[dataset['Nome'] == giocatore]
            message = f"Giocatore '{data.get('giocatore')}' non trovato, usando giocatore simile: {giocatore}"
        else:
            return jsonify({"error": f"Il giocatore {giocatore} non è stato trovato"}), 404
    else:
        message = f"Giocatore '{giocatore}' trovato nel dataset."

    # Previsione
    X = dataset[["Ass", "Mv", "Fm", "Rc"]]
    y = dataset['Gf']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    ss = StandardScaler()
    X_train = ss.fit_transform(X_train)
    X_test = ss.transform(X_test)
    model = LinearRegression()
    model.fit(X_train, y_train)
    player_data_normalized = ss.transform(player_data[["Ass", "Mv", "Fm", "Rc"]])
    predicted_goal = model.predict(player_data_normalized).mean()

    return jsonify({
        "giocatore": giocatore,
        "predicted_goal": round(predicted_goal, 2),
        "message": message
    })

# Rotta per la predizione degli assist
@app_routes.route('/predizioneAssist', methods=['POST'])
def predizioneAssist():
    data = request.json
    player_name = data.get('giocatore')
    player_data = dataset[dataset['Nome'] == player_name]

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

    if player_data.empty:
        similar_player = find_similar_player(player_name)
        if similar_player is not None:
            player_name = similar_player['Nome'].values[0]
            player_data = dataset[dataset['Nome'] == player_name]
            message = f"Giocatore '{data.get('giocatore')}' non trovato, usando giocatore simile: {player_name}"
        else:
            return jsonify({"error": f"Il giocatore {player_name} non è stato trovato"}), 404
    else:
        message = f"Giocatore '{player_name}' trovato nel dataset."

    # Previsione
    X = dataset[["Gf", "Mv", "Fm", "Rc"]]
    y = dataset['Ass']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    ss = StandardScaler()
    X_train = ss.fit_transform(X_train)
    X_test = ss.transform(X_test)
    model = LinearRegression()
    model.fit(X_train, y_train)
    player_data_normalized = ss.transform(player_data[["Gf", "Mv", "Fm", "Rc"]])
    predicted_assist = model.predict(player_data_normalized).mean()

    return jsonify({
        "giocatore": player_name,
        "predicted_assist": round(predicted_assist, 2),
        "message": message
    })

# Rotta per la predizione del prezzo
@app_routes.route('/previsionePrezzo', methods=['POST'])
def previsionePrezzo():
    data = request.get_json()
    giocatore = data.get('giocatore')
    crediti = data.get('crediti')

    player_data = prezzi_dataset1[prezzi_dataset1['Nome'] == giocatore]

    def find_similar_player(player_name):
        highest_score = -float('inf')
        most_similar_player = None
        for name in prezzi_dataset2['Nome'].values:
            score = fuzz.ratio(player_name.lower(), name.lower())
            if score > highest_score:
                highest_score = score
                most_similar_player = prezzi_dataset2[prezzi_dataset2['Nome'] == name]
        return most_similar_player

    while player_data.empty:
        similar_player = find_similar_player(giocatore)
        if similar_player is not None:
            player_data = similar_player.copy()
            print(f"Player '{giocatore}' not found, using similar player: {similar_player['Nome'].values[0]}")
            giocatore = similar_player['Nome'].values[0]
        else:
            return jsonify({"error": f"Il giocatore {giocatore} non è stato trovato"}), 404

    # Previsione
    X = prezzi_dataset2[['Qt.A', 'Qt.I', 'Diff.']]
    y = prezzi_dataset2['FVM']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Standardizzazione delle variabili
    sc = StandardScaler()
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    # Modello di regressione
    model = LinearRegression()
    model.fit(X_train, y_train)

    player_data_normalized = sc.transform(player_data[['Qt.A', 'Qt.I', 'Diff.']])
    predicted_price = model.predict(player_data_normalized).mean()

    if crediti == 1000:
        predicted_price_message = f"{giocatore} potrebbe costare {predicted_price:.2f}"
    elif crediti == 500:
        predicted_price_message = f"{giocatore} potrebbe costare {(predicted_price) / 2:.2f}"
    else:
        return jsonify({"error": "Crediti non validi, deve essere 1000 o 500"}), 400

    return jsonify({"giocatore": giocatore, "predicted_price": round(predicted_price, 2), "message": predicted_price_message})

