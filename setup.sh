#!/bin/bash

# Setup Script for Sweet Shop Project
# This script automates the initial setup for development

echo "🚀 Setting up Sweet Shop Project..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

echo ""
echo "📦 Installing Backend dependencies..."
cd Backend
npm install
cd ..

echo ""
echo "📦 Installing Frontend dependencies..."
cd Frontend
npm install
cd ..

echo ""
echo "✅ Dependencies installed!"
echo ""

# Setup environment files
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
fi

if [ ! -f Backend/.env ]; then
    echo "📝 Creating Backend/.env file from template..."
    cp Backend/.env.example Backend/.env
fi

if [ ! -f Frontend/.env ]; then
    echo "📝 Creating Frontend/.env file from template..."
    cp Frontend/.env.example Frontend/.env
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo ""
echo "1. Update environment files:"
echo "   - Edit .env with your configuration"
echo "   - Edit Backend/.env with MongoDB URI and JWT secret"
echo "   - Edit Frontend/.env with API endpoint"
echo ""
echo "2. Start development servers:"
echo "   npm run dev          # Both backend and frontend"
echo "   npm run server:dev   # Backend only"
echo "   npm run client       # Frontend only"
echo ""
echo "3. Open in browser:"
echo "   http://localhost:5173 (Frontend)"
echo "   http://localhost:3000 (API)"
echo ""
echo "Happy coding! 🎉"
