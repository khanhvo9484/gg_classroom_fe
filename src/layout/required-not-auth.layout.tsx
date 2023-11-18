import { Outlet } from "react-router-dom";

const RequiredNotAuth = () => {
  if (localStorage.getItem("access_token")) {
    window.location.href = `/dashboard`;
    return null;
  }
  return <Outlet />;
};

export default RequiredNotAuth;
