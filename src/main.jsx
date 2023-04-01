import React from "react";
import ReactDOM from "react-dom/client";
import Footer from "./components/footer";
// import "./main.css";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
// import MainLayout from "./layout/mainLayout";
// import Login from "./pages/login";
// import Register from "./pages/register";
// import AuthLayout from "./layout/authLayout";
// import CreateEvent from "./pages/createEvent";
// import { AuthProvider } from "./context/authContext";
// import ErrorBoundary from "../ErrorBoundary";
// import { EventProvider } from "./context/eventContext";
// import ListingEvents from "./pages/listingEvents";

const router = createBrowserRouter(
  createRoutesFromElements(
    //     <>
    <Route path="/" element={<Footer />}>
      {/* //           <EventProvider>
//             <MainLayout />
//           </EventProvider>
//         }
//       >
//         <Route index element={<CreateEvent />} />
//         <Route path="events" element={<ListingEvents />} />
//       </Route> */}
      {/* //       <Route path="/auth" element={<AuthLayout />}>
//         <Route path="login" element={<Login />} />
//         <Route path="register" element={<Register />} /> */}
    </Route>
    //     </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  //   <AuthProvider>
  //     <ErrorBoundary>
  <RouterProvider router={router} />
  //     </ErrorBoundary>
  //   </AuthProvider>
);
