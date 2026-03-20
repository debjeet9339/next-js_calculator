from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])

@app.route('/')
def home():
    return "Flask backend is running"

@app.route('/calculate', methods=['POST'])
def add_numbers():
    data = request.get_json()
    num1 = data.get('num1', 0)
    num2 = data.get('num2', 0)
    operation = data.get('operation', 'add')

    if operation == 'add':
        result = num1 + num2
    elif operation == 'subtract':
        result = num1 - num2
    elif operation == 'multiply':
        result = num1 * num2
    elif operation == 'division':
        if num2 == 0:
            return jsonify({"error": "Cannot divide by zero"}), 400
        result = num1 / num2
    elif operation == 'module':
        result = num1 % num2
    elif operation == 'exponent':
        result = num1 ** num2
    else:
        return jsonify({'error': 'Invalid operation'})
    return jsonify({
        'result' : result
    })

if __name__ == "__main__":
    app.run(debug=True)