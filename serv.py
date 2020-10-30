from flask import Flask, escape, request
import json

app = Flask(__name__)

@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'

@app.route('/data')
def data():
    data={
        "id": 1,
        "user": "John Doe",
        "location": "Somewhere"
    }
    return json.dumps(data)
#