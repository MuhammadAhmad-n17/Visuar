# Quick Start Script - Run Backend and Frontend

Write-Host "🚀 Starting Vision Test Application..." -ForegroundColor Cyan
Write-Host ""

# Start Backend
Write-Host "📦 Starting Backend Server (FastAPI)..." -ForegroundColor Yellow
$backendPath = "e:\supabase\supabase"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; Write-Host '🔧 Activating virtual environment...' -ForegroundColor Green; .\.venv\Scripts\Activate.ps1; Write-Host '▶️ Starting FastAPI server on http://localhost:8000' -ForegroundColor Green; uvicorn main:app --reload --port 8000"

Start-Sleep -Seconds 2

# Start Frontend
Write-Host "🎨 Starting Frontend Server (Vite + React)..." -ForegroundColor Yellow
$frontendPath = "e:\supabase\vision-test-react"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; Write-Host '▶️ Starting Vite dev server...' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Backend API: http://localhost:8000" -ForegroundColor Cyan
Write-Host "📍 Frontend App: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Two terminal windows will open. Keep them running." -ForegroundColor Yellow
Write-Host "💡 Press Ctrl+C in each terminal to stop the servers." -ForegroundColor Yellow
Write-Host ""
Write-Host "Happy Testing! 🎉" -ForegroundColor Magenta
