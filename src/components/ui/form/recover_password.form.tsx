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

    document.title = "Quên mật khẩu";

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
                    const payload = { email: values.email };
                    const response = await customAxios.post("/auth/forgot-password", payload);
                    if (response.status === 200)
                    {
                        toast.success("Gửi yêu cầu tạo mới mật khẩu thành công");
                        setIsVerify(false);
                        setIsWaiting(true);
                    }
                } else {
                    setRecoverError(true);
                    setErrorMessage("Form return error data.");
                }
            } catch (error) {
                setRecoverError(true);
                setErrorMessage(error.response.data.message);
                setIsFilling(true);
                setIsWaiting(false);
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
                                    onFocus={() => {
                                        setRecoverError(false);
                                    }}
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
                                    onClick={() => {
                                        if ((touched.email && errors.email)){
                                            return
                                        } else if (values.email === ""){
                                            setRecoverError(true);
                                            setErrorMessage("Bạn cần nhập email khôi phục của mình");
                                        } else
                                        {
                                            setIsVerify(true);
                                            setIsFilling(false);
                                        }
                                    }}
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
                            Nhận đường dẫn xác minh
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
                                K3 Learning sẽ gửi đường dẫn khôi phục tới {values.email}{". "}
                                Hãy nhấn vào nút Gửi bên dưới để nhận đường dẫn qua email.
                            </Typography>
                        </Box>
                        <Stack
                            direction="row"
                            alignItems="right"
                            justifyContent="right"
                            sx={{ my: 2 }}
                        >
                            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                                <LoadingButton
                                    size="medium"
                                    variant="contained"
                                    loading={isSubmitting}
                                    type="submit"
                                    >
                                    {isSubmitting ? "loading..." : "Gửi"}
                                </LoadingButton>
                            </Form>
                        </Stack>
                    </Box>
                </FormikProvider>
            </Box>
        )
    } else if (isWaiting) {
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
                            K3 Learning vừa gửi email chứa đường dẫn
                            khôi phục mật khẩu đến topsiu1.ds@gmail.com.
                            Vui lòng sử dụng được dẫn đó để tạo lại mật khẩu.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        )
    }
};

export default LoginForm;
