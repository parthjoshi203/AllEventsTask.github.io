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
import { ProductProvider } from "./context/productContext";
import ListingEvents from "./pages/listingEvents";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <ProductProvider>
            <MainLayout />
          </ProductProvider>
        }
      >
        <Route index element={<CreateEvent />} />
        <Route path="events" element={<ListingEvents />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
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
