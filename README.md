# User Management System

A modern, responsive React component for displaying and managing user profiles with search functionality and detailed user views.

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Axios for API calls
- CSS3 with modern design
- Inter font family

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv for environment variables
- CORS enabled

---

## 📁 Project Structure


User-Management/
│
├── backend/
│ ├── config/
│ │ └── db.js # Database configuration
│ ├── controllers/
│ │ └── userController.js # User CRUD operations
│ ├── models/
│ │ └── usersModel.js # User schema model
│ ├── routes/
│ │ └── userRoute.js # API routes
│ ├── .env # Environment variables
│ ├── server.js # Express server entry
│ └── package.json # Backend dependencies
│
├── frontend/
│ ├── src/
│ │ ├── api/
│ │ │ ├── index.js # API configuration
│ │ │ └── user.js # User API calls
│ │ ├── components/
│ │ │ └── GetUsers/
│ │ │ ├── GetUsers.jsx # Main component
│ │ │ ├── GetUsers.css # Component styles
│ │ │ └── index.js # Component export
│ │ ├── utils/
│ │ │ ├── index.js # Utility exports
│ │ │ └── getUsers.js # Helper functions
│ │ ├── styles/
│ │ │ └── index.css # Global styles
│ │ ├── App.jsx # Main App component
│ │ ├── App.css # App styles
│ │ └── main.jsx # React entry point
│ ├── index.html # HTML template
│ ├── vite.config.js # Vite configuration
│ └── package.json # Frontend dependencies
│
└── README.md # Project documentation

---

## 🔧 Installation & Setup

### 1. Clone the Repository


git clone https://github.com/luoijin/Elective2.git
cd User-Management

2. Backend Setup

cd backend
npm install

Create a .env file in the backend folder with the following:

text
PORT=5000
MONGO_URL=mongodb://localhost:27017/mern_setup

3. Start MongoDB
Make sure MongoDB is running on your machine:

Windows: Check services.msc for "MongoDB Server" and ensure it's running

Or run mongod in a terminal

4. Import Sample Data (Optional but Recommended)
Open MongoDB Compass

Connect to mongodb://localhost:27017/

Create a database named mern_setup

Create a collection named users

Insert the following sample data:

[
  {
    "firstName": "Anne Loraine",
    "lastName": "Pardillo",
    "userName": "loraine",
    "email": "loraine@gmail.com",
    "password": "qweqwe",
    "isAdmin": true
  },
  {
    "firstName": "Shyna",
    "lastName": "Labay",
    "userName": "shy",
    "email": "shy@gmail.com",
    "password": "asdasd"
  },
  {
    "firstName": "Laica",
    "lastName": "Cabatana",
    "userName": "lai",
    "email": "lai@gmail.com",
    "password": "asdasd"
  }
]

5. Start the Backend Server
npm start

6. Frontend Setup (Open a new terminal)
cd frontend
npm install
npm run dev
