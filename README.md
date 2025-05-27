# 🚀 React + MySQL Project

Welcome to a full-stack adventure! This project combines a modern React frontend with a robust MySQL database backend. 🌐💾

## ✨ Features

- ⚛️ Modern React frontend
- 🔗 RESTful API integration
- 🗄️ MySQL database for persistent storage

## 🏁 Getting Started

### ✅ Prerequisites

- 🟢 Node.js & npm
- 🐬 MySQL server

### 📦 Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Harmandeep01/authApp.git
    cd authApp
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Configure your MySQL database connection in the backend.**

### ▶️ Running the App

- **Start the backend server:**
  ```bash
  npm start
  ```
- **Start the React frontend:**
  ```bash
  npm run dev
  ```
### API Routes💾
```
1. GET (All users) : http://localhost:3000/getUsers


2. POST (INSERT) :  http://localhost:3000/addUser

    body (json data) 
    {
      {
        "name" : "Harry",
        "email" : "Harry@xyz.com",
        "password" : "Harry@123"
      }
    }


3. POST (LOGIN): http://localhost:3000/login
  example body : 
      {
        "email" : "Harry@xyz.com",
        "password" : "Harry@123"
      }


4. GET (Protected Route): http://localhost:3000/protected


5. POST (REFRESH TOKEN): http://localhost:3000/token
```

## 📁 Folder Structure

- `/frontend` – ⚛️ React frontend
- `/backend` – 🛠️ Backend API

## 📝 License

This project is licensed under the  [MIT License](LICENSE.txt).