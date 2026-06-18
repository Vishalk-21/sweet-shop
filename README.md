# Sweet Shop - Full Stack E-commerce Platform

A modern, production-ready e-commerce platform for sweet products built with React, Express.js, and MongoDB.

## 📋 Project Structure

```
sweet-shop/
├── Backend/           # Node.js/Express API
├── Frontend/          # React/Vite Client
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore rules
├── package.json       # Root package configuration
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sweet-shop
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd Backend && npm install

# Install frontend dependencies
cd ../Frontend && npm install
```

3. **Setup Environment Variables**
```bash
# Copy example files
cp .env.example .env
cp Backend/.env.example Backend/.env
cp Frontend/.env.example Frontend/.env
```

4. **Start the application**
```bash
# From root directory - Backend (Terminal 1)
npm run server

# Frontend (Terminal 2)
npm run client

# Or run both together
npm run dev
```

## 📁 Directory Structure

### Backend (`/Backend`)
```
src/
├── api/v1/            # API versioning
│   ├── controllers/   # Request handlers
│   ├── routes/        # API endpoints
│   ├── services/      # Business logic
│   └── validators/    # Input validation
├── config/            # Configuration files
├── db/                # Database connection
├── middleware/        # Express middleware
├── models/            # Database schemas
├── utils/             # Utility functions
├── exceptions/        # Custom error classes
├── constants/         # App constants
└── app.js             # Express app setup
```

### Frontend (`/Frontend`)
```
src/
├── components/        # React components
│   ├── common/        # Reusable components
│   └── pages/         # Page components
├── pages/             # Page-level components
├── services/          # API services
├── store/             # State management (Zustand)
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── constants/         # App constants
├── styles/            # Global styles
├── App.jsx
└── main.jsx
```

## 🔑 Key Features

- ✅ User Authentication (JWT)
- ✅ Product Management
- ✅ Shopping Cart
- ✅ Order Management
- ✅ Image Upload with ImageKit
- ✅ Responsive Design (Tailwind CSS)
- ✅ State Management (Zustand)

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Image Management**: ImageKit

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Router**: React Router v6
- **Animations**: Framer Motion

## 📦 Scripts

### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon
npm run seed       # Seed database
npm test          # Run tests
```

### Frontend
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run linter
```

## 🔐 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/sweet-shop
JWT_SECRET=your-secret-key
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Sweet Shop
```

## 📖 API Documentation

Base URL: `http://localhost:3000/api/v1`

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product details
- `POST /products` - Create product (Admin)
- `PUT /products/:id` - Update product (Admin)
- `DELETE /products/:id` - Delete product (Admin)

### Orders
- `GET /orders` - Get user orders
- `POST /orders` - Create order
- `GET /orders/:id` - Get order details
- `PUT /orders/:id` - Update order status (Admin)

## 🧪 Testing

```bash
# Backend tests
cd Backend && npm test

# Frontend tests
cd Frontend && npm test
```

## 📝 Git Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Commit: `git commit -m "Add your message"`
4. Push: `git push origin feature/your-feature`
5. Create Pull Request

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💻 Support

For support, open an issue or contact the development team.

---

**Last Updated**: 2026-06-18
**Version**: 1.0.0
