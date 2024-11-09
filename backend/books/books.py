from flask import jsonify
from pymongo import MongoClient


class BooksService:
    def __init__(self, app: any) -> None:
        self.__app = app
        self.__registerRoutes()

    def run(self) -> None:
        """Start the Flask application to serve incoming requests."""

        self.__app.run(
            host="0.0.0.0",
            port=8081,
        )

    def __registerRoutes(self) -> None:
        @self.__app.route("/books", methods=["GET"])
        def insertBook():
            print("\n\n\n\nzxczxczxcxzczxcxzcz\n\n\n\n")
            return jsonify(["123"])
            pass
        
        @self.__app.errorhandler(404)
        def notFound(error):
            """Handle the 404 error."""

            return (
                jsonify({"error": "The requested URL was not found on server."}),
            ), 404


if __name__ == "__main__":
    pass