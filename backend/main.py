import os
from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import importlib
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

    def run(self) -> None:
        """Start the Flask application to serve incoming requests."""
        port = int(os.getenv('HTTP_PORT', 8081))
        self.__app.run(host="0.0.0.0", port=port)

if __name__ == "__main__":
    core = Core()
    core.run()