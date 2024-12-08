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
from datetime import datetime
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId
import requests
import re


class UsersService:
    collection_name = "users"
    db_name = "library"

    def __init__(self, app: any, mongo: any) -> None:
        self.__app = app
        self.__mongo = mongo
        #self.add_default_user()
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
            return self.generate_auth_response(response_data, status, cookie)
        
        @self.__app.route("/auth", methods=["POST"])
        def auth():     
            response_data, status, cookie = self.authorization(request.get_json())
            return self.generate_auth_response(response_data, status, cookie)
        
        @self.__app.route("/users/search", methods=["POST"])
        def search_users():
            request_data = request.get_json()
            search_fields = request_data.get("search_fields", [])
            search_terms = request_data.get("search_terms", [])

            if len(search_fields) == 0 or len(search_terms) == 0:
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
            
            created_at = request_data.get("created_at", {})
            visited_at = request_data.get("visited_at", {})

            
            created_at_date = created_at.get("date", "")
            visited_at_date = visited_at.get("date", "")

            created_at_date = datetime.strptime(created_at_date, "%Y-%m-%d %H:%M:%S") if created_at_date != "" else None
            visited_at_date = datetime.strptime(visited_at_date, "%Y-%m-%d %H:%M:%S") if visited_at_date != "" else None

            created_at_after = created_at.get("after", False)
            visited_at_after = visited_at.get("after", False)

            if len(search_fields) != len(search_terms):
                return jsonify({"error": "The number of search fields must match the number of search terms"}), 400

            collection = self.__mongo[self.db_name][self.collection_name]

            query = {"$and": []}
            for search_field, search_term in zip(search_fields, search_terms):
                search_term = re.escape(search_term)
                query["$and"].append({search_field: re.compile(search_term, re.IGNORECASE)})

            cursor = collection.find(query)
            combined = list(cursor) if cursor is not None else None

            ret = []
            for user in combined:
                user["_id"] = str(user["_id"])
                activities = []
                for act in user["activities"]:
                    activities.append(str(act))
                user["activities"] = activities
                f1, f2 = False, False
                if created_at_date is not None:
                    date = datetime.strptime(user["created_at"], "%Y-%m-%d %H:%M:%S")
                    if created_at_after and created_at_date <= date:
                        f1 = True
                    elif not created_at_after and created_at_date > date:
                        f1 = True
                else:
                    f1 = True

                if visited_at_date is not None:
                    date = datetime.strptime(user["created_at"], "%Y-%m-%d %H:%M:%S")
                    if visited_at_after and visited_at_date <= date:
                        f2 = True
                    elif not visited_at_after and visited_at_date > date:
                        f2 = True
                else:
                    f2 = True

                if f1 and f2:
                    ret.append(user)
            return jsonify(ret), 200

    def generate_auth_response(self, response_data, status, cookie):
        response = make_response(response_data, status)
        if cookie:
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
        activities = []
        for activity in existing_user["activities"]:
            activities.append(str(activity))
        existing_user["activities"] = activities
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
            "activities": [],
            "visited_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),    
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "name": request_data.get('name'),
            "surname": request_data.get('surname')   
        }
        
        result = collection.insert_one(new_user)
        if not result:
            return jsonify({"error": "Error"}), 500, None     
        return self.__add_user_activity_request(result.inserted_id, login, "Added user")
        
    def __add_user_activity_request(self, user_id, login, description):
        session = requests.Session()
        session.cookies.set("user_id", login)

        post_data = {
            "description": description,
            "entity_type": "users",
            "entity_id": str(user_id)
        }

        response = session.post(f"http://localhost:8081/activities", json=post_data)
        if response.status_code == 201:
            activity_id = response.json()["activity"]
            self.__add_user_activity(login, activity_id)
            return jsonify({"message": f"Succesfull!"}), 201, login
        else:
            return jsonify({"error": "Failed to retrieve user data"}), 500, login
        
    def __add_user_activity(self, login: str, activity_id):
        collection = self.__mongo[self.db_name][self.collection_name]
        result = collection.update_one(
            {"login": login},
            {
                "$push": {"activities": ObjectId(activity_id)},
                "$set": {"visited_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
            },
            upsert=False
        )
    
        if result.modified_count > 0 or result.upserted_id:
            return {"message": f"Activities updated for user {login}"}, 200
        else:
            return {"error": "Failed to update activities"}, 500
        
    def authorization(self, request_data):
        login, password = request_data["login"], request_data["hash_password"]

        collection = self.__mongo[self.db_name][self.collection_name]
        existing_user = collection.find_one({"login": login, "hash_password": password})
        if existing_user:
            return self.__add_user_activity_request(existing_user["_id"], login, "Auth")
            #return jsonify({"message": "Succesfull"}), 201, login    

        return jsonify({"error": "Bad request"}), 400, None
        


if __name__ == "__main__":
    pass