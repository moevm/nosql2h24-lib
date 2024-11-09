from flask import Flask
import importlib
from pymongo import MongoClient

booksModule = importlib.import_module("books.books")
authorsModule = importlib.import_module("authors.authors")
usersModule = importlib.import_module("users.users")
activitiesModule = importlib.import_module("activities.activities")

class Core:
    """Core class"""
    def __init__(self) -> None:
        self.__client = MongoClient('mongodb://mongo:27017@0.0.0.0:27017')
        self.__app = Flask(__name__)
        self.__books = booksModule.BooksService(self.__app, self.__client)
        self.__authors = authorsModule.AuthorsService(self.__app, self.__client)
        self.__users = usersModule.UsersService(self.__app, self.__client)
        self.__activities = activitiesModule.ActivitiesService(self.__app, self.__client)

    def run(self) -> None:
        """Start the Flask application to serve incoming requests."""
        port = 8081
        self.__app.config["PORT"] = port
        self.__app.run(
            host="0.0.0.0",
            port=port,
        )


if __name__ == "__main__":
    core = Core()
    core.run()