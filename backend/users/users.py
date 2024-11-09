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

from flask import jsonify, request, make_response
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId
import requests


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
            response_data, status, cookie = self.add_user(request.get_json())
            response = make_response(response_data, status)
            if cookie:
                print(cookie)
                response.set_cookie("user_id", str(cookie), max_age=60*60*24)
            return response
        
    def users_list(self):
        collection = self.__mongo[self.db_name][self.collection_name]
        users_cursor = collection.find()
        users = list(users_cursor)

        for user in users:
            user["_id"] = str(user["_id"])
            activities = []
            for activity in user["activities"]:
                activities.append(str(activity))
            user["activities"] = activities

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
            return jsonify({"error": "Missing login in request data"}), 400, None

        login, password = request_data["login"], request_data["hash_password"]

        collection = self.__mongo[self.db_name][self.collection_name]
        existing_user = collection.find_one({"login": login})
        if existing_user:
            return jsonify({"error": "User already exists"}), 409, None

        new_user = { 
            "login": login, 
            "hash_password": password,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")    
        }
        
        result = collection.insert_one(new_user)        

        session = requests.Session()
        session.cookies.set("user_id", login)

        post_data = {
            "description": "Added user",
            "entity_type": "users",
            "entity_id": str(result.inserted_id),
            "activities": []
        }
        response = session.post(f"http://localhost:{self.__app.config["PORT"]}/activities", json=post_data)

        if response.status_code == 201:
            activity_id = response.json()["activity"]
            self.__add_user_activity(login, activity_id)
            return jsonify({"message": f"User {login} added successfully!"}), 201, login
        else:
            return jsonify({"error": "Failed to retrieve user data"}), 500, login
        
    def __add_user_activity(self, login: str, activity_id):
        collection = self.__mongo[self.db_name][self.collection_name]
        result = collection.update_one(
            {"login": login},
            {
                "$push": {"activities": ObjectId(activity_id)}
            },
            upsert=False
        )
    
        if result.modified_count > 0 or result.upserted_id:
            return {"message": f"Activities updated for user {login}"}, 200
        else:
            return {"error": "Failed to update activities"}, 500


if __name__ == "__main__":
    pass