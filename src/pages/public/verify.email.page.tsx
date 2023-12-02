import Typography from "@mui/material/Typography";
import { Box, Link, Button, Stack } from "@mui/material";

import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import { Error as ErrorIcon } from "@mui/icons-material";
import SecurityIcon from "@mui/icons-material/Security";
import { customAxios } from "@/api/custom-axios";
import { useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  document.title = "Xác thực tài khoản";
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [loading, setLoading] = React.useState(true);
  const [isVerified, setIsVerified] = React.useState(false);

  const buttonSx = {
    ...(isVerified && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };
  const verifyEmail = async () => {
    try {
      const result = await customAxios.post("/auth/verify-email", {
        token: token,
        email: email,
      });
      if (result.status == 200) {
        setIsVerified(true);
      }
    } catch (error) {
      setIsVerified(false);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    verifyEmail();
  }, []);

  if (!loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Box sx={{ p: 2 }}>
          <Box
            component="img"
            src={
              "https://firebasestorage.googleapis.com/v0/b/k3-learning.appspot.com/o/k3_logo.png?alt=media&token=c6bb7cec-03d8-4767-b00b-915145956430"
            }
            sx={{ objectFit: "fit", width: "250px" }}
          />
          <Box sx={{ p: 2 }}>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="body1"
              component="div"
            >
              {isVerified
                ? "Bạn đã xác thực tài khoản Email thành công cho K3 Learning."
                : "Có lỗi xảy ra trong quá trình xác thực tài khoản Email cho K3 Learning."}
            </Typography>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ my: 2 }}
          >
            {isVerified ? (
              <Link href="/login">
                <Button variant="outlined" size="large">
                  Đăng nhập
                </Button>
              </Link>
            ) : (
              <ErrorIcon color="error" sx={{ fontSize: 40 }} />
            )}
          </Stack>
        </Box>
      </Box>
    );
  } else {
    return (
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ my: 2 }}
      >
        <Box sx={{ m: 1, position: "relative" }}>
          <Fab aria-label="save" color="primary" sx={buttonSx}>
            {isVerified ? <CheckIcon /> : <SecurityIcon />}
          </Fab>
        </Box>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            sx={{ buttonSx, minWidth: 200, marginLeft: 1 }}
            disabled={loading}
            size="large"
          >
            Verifying{" "}
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  marginLeft: 1,
                  color: "primary.main",
                }}
              />
            )}
          </Button>
        </Box>
      </Stack>
    );
  }
};

export default VerifyEmail;
