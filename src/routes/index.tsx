import React from 'react';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import DefaultLayout from '~/layouts';
import BackgroundLayout from '~/layouts/BackgroundLayout';
import { Navigate, type RouteObject } from 'react-router-dom';
import AxiosContext from '~/contexts/AxiosContext';
import Demo from '~/pages/Demo';
import { demoRoute } from '~/pages/Demo/demoRoute';
import Profile from '~/pages/Profile';
import ForgetPassword from '~/pages/ForgetPassword';
import ResetPassword from '~/pages/ResetPassword';
import ChangePassword from '~/pages/ChangePassword';
import AuthGuardContext from '~/contexts/AuthGuardContext';

const publicRoutes: RouteObject[] = [
  {
    element: <AxiosContext />,
    children: [
      {
        element: <BackgroundLayout />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
          {
            path: '/forgot-password',
            element: <ForgetPassword />,
          },
          {
            path: '/reset-password',
            element: <ResetPassword />,
          },
          {
            path: '/change-password',
            element: <ChangePassword />,
          },
        ],
      },
      // Auth routes
      {
        element: <AuthGuardContext />,
        children: [
          {
            element: <DefaultLayout />,
            children: [
              {
                path: '/explore',
                element: <Home />,
              },
              {
                path: '/my-photos',
                element: <Home my />,
              },
              {
                path: '/demo',
                element: <Demo />,
                children: demoRoute,
              },
              {
                index: true,
                element: <Navigate to="/explore" />,
              },
            ],
          },
          {
            element: <BackgroundLayout />,
            children: [
              {
                path: '/profile',
                element: <Profile />,
              },
            ],
          },
        ],
      },

      {
        path: '/oauth2-fallback',
        element: <Navigate to="/explore" />,
      },
    ],
  },
];

export default publicRoutes;
