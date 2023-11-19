import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const RequiredNotAuth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("access_token") &&
      localStorage.getItem("access_token") !== "undefined"
    ) {
      navigate(`/home`);
    }
  }, []);

  return <Outlet />;
};

export default RequiredNotAuth;
