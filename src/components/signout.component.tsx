import { deleteUser } from "../redux/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../api/custom-axios";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import socket from "@socket/socket";
import { useState, useEffect } from "react";
const SignOut = () => {
  const dispatch = useDispatch();
  const refreshToken = useSelector((state: any) => state.auth.refresh_token);
  const [isLoading, setIsLoading] = useState(true);
  // 🙄 disconnect socket
  socket.disconnect();

  useEffect(() => {
    async function signOut() {
      dispatch(deleteUser());
      await customAxios.post("/auth/refresh-token/sign-out", {
        refresh_token: refreshToken,
      });
      setIsLoading(false);
    }
    signOut();
  }, []);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={"3rem"} />
        </Box>
      )}
      {!isLoading && <Navigate to="/" />}
    </>
  );
};

export default SignOut;
