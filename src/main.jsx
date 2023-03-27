import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/mainLayout";
import Login from "./pages/login";
import Register from "./pages/register";
import AuthLayout from "./layout/authLayout";
import CreateEvent from "./pages/createEvent";
import { AuthProvider } from "./context/authContext";
import ErrorBoundary from "../ErrorBoundary";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<CreateEvent />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </AuthProvider>
);
