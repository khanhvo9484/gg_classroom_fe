import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/auth.slice";
import { useEffect } from "react";
import { customAxios } from "@/api/custom-axios";
import { API_VERIFY_LOGIN_OAUTH } from "@/api/api.constant";

const SuccessPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const idUser = params.get("iduser");

  useEffect(() => {
    const verifyUserId = async () => {
      try {
        const { data: response } = await customAxios.get(
          API_VERIFY_LOGIN_OAUTH.replace("{idUser}", idUser)
        );
        const data_user = response.data;

        const user = data_user.user;
        const access_token = data_user.access_token;
        const refresh_token = data_user.refresh_token;

        if (user && access_token) {
          dispatch(
            setUser({
              access_token: access_token,
              user: user,
              refresh_token: refresh_token,
            })
          );
          setTimeout(() => {
            navigate("/home", { replace: true });
          }, 1000);
        } else {
          console.log("Fail");
        }
      } catch (error) {
        console.log(error);
      }
    };

    verifyUserId();
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CheckCircleIcon
        color="success"
        sx={{ fontSize: 130, zIndex: 10, position: "absolute", top: "26%" }}
      />
      <Card
        sx={{
          height: 200,
          width: 460,
          textAlign: "center",
          boxShadow: 3,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontWeight: 500, mt: 3 }}
            component="div"
          >
            Đăng nhập thành công!
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, mt: 3 }}
            component="div"
          >
            Đang thực hiện điều hướng trang...
          </Typography>
          <CircularProgress disableShrink size="1.5rem" sx={{ mt: 1 }} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default SuccessPage;
