# Technology Stack & Libraries

## Project Overview
**Hotel Reservation Management System** - Built with Next.js 16 (React 19) and TypeScript

---

## 🏗️ Core Technologies

### Frontend Framework
- **Next.js** - v16.1.6 - Full-stack React framework with App Router
- **React** - v19.2.4 - UI library for building components
- **React DOM** - v19.2.4 - React bindings for DOM manipulation
- **TypeScript** - v5.7.3 - Statically typed JavaScript

### Styling & UI
- **Tailwind CSS** - v4.2.2 - Utility-first CSS framework
- **@tailwindcss/postcss** - v4.2.0 - PostCSS plugin for Tailwind
- **PostCSS** - v8.5.10 - CSS transformation tool
- **Autoprefixer** - v10.5.0 - Adds vendor prefixes to CSS
- **Tailwind Merge** - v3.5.0 - Merge Tailwind classes without conflicts
- **Class Variance Authority** - v0.7.1 - CSS class variant management
- **clsx** - v2.1.1 - Conditional className utility
- **tw-animate-css** - v1.3.3 - Tailwind animation utilities

---

## 🎨 UI Component Libraries

### Radix UI Components (Headless UI)
- **@radix-ui/react-accordion** - v1.2.12 - Accordion component
- **@radix-ui/react-alert-dialog** - v1.1.15 - Alert dialog component
- **@radix-ui/react-aspect-ratio** - v1.1.8 - Aspect ratio container
- **@radix-ui/react-avatar** - v1.1.11 - Avatar component
- **@radix-ui/react-checkbox** - v1.3.3 - Checkbox component
- **@radix-ui/react-collapsible** - v1.1.12 - Collapsible component
- **@radix-ui/react-context-menu** - v2.2.16 - Context menu
- **@radix-ui/react-dialog** - v1.1.15 - Modal/dialog component
- **@radix-ui/react-dropdown-menu** - v2.1.16 - Dropdown menu
- **@radix-ui/react-hover-card** - v1.1.15 - Hover card component
- **@radix-ui/react-label** - v2.1.8 - Form label
- **@radix-ui/react-menubar** - v1.1.16 - Menubar component
- **@radix-ui/react-navigation-menu** - v1.2.14 - Navigation menu
- **@radix-ui/react-popover** - v1.1.15 - Popover component
- **@radix-ui/react-progress** - v1.1.8 - Progress bar
- **@radix-ui/react-radio-group** - v1.3.8 - Radio button group
- **@radix-ui/react-scroll-area** - v1.2.10 - Scrollable area
- **@radix-ui/react-select** - v2.2.6 - Select dropdown
- **@radix-ui/react-separator** - v1.1.8 - Separator divider
- **@radix-ui/react-slider** - v1.3.6 - Range slider
- **@radix-ui/react-slot** - v1.2.4 - Slot composition primitive
- **@radix-ui/react-switch** - v1.2.6 - Toggle switch
- **@radix-ui/react-tabs** - v1.1.13 - Tab component
- **@radix-ui/react-toast** - v1.2.15 - Toast/notification
- **@radix-ui/react-toggle** - v1.1.10 - Toggle button
- **@radix-ui/react-toggle-group** - v1.1.11 - Toggle group
- **@radix-ui/react-tooltip** - v1.2.8 - Tooltip component

### Additional UI Components
- **Lucide React** - v0.564.0 - Icon library with 500+ icons
- **Embla Carousel** - v8.6.0 - Lightweight carousel component
- **React Day Picker** - v9.13.2 - Calendar date picker
- **cmdk** - v1.1.1 - Fast command menu/palette
- **vaul** - v1.1.2 - Unstyled drawer component
- **input-otp** - v1.4.2 - One-time password input
- **Recharts** - v2.15.0 - Composable charting library
- **React Resizable Panels** - v2.1.7 - Resizable panel layout
- **Sonner** - v1.7.4 - Toast notification system

---

## 📝 Form & Validation

- **React Hook Form** - v7.72.1 - Performant form state management
- **@hookform/resolvers** - v3.10.0 - Validation resolver for form libraries
- **Zod** - v3.25.76 - TypeScript-first schema validation

---

## 🔐 Authentication & Security

