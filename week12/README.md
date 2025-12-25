# Week11

## 事前環境
- Node.js（包含 npm）
- Docker / Docker Desktop
- VS Code Extension：REST Client
- Postman
- mongosh（MongoDB Shell） MongoDB Compass

##  啟動 MongoDB Container

在 week11/docker 底下執行：docker compose up -d

確認 MongoDB 有啟動：docker ps

看到 container 名稱類似 week11-mongo 即代表 MongoDB 已經在本機的 27017 port 上運作。

##  docker-compose.ym
version: '3.9'
services:
  mongodb:
    image: mongo:7
    container_name: week11-mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: week11-user
      MONGO_INITDB_ROOT_PASSWORD: week11-pass
      MONGO_INITDB_DATABASE: week11
    volumes:
      - ./mongo-data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/init.js:ro
## .env
PORT=3001
MONGODB_URI=mongodb://week11-user:week11-pass@localhost:27017/week11?authSource=week11
ALLOWED_ORIGIN=http://127.0.0.1:5500
說明：PORT後端 API 伺服器啟動的 port，預設 3001，對應 http://localhost:3001。

使用者：week11-user

密碼：week11-pass

主機：localhost

Port：27017

資料庫：week11

## 啟動後端伺服器
在 week11/server 資料夾執行：
安裝:npm install
開發模式啟動:npm run dev
Server running on http://localhost:3001
代表後端已成功啟動並連上 MongoDB。

## 測試方式
VS Code REST Client
Postman
### 1. 建立報名（第一次，成功）
POST http://localhost:3001/api/signup

Content-Type: application/json

{
  "name": "小明",
  
  "email": "duplicate@example.com",
  
  "phone": "0911111111"
  
}

### 2. 使用相同 email 再報名一次（應觸發重複 email 錯誤）
POST http://localhost:3001/api/signup

Content-Type: application/json

{
  "name": "小明第二次",
  
  "email": "duplicate@example.com",
  
  "phone": "0922222222"
  
}

### 3. 取得清單（GET /api/signup）

GET http://localhost:3001/api/signup

### 4. 更新 phone

將 {id} 替換成實際收到的 _id，例如 6930b52b29f9b8de6e4b1ab1

PATCH http://localhost:3001/api/signup/{id}

Content-Type: application/json

{
  "phone": "0913000333"
}

### 5. 刪除報名（DELETE /api/signup/:id）

DELETE http://localhost:3001/api/signup/{id}


## Postman 測試流程

### 建立

Create Signup（POST）

URL：http://localhost:3001/api/signup

Body → raw → JSON：

{
  "name": "小明",
  
  "email": "duplicate@example.com",
  
  "phone": "0911111111"
}

送出後會取得 _id。

### 取得清單

Method: GET

URL:http://localhost:3001/api/signup

### 更新電話

Method: PATCH

URL:http://localhost:3001/api/signup/{{id}}

{

  "phone": "0913000333"
  
}

### 刪除

Method: DELETE

URL：http://localhost:3001/api/signup/{{id}}

## 常見問題

### 無法辨識重複email

原因： 還沒成功建立 unique index。

解法：

db.participants.createIndex({ email: 1 }, { unique: true })

### Node.js / NPM 問題
npm run dev 顯示 Missing script: "dev"

原因： package.json 的 "scripts" 重複寫了兩段，後來的把前面的覆蓋掉。

解法：
"scripts": {

  "dev": "nodemon app.js",
  
  "start": "node app.js"
  
}

### PATCH / DELETE 的 id 錯誤
BSONError: input must be a 24 character hex string

使用錯誤的 ID，例如：

少貼一半

多複製空白

或用錯位置

解法：
確認從成功的 POST 回傳 _id，
完整貼入 URL：

PATCH /api/signup/6930b52b29f9b8de6e4b1ab1

