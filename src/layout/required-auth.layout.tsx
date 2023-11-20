import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const RequiredAuth = () => {
  const location = useLocation();
  const pathName = location.pathname;
  if (pathName === "/sign-out") {
    return <Outlet />;
  }

  if (
    !localStorage.getItem("access_token") ||
    localStorage.getItem("access_token") === "undefined"
  ) {
    return <Navigate to={`/login?redirect=${pathName}`}></Navigate>;
  }

  return <Outlet />;
};

export default RequiredAuth;
