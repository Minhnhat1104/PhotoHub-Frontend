import React from "react";
import Home from "~/pages/Home";
import Login from "~/pages/Login";
import Register from "~/pages/Register";
import Update from "~/pages/Update";
import DefaultLayout from "~/layouts";
import BackgroundLayout from "~/layouts/BackgroundLayout";
import { Navigate, type RouteObject } from "react-router-dom";
import AxiosContext from "~/contexts/AxiosContext";

const publicRoutes: RouteObject[] = [
  {
    element: <AxiosContext />,
    children: [
      {
        element: <BackgroundLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        element: <DefaultLayout />,
        children: [
          {
            path: "/update/:_id",
            element: <Update />,
          },
          {
            path: "/home",
            element: <Home />,
          },
        ],
      },
      {
        index: true,
        element: <Navigate to="/home" />,
      },
    ],
  },
];

export default publicRoutes;
