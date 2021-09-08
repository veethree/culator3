from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/list", methods=["POST"])
def list():
    if "total" in request.form:
        total = request.form.get("total")
        items = request.form.get("items")
        return render_template("list.html")


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")