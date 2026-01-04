# Visuar - Vision Testing Application (React + Vite)

A modern vision testing web application built with React, Vite, and TailwindCSS.

## 🚀 Features

- **Home Page** - Landing page with eye-catching animations
- **Authentication** - Login, Sign Up, and Forgot Password pages
- **Dashboard** - Comprehensive dashboard with test history and statistics
- **Test Selection** - Choose from multiple vision tests
- **Test Execution** - Interactive test pages with camera integration
- **Results** - Detailed test results with metrics and recommendations
- **Profile** - User profile management
- **Settings** - App customization and preferences

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Icon library

## 📦 Installation

1. Navigate to the project directory:

```bash
cd vision-test-react
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit:

```
http://localhost:5173
```

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 📁 Project Structure

```
vision-test-react/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── ui/         # UI components (Button, Input, etc.)
│   │   └── AnimatedBackground.jsx
│   ├── pages/          # Page components
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── TestSelectionPage.jsx
│   │   ├── TestPage.jsx
│   │   ├── ResultsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   └── SettingsPage.jsx
│   ├── lib/            # Utility functions
│   ├── App.jsx         # Main app component with routes
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles and animations
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🎨 Features

### Authentication Flow

- SessionStorage-based authentication
- Protected routes that redirect to login
- Logout functionality

### Animated Backgrounds

- Beautiful bubble animations on all pages
- Smooth transitions and hover effects

### Responsive Design

- Mobile-first approach
- Adapts to all screen sizes

### Test System

- Multiple test types (Contrast, Color, Eye Tracking, etc.)
- Camera permission handling
- Progress tracking
- Detailed results with metrics

## 🔒 Authentication

The app uses sessionStorage for authentication. After logging in:

- `isLoggedIn` flag is set in sessionStorage
- Protected pages check for this flag
- Users are redirected to login if not authenticated

## 📱 Pages

1. **/** - Home page
2. **/login** - Login page
3. **/signup** - Sign up page
4. **/forgot-password** - Password reset
5. **/dashboard** - Main dashboard (protected)
6. **/test-selection** - Choose tests (protected)
7. **/test/:testId** - Run specific test (protected)
8. **/results/:testId** - View test results (protected)
9. **/profile** - User profile (protected)
10. **/settings** - App settings (protected)

## 🎯 Next Steps

- Connect to a backend API
- Implement real authentication
- Add data persistence
- Integrate actual vision testing algorithms
- Add more test types

## 📄 License

This project is for educational purposes.
