import { deleteUser } from "../redux/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../api/custom-axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = useSelector((state: any) => state.auth.refresh_token);
  console.log("heheh");
  useEffect(() => {
    dispatch(deleteUser());
    try {
      const signOut = async () => {
        await customAxios.post("/auth/refresh-token/sign-out", {
          refresh_token: refreshToken,
        });
      };
      signOut();
      navigate(`/`);
    } catch (error) {}
  }, []);

  return null;
};

export default SignOut;
