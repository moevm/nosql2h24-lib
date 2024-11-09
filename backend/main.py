from flask import Flask, request, jsonify
import threading
import importlib

booksModule = importlib.import_module("books.books")

class Core:
    """Core class"""
    def __init__(self) -> None:
        app = Flask(__name__)
        self.__books = booksModule.BooksService(app)

    def start(self) -> None:
        """Run the REST-API service"""

        books_thread = threading.Thread(target=self.__books.run)
        books_thread.start()

        books_thread.join()


if __name__ == "__main__":
    core = Core()
    core.start()