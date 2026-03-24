"""
Flask server — serves the compiled React app from ./dist

Usage:
  1. npm run build        (compile the React app)
  2. python server.py     (start the server)
  3. ngrok http 5000      (expose to the internet / mobile)
"""
from flask import Flask, send_from_directory
import os

DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')

app = Flask(__name__, static_folder=DIST_DIR, static_url_path='')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    full = os.path.join(DIST_DIR, path)
    if path and os.path.exists(full):
        return send_from_directory(DIST_DIR, path)
    return send_from_directory(DIST_DIR, 'index.html')


if __name__ == '__main__':
    if not os.path.exists(DIST_DIR):
        print("\n  ERROR: 'dist/' folder not found.")
        print("  Run  npm run build  first, then try again.\n")
        raise SystemExit(1)

    print("\n  Masters App  →  http://localhost:5000")
    print("  Mobile access →  ngrok http 5000\n")
    app.run(host='0.0.0.0', port=5000, debug=False)
