import os
import sqlite3
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
DB_PATH = "users.db"


# -------------------- DB SETUP -------------------- #
def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password_hash TEXT
        );
    """)
    conn.commit()
    conn.close()


init_db()


# -------------------- SIGNUP -------------------- #
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not name or not email or not password:
        return jsonify({"error": "All fields required"}), 400

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("SELECT id FROM users WHERE email=?", (email,))
    if cur.fetchone():
        conn.close()
        return jsonify({"error": "Email already registered"}), 400

    password_hash = generate_password_hash(password)
    cur.execute("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
                (name, email, password_hash))
    conn.commit()
    user_id = cur.lastrowid
    conn.close()

    return jsonify({"id": user_id, "name": name, "email": email})


# -------------------- LOGIN -------------------- #
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("SELECT id, name, email, password_hash FROM users WHERE email=?", (email,))
    row = cur.fetchone()
    conn.close()

    if not row:
        return jsonify({"error": "User not found"}), 400

    user_id, name, email_db, password_hash = row
    if not check_password_hash(password_hash, password):
        return jsonify({"error": "Wrong password"}), 400

    return jsonify({"id": user_id, "name": name, "email": email_db})


# -------------------- VIDEO ANALYSIS ENDPOINT -------------------- #
@app.route("/analyze", methods=["POST"])
def analyze():
    if "video" not in request.files:
        return jsonify({"error": "No video uploaded"}), 400

    file = request.files["video"]
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    result = {"scores": {"tone": 7, "pacing": 6}}  # simplified
    return jsonify(result)


@app.route("/")
def home():
    return "Backend running!"


if __name__ == "__main__":
    app.run(port=8000, debug=True)
