import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Link
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import SecurityIcon from "@mui/icons-material/Security";
import { FormHelperText } from "@mui/material";
import { customAxios } from "../../../api/custom-axios";
import { Error as ErrorIcon } from "@mui/icons-material";
import toast from "react-hot-toast";
const easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};

const RecoveryChangePasswordForm = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  document.title = "Đăng ký";

  const SignupSchema = Yup.object().shape({
    password: Yup.string().required("Bạn cần nhập mật khẩu"),
    repassword: Yup.string()
      .required("Bạn cần nhập lại mật khẩu")
      .oneOf([Yup.ref("password")], "Mật khẩu nhập vào không trùng khớp"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      repassword: "",
      email: email,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          email: values.email,
          password: values.password,
        };
        await customAxios.post("/auth/reset-password", payload);
        toast.success("Tạo mới mật khẩu thành công");
        setTimeout(() => {
          navigate("/home", { replace: true });
        }, 1000);
      } catch (error) {
        setSignUpError(true);
        setErrorMessage(error.response.data.message);
      }
    },
  });

  const verifyRecoveryToken = async () => {
    try {
      const result = await customAxios.post("/auth/verify-reset-password", {
        email: email,
        token: token,
      });
      if (result.status == 200) {
        setIsVerified(true);
        setSearchParams(undefined, { replace: true });
      }
    } catch (error) {
      setIsVerified(false);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    verifyRecoveryToken();
  }, []);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  if (isError) {
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
              Có lỗi xảy ra trong quá trình xác thực đường dẫn khôi phục mật khẩu.
            </Typography>
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            sx={{ my: 2 }}
          >
            <ErrorIcon color="error" sx={{ fontSize: 40 }} />
          </Stack>
          <Link href="/">
              <Button variant="outlined" size="large">
                Trở về trang chủ
              </Button>
            </Link>
        </Box>
      </Box>
    );
  } else if (loading){
    return (
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ my: 2 }}
      >
        <Box sx={{ m: 1, position: "relative" }}>
          <Fab aria-label="save" color="primary">
            <SecurityIcon />
          </Fab>
        </Box>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            sx={{ minWidth: 200, marginLeft: 1 }}
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
    )
  } else {
    return (
      <Box sx={{ p: 2, mb: "2rem" }}>
        <FormikProvider value={formik}>
          <Box sx={{ p: 2 }}>
            <Box
              component="img"
              src={
                "https://firebasestorage.googleapis.com/v0/b/k3-learning.appspot.com/o/k3_logo.png?alt=media&token=c6bb7cec-03d8-4767-b00b-915145956430"
              }
              sx={{ objectFit: "fit", width: "250px" }}
            />
            <Typography
              color="text.primary"
              gutterBottom
              variant="h5"
              component="div"
            >
              Khôi phục mật khẩu
            </Typography>
            <Typography
              color="text.secondary"
              gutterBottom
              variant="body1"
              component="div"
            >
              Tạo lại mật khẩu cho tài khoản K3 Learning của bạn
            </Typography>
          </Box>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                autoComplete="mật khẩu mới"
                type={showPassword ? "text" : "password"}
                label="Mật khẩu mới"
                {...getFieldProps("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <Visibility fontSize="large" />
                        ) : (
                          <VisibilityOff fontSize="large" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />

              <TextField
                fullWidth
                autoComplete="nhập lại mật khẩu"
                type={showRePassword ? "text" : "password"}
                label="Nhập Lại Mật khẩu"
                {...getFieldProps("repassword")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowRePassword((prev) => !prev)}
                      >
                        {showRePassword ? (
                          <Visibility fontSize="large" />
                        ) : (
                          <VisibilityOff fontSize="large" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.repassword && errors.repassword)}
                helperText={touched.repassword && errors.repassword}
              />
              <FormHelperText
                id="notify-helper"
                error={Boolean(signUpError && errorMessage)}
              >
                {signUpError && errorMessage}
              </FormHelperText>
            </Stack>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={animate}
            >
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {isSubmitting ? "loading..." : "Tạo mới mật khẩu"}
              </LoadingButton>
            </Box>
          </Form>
        </FormikProvider>
      </Box>
    )
  }
};

export default RecoveryChangePasswordForm;
