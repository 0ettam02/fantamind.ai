from flask import Flask
from flask_cors import CORS
import routes  

app = Flask(__name__)
CORS(app)

app.register_blueprint(routes.app_routes)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=True)
    #app.run(debug=True)
