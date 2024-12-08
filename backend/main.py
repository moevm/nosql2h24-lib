import os
from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import importlib
import json
from bson import ObjectId
from flask_cors import CORS

load_dotenv()

booksModule = importlib.import_module("books.books")
authorsModule = importlib.import_module("authors.authors")
usersModule = importlib.import_module("users.users")
activitiesModule = importlib.import_module("activities.activities")

class Core:
    """Core class"""
    def __init__(self) -> None:
        mongo_user = os.getenv('MONGODB_USER')
        mongo_password = os.getenv('MONGODB_PASSWORD')
        mongo_host = os.getenv('MONGODB_HOST')  # Use service name in Docker Compose
        mongo_port = os.getenv('MONGODB_PORT')
        mongo_db = os.getenv('MONGODB_DB')
        self.db_name = mongo_db

        # Construct MongoDB URI
        mongo_uri = f'mongodb://{mongo_user}:{mongo_password}@{mongo_host}:{mongo_port}/?authSource=admin'

        # Initialize MongoDB client
        self.__client = MongoClient(mongo_uri)
        
        # Initialize Flask app and services
        self.__app = Flask(__name__)

        CORS(self.__app, supports_credentials=True, origins=["http://localhost:5173"])
        self.__books = booksModule.BooksService(self.__app, self.__client)
        self.__authors = authorsModule.AuthorsService(self.__app, self.__client)
        self.__users = usersModule.UsersService(self.__app, self.__client)
        self.__activities = activitiesModule.ActivitiesService(self.__app, self.__client)

    def import_base(self):
        dump_file = os.getenv('DUMP_FILE')
        with open(dump_file, 'r') as file:
            data = json.load(file)

        for collection_name, documents in data.items():
                collection = self.__client[self.db_name][collection_name]
                for document in documents:
                    document['_id'] = ObjectId(document['_id'])
                collection.drop()
                if documents:
                    collection.insert_many(documents)


    def is_database_empty(self, database_name):
        client = self.__client
        db = client[database_name]
        collections = db.list_collection_names()
        if not collections:
            return True
        for collection_name in collections:
            collection = db[collection_name]
            if collection.count_documents({}) > 0:
                return False
        return True


    

    def run(self) -> None:
        """Start the Flask application to serve incoming requests."""
        port = int(os.getenv('HTTP_PORT', 8081))

        if self.is_database_empty('library'):
            self.import_base()            

        self.__app.run(host="0.0.0.0", port=port)        

if __name__ == "__main__":
    core = Core()
    core.run()