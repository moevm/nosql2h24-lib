from flask import jsonify
from pymongo import MongoClient


class BooksService:
    def __init__(self, app: any) -> None:
        self.__app = app
        self.__registerRoutes()

    def __registerRoutes(self) -> None:
        @self.__app.route("/books", methods=["GET"])
        def getBooks():
            return jsonify({"message": "Hello World!"}), 200
        
        @self.__app.errorhandler(404)
        def notFound(error):
            """Handle the 404 error."""

            return (
                jsonify({"error": "The requested URL was not found on server."}),
            ), 404


if __name__ == "__main__":
    pass