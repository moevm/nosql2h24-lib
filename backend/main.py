from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('mongodb://mongo:27017@0.0.0.0:27017')
#print(client.list_database_names())
# db = client['default_db']
# collection = db['books']

# @app.route('/add', methods=['POST'])
# def add_item():
#     #item = request.json
#     #collection.insert_one(item)
#     return jsonify({'message': 'Item added successfully!'}), 201

@app.route('/items', methods=['GET'])
def get_items():
    #items = list(collection.find({}, {'_id': 0}))
    items = client.list_database_names()
    return jsonify(items)

if __name__ == '__main__':
    app.run(debug=True)