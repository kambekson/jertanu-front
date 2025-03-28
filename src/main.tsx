import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import HomePage from './pages/HomePage.tsx';
// import LoginPage from './pages/auth/LoginPage.tsx';
// import SignupPage from './pages/auth/SignupPage.tsx';
// import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.tsx';
// import ResetPasswordPage from './pages/auth/ResetPasswordPage.tsx';
import TermsOfService from './pages/TermsOfService.tsx';
import Profile from './pages/Profile.tsx';
import TourInfo from './pages/TourInfo.tsx';
import ToursPage from './pages/ToursPage.tsx';
import Booking from './pages/Booking.tsx';
import Payment from './pages/Payment.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/terms',
        element: <TermsOfService />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/tours',
        element: <ToursPage />,
      },
      {
        path: '/tour',
        element: <TourInfo />,
      },
      {
        path: '/booking',
        element: <Booking />,
      },
      {
        path: '/payment',
        element: <Payment />,
      },
      // {
      //   path: 'auth',
      //   children: [
      //     {
      //       path: 'login',
      //       element: <LoginPage />,
      //     },
      //     {
      //       path: 'signup',
      //       element: <SignupPage />,
      //     },
      //     {
      //       path: 'forgot-password',
      //       element: <ForgotPasswordPage />,
      //     },
      //     {
      //       path: 'reset-password',
      //       element: <ResetPasswordPage />,
      //     },
      //   ],
      // },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
