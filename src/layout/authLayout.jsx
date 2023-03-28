import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const AuthLayout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    return navigate("/");
  }
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-800">
      <div className="w-1/2 min-w-[300px] bg-slate-300 border-2 rounded-xl p-5  flex-col flex max-w-md space-y-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
