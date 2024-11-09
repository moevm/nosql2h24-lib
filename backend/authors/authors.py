# Authors {
#    _id: ObjectId,
#    name: String, // Полное имя автора
#    date_of_birth: Date, // Дата рождения
#    date_of_death: Date, // Дата смерти (если применимо)
#    nationality: String, // Национальность автора
#    biography: {
#        early_life: String, // Ранние годы
#        career: String, // Карьера и ключевые этапы работы
#        achievements: String, // Основные достижения
#        later_life: String // Последние годы (если применимо)
#    },
#    books: ObjectId[] // Список ObjectId книг, связанных с автором
# }

from flask import jsonify, request

class AuthorsService:
    def __init__(self, app: any, mongo: any) -> None:
        self.__app = app
        self.__mongo = mongo
        self.__registerRoutes()
        self.collection_name = "authors"
        self.db_name = "library"

    def __registerRoutes(self) -> None:
        @self.__app.route("/authors", methods=["GET"])
        def get_authors():
            return self.authors_list()

        @self.__app.route("/authors/<string:name>", methods=["GET"])
        def get_author(name):
            return self.get_author(name)

        @self.__app.route("/authors", methods=["POST"])
        def insert_author():
            return self.add_author(request.get_json())

        @self.__app.route("/authors/<string:author_id>", methods=["PUT"])
        def update_author(author_id):
            return self.update_author_details(author_id, request.get_json())

        @self.__app.route("/authors/<string:name>", methods=["DELETE"])
        def delete_author(name):
            return self.delete_author(name)

    def authors_list(self):
        collection = self.__mongo[self.db_name][self.collection_name]
        authors_cursor = collection.find()
        authors = list(authors_cursor)

        for author in authors:
            author["_id"] = str(author["_id"])

        return jsonify(authors), 200

    def get_author(self, name: str):
        collection = self.__mongo[self.db_name][self.collection_name]
        author = collection.find_one({"name": str(name)})
        if not author:
            return jsonify({"error": "Author does not exist"}), 404
        author["_id"] = str(author["_id"])
        return jsonify(author), 200

    def add_author(self, request_data):
        required_fields = ["name"]

        if not request_data or not all(field in request_data for field in required_fields):
            return jsonify({"error": "Missing required fields in request data"}), 400

        new_author = {
            "name": request_data["name"],
            "date_of_birth": request_data.get("date_of_birth"),
            "date_of_death": request_data.get("date_of_death"),
            "nationality": request_data.get("nationality"),
            "biography": request_data.get("biography"),
            "books": request_data.get("books", [])
        }

        collection = self.__mongo[self.db_name][self.collection_name]
        collection.insert_one(new_author)

        return jsonify({"message": f"Author {new_author['name']} added successfully!"}), 201

    def update_author_details(self, name: str, request_data):
        collection = self.__mongo[self.db_name][self.collection_name]
        if not collection.find_one({"name": str(name)}):
            return jsonify({"error": "Author does not exist"}), 404

        update_fields = {key: value for key, value in request_data.items() if key in ["name", "date_of_birth", "date_of_death", "nationality", "biography", "books"]}

        collection.update_one({"name": str(name)}, {"$set": update_fields})

        return jsonify({"message": "Author updated successfully!"}), 200

    def delete_author(self, name: str):
        collection = self.__mongo[self.db_name][self.collection_name]
        if not collection.find_one({"name": str(name)}):
            return jsonify({"error": "Author does not exist"}), 404

        collection.delete_one({"name": name})

        return jsonify({"message": "Author deleted successfully!"}), 200


if __name__ == "__main__":
    pass