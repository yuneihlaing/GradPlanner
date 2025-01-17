import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { HomeNavbar, ProfileNavbar } from "./components/Navbar";
import "./App.css";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import ErrorPage from "./routes/ErrorPage";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Setup from "./routes/Setup";
import Plan from "./routes/Plan";
import Edit from "./routes/Edit";

const HomeLayout = () => {
  return (
    <>
      <HomeNavbar />
      <Home />
    </>
  );
};

const ProfileLayout = () => {
  return (
    <>
      <ProfileNavbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    path: "/",
  },
  {
    element: <ProfileLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Plan />,
        path: "plan",
      },
      {
        element: <Profile />,
        path: "profile",
      },
      {
        element: <Edit />,
        path: "edit",
      },
    ],
  },
  {
    element: <Login />,
    errorElement: <ErrorPage />,
    path: "login",
  },
  {
    element: <Signup />,
    errorElement: <ErrorPage />,
    path: "signup",
  },
  {
    element: <Setup />,
    errorElement: <ErrorPage />,
    path: "setup",
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
