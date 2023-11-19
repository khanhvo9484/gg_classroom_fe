import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RequiredAuth = () => {
  const location = useLocation();
  const pathName = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("access_token") ||
      localStorage.getItem("access_token") === "undefined"
    ) {
      navigate(`/login?redirect=${pathName}`);
    }
  }, []);

  return <Outlet />;
};

export default RequiredAuth;
