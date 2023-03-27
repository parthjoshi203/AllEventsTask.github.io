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
import ListingPage from "./pages/listingPage";
import CreateEvent from "./pages/createEvent";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ListingPage />} />
        <Route path="create" element={<CreateEvent />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
