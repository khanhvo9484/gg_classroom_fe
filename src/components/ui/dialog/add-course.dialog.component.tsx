import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Stack, Button } from "@mui/material";
import { FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import { customAxios } from "../../../api/custom-axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import useHomeCourses from "@/hooks/home-courses.hook";
import LoadingContext from "@/context/loading.contenxt";

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

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
  updateCourses: (courseId: string) => void;
}

export default function AddCourseDialog(props: SimpleDialogProps) {
  const { onClose, open, updateCourses } = props;
  const [signUpError, setSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { coursesMutate } = useHomeCourses();
  const CreateCourseSchema = Yup.object().shape({
    name: Yup.string().required("Bạn cần nhập tên lớp học của mình"),
    description: Yup.string(),
  });
  const { stopLoading, startLoading } = useContext(LoadingContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: CreateCourseSchema,
    onSubmit: async (values) => {
      startLoading();
      try {
        const payload = {
          name: values.name,
          description: values.description,
        };
        // 👇️ const data: CreateUserResponse
        const response = await customAxios.post("/courses/create", payload);
        if (response.status) {
          coursesMutate([]);
          toast.success("Tạo lớp học mới thành công");
          updateCourses(response.data.data.id);
          onClose();
        } else {
          setSignUpError(true);
          setErrorMessage("Tạo lớp học mới thất bại. Lỗi từ máy chủ.");
        }
      } catch (error) {
        setSignUpError(true);
        setErrorMessage(error.response.data.message);
      }
      stopLoading();
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Tạo lớp học</DialogTitle>
      <Box sx={{ p: 4, width: 400 }}>
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
                  required
                  autoComplete="Tên lớp học"
                  label="Tên lớp học"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />

                <TextField
                  fullWidth
                  autoComplete="Mô tả môn học"
                  label="Mô tả"
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
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Hủy
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="text"
                    loading={isSubmitting}
                    disabled={Boolean(errors.name || !touched.name)}
                  >
                    {isSubmitting ? "loading..." : "Tạo lớp học"}
                  </LoadingButton>
                </Stack>
              </Box>
            </Box>
          </Form>
        </FormikProvider>
      </Box>
    </Dialog>
  );
}
