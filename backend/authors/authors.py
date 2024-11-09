from flask import jsonify
from pymongo import MongoClient


class AuthorsService:
    def __init__(self, app: any, mongo: any) -> None:
        self.__app = app
        self.__mongo = mongo
        self.__registerRoutes()

    def __registerRoutes(self) -> None:
        @self.__app.route("/authors", methods=["POST"])
        def insert_author():            
            return jsonify({"message": "pizdec!"}), 200
        
        @self.__app.route("/authors", methods=["GET"])
        def get_authors():
            print(self.__mongo.list_database_names())             
            return jsonify({"message": "pizdec!"}), 200


if __name__ == "__main__":
    pass