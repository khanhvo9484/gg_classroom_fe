import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
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
  Button
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";

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

const LoginForm = ({ setAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
    onSubmit: () => {
        navigate(from, { replace: true });
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <Box sx={{p: 4}}>
      <FormikProvider value={formik}>
        <Box sx={{p: 2}}>
          <Box
            component="img"
            src={"https://i.postimg.cc/CL7CmGSx/google-logo-png-29530.png"}
            sx={{ objectFit: "fit", width: "250px"}}
          />
          <Typography
            color = "text.primary"
            gutterBottom
            variant="h4"
            component="div"
            sx={{ fontWeight: 600 }}
          >Đăng nhập</Typography>
          <Typography
            color ="text.secondary"
            gutterBottom
            variant="h6"
            component="div"
            sx={{ fontWeight: 600 }}
          >Sử dụng tài khoản K3 của bạn</Typography>
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
                  to="#"
                  underline="hover"
                >
                  Quên mật khẩu?
                </Link>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ my: 2 }}
              >
                <Link
                  component={RouterLink}
                  variant="subtitle2"
                  to="/signup"
                  underline="hover"
                >
                  Tạo tài khoản
                </Link>
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {isSubmitting ? "loading..." : "Đăng nhập"}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default LoginForm;