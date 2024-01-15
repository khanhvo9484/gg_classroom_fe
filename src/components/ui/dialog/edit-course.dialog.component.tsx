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
import { ICourse } from "@/models/class.model";
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
  course: ICourse;
  open: boolean;
  onClose: () => void;
  updateCourses: () => void;
}

export default function EditCourseDialog(props: SimpleDialogProps) {
  const { onClose, open, updateCourses, course } = props;
  const [signUpError, setSignUpError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { courses, coursesMutate } = useHomeCourses();
  const { stopLoading, startLoading } = useContext(LoadingContext);


  const EditCourseSchema = Yup.object().shape({
    name: Yup.string().required("Bạn cần nhập tên lớp học của mình"),
    description: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      name: course.name,
      description: course.description,
    },
    validationSchema: EditCourseSchema,
    onSubmit: async (values) => {
      startLoading();
      try {
        const payload = {
          name: values.name,
          description: values.description,
          id: course.id,
          isDeleted: course.isDeleted
        };
        // 👇️ const data: CreateUserResponse
        const response = await customAxios.put(
          "/courses/update-course",
          payload
        );
        if (response) {
          coursesMutate(courses);
          toast.success("Chỉnh sửa thông tin lớp thành công");
          onClose();
          updateCourses();
        } else {
          setSignUpError(true);
          setErrorMessage(
            "Chỉnh sửa thông tin lớp thất bại thất bại. Lỗi từ máy chủ."
          );
        }
      } catch (error) {
        setSignUpError(true);
        setErrorMessage(error.response.data && error.response.data.message);
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
      <DialogTitle>Chỉnh sửa thông tin lớp học</DialogTitle>
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
                    {isSubmitting ? "loading..." : "Chỉnh sửa lớp học"}
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
