# API Specification

## Base URL
`http://localhost:5000/api`

## Resources

### Books

#### 1. Get All Books
- **URL**: `/books`
- **Method**: `GET`
- **Description**: Retrieves a list of all books, sorted by creation date (newest first).
- **Response**: `200 OK`
    ```json
    [
        {
            "_id": "63f...",
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "price": 10.99,
            "category": "Fiction",
            "createdAt": "2023-01-01T00:00:00.000Z"
        }
    ]
    ```

#### 2. Get Single Book
- **URL**: `/books/:id`
- **Method**: `GET`
- **Description**: Retrieves details of a specific book by ID.
- **Response**: `200 OK`
    ```json
    {
        "_id": "63f...",
        "title": "The Great Gatsby",
        ...
    }
    ```
- **Error**: `404 Not Found` if ID does not exist.

#### 3. Create Book
- **URL**: `/books`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "title": "New Book",
        "author": "Author Name",
        "isbn": "1234567890",
        "price": 29.99,
        "category": "Technology",
        "description": "Optional description"
    }
    ```
- **Response**: `201 Created`

#### 4. Update Book
- **URL**: `/books/:id`
- **Method**: `PUT`
- **Body**: (Partial updates allowed)
    ```json
    {
        "price": 19.99
    }
    ```
- **Response**: `200 OK` (Returns updated document)

#### 5. Delete Book
- **URL**: `/books/:id`
- **Method**: `DELETE`
- **Response**: `200 OK`
    ```json
    {
        "message": "Book deleted"
    }
    ```
