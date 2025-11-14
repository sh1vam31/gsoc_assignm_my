#!/bin/bash

# Start both frontend and backend servers

echo "🚀 Starting Smart City Dashboard..."
echo ""
echo "📦 Backend server will run on http://localhost:5002"
echo "🎨 Frontend will run on http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
npm run server:dev &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 2

# Start frontend
npm run dev

# When frontend stops, kill backend too
kill $BACKEND_PID
