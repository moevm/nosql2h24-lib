from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('mongodb://gen_user:U3vU~xom)!O%2B%3B%26@147.45.189.115:27017/default_db?authSource=admin&directConnection=true')
db = client['default_db']
collection = db['books']

@app.route('/add', methods=['POST'])
def add_item():
    item = request.json
    collection.insert_one(item)
    return jsonify({'message': 'Item added successfully!'}), 201

@app.route('/items', methods=['GET'])
def get_items():
    items = list(collection.find({}, {'_id': 0}))
    return jsonify(items)

if __name__ == '__main__':
    app.run(debug=True)