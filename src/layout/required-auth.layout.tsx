import React from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const RequiredAuth = () => {
  const location = useLocation();
  const pathName = location.pathname;

  if (!localStorage.getItem("access_token") || localStorage.getItem("access_token") === "undefined") {
    window.location.href = `/login?redirect=${pathName}`;
    return null;
  }
  return <Outlet />;
};

export default RequiredAuth;
