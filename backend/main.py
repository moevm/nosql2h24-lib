from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('mongodb://gen_user:U3vU~xom)!O%2B%3B%26@147.45.189.115:27017/default_db?authSource=admin&directConnection=true')
db = client['default_db']
collection = db['books']

if __name__ == '__main__':
    app.run(debug=True)