import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const RequiredNotAuth = () => {
  if (
    localStorage.getItem("access_token") &&
    localStorage.getItem("access_token") !== "undefined"
  ) {
    return <Navigate to={`/home`}></Navigate>;
  }

  return <Outlet />;
};

export default RequiredNotAuth;
