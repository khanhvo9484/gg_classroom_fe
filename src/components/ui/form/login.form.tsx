import {
  Link as RouterLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Typography from "@mui/material/Typography";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Stack,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import { customAxios } from "../../../api/custom-axios";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/auth.slice";
import { API_FACEBOOK_LOGIN, API_GOOGLE_LOGIN } from "@/api/api.constant";
import fbLogo from "@/assets/icons/Facebook_logo.svg";
import ggLogo from "@/assets/icons/Google_logo.svg";
import UserModel from "../../../models/user.model";

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

const LoginForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const navigateTo = searchParams.get("redirect") || "/home";

  const [signUpError, setSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  document.title = "Đăng nhập";

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Nhập email của bạn")
      .required("Bạn cần nhập email của mình"),
    password: Yup.string().required("Bạn cần nhập mật khẩu để đăng nhập"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          email: values.email,
          password: values.password,
        };
        const response = await customAxios.post("/auth/sign-in", payload);

        const user: UserModel = response.data.data.user;
        const access_token: string = response.data.data.access_token;
        const refresh_token: string = response.data.data.refresh_token;

        if (user && access_token) {
          dispatch(
            setUser({
              access_token: access_token,
              user: user,
              refresh_token: refresh_token,
            })
          );

          if (user.role === "admin") {
            navigate("/admin/accounts", { replace: true });
          } else {
            navigate(navigateTo, { replace: true });
          }
        } else {
          setSignUpError(true);
          setErrorMessage("Server return error data.");
        }
      } catch (error) {
        if (
          error.response.data.message === "Please verify your email" &&
          error.response.data.error === "Please verify your email" &&
          error.response.data.error.statusCode === 400
        ) {
          navigate("/not-verify", { replace: true });
          return;
        }
        setSignUpError(true);
        setErrorMessage(error.response.data.message);
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  const loginGoogle = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const googleLoginUrl = apiUrl + API_GOOGLE_LOGIN;

    window.open(googleLoginUrl, "_self");
  };

  const loginFacebook = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const facebookLoginUrl = apiUrl + API_FACEBOOK_LOGIN;

    window.open(facebookLoginUrl, "_self");
  };

  return (
    <Box sx={{ p: 4 }}>
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
            Đăng nhập
          </Typography>
          <Typography
            color="text.secondary"
            gutterBottom
            variant="body1"
            component="div"
          >
            Sử dụng tài khoản K3 của bạn
          </Typography>
        </Box>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box
            component={motion.div}
            animate={{
              transition: {
                staggerChildren: 0.55,
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              animate={animate}
            >
              <TextField
                fullWidth
                autoComplete="Tên đăng nhập"
                type="email"
                label="Email"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                autoComplete="Mật khẩu"
                label="Mật khẩu"
                type="password"
                {...getFieldProps("password")}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{}}
              />
            </Box>

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={animate}
            >
              <FormHelperText
                id="notify-helper"
                error={Boolean(signUpError && errorMessage)}
              >
                {signUpError && errorMessage}
              </FormHelperText>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      {...getFieldProps("remember")}
                      checked={values.remember}
                    />
                  }
                  label="Ghi nhớ đăng nhập"
                />

                <Link
                  component={RouterLink}
                  variant="subtitle2"
                  to="/recover-password"
                  underline="hover"
                >
                  Quên mật khẩu?
                </Link>
              </Stack>
              <LoadingButton
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                fullWidth
              >
                {isSubmitting ? "loading..." : "Đăng nhập"}
              </LoadingButton>
            </Box>
          </Box>
        </Form>
      </FormikProvider>
      <Stack
        direction="row"
        flexWrap={"wrap"}
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2, borderTop: 3 }}
      >
        <Box sx={{ mt: 2 }}>
          <Button
            size="large"
            variant="outlined"
            startIcon={
              <Avatar
                alt="Google Logo"
                src={ggLogo}
                sx={{ width: 24, height: 24 }}
              />
            }
            sx={{ width: 190, height: 40 }}
            onClick={() => loginGoogle()}
          >
            Google
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            size="large"
            variant="outlined"
            startIcon={
              <Avatar
                alt="Google Logo"
                src={fbLogo}
                sx={{ width: 24, height: 24 }}
              />
            }
            sx={{ width: 190, height: 40 }}
            onClick={() => loginFacebook()}
          >
            Facebook
          </Button>
        </Box>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{ my: 2 }}
      >
        Bạn chưa có tài khoản?
        <Link
          component={RouterLink}
          variant="subtitle2"
          to="/sign-up"
          underline="hover"
          sx={{ m: 1 }}
        >
          Đăng ký
        </Link>
      </Stack>
    </Box>
  );
};

export default LoginForm;
