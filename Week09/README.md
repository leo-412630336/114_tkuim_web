##  環境需求
- Node.js 
- npm（內建於 Node.js）
- VS Code（建議安裝 Live Server、REST Client 外掛）
- Postman
## 啟動步驟
cd Week09/server→
npm install→
npm start
## 如何啟動前端
 Week09/client →右鍵 → Open with Live Server

## 測試指令
# 1.POSTMAN
POST:http://localhost:3001/api/signup
```Body → raw → JSON:
{
  "name": "小明",
  "email": "test@example.com",
  "phone": "0912345678",
  "password": "abcd1234",
  "confirmPassword": "abcd1234",
  "interests": ["運動", "閱讀"]
}
```
按 Send
# 2.VS Code REST Client
```
POST http://localhost:3001/api/signup
Content-Type: application/json

{
  "name": "小明",
  "email": "test@example.com",
  "phone": "0912345678",
  "password": "abcd1234",
  "confirmPassword": "abcd1234",
  "interests": ["運動"]
}
```

###
GET http://localhost:3001/api/signup
# 3.curl
```
curl -X POST http://localhost:3001/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "curl tester",
    "email": "curl@test.com",
    "phone": "0912345678",
    "password": "abcd1234",
    "confirmPassword": "abcd1234",
    "interests": ["美食"]
  }'
```

