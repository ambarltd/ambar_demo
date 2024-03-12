import logging
from lib import db_setup
from credit_card import credit_card_routes
from shipping import shipping_routes
from flask import Flask, request
from flask_cors import CORS
from waitress import serve

# Start Flask
app = Flask(__name__)
app.json.sort_keys = False

# Log Requests
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger('waitress')


@app.before_request
def log_the_request():
    logger.info(request.url)


# Setup Cors
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# Routes
app.register_blueprint(credit_card_routes)
app.register_blueprint(shipping_routes)

# Run
db_setup()
if __name__ == '__main__':
    serve(app, host='0.0.0.0', port=81)
