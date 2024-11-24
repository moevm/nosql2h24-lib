# Activities {
#     _id: ObjectId,
#     user_id: ObjectId, // Ссылка на _id пользователя в коллекции Users
#     description: String, // Описание действия (можно задать типовой набор действий)
#     entity_type: String, // Тип сущности, с которой взаимодействовал пользователь (например, "книга", "автор", "профиль пользователя")
#     entity_id: ObjectId, // ID сущности, с которой работал пользователь (например, _id книги, автора и т.д.)
#     created_at: Date // Дата создания записи

from flask import jsonify, request
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

class ActivitiesService:
    collection_name = "activities"
    db_name = "library"
    entity_types = ["books", "authors", "users"]

    def __init__(self, app: any, mongo: any) -> None:
        self.__app = app
        self.__mongo = mongo
        self.__registerRoutes()

    def __registerRoutes(self) -> None:
        @self.__app.route("/activities", methods=["GET"])
        def get_activities():     
            return self.activities_list()
        
        @self.__app.route("/activities", methods=["POST"])
        def insert_activity():
            return self.add_activity(request.get_json(), request.cookies.get("user_id"))

    def activities_list(self):
        collection = self.__mongo[self.db_name][self.collection_name]
        cursor = collection.find()
        activities = list(cursor)

        for activity in activities:
            activity["_id"] = str(activity["_id"])
            for key, value in activity.items():
                if isinstance(value, ObjectId):
                    activity[key] = str(value)

        return jsonify(activities), 200
    
    def add_activity(self, request_data, user_id):
        fields = ["description", "entity_type", "entity_id"]
        missed = ActivitiesService.__check_fields(request_data, fields)
        if missed != "":
            error = f"Missing {missed} in request data" if missed != "Invalid request" else missed
            return jsonify({"error": error}), 400
        
        descriprtion, entity_type, entity_id = request_data["description"], request_data["entity_type"], request_data["entity_id"]
        collection = self.__mongo[self.db_name][self.collection_name]

        if entity_type not in self.entity_types:
            return jsonify({"error": f"Invalid entyty type {entity_type}"}), 400

        entity_collection = self.__mongo[self.db_name][entity_type]
        existing_id = entity_collection.find_one({"_id": ObjectId(entity_id)})
        if not existing_id:
            return jsonify({"error": f"Invalid reference in entity_id {entity_id}"}), 400

        if not user_id:
            return jsonify({"error": f"Unauthorized {user_id}"}), 400

        new_activity = { 
            "user_id": user_id, 
            "description": descriprtion,
            "entyty_type": entity_type,
            "entity_id": entity_id,
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")    
        }
        result = collection.insert_one(new_activity)
    
        return jsonify({"message": f"Activity added successfully!", "activity": str(result.inserted_id)}), 201

    @staticmethod
    def __check_fields(data, fields):
        if not data:
            return "Invalid request"
        for field in fields:
            if field not in data:
                return field
        return ""

if __name__ == "__main__":
    pass