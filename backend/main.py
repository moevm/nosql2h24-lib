from flask import Flask, request, jsonify
import threading
import importlib

booksModule = importlib.import_module("books.books")

class Core:
    """Core class"""
    def __init__(self) -> None:
        self.__app = Flask(__name__)
        self.__books = booksModule.BooksService(self.__app)    

    def run(self) -> None:
        """Start the Flask application to serve incoming requests."""

        self.__app.run(
            host="0.0.0.0",
            port=8081,
        )


if __name__ == "__main__":
    core = Core()
    core.run()