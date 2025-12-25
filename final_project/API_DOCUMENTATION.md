# API 規格說明文件 (API Documentation)

本文件列出圖書借閱系統後端所有的 API 路由、HTTP 方法、請求參數與回應範例。

## 基本資訊 (Base Information)
*   **Base URL**: `http://localhost:5000`
*   **Authentication**: 大多數 API 需要 header 包含 `auth-token` (JWT Token)。

---

## 1. 使用者認證 (Authentication)
**Base Route**: `/api/user`

### 1.1 註冊 (Register)
*   **URL**: `/register`
*   **Method**: `POST`
*   **描述**: 註冊新使用者。如果系統無任何使用者，第一位註冊者將自動成為管理員 (admin)，之後註冊者皆為學生 (student)。
*   **Request Body**:
    ```json
    {
      "username": "student1",
      "password": "password123"
    }
    ```
*   **Response (201 Created)**:
    ```json
    {
      "user": {
        "id": "60d5f9...",
        "username": "student1",
        "role": "student"
      }
    }
    ```

### 1.2 登入 (Login)
*   **URL**: `/login`
*   **Method**: `POST`
*   **描述**: 使用者登入並取得 JWT Token。
*   **Request Body**:
    ```json
    {
      "username": "student1",
      "password": "password123"
    }
    ```
*   **Response (200 OK)**:
    *   **Headers**: `auth-token: <jwt_token>`
    *   **Body**:
    ```json
    {
      "token": "eyJhbGciOi...",
      "user": {
        "id": "60d5f9...",
        "username": "student1",
        "role": "student"
      }
    }
    ```

---

## 2. 圖書管理 (Books)
**Base Route**: `/api/books`
**Header Requirement**: 所有請求皆需包含 `auth-token: <jwt_token>`

### 2.1 獲取所有圖書 (Get All Books)
*   **URL**: `/`
*   **Method**: `GET`
*   **描述**: 獲取所有書籍列表 (依建立時間降冪排列)。
*   **Response (200 OK)**:
    ```json
    [
      {
        "_id": "63f1a...",
        "title": "深入淺出 Node.js",
        "author": "樸靈",
        "isbn": "978986...",
        "price": 500,
        "category": "Technology",
        "description": "一本好書",
        "createdBy": { "_id": "...", "username": "admin" },
        "borrower": null,
        "createdAt": "2023-10-01T12:00:00.000Z"
      },
      {
        "_id": "63f1b...",
        "title": "React 學習手冊",
        "borrower": { "_id": "...", "username": "student1" }
        // ...其他欄位
      }
    ]
    ```

### 2.2 獲取單一圖書 (Get Single Book)
*   **URL**: `/:id`
*   **Method**: `GET`
*   **描述**: 獲取特定 ID 的書籍詳情。
*   **Response (200 OK)**: Book Object (同上)

### 2.3 新增圖書 (Add Book) - **[Admin Only]**
*   **URL**: `/`
*   **Method**: `POST`
*   **描述**: 新增一本新書。
*   **Request Body**:
    ```json
    {
      "title": "乾淨程式碼",
      "author": "Robert C. Martin",
      "isbn": "978986...",
      "price": 600,
      "category": "Technology",
      "description": "Clean Code..."
    }
    ```
*   **Response (201 Created)**: Created Book Object

### 2.4 更新圖書 (Update Book) - **[Admin Only]**
*   **URL**: `/:id`
*   **Method**: `PUT`
*   **描述**: 更新書籍資訊。
*   **Request Body** (可選欄位):
    ```json
    {
      "price": 650,
      "description": "Updated description"
    }
    ```
*   **Response (200 OK)**: Updated Book Object

### 2.5 刪除圖書 (Delete Book) - **[Admin Only]**
*   **URL**: `/:id`
*   **Method**: `DELETE`
*   **描述**: 刪除指定書籍。
*   **Response (200 OK)**:
    ```json
    {
      "message": "Book deleted"
    }
    ```

---

## 3. 借閱系統 (Borrowing System)
**Base Route**: `/api/books`
**Header Requirement**: `auth-token: <jwt_token>`

### 3.1 借書 (Borrow Book)
*   **URL**: `/borrow/:id`
*   **Method**: `PUT`
*   **描述**: 將書籍標記為「被當前使用者借出」。若書已被借出則會失敗。
*   **Response (200 OK)**: Updated Book Object (borrower 欄位已更新)
*   **Error (400 Bad Request)**: `Book is already borrowed`

### 3.2 還書 (Return Book)
*   **URL**: `/return/:id`
*   **Method**: `PUT`
*   **描述**: 歸還書籍。只有「該書的借閱者」或「管理員」可以執行此動作。
*   **Response (200 OK)**: Updated Book Object (borrower 欄位變回 null)
*   **Error (403 Forbidden)**: `You cannot return a book you did not borrow`
