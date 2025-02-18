# Mess Menu

## 📌 Project Overview

The **Mess Menu Management System** is a web application designed to streamline the process of managing and displaying daily meal menus for a mess or cafeteria. The system includes two interfaces:

1. **Mess Management Dashboard** – Allows mess admins to manage and edit the menu
2. **Public Menu Page** – Displays the menu (breakfast, lunch, snacks, dinner) for everyone

## 🚀 Features

- **Intelligent Menu Display**: Automatically shows relevant meal type based on time of day
- **Dynamic Menu Management**: Edit menu items for breakfast, lunch, snacks, and dinner
- **Special Snacks Menu**: Categorized snacks with items and prices
- **Protected Admin Access**: Secure JWT-based authentication for mess management
- **Clean UI**: Elegant interface with Cormorant Garamond and Kaisei Decol fonts
- **Responsive Design**: Optimized for all screen sizes
- **Real-time Updates**: Instant menu updates with automated cache management

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **State Management**: React Hooks
- **Authentication**: JWT
- **Caching**: Client-side caching for optimized performance

## 📂 Project Structure

```
📁 mess-menu
├── 📂 client
│   ├── 📂 src
│   │   ├── 📂 components
│   │   │   ├── DateSelector.jsx
│   │   │   ├── Line.jsx
│   │   │   ├── MenuItems.jsx
│   │   │   ├── MenuTypeSelector.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── RegularMenu.jsx
│   │   │   └── SnacksMenu.jsx
│   │   ├── 📂 pages
│   │   │   ├── MenuPage.jsx
│   │   │   ├── MessDashboard.jsx
│   │   │   └── MessLogin.jsx
│   │   ├── 📂 services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
├── 📂 server
│   ├── 📂 controllers
│   │   ├── authController.js
│   │   └── menuController.js
│   ├── 📂 middleware
│   │   └── authMiddleware.js
│   ├── 📂 models
│   │   ├── menuModel.js
│   │   └── User.js
│   ├── 📂 routes
│   │   ├── authRoutes.js
│   │   └── menuRoutes.js
│   ├── 📂 utils
│   │   └── cache.js
│   ├── app.js
│   └── db.js
```

## 🔗 API Endpoints

### Auth Routes

| Method | Endpoint           | Description  |
| ------ | ------------------ | ------------ |
| POST   | `/api/auth/login`  | Admin login  |
| POST   | `/api/auth/logout` | Admin logout |

### Menu Routes

| Method | Endpoint          | Description             |
| ------ | ----------------- | ----------------------- |
| GET    | `/api/menu/all`   | Get all menus           |
| GET    | `/api/menu/:type` | Get specific menu type  |
| PUT    | `/api/menu/:type` | Update menu (Protected) |

## 🏗️ Local Development

1. Clone and navigate:

```bash
git clone https://github.com/AbhishekPal634/mess-menu.git
cd mess-menu
```

2. Install dependencies:

```bash
# Backend setup
cd server
npm install
npm start

# Frontend setup (new terminal)
cd client
npm install
npm run dev
```

3. Environment setup:

- Create `server/.env` with MongoDB URL and JWT secret
- Create `client/.env` with `VITE_API_URL`