- **bcryptjs** - v3.0.3 - Password hashing library
- **jose** - v6.2.3 - JWT handling (JSON Web Token)
- **@types/bcryptjs** - v2.4.6 - TypeScript types for bcryptjs

---

## 📧 Email & Communication

- **Nodemailer** - v8.0.7 - Email sending library
- **@types/nodemailer** - v8.0.0 - TypeScript types for Nodemailer
- **SMTP Configuration** - Gmail SMTP for sending emails

---

## 🗄️ Database & ORM

- **MongoDB** - Cloud database (MongoDB Atlas)
- **Mongoose** - v9.5.0 - MongoDB object modeling
- **Connection String** - MongoDB Atlas cluster (cloud hosted)

---

## ☁️ Cloud & Media Services

- **Cloudinary** - v2.10.0 - Image/media management and optimization
  - Cloud Name: `ddqo8zyvx`
  - API Key: `717625654825887`

---

## 🚀 Deployment & Hosting

- **Vercel** - Hosting platform for Next.js
- **Vercel Analytics** - v1.6.1 - Web analytics integration
- **Deployment URL** - https://new-gamma-sooty.vercel.app

---

## 🎯 Utilities & Helpers

- **Date-fns** - v4.1.0 - Date manipulation and formatting
- **Next Themes** - v0.4.6 - Dark/light theme management
- **@types/node** - v22.19.17 - TypeScript types for Node.js
- **@types/react** - v19.2.14 - TypeScript types for React
- **@types/react-dom** - v19.2.3 - TypeScript types for React DOM

---

## 📦 Package Manager

- **pnpm** - v10.28.2 - Fast, disk space efficient package manager
- **pnpm-lock.yaml** - Dependency lock file for reproducible installs

---

## 🛠️ Development Tools

- **ESLint** - Code linting and quality checking
- **TypeScript** - Static type checking

---

## 🏗️ Project Structure

```
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   │   ├── auth/       # Authentication endpoints
│   │   ├── reservation/ # Reservation management
│   │   └── user/       # User profile
│   ├── auth/           # Auth pages
│   ├── rooms/          # Room listings
│   ├── amenities/      # Amenities page
│   ├── dining/         # Dining page
│   ├── gallery/        # Photo gallery
│   └── ...
├── components/         # React components
│   ├── ui/            # Radix UI based components
│   └── home/          # Home page sections
├── lib/               # Utility libraries
│   ├── mongodb.ts     # Database connection
│   ├── auth.ts        # Authentication logic
│   ├── cloudinary.ts  # Image management
│   └── ...
├── models/            # Mongoose schemas
│   ├── User.ts
│   └── Otp.ts
├── hooks/             # Custom React hooks
├── styles/            # Global styles
└── public/            # Static assets

```

---

## 🔑 Key Features Enabled

✅ User Authentication (JWT + Password Hashing)
✅ Email Verification (OTP system)
✅ Password Reset
✅ Hotel Reservations
✅ User Profiles
✅ Image Upload & Optimization (Cloudinary)
✅ Dark/Light Theme Support
✅ Responsive UI Components
✅ Form Validation
✅ Toast Notifications
✅ Date Picker
✅ Charts & Analytics
✅ Mobile-friendly Design

---

## 📋 Environment Variables Required

```env
MONGODB_URI=              # MongoDB connection string
JWT_SECRET=               # Secret key for JWT
CLOUDINARY_CLOUD_NAME=    # Cloudinary project name
CLOUDINARY_API_KEY=       # Cloudinary API key
CLOUDINARY_API_SECRET=    # Cloudinary API secret
SMTP_HOST=                # Email SMTP host
SMTP_PORT=                # Email SMTP port
SMTP_USER=                # Email sender address
SMTP_PASS=                # Email sender password
SMTP_FROM=                # Email from display name
```

---

## 📈 Deployment Checklist

- ✅ Next.js 16 production build optimized
- ✅ TypeScript strict mode enabled
- ✅ Environment variables configured
- ✅ Database connected (MongoDB Atlas)
- ✅ Image optimization (Cloudinary)
- ✅ Email service configured (Nodemailer + SMTP)
- ✅ JWT authentication implemented
- ✅ Password hashing with bcryptjs
- ✅ Vercel deployment ready
- ✅ Analytics enabled
