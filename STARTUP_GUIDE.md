# 啟動指南 (Startup Guide)

本指南將教你如何啟動 MongoDB 資料庫、後端 Server 以及前端 Client。
由於你的系統目前尚未安裝 MongoDB，但有安裝 Docker，我們強烈建議使用 **方法一：Docker 快速啟動**。

---

## 方法一：使用 Docker 快速啟動 (推薦)

如果不想要把時間花在安裝 MongoDB 上，請使用此方法。這會幫你自動建立資料庫、後端與前端環境。

### 步驟

1.  開啟終端機 (Terminal) 或 PowerShell。
2.  進入 `docker` 資料夾：
    ```bash
    cd docker
    ```
3.  執行啟動指令：
    ```bash
    docker-compose up --build
    ```
    *   這會自動下載 MongoDB、安裝 Node.js 套件並啟動網頁。
    *   第一次執行可能需要幾分鐘。

### 驗證
*   **網頁前端**: 打開瀏覽器輸入 [http://localhost:5173](http://localhost:5173)
*   **後端 API**: 打開瀏覽器輸入 [http://localhost:5000](http://localhost:5000)
*   **MongoDB**: 已經在背景執行中。

### 停止服務
*   在終端機按下 `Ctrl + C`。
*   或者執行 `docker-compose down`。

---

## 方法二：手動安裝與啟動 (進階)

如果你希望手動安裝所有東西，請依照以下步驟。

### 1. 安裝 MongoDB
*   前往 [MongoDB 官網](https://www.mongodb.com/try/download/community) 下載並安裝 **MongoDB Community Server**。
*   安裝時建議勾選 "Install MongoDB as a Service"。
*   安裝完成後，確認 MongoDB 正在執行 (預設 Port 為 27017)。

### 2. 啟動後端 Server (需開啟一個終端機視窗)
1.  進入 `server` 資料夾：
    ```bash
    cd server
    ```
2.  安裝套件 (如果還沒安裝)：
    ```bash
    npm install
    ```
3.  啟動伺服器：
    ```bash
    npm run dev
    ```
    *   你應該會看到 `Connected to MongoDB` 和 `Server is running on port 3000`。

### 3. 啟動前端 Client (需開啟另一個新的終端機視窗)
1.  進入 `client` 資料夾：
    ```bash
    cd client
    ```
2.  安裝套件 (如果還沒安裝)：
    ```bash
    npm install
    ```
3.  啟動網頁：
    ```bash
    npm run dev
    ```
    *   按住 `Ctrl` 並點擊終端機中的網址 (通常是 http://localhost:5173) 來開啟網頁。

---

## 常見問題 (FAQ)

**Q: 為什麼使用 Docker?**
A: 因為 Docker 不需要在你的電腦上安裝 MongoDB，就可以直接使用它，保持電腦環境乾淨。

**Q: 我修改程式碼後需要重啟嗎?**
A:
*   **手動模式**: 通常不需要，因為我們使用了 `nodemon` (後端) 和 `Vite` (前端)，存檔後會自動更新。
*   **Docker 模式**: 我們也設定了 Volume 對應，所以修改程式碼後，Docker 內的服務也會自動更新 (除了安裝新套件需要重建之外)。
