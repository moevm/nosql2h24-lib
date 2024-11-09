from flask import jsonify
from pymongo import MongoClient


class UsersService:
    def __init__(self, app: any, mongo: any) -> None:
        self.__app = app
        self.__mongo = mongo
        self.__registerRoutes()

    def __registerRoutes(self) -> None:
        @self.__app.route("/users", methods=["GET"])
        def get_users():     
            print(self.__mongo.list_database_names())       
            return jsonify({"message": "get user!"}), 200
        
        @self.__app.route("/users", methods=["POST"])
        def insert_users():            
            return jsonify({"message": "insert user!"}), 200
        

if __name__ == "__main__":
    pass