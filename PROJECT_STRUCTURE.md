/**
 * PROJECT STRUCTURE GUIDE
 * Complete guide for the production-ready structure
 */

# Production Structure Overview

## Root Level (`/`)
```
├── Backend/                 # Node.js/Express API
├── Frontend/                # React/Vite Client
├── .env.example            # Environment template
├── .gitignore             # Git ignore rules
├── .prettierrc.js          # Code formatting config
├── docker-compose.yml      # Docker services
├── Dockerfile              # Backend Docker image
├── Frontend.Dockerfile     # Frontend Docker image
├── package.json            # Root scripts
├── README.md               # Main documentation
└── CONTRIBUTING.md         # Contribution guidelines
```

## Backend Structure (`Backend/`)
```
Backend/
├── src/
│   ├── api/v1/            # API v1 (versioned)
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # Route definitions
│   │   ├── services/      # Business logic (BaseService pattern)
│   │   └── validators/    # Input validation
│   ├── config/            # Configuration (dev, prod)
│   ├── db/                # Database connection
│   ├── middleware/        # Express middleware
│   │   ├── auth.middleware.js
│   │   ├── errorHandler.middleware.js
│   │   ├── imagekit.middleware.js
│   │   └── rateLimiter.middleware.js
│   ├── models/            # Mongoose schemas
│   ├── utils/             # Utilities
│   │   ├── logger.js      # Centralized logging
│   │   ├── response.js    # API response helpers
│   │   └── validators.js  # Common validators
│   ├── exceptions/        # Custom errors
│   └── app.js             # Express setup
├── tests/                 # Test files
├── logs/                  # Application logs
├── .env.example          # Backend env template
├── .eslintrc.js          # ESLint config
├── jest.config.js        # Jest config
├── package.json          # Backend dependencies
└── README.md             # Backend docs
```

## Frontend Structure (`Frontend/`)
```
Frontend/
├── public/                # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── common/       # Reusable UI components
│   │   └── pages/        # Page components
│   ├── pages/            # Alternative page structure
│   ├── services/         # API service layer
│   ├── store/            # Zustand state management
│   ├── hooks/            # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useCart.js
│   │   └── useFetch.js
│   ├── utils/            # Utility functions
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── constants/        # Constants
│   │   └── api.js
│   ├── styles/           # Global styles
│   │   └── variables.css # CSS variables
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example         # Frontend env template
├── .eslintrc.js        # ESLint config
├── vite.config.js      # Vite config
├── tailwind.config.js  # Tailwind config
├── postcss.config.js   # PostCSS config
├── package.json        # Frontend dependencies
└── README.md           # Frontend docs
```

## Key Patterns

### 1. Service Layer Pattern
- All business logic in `services/`
- Controllers call services
- Services call models
- BaseService for common operations

### 2. Middleware Stack
- Auth verification
- Error handling
- Rate limiting
- CORS handling

### 3. API Versioning
- All endpoints under `/api/v1`
- Easy to add `/api/v2` in future
- Controllers in `api/v1/controllers`

### 4. Error Handling
- Custom `AppError` class
- Centralized error middleware
- Consistent error responses

### 5. Configuration Management
- Environment-specific configs (dev/prod)
- `.env.example` as template
- Config loaded from `src/config/index.js`

### 6. State Management (Frontend)
- Zustand for global state
- Custom hooks for features
- Centralized store

## Running the Application

### Development
```bash
npm run dev          # Both backend and frontend
npm run server:dev   # Backend only
npm run client       # Frontend only
```

### Production
```bash
npm start           # Backend
npm run build       # Frontend build
docker-compose up   # Full stack with Docker
```

## Best Practices

1. **API Routes**: All under `/api/v1/*`
2. **Error Handling**: Use AppError class
3. **Logging**: Use logger utility
4. **Validation**: Use dedicated validators
5. **Services**: Encapsulate business logic
6. **State**: Use Zustand stores
7. **Hooks**: Create custom hooks for features
8. **Components**: Keep components small and focused
9. **Environment**: Use .env for configuration
10. **Testing**: Add tests in `tests/` directory

## Docker Deployment

```bash
# Build and run
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs backend
docker-compose logs frontend
```

## Documentation

- Main README: Project overview
- Backend README: API setup and structure
- Frontend README: Client setup and structure
- CONTRIBUTING.md: Contribution guidelines

---

This structure is scalable and follows industry best practices for full-stack applications.
