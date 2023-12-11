import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

const RequiredAuth = () => {
  const location = useLocation();
  console.log("Location: ", location);
  const pathName = location.pathname;
  const searchParams = location.search ? location.search : "";

  if (pathName === "/sign-out") {
    return <Outlet />;
  }

  if (
    !localStorage.getItem("access_token") ||
    localStorage.getItem("access_token") === "undefined"
  ) {
    return (
      <Navigate to={`/login?redirect=${pathName}${searchParams}`}></Navigate>
    );
  }

  return <Outlet />;
};

export default RequiredAuth;
