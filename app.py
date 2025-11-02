from flask import Flask, request, session, redirect, jsonify, send_from_directory
from flask import Response
from pathlib import Path
import os

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "dev-secret-key-change-me")

BASE_DIR = Path(__file__).resolve().parent
PUBLIC = {"index.html", "login.html"}
PROTECTED = {
    "technologies.html",
    "automotive.html",
    "brands.html",
    "people.html",
    "history.html",
    "gallery.html",
    "contact.html",
}

# Simple auth status endpoint
@app.get("/api/status")
def status():
    return jsonify({"authed": bool(session.get("authed"))})

# Demo login endpoint (accepts any non-empty email/password)
@app.post("/api/login")
def api_login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip()
    password = (data.get("password") or "").strip()
    if not email or not password:
        return jsonify({"ok": False, "error": "Missing credentials"}), 400
    session["authed"] = True
    return jsonify({"ok": True})

@app.post("/api/logout")
def api_logout():
    session.pop("authed", None)
    return jsonify({"ok": True})

# Route guard: redirect to login if hitting a protected page directly
@app.before_request
def protect_routes():
    if request.path.startswith("/api/"):
        return None
    # Normalize path to a file name
    path = request.path.lstrip("/") or "index.html"
    filename = path.split("?")[0]
    if filename in PROTECTED and not session.get("authed"):
        next_target = filename
        return redirect(f"/login.html?next={next_target}")
    return None

# Serve files from project directory
@app.route("/")
@app.route("/<path:path>")
def static_proxy(path: str = "index.html"):
    safe_path = path or "index.html"
    full_path = BASE_DIR / safe_path
    if full_path.is_dir():
        full_path = full_path / "index.html"
    if not full_path.exists():
        return Response("Not Found", status=404)
    directory = str(full_path.parent)
    filename = full_path.name
    return send_from_directory(directory, filename)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
