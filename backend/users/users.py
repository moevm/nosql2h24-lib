# Users {
#     _id: ObjectId,
#     login: String, // Логин пользователя
#     hash_password: String, // Хэш пароля пользователя
#     created_at: Date, // Дата регистрации
#     visited_at: Date, // Время последнего посещения
#     name: String, // Имя
#     surname: String, // Фамилия
#     activities: ObjectId[],
#     books:  ObjectId[]
# }

from flask import jsonify, request
from pymongo import MongoClient


class UsersService:
    collection_name = "users"
    db_name = "library"

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
        def insert_user():     
            return self.addUser(request.get_json())
        
    def addUser(self, request_data):
        if not request_data or "login" not in request_data:
            return jsonify({"error": "Missing login in request data"}), 400

        login = request_data["login"]
        print(login)
        response = {}

        collection = self.__mongo[self.db_name][self.collection_name]
        response = collection.find_one({"login": login})



        
        return response, 200

if __name__ == "__main__":
    pass