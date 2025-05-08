// src\routes\index.jsx
import { lazy } from "react";
import MainLayout from "../layouts/main-layout";
import AuthLayout from "../layouts/auth-layout";
import DashboardLayout from "../layouts/dashboard-layout";
import { ProtectedRoute, PublicRoute } from "./route-guards";
import LoginPage from "@/pages/auth/login";

// Lazy load pages for better performance
const HomePage = lazy(() => import("../pages/home"));


// Define all application routes
const routes = [
  {
    // Public routes with MainLayout
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
  {
    // Auth routes with AuthLayout
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
      { path: "/verify-otp", element: <VerifyOtpPage /> },
    ],
  },
  {
    // Protected dashboard routes with DashboardLayout
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/dashboard", element: <DashboardPage /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/settings", element: <SettingsPage /> },
      { path: "/edit-profile", element: <EditProfilePage /> },
      { path: "/sound-library", element: <SoundLibraryPage /> },
      { path: "/friends", element: <FriendsPage /> },
      { path: "/messages", element: <MessagesPage /> },
      { path: "/analytics", element: <AnalyticsPage /> },
    ],
  },
  {
    // 404 page
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
