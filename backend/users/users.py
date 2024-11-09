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

from flask import jsonify
from pymongo import MongoClient


class UsersService:
    def __init__(self, app: any, mongo: any) -> None:
        self.__app = app
        self.__mongo = mongo
        self.__registerRoutes()

    def __registerRoutes(self) -> None:
        @self.__app.route("/users", methods=["GET"])
        def users():
            print(self.__mongo.list_database_names())
            print("\n\n\n\nzxczxczxcxzczxcxzcz\n\n\n\n")
            
            return jsonify({"message": "Hello World!"}), 200
        

if __name__ == "__main__":
    pass