# 🎓 Engineering Era - Course Management System

A comprehensive Course Management Platform built with modern technologies for engineering education.

## 🌟 Features

### 🔐 Authentication & Authorization
- **Email + OTP-based Authentication**: Secure login and registration system
- **Role-based Access**: Student and Instructor dashboards with different permissions
- **Protected Routing**: Secure access to course content
- **Profile Management**: Customizable user profiles with detailed settings

### 📚 Course Management
- **Structured Content**: Organized by Engineering Branches (CSE, IT, AI/ML, etc.)
- **Progress Tracking**: Real-time course completion monitoring
- **Video Learning**: Interactive video player with progress tracking
- **PDF Resources**: Notes, viva questions, and study materials
- **Module System**: Well-organized course modules and sub-topics

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly across all devices
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Modern Animations**: Smooth transitions and micro-interactions
- **Tailwind CSS**: Beautiful, consistent, and professional design
- **Accessible**: WCAG compliant interface

### 📊 Analytics & Tracking
- **Learning Progress**: Visual progress bars and completion metrics
- **Activity Timeline**: Track student engagement and activity
- **Performance Insights**: Detailed analytics for instructors
- **Breadcrumb Navigation**: Easy navigation with context awareness

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **React Router DOM** - Client-side routing

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Real-time subscriptions
  - File storage

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.x or higher)
- **npm** or **yarn**
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/omkar2816/engineering-era.git
cd engineering-era
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎯 Usage

### For Students

1. **Register/Login**: Create an account or sign in
2. **Browse Courses**: Explore available engineering courses
3. **Enroll**: Click on departments to access course content
4. **Track Progress**: Monitor your learning progress
5. **Access Resources**: Download notes, viva questions, and materials

### For Instructors

1. **Create Account**: Register as an instructor
2. **Access Dashboard**: Manage courses and students
3. **Upload Content**: Add videos, notes, and resources
4. **Monitor Progress**: Track student engagement
5. **Generate Reports**: View analytics and insights

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

---

**Engineering Era** - Empowering engineering education through modern technology! 🚀+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
