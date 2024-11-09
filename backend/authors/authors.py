from flask import jsonify
from pymongo import MongoClient


class AuthorsService:
    def __init__(self, app: any) -> None:
        self.__app = app
        self.__registerRoutes()

    def __registerRoutes(self) -> None:
        @self.__app.route("/authors", methods=["GET"])
        def insertAuthor():            
            return jsonify({"message": "pizdec!"}), 200


if __name__ == "__main__":
    pass