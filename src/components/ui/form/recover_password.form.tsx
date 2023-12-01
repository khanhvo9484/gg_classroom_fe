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
    TextField,
    Stack
} from "@mui/material";
import { FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import { customAxios } from "../../../api/custom-axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/auth.slice";
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
    let [searchParams, setSearchParams] = useSearchParams();
    const navigateTo = searchParams.get("redirect") || "/home";

    const [recoverError, setRecoverError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();

    const [isFilling, setIsFilling] = useState(true);
    const [isVerify, setIsVerify] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);

    document.title = "Đăng nhập";

    const EmailSchema = Yup.object().shape({
        email: Yup.string()
        .email("Email khôi phục không hợp lệ")
        .required("Bạn cần nhập email khôi phục của mình"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: EmailSchema,
        onSubmit: async (values) => {
        try {
            if (values.email) {
                setIsVerify(true);
                setIsFilling(false)
                console.log("submit1");
            } else {
                setRecoverError(true);
                setErrorMessage("Server return error data.");
            }
        } catch (error) {
            setRecoverError(true);
            setErrorMessage(error.response.data.message);
        }
        },
    });


    const RecoverySchema = Yup.object().shape({
        recovery_code: Yup.string()
        .required("Bạn cần nhập code khôi phục nhận được"),
    });
    const recoveryForm = useFormik({
        initialValues: {
            recovery_code: "",
        },
        validationSchema: RecoverySchema,
        onSubmit: async (values) => {
        try {
            if (values.recovery_code) {
                navigate(navigateTo, { replace: true });
            } else {
                setRecoverError(true);
                setErrorMessage("Server return error data.");
            }
        } catch (error) {
            setRecoverError(true);
            setErrorMessage(error.response.data.message);
        }
        },
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
        formik;

    if (isFilling){
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
                        Tìm lại mật khẩu
                    </Typography>
                    <Typography
                        color="text.secondary"
                        gutterBottom
                        variant="body1"
                        component="div"
                    >
                        Nhập email đăng nhập của bạn
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
                                    mb: 2
                                }}
                                component={motion.div}
                                initial={{ opacity: 0, y: 40 }}
                                animate={animate}
                            >
                                <TextField
                                    fullWidth
                                    autoComplete="Nhập email khôi phục"
                                    type="email"
                                    label="Email khôi phục"
                                    {...getFieldProps("email")}
                                    error={Boolean(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                />
                            </Box>

                            <Box
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={animate}
                            >
                                <FormHelperText
                                    id="notify-helper"
                                    error={Boolean(recoverError && errorMessage)}
                                >
                                    {recoverError && errorMessage}
                                </FormHelperText>
                            </Box>
                            <Stack
                                direction="row"
                                alignItems="right"
                                justifyContent="right"
                                sx={{ my: 2 }}
                            >
                                <LoadingButton
                                    size="large"
                                    variant="contained"
                                    loading={isSubmitting}
                                    type="submit"
                                    >
                                    {isSubmitting ? "loading..." : "Tiếp tục"}
                                </LoadingButton>
                            </Stack>
                        </Box>
                    </Form>
                </FormikProvider>
            </Box>
        );
    } else if (isVerify){
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
                            Nhận mã xác minh
                        </Typography>
                        <Typography
                            color="text.secondary"
                            gutterBottom
                            variant="body1"
                            component="div"
                        >
                            Để giữ an toàn cho tài khoản của bạn, K3 Learning muốn đảm bảo rằng
                            bạn chính là người đang cố đăng nhập
                        </Typography>
                    </Box>
                    <Box
                        component="img"
                        src={"https://ssl.gstatic.com/accounts/account-recovery-email-pin.gif"}
                        sx={{ objectFit: "fit", width: "100" }}
                    />
                    <Box sx={{borderTop: 4}}>
                        <Box sx={{ p: 2 }}>
                            <Typography
                                color="text.secondary"
                                gutterBottom
                                variant="body1"
                                component="div"
                            >
                                K3 Learning sẽ gửi mã xác minh tới {values.email}{". "}
                                Hãy nhấn vào nút Gửi bên dưới để nhận mã qua email.
                            </Typography>
                        </Box>
                        <Stack
                            direction="row"
                            alignItems="right"
                            justifyContent="right"
                            sx={{ my: 2 }}
                        >
                            <LoadingButton
                                size="medium"
                                variant="contained"
                                loading={isSubmitting}
                                type="submit"
                                onClick={() => {
                                    setIsVerify(false);
                                    setIsWaiting(true);
                                }}
                                >
                                {isSubmitting ? "loading..." : "Gửi"}
                            </LoadingButton>
                        </Stack>
                    </Box>
                </FormikProvider>
            </Box>
        )
    } else if (isWaiting) {
        return (
            <Box sx={{ p: 4 }}>
                <FormikProvider value={recoveryForm}>
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
                            Nhận mã xác minh
                        </Typography>
                        <Typography
                            color="text.secondary"
                            gutterBottom
                            variant="body1"
                            component="div"
                        >
                            Để giữ an toàn cho tài khoản của bạn, K3 Learning muốn đảm bảo rằng
                            bạn chính là người đang cố đăng nhập
                        </Typography>
                        <Box sx={{ p: 2 }}>
                            <Typography
                                color="text.secondary"
                                gutterBottom
                                variant="body1"
                                component="div"
                            >
                                Google vừa gửi email chứa mã xác minh đến địa chỉ email
                                khôi phục của bạn là topsiu1.ds@gmail.com.
                                Vui lòng kiểm tra email này để lấy mã và nhập vào bên dưới.
                            </Typography>
                        </Box>
                    </Box>
                    <Form autoComplete="off" noValidate onSubmit={recoveryForm.handleSubmit}>
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
                                    mb: 2
                                }}
                                component={motion.div}
                                initial={{ opacity: 0, y: 40 }}
                                animate={animate}
                            >
                                <TextField
                                    fullWidth
                                    autoComplete="Nhập mã khôi phục"
                                    label="Nhập mã"
                                    {...recoveryForm.getFieldProps("recovery_code")}
                                    error={Boolean(recoveryForm.touched.recovery_code && recoveryForm.errors.recovery_code)}
                                    helperText={recoveryForm.touched.recovery_code && recoveryForm.errors.recovery_code}
                                />
                            </Box>
                        </Box>
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, y: 20 }}
                            animate={animate}
                        >
                            <FormHelperText
                                id="notify-helper"
                                error={Boolean(recoverError && errorMessage)}
                            >
                                {recoverError && errorMessage}
                            </FormHelperText>
                        </Box>
                        <Box sx={{borderTop: 4}}>
                            <Stack
                                direction="row"
                                alignItems="right"
                                justifyContent="right"
                                sx={{ my: 2 }}
                            >
                                <LoadingButton
                                    size="medium"
                                    variant="contained"
                                    loading={recoveryForm.isSubmitting}
                                    type="submit"
                                    >
                                    {recoveryForm.isSubmitting ? "loading..." : "Xác nhận"}
                                </LoadingButton>
                            </Stack>
                        </Box>
                    </Form>
                </FormikProvider>
            </Box>
        )
    }
};

export default LoginForm;
