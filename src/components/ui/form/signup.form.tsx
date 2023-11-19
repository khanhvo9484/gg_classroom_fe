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

const SignupForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  document.title = "Đăng ký";

  const SignupSchema = Yup.object().shape({
    policy: Yup.boolean().isTrue(
      "Bàn cần phải đồng ý với điều khoản của chúng tôi"
    ),
    name: Yup.string()
      .min(2, "Ít nhất 2 ký tự")
      .max(50, "Tối đa 50 ký tự")
      .required("Bạn cần nhập tên của mình"),
    dateOfBirth: Yup.date()
      .typeError("Bạn cần cung cấp ngày sinh của mình")
      .required("Bạn cần cung cấp ngày sinh của mình"),
    email: Yup.string()
      .email("Email bạn nhập chưa đúng quy định")
      .required("Bạn cần nhập email của mình"),
    password: Yup.string().required("Bạn cần nhập mật khẩu"),
    repassword: Yup.string()
      .required("Bạn cần nhập lại mật khẩu")
      .oneOf([Yup.ref("password")], "Mật khẩu nhập vào không trùng khớp"),
  });

  const formik = useFormik({
    initialValues: {
      policy: false,
      name: "",
      email: "",
      password: "",
      repassword: "",
      dateOfBirth: dayjs("2022-04-17"),
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          email: values.email,
          name: values.name,
          dob: values.dateOfBirth,
          role: "user",
          password: values.password,
        };
        // 👇️ const data: CreateUserResponse
        await customAxios.post("/auth/sign-up", payload, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        navigate("/", { replace: true });
      } catch (error) {
        setSignUpError(true);
        setErrorMessage(error.response.data.message);
      }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Box sx={{ p: 2 }}>
      <FormikProvider value={formik}>
        <Box sx={{ p: 2 }}>
          <Box
            component="img"
            src={"https://i.postimg.cc/CL7CmGSx/google-logo-png-29530.png"}
            sx={{ objectFit: "fit", width: "250px" }}
          />
          <Typography
            color="text.primary"
            gutterBottom
            variant="h4"
            component="div"
            sx={{ fontWeight: 600 }}
          >
            Đăng ký
          </Typography>
          <Typography
            color="text.secondary"
            gutterBottom
            variant="body1"
            component="div"
          >
            Tạo tài khoản K3 cho bạn
          </Typography>
        </Box>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Stack
              spacing={3}
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              animate={animate}
            >
              <TextField
                fullWidth
                autoComplete="địa chỉ email"
                type="email"
                label="Địa chỉ email"
                {...getFieldProps("email")}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                label="Họ và tên"
                {...getFieldProps("name")}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <DatePicker
                disableFuture
                minDate={dayjs("1980-01-01")}
                label="Ngày sinh"
                format="DD/MM/YYYY"
                sx={{ width: "100%" }}
                slotProps={{
                  textField: {
                    size: "small",
                    error: Boolean(touched.dateOfBirth && errors.dateOfBirth),
                  },
                }}
                {...getFieldProps("dateOfBirth")}
              />

              <TextField
                fullWidth
                autoComplete="mật khẩu"
                type={showPassword ? "text" : "password"}
                label="Mật khẩu"
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
                        {showPassword ? (
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
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ "aria-label": "controlled" }}
                    {...getFieldProps("policy")}
                  />
                }
                label="Tôi đồng ý với các điều khoản dịch vụ."
              />
              <FormHelperText
                id="policy-helper"
                error={Boolean(touched.policy && errors.policy)}
              >
                {touched.policy && errors.policy}
              </FormHelperText>
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
                Đăng ký
              </LoadingButton>
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default SignupForm;
