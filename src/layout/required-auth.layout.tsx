import React from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const RequiredAuth = () => {
  const location = useLocation();
  const pathName = location.pathname;
  if (!localStorage.getItem("access_token")) {
    window.location.href = ` /sign-in?redirect=${pathName}`;
    return null;
  }
  return <Outlet />;
};

export default RequiredAuth;
