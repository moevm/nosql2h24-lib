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
from datetime import datetime


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
            return self.users_list()
        
        @self.__app.route('/users/<string:user>', methods=['GET'])
        def get_user(user):
            return self.get_user(user)
        
        @self.__app.route("/users", methods=["POST"])
        def insert_user():     
            return self.add_user(request.get_json())
        
    def users_list(self):
        collection = self.__mongo[self.db_name][self.collection_name]
        users_cursor = collection.find()
        users = list(users_cursor)

        for user in users:
            user["_id"] = str(user["_id"])

        return jsonify(users), 200
    
    def get_user(self, user: str):
        collection = self.__mongo[self.db_name][self.collection_name]
        existing_user = collection.find_one({"login": user})
        if not existing_user:
            return jsonify({"error": "User does not exist"}), 404
        existing_user["_id"] = str(existing_user["_id"])
        return jsonify(existing_user), 200
        
    def add_user(self, request_data):
        if not request_data or "login" not in request_data:
            return jsonify({"error": "Missing login in request data"}), 400

        login, password = request_data["login"], request_data["hash_password"]

        collection = self.__mongo[self.db_name][self.collection_name]
        existing_user = collection.find_one({"login": login})
        if existing_user:
            return jsonify({"error": "User already exists"}), 409

        new_user = { 
            "login": login, 
            "hash_password": password,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")    
        }
        collection.insert_one(new_user)
    
        return jsonify({"message": f"User {login} added successfully!"}), 201

if __name__ == "__main__":
    pass