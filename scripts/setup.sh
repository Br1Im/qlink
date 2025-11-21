#!/bin/bash

# Qlink Project Setup Script

echo "🚀 Setting up Qlink Booking System..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ LTS"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. You'll need Docker to run PostgreSQL and Redis"
    echo "   You can install it from: https://www.docker.com/get-started"
else
    echo "✅ Docker is installed"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Copy environment files if they don't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
fi

if [ ! -f packages/backend/.env ]; then
    echo "📝 Creating backend .env file..."
    cp packages/backend/.env.example packages/backend/.env
fi

if [ ! -f packages/frontend/.env.local ]; then
    echo "📝 Creating frontend .env.local file..."
    cp packages/frontend/.env.example packages/frontend/.env.local
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env files with your configuration"
echo "2. Start Docker containers: npm run docker:up"
echo "3. Start development server: npm run dev"
echo ""
echo "📚 See README.md for more information"
