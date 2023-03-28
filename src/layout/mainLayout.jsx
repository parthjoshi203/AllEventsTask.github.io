import React, { useContext, useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const MainLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return navigate("/auth/login");
  }

  return (
    <div>
      {/* <Header /> */}
      <div className="h-screen w-full flex justify-center">
        <div className="w-3/4">
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
