# Activity Booking API

This is a simple Activity Booking REST API built using Node.js, Express, MongoDB, and JWT Authentication.

## 🔗 Hosted API
**Base URL:** [`https://meetx-assignment-g520.onrender.com/`](https://meetx-assignment-g520.onrender.com/)

## 🔧 Features
- User registration and login with JWT
- Create and list activities
- Book an activity
- Authenticated routes with middleware

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js & npm installed
- MongoDB Atlas or local MongoDB

### 🛠️ Installation

```bash
git clone https://github.com/Mujahid087/meetX_Assignment.git
cd meetX_Assignment
npm install
````

### 📂 Environment Variables

Create a `.env` file in the root directory and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1d
```

### ▶️ Run the Server

```bash
npm run dev
```

---

## 📮 API Endpoints

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/api/auth/register` | Register a new user     |
| POST   | `/api/auth/login`    | Login and get token     |
| GET    | `/api/activities/`   | List all activities     |
| POST   | `/api/activities`    | Create a new activity   |
|GET     | `/api/activities/:id`| get a single activity   | 
| POST   | `/api/bookings`      | Book an activity (auth) |
| GET    | `/api/bookings/me`   | Get user's bookings     |

Use the Bearer token in headers for protected routes.

---

## 📬 Postman Collection

Import the provided Postman collection `MeetX_ActivityBookingAPI.postman_collection.json` to test all APIs easily.

---


