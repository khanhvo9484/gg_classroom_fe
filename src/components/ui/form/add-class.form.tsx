import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
    Box,
    TextField,
    Stack,
    Button
} from "@mui/material";
import { FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import { customAxios } from "../../../api/custom-axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import { useDispatch } from "react-redux";
import { selectCourses } from "@/redux/courses.slice";
import { setCourses } from "@/redux/courses.slice";

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

const CreateClassForm = () => {

    const [signUpError, setSignUpError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const courses = useSelector(selectCourses);

    const CreateClassSchema = Yup.object().shape({
        name: Yup.string()
        .required("Bạn cần nhập tên lớp học của mình"),
        description: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: ""
        },
        validationSchema: CreateClassSchema,
        onSubmit: async (values) => {
            try {
                const payload = {
                    name: values.name,
                    description: values.description,
                };
                // 👇️ const data: CreateUserResponse
                const response = await customAxios.post("/courses/create", payload);
                console.log(response.data.data);
                if (response) {
                    console.log(response.data.data);
                    const newCourse = Object.assign({}, response.data.data, {
                        courseOwner: user
                    });
                    const newCourses = [...courses, newCourse];
                    console.log(newCourse);
                    dispatch(
                        setCourses({
                            courses : newCourses
                        })
                    );
                    toast.success("Tạo lớp học thành công");
                } else {
                    toast.error("Tạo lớp học thất bại.");
                    setSignUpError(true);
                    setErrorMessage("Lỗi từ phía máy chủ.");
                }
            } catch (error) {
                console.log(error);
                toast.error("Tạo lớp học thất bại");
                setSignUpError(true);
                setErrorMessage(error.response.data.message);
            }
        },
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
        formik;

    return (
        <Box sx={{ p: 4 }}>
            <FormikProvider value={formik}>
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
                            autoComplete="Tên lớp học"
                            label="tên lớp học(bắt buộc)"
                            {...getFieldProps("name")}
                            error={Boolean(touched.name && errors.name)}
                            helperText={touched.name && errors.name}
                        />

                        <TextField
                            fullWidth
                            autoComplete="Miêu tả môn học"
                            label="miêu tả môn học"
                            {...getFieldProps("description")}
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
                                alignItems="right"
                                justifyContent="right"
                                sx={{ my: 2 }}
                            >
                                <Button
                                    variant="text"
                                >
                                    Hủy
                                </Button>
                                <LoadingButton
                                    type="submit"
                                    variant="text"
                                    loading={isSubmitting}
                                    disabled={Boolean(!(touched.name && errors.name))}
                                >
                                    {isSubmitting ? "loading..." : "Tạo lớp học"}
                                </LoadingButton>
                            </Stack>
                        </Box>
                    </Box>
                </Form>
            </FormikProvider>
        </Box>
    );
};

export default CreateClassForm;
