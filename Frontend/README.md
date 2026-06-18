# Frontend - React/Vite Client

Modern React 18 client application for Sweet Shop e-commerce platform.

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Environment Setup
```bash
cp .env.example .env
# Edit .env with your API configuration
```

### Running the Application
```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── components/              # React components
│   ├── common/             # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   └── pages/              # Page-level components
│       ├── Home.jsx
│       ├── Products.jsx
│       └── ...
├── pages/                  # Alternative page structure
│   ├── Cart.jsx
│   ├── Login.jsx
│   └── ...
├── services/               # API service layer
│   └── api.js             # Axios API client
├── store/                  # State management (Zustand)
│   └── store.js
├── hooks/                  # Custom React hooks
│   ├── useAuth.js
│   ├── useCart.js
│   └── ...
├── utils/                  # Utility functions
│   ├── formatters.js
│   ├── validators.js
│   └── ...
├── constants/              # App constants
│   ├── api.js             # API endpoints
│   └── ...
├── styles/                 # Global styles
│   └── variables.css      # CSS variables
├── App.jsx                # Main component
├── main.jsx               # Entry point
└── index.css              # Global styles
```

## 🎨 Styling

- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation
- **CSS Variables** - Theme customization

### Tailwind Configuration
- See `tailwind.config.js` for custom theme
- Custom colors, fonts, and components defined

## 🗄️ State Management

Using **Zustand** for global state:

```javascript
import { useStore } from './store/store';

function MyComponent() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  // ...
}
```

## 🔌 API Integration

### Service Layer (`services/api.js`)
```javascript
import { apiClient } from './services/api';

// Get products
const products = await apiClient.get('/products');

// Create order
const order = await apiClient.post('/orders', orderData);
```

## 🎣 Custom Hooks

Create custom hooks in `src/hooks/`:
- `useAuth()` - Authentication state
- `useCart()` - Shopping cart state
- `useFetch()` - Data fetching

## 🛣️ Routing

React Router v6 for client-side routing:
```javascript
import { Routes, Route, Link } from 'react-router-dom';
```

## ✨ Features

- ✅ User Authentication
- ✅ Product Browsing
- ✅ Shopping Cart
- ✅ Order Checkout
- ✅ User Profile
- ✅ Admin Dashboard
- ✅ Responsive Design
- ✅ Smooth Animations (Framer Motion)

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **zustand** - State management
- **tailwindcss** - CSS framework
- **framer-motion** - Animations
- **vite** - Build tool

## 🧪 Testing

```bash
npm test
```

## 📱 Responsive Design

Mobile-first approach with Tailwind CSS breakpoints:
- `sm:` - Small screens (640px)
- `md:` - Medium screens (768px)
- `lg:` - Large screens (1024px)
- `xl:` - Extra large screens (1280px)

## 🌙 Dark Mode (Optional)

Theme switching support via Zustand:
```javascript
const theme = useStore((state) => state.theme);
const toggleTheme = useStore((state) => state.toggleTheme);
```

## 🚀 Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Lazy loading routes
- Efficient re-renders with React hooks

## 🔐 Environment Variables

Create `.env` file:
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Sweet Shop
VITE_DEBUG=false
```

---

**Version**: 0.1.0
**Last Updated**: 2026-06-18
