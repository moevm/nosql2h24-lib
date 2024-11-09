# Activities {
#     _id: ObjectId,
#     user_id: ObjectId, // Ссылка на _id пользователя в коллекции Users
#     description: String, // Описание действия (можно задать типовой набор действий)
#     entity_type: String, // Тип сущности, с которой взаимодействовал пользователь (например, "книга", "автор", "профиль пользователя")
#     entity_id: ObjectId, // ID сущности, с которой работал пользователь (например, _id книги, автора и т.д.)
#     created_at: Date // Дата создания записи
# }

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


class ActivitiesService:
    def __init__(self, app: any) -> None:
        self.__app = app
        self.__registerRoutes()

    def __registerRoutes(self) -> None:
        @self.__app.route("/activities", methods=["GET"])
        def activities():
            print("\n\n\n\nzxczxczxcxzczxcxzcz\n\n\n\n")
            
            return jsonify({"message": "Hello World!"}), 200


if __name__ == "__main__":
    pass