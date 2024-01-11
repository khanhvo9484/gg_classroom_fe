import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Stack, CardContent } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import UserModel from "@/models/user.model";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import { customAxios } from "@/api/custom-axios";
import { useState } from "react";
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

export interface CommentProps {
  updateData: (newComment) => void;
  rollbackData: (newComment) => void;
  courseId: string;
  ownerId: string;
  gradeReviewId: string;
}

export interface Comment {
  account: UserModel;
  comment: string;
  createdTime: string;
}

export interface IGradeReviewComment {
  user: UserModel;
  userId: string;
  gradeReviewId: string;
  content: string;
  ownerId: string;
  courseId: string;
}

const CommentInputComponent: React.FC<CommentProps> = ({
  updateData,
  rollbackData,
  courseId,
  ownerId,
  gradeReviewId,
}) => {
  const userProfile = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);

  const CommentSchema = Yup.object().shape({
    comment: Yup.string().required("Bạn cần nhập câu trả lời của bạn!"),
  });

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          comment: values.comment,
        };
        const newComment: IGradeReviewComment = {
          user: userProfile,
          userId: userProfile.id,
          gradeReviewId: gradeReviewId,
          content: values.comment,
          ownerId: ownerId,
          courseId: courseId,
        };
        updateData(newComment);
        const result = await customAxios.post(
          "/grade-review/comment-on-grade-review",
          { ...newComment, user: undefined }
        );
        if (result.status === 201 || result.status === 200) {
        } else {
          rollbackData(newComment);
          toast.error("Trả lờithất bại.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Trả lời thất bại.");
      } finally {
        resetForm();
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <CardContent>
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
              <Stack direction="row">
                <AvatarHelper
                  sx={{ width: 32, height: 32, mr: 4, ml: 2 }}
                  user={userProfile}
                />
                <TextField
                  fullWidth
                  required
                  autoComplete="Câu trả lời"
                  placeholder="Nhập câu trả lời của bạn"
                  {...getFieldProps("comment")}
                  error={Boolean(touched.comment && errors.comment)}
                  helperText={touched.comment && errors.comment}
                  multiline
                  sx={{ mt: -1 }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  disabled={Boolean(errors.comment || !touched.comment)}
                  sx={{ mt: -1 }}
                >
                  {isSubmitting ? "Đang gửi..." : <SendIcon />}
                </LoadingButton>
              </Stack>
            </Box>
          </Box>
        </Form>
      </FormikProvider>
      <Divider sx={{ mt: 1 }} />
    </CardContent>
  );
};

export default CommentInputComponent;
