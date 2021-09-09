from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    return app.send_static_file("index.html")

@app.route("/manifest.json")
def manifest():
    return app.send_static_file("manifest.json")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
