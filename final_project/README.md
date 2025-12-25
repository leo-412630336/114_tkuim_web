# 圖書借閱系統 (Book Borrowing System) - Final Project

## 專案主題與目標 (Project Theme & Goals)

本專案是一個基於 Web 的**圖書借閱系統**，旨在為學校或小型組織提供一個簡單、高效的圖書管理與借閱平台。

### 核心目標
1.  **角色權限分流**：
    *   **管理員 (Admin)**：擁有完整的圖書庫存管理權限（新增、編輯、刪除圖書），並可查看所有借閱紀錄。
    *   **學生 (Student)**：可以瀏覽圖書列表，執行「借書」與「還書」操作，從而追蹤個人的閱讀狀況。
2.  **自動化借還流程**：透過系統化的狀態追蹤（可借閱/已借出），減少人工紀錄的錯誤。
3.  **現代化使用者體驗**：提供響應式 (Responsive) 的網頁介面，讓使用者在不同裝置上都能輕鬆操作。

---

## 技術選擇原因 (Technology Choices)

本專案採用 **MERN Stack** (MongoDB, Express, React, Node.js) 作為核心技術架構，選擇原因如下：

*   **MongoDB (Database)**：
    *   **靈活的 Schema**：NoSQL 文件導向資料庫非常適合儲存圖書資訊這類結構可能變動的資料。
    *   **高效能**：對於讀取密集型（Read-heavy）的應用（如瀏覽書單）表現優異。
*   **Express.js (Backend Framework)**：
    *   **輕量且彈性**：Node.js 生態系中最流行的 Web 框架，能快速建置 RESTful API。
    *   **中介軟體 (Middleware) 支援**：方便整合 CORS、身分驗證 (JWT) 與錯誤處理。
*   **React (Frontend Library)**：
    *   **元件化 (Component-Based)**：便於維護與重用 UI 元件（如書籍卡片、導覽列）。
    *   **虛擬 DOM (Virtual DOM)**：提供流暢的使用者互動體驗。
    *   **Vite**：作為建置工具，提供極快的開發伺服器啟動與熱更新 (HMR) 速度。
*   **Node.js (Runtime Environment)**：
    *   **統一語言**：前後端皆使用 JavaScript，降低開發與維護的認知轉換成本。
    *   **非阻塞 I/O**：適合處理高併發的網路請求。
*   **Docker**：
    *   **環境一致性**：確保在不同開發者機器上都能快速部署，不需要繁瑣的環境設定。

---

## 架構說明 (Architecture)

本系統採用 **前後端分離 (Client-Server Architecture)** 架構：

### 1. 前端 (Client)
*   **位置**：`/client` 目錄
*   **技術**：React 19, React Router v7, Axios, Vite
*   **功能**：負責畫面渲染與使用者互動。透過 REST API 向後端發送請求（如登入、獲取書單、借書）。
*   **路由**：使用 React Router 管理頁面跳轉 (SPA)。

### 2. 後端 (Server)
*   **位置**：`/server` 目錄
*   **技術**：Express, Mongoose, JWT, bcryptjs
*   **功能**：提供 RESTful API 介面。
    *   **Auth API**：處理註冊與登入，發放 JWT Token。
    *   **Books API**：處理書籍的 CRUD 以及借還邏輯。
*   **資料庫連線**：使用 Mongoose ODM 與 MongoDB 溝通。

### 3. 資料庫 (Database)
*   **技術**：MongoDB
*   **功能**：儲存使用者資料 (Users) 與書籍資料 (Books)。

---

## 安裝與執行指引 (Installation & Execution)

我們提供兩種啟動方式，強烈建議使用 **Docker** 以獲得最順暢的體驗。

### 方法一：使用 Docker 快速啟動 (推薦)

此方法會自動建立 MongoDB、後端與前端環境。

1.  開啟終端機，進入 `docker` 目錄：
    ```bash
    cd docker
    ```
2.  執行啟動指令：
    ```bash
    docker-compose up --build
    ```
3.  等待啟動完成後，開啟瀏覽器：
    *   **前端網頁**：[http://localhost:5173](http://localhost:5173)
    *   **後端 API**：[http://localhost:5000](http://localhost:5000)



**1. 啟動後端**
```bash
cd server
npm install
npm run dev
```

**2. 啟動前端**
（開啟新的終端機視窗）
```bash
cd client
npm install
npm run dev
```

