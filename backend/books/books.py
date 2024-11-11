# Books {
#    _id: ObjectId,
#    name: String, // Название книги
#    author: ObjectId,
#    publish_year: Number, // Год издания
#    genre: String, // Жанр
#    publishing: String, // Издательство
#    release_year: Number, // Год выпуска
#    uploaded_by: ObjectId,
#    num_pages: Number, // Количество страниц
#    link: String, // Ссылка на скачивание
#    upload_date: Date, // Дата загрузки книги
#    status: Boolean, // Статус книги (доступна ли она)
#    description: String, // Описание книги
#    shelf: {
#        cabinet: String, // Номер или название шкафа
#        shelf_level: String // Номер или уровень полки
#    }
# }

from datetime import datetime
from flask import jsonify, request
from bson import ObjectId

class BooksService:
    def __init__(self, app: any, mongo: any) -> None:
        self.__app = app
        self.__mongo = mongo
        self.__registerRoutes()
        self.collection_name = "books"
        self.db_name = "library"

    def __registerRoutes(self) -> None:
        @self.__app.route("/books", methods=["GET"])
        def get_books():
            collection = self.__mongo[self.db_name][self.collection_name]
            books_cursor = collection.find()
            books = list(books_cursor)

            for book in books:
                book["_id"] = str(book["_id"])

            return jsonify(books), 200
        
        @self.__app.route("/books", methods=["POST"])
        def insert_book():
            return self.insertBook(request.get_json())
        
        @self.__app.route("/books", methods=["PUT"])
        def update_book(request_data):
            if "name" not in request_data:
                return jsonify({"error": "Missing name in request data"}), 400
            
            book = self.__mongo[self.db_name][self.collection_name].find_one({"name": request_data["name"]})
            if not book:
                return jsonify({"error": "Book not found"}), 404

            updated_fields = request_data.get("updated_fields", {})
            for key, value in updated_fields.items():
                self.__mongo[self.db_name][self.collection_name].update_one({"_id": book["_id"]}, {"$set": {key: value}})

            return jsonify({"message": f"Book {book['name']} updated successfully!"}), 200

        @self.__app.route("/books/<string:book>", methods=["GET"])
        def get_book_by_name(book: str):
            collection = self.__mongo[self.db_name][self.collection_name]
            existing_book = collection.find_one({"_id": ObjectId(book)})
            if not existing_book:
                return jsonify({"error": "Book does not exist"}), 404
            existing_book["_id"] = str(existing_book["_id"])

            return jsonify(existing_book), 200

        @self.__app.errorhandler(404)
        def notFound(error):
            """Handle the 404 error."""

            return (
                jsonify({"error": "The requested URL was not found on server."}),
            ), 404
        
    def insertBook(self, request_data):
        if not request_data or "name" not in request_data or "genre" not in request_data:
            return jsonify({"error": "Missing required fields in request data"}), 400

        name = request_data["name"]

        collection = self.__mongo[self.db_name][self.collection_name]

        new_book = {
            "name": name,
            "author": request_data["author"],
            "genre": request_data["genre"],
            "publishing": request_data.get("publishing"),
            "release_year": request_data.get("release_year"),
            "uploaded_by": request_data.get("uploaded_by"),
            "num_pages": request_data.get("num_pages"),
            "link": request_data.get("link"),
            "upload_date": request_data.get("upload_date"),
            "status": request_data.get("status"),
            "description": request_data.get("description"),
            "shelf": request_data.get("shelf"),
            "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S") 
        }
        collection.insert_one(new_book)
        
        return jsonify({"message": f"Book {name} added successfully!"}), 201

if __name__ == "__main__":
    pass