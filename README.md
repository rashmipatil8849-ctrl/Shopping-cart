🛒 Shopping Cart Application (MERN Stack)

A full-stack Shopping Cart application built using MongoDB, Express.js, React.js, and Node.js.
This project implements user authentication, cart management, and order processing with a clean UI and secure backend APIs.

🚀 Features
✅ User Management

User Signup (POST /api/users)

User Login (POST /api/users/login)

JWT-based authentication

Single device login (only one active token per user)

Secure logout

✅ Item Management

Create items with name, price, image

List all available items

Items displayed with images (Amazon-style UI)

🛒 Shopping Cart Application (MERN Stack)

A full-stack Shopping Cart application built using MongoDB, Express.js, React.js, and Node.js.
This project implements user authentication, cart management, and order processing with a clean UI and secure backend APIs.

🚀 Features
✅ User Management

User Signup (POST /api/users)

User Login (POST /api/users/login)

JWT-based authentication

Single device login (only one active token per user)

Secure logout

✅ Item Management

Create items with name, price, image

List all available items

Items displayed with images (Amazon-style UI)

✅ Cart Management

Each user has only one cart

Add items to cart

Update item quantity

Remove items from cart

Cart linked to logged-in user

Cart item images displayed properly

✅ Order Management

Convert cart to order (POST /api/orders)

View order history

Cart clears after checkout

✅ Frontend UI

React + Tailwind CSS

Responsive Navbar

Cart badge count

Toast notifications

Clean Amazon-style item cards

✅ Cart Management

Each user has only one cart

Add items to cart

Update item quantity

Remove items from cart

Cart linked to logged-in user

Cart item images displayed properly

✅ Order Management

Convert cart to order (POST /api/orders)

View order history

Cart clears after checkout

✅ Frontend UI

React + Tailwind CSS

Responsive Navbar

Cart badge count

Toast notifications

Clean Amazon-style item cards

🧠 Tech Stack

Frontend

React

Tailwind CSS

Axios

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

📁 Project Structure
shopping-cart-app/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── itemRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ItemList.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── OrderHistory.jsx
│   │   │   └── Toast.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── vite.config.js
│
└── README.md

🔑 Environment Variables

Create a .env file inside backend/:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

▶️ How to Run the Project
1️⃣ Backend Setup

cd backend
npm install
npm run dev

Server will run at:
http://localhost:5000

2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔗 API Endpoints
User APIs

Method	      Endpoint	         Description
POST	    /api/users	           Signup
POST	    /api/users/login	   Login
GET	        /api/users	           List users

Item APIs
Method	     Endpoint	    Description
POST	    /api/items	    Create item
GET	        /api/items	    List items

Cart APIs
Method	    Endpoint	        Description
POST	    /api/carts	        Add item to cart
GET	        /api/carts	          Get cart
PUT	        /api/carts	        Update quantity
DELETE	    /api/carts/:itemId	  Remove item

Order APIs
Method	    Endpoint	       Description
POST	    /api/orders	        Place order
GET	        /api/orders	        Order history

✅ Assignment Requirements Checklist

✔ User signup & login
✔ Single active session per user
✔ One cart per user
✔ Items added to cart
✔ Cart converted to order
✔ Listing APIs for Users, Items, Carts, Orders
✔ No inventory tracking (as required)

🧪 Testing

APIs tested using Postman

MongoDB Atlas used for database

Frontend tested on desktop & mobile

📌 Future Improvements

Payment gateway integration

Inventory management

Admin dashboard

Order status tracking


## Live Demo

https://shopping-cart-2026.netlify.app/

Frontend (Netlify / Vercel)
   ↓ HTTPS
Backend API (Render)
   ↓
MongoDB Atlas

👩‍💻 Author

Rashmi Patil

⭐ Final Note

This project follows clean architecture, secure authentication, and fulfills all functional requirements.
Ready for submission / interview demo / portfolio use 🚀
