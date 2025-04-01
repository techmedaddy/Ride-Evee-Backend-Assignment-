# 🚗 Ride Evee Backend Assignment

A backend system for managing users in an electric vehicle ecosystem. It supports JWT and OTP-based authentication, and allows full CRUD operations on user data. Built with Node.js, Express.js, and MongoDB, fully containerized using Docker Compose.

---






## 🔧 Features

- ✅ User Signup & Login with JWT
- ✅ Email-based OTP Signup/Signin
- ✅ Secure CRUD APIs for User Resource
- ✅ Input validation and error handling
- ✅ Protected routes via middleware
- ✅ Modular and scalable architecture
- ✅ Dockerized with `docker-compose.yml` (no Dockerfile used)

  ## 🛠️🖥️ System Design 

![WhatsApp Image 2025-04-01 at 13 54 21_2144f056](https://github.com/user-attachments/assets/95fee03e-7b3e-451e-9784-e689512bbbc8)





---

## 📁 Project Structure
```bash


ride-evee-backend/
│
├── docker-compose.yml
├── .env                         # Environment variables (JWT_SECRET, DB_URI, EMAIL creds, etc.)
├── package.json
├── server.js                    # Entry point
│
├── config/
│   └── db.js                    # MongoDB connection setup
│
├── controllers/
│   ├── authController.js        # Signup, Login, OTP Send/Verify
│   └── userController.js        # CRUD operations
│
├── models/
│   └── User.js                  # User schema
│   └── OTP.js                   # OTP schema (with expiry)
│
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
│
├── middleware/
│   └── authMiddleware.js        # JWT verification
│   └── errorHandler.js          # Centralized error handler
│
└── utils/
    └── sendEmail.js            # Nodemailer logic
```

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/ride-evee-backend.git
cd ride-evee-backend
```
### 2. Create `.env` file

```env
PORT=4832
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://mongo:27117/rideevee
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
OTP_EXPIRY_MINUTES=10
```
### 3. Start the application

```bash
docker-compose up
```

## 📮 API Endpoints

### 🔐 Auth

- `POST /auth/signup` – Register user with JWT
- `POST /auth/login` – Login user with JWT
- `POST /auth/otp/send` – Send OTP to email
- `POST /auth/otp/verify` – Verify OTP for login/signup

### 👤 Users

- `GET /users` – Get all users
- `GET /users/:id` – Get user by ID
- `POST /users` – Create a user
- `PUT /users/:id` – Update user (Protected)
- `DELETE /users/:id` – Delete user (Protected)


## 📦 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** JWT, OTP via Email (Nodemailer)
- **Containerization:** Docker + Docker Compose


Frontend repo- https://github.com/techmedaddy/ride-evee-frontend
Frontend deployment - https://techmedaddy.github.io/ride-evee-frontend/
