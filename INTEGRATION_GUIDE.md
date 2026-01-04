# Vision Test Application - Integration Guide

## Overview

This application consists of a FastAPI backend and a React frontend integrated with Supabase authentication.

## Architecture

- **Backend**: FastAPI (Python) - Located in `e:\supabase\supabase\`
- **Frontend**: React + Vite - Located in `e:\supabase\vision-test-react\`
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL via Supabase

## Prerequisites

- Python 3.8+
- Node.js 16+
- Supabase account (credentials already configured)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```powershell
   cd e:\supabase\supabase
   ```

2. Activate the virtual environment (if exists):

   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

3. Install Python dependencies (if not already installed):

   ```powershell
   pip install -r requirements.txt
   ```

4. Start the backend server:

   ```powershell
   uvicorn main:app --reload --port 8000
   ```

   The backend will be available at: `http://localhost:8000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```powershell
   cd e:\supabase\vision-test-react
   ```

2. Install dependencies (already done):

   ```powershell
   npm install
   ```

3. Start the development server:

   ```powershell
   npm run dev
   ```

   The frontend will be available at: `http://localhost:5173`

## Environment Variables

### Backend (.env in `e:\supabase\supabase\`)

```env
SUPABASE_URL=https://mzehrairflcofvzqshri.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql+asyncpg://postgres...
```

### Frontend (.env in `e:\supabase\vision-test-react\`)

```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://mzehrairflcofvzqshri.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## API Integration Features

### Authentication Flow

1. **Sign Up**: Users register via Supabase Auth
2. **Login**: Users authenticate and receive JWT token
3. **Protected Routes**: Token automatically included in API requests
4. **Auto Logout**: Invalid/expired tokens redirect to login

### Implemented Features

#### 1. User Authentication

- **Sign Up** (`/signup`): Creates Supabase auth user
- **Login** (`/login`): Authenticates user and stores session
- **Logout**: Clears session and redirects to home

#### 2. Profile Management

- **View Profile** (`/profile`): Fetches user's health profile from backend
- **Update Profile** (`/profile`): Saves/updates health information
- Fields include:
  - Occupation
  - Screen time
  - Glasses usage
  - Lighting/work environment
  - Diet, sleep, medical history
  - Lifestyle factors

#### 3. Protected Routes

The following routes require authentication:

- `/dashboard`
- `/profile`
- `/settings`
- `/test-selection`
- `/test/:testId`
- `/results/:testId`

## API Endpoints Used

### Authentication

- `POST /register-user` - Register user in database
- `GET /me` - Get current user info

### Profile

- `GET /profile` - Get user profile
- `POST /profile` - Create or update profile

## Testing the Integration

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Click "Sign Up" and create a new account
4. Check your email for verification (if required by Supabase)
5. Login with your credentials
6. You'll be redirected to the dashboard
7. Click "View Profile" to create/update your health profile
8. All data is stored in Supabase PostgreSQL database

## Key Files Created/Modified

### New Files

- `vision-test-react/src/lib/supabase.js` - Supabase client configuration
- `vision-test-react/src/lib/api.js` - API service layer with axios
- `vision-test-react/src/context/AuthContext.jsx` - Authentication context
- `vision-test-react/src/components/ProtectedRoute.jsx` - Route protection
- `vision-test-react/.env` - Environment configuration

### Modified Files

- `vision-test-react/src/App.jsx` - Added AuthProvider and ProtectedRoute
- `vision-test-react/src/pages/LoginPage.jsx` - Integrated Supabase auth
- `vision-test-react/src/pages/SignUpPage.jsx` - Integrated Supabase auth
- `vision-test-react/src/pages/ProfilePage.jsx` - Connected to backend API
- `vision-test-react/src/pages/DashboardPage.jsx` - Updated logout logic

## Technologies Used

### Backend

- FastAPI - Web framework
- SQLAlchemy - ORM
- Supabase Python Client - Auth verification
- PostgreSQL - Database

### Frontend

- React 18 - UI framework
- Vite - Build tool
- React Router - Routing
- Supabase JS Client - Authentication
- Axios - HTTP client
- Tailwind CSS - Styling

## Troubleshooting

### Backend won't start

- Ensure Python virtual environment is activated
- Check if port 8000 is available
- Verify database credentials in `.env`

### Frontend can't connect to backend

- Ensure backend is running on port 8000
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

### Authentication issues

- Verify Supabase credentials match in both backend and frontend
- Check if user is verified in Supabase dashboard
- Clear browser localStorage and try again

## Next Steps

To further enhance the integration:

1. Add test result storage and retrieval
2. Implement forgot password flow
3. Add user settings management
4. Create dashboard statistics from backend
5. Add real-time updates using Supabase Realtime
