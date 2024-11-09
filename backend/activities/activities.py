# Activities {
#     _id: ObjectId,
#     user_id: ObjectId, // Ссылка на _id пользователя в коллекции Users
#     description: String, // Описание действия (можно задать типовой набор действий)
#     entity_type: String, // Тип сущности, с которой взаимодействовал пользователь (например, "книга", "автор", "профиль пользователя")
#     entity_id: ObjectId, // ID сущности, с которой работал пользователь (например, _id книги, автора и т.д.)
#     created_at: Date // Дата создания записи

from flask import jsonify, request
from pymongo import MongoClient


class ActivitiesService:
    def __init__(self, app: any, mongo: any) -> None:
        self.__app = app
        self.__mongo = mongo
        self.__registerRoutes()

    def __registerRoutes(self) -> None:
        @self.__app.route("/activities", methods=["GET"])
        def activities():
            print(self.__mongo.list_database_names())
            
            return jsonify({"message": "Hello World!"}), 200
        
        @self.__app.route("/activities", methods=["POST"])
        def insert_activity():
            body = request.get_json()  
            print(body)          
            return body, 200


if __name__ == "__main__":
    pass