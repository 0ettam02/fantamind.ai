const baseURL = process.env.NODE_ENV === 'production'
    ? "https://fantamind-ai.onrender.com"
    : "http://127.0.0.1:5000";

const config = {
    endpoints: {
        previsionePrezzo: `${baseURL}/previsionePrezzo`,
        predizioneGol: `${baseURL}/predizioneGol`,
        seleziona_squadra: `${baseURL}/seleziona_squadra`,
        predict_assist: `${baseURL}/predict_assist`
    }
};

export default config;
