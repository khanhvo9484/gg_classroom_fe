import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Box,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FormHelperText } from "@mui/material";
import { customAxios } from "../../../api/custom-axios";
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

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

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
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          password: values.password,
        };
        // 👇️ const data: CreateUserResponse
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

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

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
  );
};

export default RecoveryChangePasswordForm;
