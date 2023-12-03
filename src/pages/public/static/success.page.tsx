import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { setUser } from "@/redux/auth.slice";
import { useEffect } from "react";

const SuccessPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["payload"]);

  const handleLoginGG = () => {
    if (cookies.payload) {
      const user = cookies.payload.user;
      const access_token = cookies.payload.access_token;
      const refresh_token = cookies.payload.refresh_token;

      if (user && access_token) {
        dispatch(
          setUser({
            access_token: access_token,
            user: user,
            refresh_token: refresh_token,
          })
        );

        removeCookie("payload", {});
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 1000);
      } else {
        console.log("Fail");
      }
    }
  };

  useEffect(() => {
    const cookies = document.cookie;

    console.log(cookies);
    handleLoginGG();
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
