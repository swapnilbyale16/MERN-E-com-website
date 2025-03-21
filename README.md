# MERN E-Commerce Application

## 📌 Project Overview

This is a full-fledged **E-Commerce Application** built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). The application includes **authentication, product management, cart functionality, order placement, email notifications, and more.**

This project demonstrates **best practices** for **backend and frontend development, API creation, database management, authentication, and user interactions**.

---

## 🚀 Features

### 🛒 User Features

✅ User Authentication (Signup/Login with Password Hashing)\
✅ Email Notification System for Order Confirmation\
✅ Browse Products\
✅ Add/Remove Items from Cart\
✅ Checkout and Place Orders\
✅ Order History Management\
✅ Responsive UI for Mobile & Desktop

### 🔧 Admin Features

✅ Add, Update, and Delete Products\
✅ View and Manage Orders\
✅ Manage User Accounts

### 📩 Additional Features

✅ REST API Development\
✅ JWT-based Authentication for Security\
✅ MongoDB Indexing for Fast Query Performance

---

## 🏗 Tech Stack

### **Frontend (React.js)**

- React.js (Hooks & Functional Components)
- Redux (State Management)
- React Router DOM (Navigation)
- Bootstrap & TailwindCSS (Styling)

### **Backend (Node.js & Express.js)**

- Node.js & Express.js (REST API)
- MongoDB & Mongoose (Database)
- JWT Authentication (Secure Login System)
- Bcrypt.js (Password Hashing)
- Nodemailer (Email Functionality)

### **Database (MongoDB)**

- NoSQL Database
- Mongoose Schema & Model
- Indexed Queries for Performance

---

## 📂 Folder Structure

```bash
MERN-Ecom/
│── backend/               # Node.js & Express API
│   ├── cont/              # Controllers
│   ├── model/             # Mongoose Models
│   ├── route/             # Express Routes
│   ├── services/          # Additional Services
│   ├── index.js           # Server Entry Point
│   ├── package.json       # Backend Dependencies
│
│── frontend/              # React.js App
│   ├── src/
│   │   ├── components/    # Reusable UI Components
│   │   ├── pages/         # Application Pages
│   │   ├── redux/         # Redux Store & Actions
│   │   ├── App.js         # Main Component
│   │   ├── index.js       # Entry Point
│   ├── package.json       # Frontend Dependencies
│
│── .gitignore             # Ignoring unnecessary files
│── README.md              # Project Documentation
```

---

## 🔥 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/swapnilbyale16/MERN-Ecom.git
cd MERN-Ecom
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install    # Install dependencies
npm start      # Start backend server
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install    # Install dependencies
npm start      # Start frontend server
```

### 4️⃣ MongoDB Configuration

- **Local MongoDB**: Ensure MongoDB is installed and running locally.
- **MongoDB Atlas**: If using a cloud database, update `MONGO_URI` in `.env`.

```env
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/ecommerce
JWT_SECRET=your-secret-key
```

---

## 🔗 API Endpoints

| Endpoint           | Method | Description                     |
| ------------------ | ------ | ------------------------------- |
| `/api/auth/signup` | POST   | Register a new user             |
| `/api/auth/login`  | POST   | User login & JWT authentication |
| `/api/products`    | GET    | Fetch all products              |
| `/api/cart`        | POST   | Add items to cart               |
| `/api/orders`      | POST   | Place an order                  |
| `/api/admin/users` | GET    | Fetch all users (Admin only)    |

---

## 📧 Email Functionality

The app uses **Nodemailer** to send email confirmations to users upon order placement.
Ensure your email credentials are configured properly in `.env`:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

---

## 🚀 Future Improvements

✅ Add Wishlist Feature\
✅ Improve UI/UX with Animations\
✅ Add Order Tracking System\
✅ Implement Admin Dashboard Analytics

---

## 💡 Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

---

## 🙌 Author

👤 **Swapnil Byale**\
📧 Contact: [swapnilbyale16@gmail.com](mailto:swapnilbyale16@gmail.com)\
🔗 GitHub: [swapnilbyale16](https://github.com/swapnilbyale16)

