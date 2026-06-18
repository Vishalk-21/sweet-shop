@echo off
REM Setup Script for Sweet Shop Project (Windows)
REM This script automates the initial setup for development

echo.
echo 🚀 Setting up Sweet Shop Project...
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do echo ✅ Node.js version: %%i
echo.

REM Install root dependencies
echo 📦 Installing root dependencies...
call npm install

echo.
echo 📦 Installing Backend dependencies...
cd Backend
call npm install
cd ..

echo.
echo 📦 Installing Frontend dependencies...
cd Frontend
call npm install
cd ..

echo.
echo ✅ Dependencies installed!
echo.

REM Setup environment files
if not exist .env (
    echo 📝 Creating .env file from template...
    copy .env.example .env
)

if not exist Backend\.env (
    echo 📝 Creating Backend\.env file from template...
    copy Backend\.env.example Backend\.env
)

if not exist Frontend\.env (
    echo 📝 Creating Frontend\.env file from template...
    copy Frontend\.env.example Frontend\.env
)

echo.
echo ✅ Setup complete!
echo.
echo 🎯 Next steps:
echo.
echo 1. Update environment files:
echo    - Edit .env with your configuration
echo    - Edit Backend\.env with MongoDB URI and JWT secret
echo    - Edit Frontend\.env with API endpoint
echo.
echo 2. Start development servers:
echo    npm run dev          # Both backend and frontend
echo    npm run server:dev   # Backend only
echo    npm run client       # Frontend only
echo.
echo 3. Open in browser:
echo    http://localhost:5173 (Frontend)
echo    http://localhost:3000 (API)
echo.
echo Happy coding! 🎉
echo.
