from flask import jsonify
from pymongo import MongoClient


class BooksService:
    def __init__(self, app: any, mongo: any) -> None:
        self.__app = app
        self.__mongo = mongo
        self.__registerRoutes()

    def __registerRoutes(self) -> None:
        @self.__app.route("/books", methods=["GET"])
        def get_books():
            print(self.__mongo.list_database_names()) 
            return jsonify({"message": "get books!"}), 200
        
        @self.__app.route("/books", methods=["POST"])
        def insert_book():
            return jsonify({"message": "post books"}), 200
        
        @self.__app.errorhandler(404)
        def notFound(error):
            """Handle the 404 error."""

            return (
                jsonify({"error": "The requested URL was not found on server."}),
            ), 404


if __name__ == "__main__":
    pass