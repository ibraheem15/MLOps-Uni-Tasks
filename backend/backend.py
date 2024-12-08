# backend.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_login import (
    LoginManager,
    UserMixin,
    login_user,
    login_required,
    current_user,
)
import pickle
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__)
CORS(
    app,
    origins=["http://localhost:5173"],
    allow_headers=[
        "Content-Type",
    ],
)

app.config["SECRET_KEY"] = "your-secret-key"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///weather_app.db"
db = SQLAlchemy(app)

# Load model
with open("D:\FAST\Semester 7\MLOps\Project\MLOps_Project\models\model.pkl", "rb") as f:
    model = pickle.load(f)


# User Model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)


# Create tables
with app.app_context():
    db.create_all()

@app.route("/api/signup", methods=["POST"])
def signup() -> tuple:
    """Handle user signup request.
    
    Returns:
        tuple: Response containing JSON message and status code
    """
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()
    
    if user:
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = generate_password_hash(data["password"])
    new_user = User(
        email=data["email"],
        password=hashed_password
    )
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201


@app.route("/api/login", methods=["POST"])
def login() -> tuple:
    """Handle user login request.
    
    Returns:
        tuple: Response containing JWT token or error message with status code
    """
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if user and check_password_hash(user.password, data["password"]):
        token = jwt.encode(
            payload={
                "user_id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
            },
            key=app.config["SECRET_KEY"]
        )
        return jsonify({"token": token})

    return jsonify({"error": "Invalid credentials"}), 401


@app.route("/api/predict", methods=["POST"])
def predict() -> tuple:
    """Make temperature prediction based on weather features.
    
    Returns:
        tuple: Response containing prediction value
    """
    data = request.json
    features = [[
        float(data["humidity"]),
        float(data["windSpeed"]), 
        float(data["pressure"])
    ]]

    prediction = model.predict(features)[0]
    return jsonify({"prediction": round(prediction, 2)})


if __name__ == "__main__":
    app.run(debug=True, port=5001)