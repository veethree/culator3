from flask import Flask, render_template, request, redirect, send_file

app = Flask(__name__)

@app.route("/")
def index():
    return send_file("static/index.html")

@app.route("/static/")
def app_route():
    return redirect("/")

@app.route("/manifest.json")
def manifest():
    return app.send_static_file("manifest.json")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
