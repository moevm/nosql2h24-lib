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

from flask import jsonify, request

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
            print(self.__mongo.list_database_names()) 
            return jsonify({"message": "get books!"}), 200
        
        @self.__app.route("/books", methods=["POST"])
        def insert_book():
            return self.insertBook(request.get_json())
        
        def insertBook(self, request_data):
            if not request_data or "name" not in request_data or "author" not in request_data or "genre" not in request_data:
                return jsonify({"error": "Missing name in request data"}), 400

            name = request_data["name"]

            collection = self.__mongo[self.db_name][self.collection_name]

            new_book = {
                "name": name,
                "author": request_data["author"],
                "genre": request_data["genre"]
            }
            collection.insert_one(new_book)
        
            return jsonify({"message": f"Book {name} added successfully!"}), 201
        
        @self.__app.errorhandler(404)
        def notFound(error):
            """Handle the 404 error."""

            return (
                jsonify({"error": "The requested URL was not found on server."}),
            ), 404


if __name__ == "__main__":
    pass