import { deleteUser } from "../redux/auth.slice";
import { deleteCourses } from "@/redux/courses.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import socket from "@socket/socket";
import { useState, useEffect } from "react";

const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const refreshToken = useSelector((state: any) => state.auth.refresh_token);
  const [isLoading, setIsLoading] = useState(true);
  // 🙄 disconnect socket
  socket.disconnect();

  useEffect(() => {
    // const abortController = new AbortController();
    // const { signal } = abortController;
    async function signOut() {
      // await customAxios.post("/auth/refresh-token/sign-out", {
      //   // signal,
      // });
      dispatch(deleteUser());
      dispatch(deleteCourses());
      setIsLoading(false);
    }
    signOut();
    navigate("/", { replace: true, state: { from: "sign-out" } });
    // return () => {
    //   abortController.abort();
    // };
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
    </>
  );
};

export default SignOut;
