import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage.tsx';
import HomePage from './pages/user/HomePage.tsx';
import TermsOfService from './pages/TermsOfService.tsx';
import Profile from './pages/user/Profile.tsx';
import TourInfo from './pages/user/TourInfo.tsx';
import ToursPage from './pages/ToursPage.tsx';
import Booking from './pages/user/Booking.tsx';
import Payment from './pages/user/Payment.tsx';
import AgencyPage from './pages/agency/AgencyPage.tsx';
import AgencyRegister from './pages/agency/AgencyRegister.tsx';
import AgencyLogin from './pages/agency/AgencyLogin.tsx';
import AgencyProfile from './pages/agency/AgencyProfile.tsx';
import MyTours from './pages/agency/MyTours.tsx';
import EditTour from './pages/agency/EditTour.tsx';
import AddTour from './pages/agency/AddTour.tsx';
import Requests from './pages/agency/Requests.tsx';
import Statistics from './pages/agency/Statistics.tsx';
import Ads from './pages/agency/Ads.tsx';
import Promos from './pages/agency/Promos.tsx';
import HotTours from './pages/agency/HotTours.tsx';

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
        element: <AgencyProfile />,
      },
      {
        path: 'agency/my-tours',
        element: <MyTours />,
      },
      {
        path: 'agency/hot-tours',
        element: <HotTours />,
      },
      {
        path: 'agency/tour/edit/:id',
        element: <EditTour />,
      },
      {
        path: 'agency/tour/add',
        element: <AddTour />,
      },
      {
        path: 'agency/requests',
        element: <Requests />,
      },
      {
        path: 'agency/statistics',
        element: <Statistics />,
      },
      {
        path: 'agency/ads',
        element: <Ads />,
      },
      {
        path: 'agency/promos',
        element: <Promos />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
