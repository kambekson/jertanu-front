import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import HomePage from './pages/user/HomePage.tsx';
// import LoginPage from './pages/auth/LoginPage.tsx';
// import SignupPage from './pages/auth/SignupPage.tsx';
// import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.tsx';
// import ResetPasswordPage from './pages/auth/ResetPasswordPage.tsx';
import TermsOfService from './pages/TermsOfService.tsx';
import Profile from './pages/user/Profile.tsx';
import TourInfo from './pages/user/TourInfo.tsx';
import ToursPage from './pages/ToursPage.tsx';
import Booking from './pages/user/Booking.tsx';
import Payment from './pages/user/Payment.tsx';
import AgencyPage from './pages/agency/AgencyPage.tsx';
import AgencyRegister from './pages/agency/AgencyRegister.tsx';
import AgencyLogin from './pages/agency/AgencyLogin.tsx';

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
        path: '/tour/:id',
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
      {
        path: 'agency',
        element: <AgencyPage />,
      },
      {
        path: 'agency/register',
        element: <AgencyRegister/>,
      },
      {
        path: 'agency/login',
        element: <AgencyLogin />,
      },
      {
        path: 'agency/profile',
        element: <></>,
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
