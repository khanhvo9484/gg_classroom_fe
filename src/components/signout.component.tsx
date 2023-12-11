import { deleteUser } from "../redux/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../api/custom-axios";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import useSWR from "swr";
const SignOut = () => {
  const dispatch = useDispatch();
  const refreshToken = useSelector((state: any) => state.auth.refresh_token);
  dispatch(deleteUser());
  const { isLoading } = useSWR("/auth/refresh-token/sign-out", async (url) => {
    await customAxios.post(url, {
      refresh_token: refreshToken,
    });
  });

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
