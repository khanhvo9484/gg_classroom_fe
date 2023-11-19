import { deleteUser } from "../redux/auth.slice";
import { useDispatch } from "react-redux";
import { customAxios } from "../api/custom-axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(deleteUser());
    try {
      const signOut = async () => {
        await customAxios.post("/auth/refresh-token/sign-out");
      };
      signOut();
      navigate(`/`);
    } catch (error) {}
  }, []);

  return null;
};

export default SignOut;
