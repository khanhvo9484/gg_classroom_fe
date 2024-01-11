import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField, Stack, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { GradeReviewService } from "@/service/grade.review.service";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import {
  IGradeReviewInfor,
  IGradeReviewRequest,
} from "@/models/grade.review.model";
import { useEffect, useState } from "react";
import { ClassService } from "@/service/class.service";
import { IGradeReviewResponseKZ } from "@/pages/class-page/review-request-list/ui/review-list.component";

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
  infoGrade: IGradeReviewResponseKZ;
  title: string;
}

export interface updateGradeRequest {
    courseId: string,
    studentOfficialId: string,
    gradeId: string,
    grade: number,
}

export default function FinalizeGradeDialog(props: SimpleDialogProps) {
  const { courseId } = useParams();
  const { onClose, open, infoGrade, title } = props;
  const gradeService = new ClassService();
  const [inforGradeReview, setInfoGradeReview] =
    useState<IGradeReviewResponseKZ>(infoGrade);

  const navigate = useNavigate();

  const FinalizeGradeSchema = Yup.object().shape({
    grade: Yup.number().required("Bạn cần nhập điểm mới!"),
  });

  useEffect(() => {
    setInfoGradeReview(infoGrade);
  }, [infoGrade]);

  const formik = useFormik({
    initialValues: {
      grade: infoGrade?.currentGrade
    },
    validationSchema: FinalizeGradeSchema,
    onSubmit: async (values) => {
      try {
        const payload: updateGradeRequest = {
          courseId: courseId,
          studentOfficialId: inforGradeReview.user.studentOfficialId,
          gradeId: inforGradeReview.gradeId,
          grade: values.grade,
        };

        console.log(payload);

        const response = await gradeService.updateStudentGrade(payload);

        toast.success("Cập nhật điểm thành công.");

        onClose();

        setTimeout(() => {
          navigate(`/course/${courseId}/grades`, {
            replace: true,
          });
        }, 500);
      } catch (error) {
        console.log(error);
        toast.error("Cập nhật điểm thất bại.");
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{maxWidth: 800, width: 600, ml: 100}}>
      {inforGradeReview && (
        <Box sx={{ py: 2 }}>
          <DialogTitle sx={{ pb: 0 }}>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: 25,
                textAlign: "left",
              }}
            >
              {title}
            </Typography>
          </DialogTitle>
          <Box sx={{ display: "inline-flex", justifyContent: "center" }}>
            <Divider
              sx={{
                borderBottomWidth: 3,
                borderBottomColor: "#E5E1DA",
              }}
            />
          </Box>
          <Box sx={{ px: 3, width: 460 }}>
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
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>Tên: {inforGradeReview.gradeName}</Typography>
                      <Typography>
                        Điểm hiện tại: {inforGradeReview.currentGrade}
                      </Typography>
                    </Box>

                    <TextField
                      fullWidth
                      required
                      autoComplete="Điểm mới"
                      label="Điểm mới"
                      inputProps={{ min: 0, max: 10 }}
                      type="number"
                      {...getFieldProps("grade")}
                      error={Boolean(
                        touched.grade && errors.grade
                      )}
                      helperText={touched.grade && errors.grade}
                    />
                  </Box>

                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={animate}
                  >
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
                        disabled={Boolean(
                          errors.grade || !touched.grade
                        )}
                      >
                        {isSubmitting ? "loading..." : "Cập nhật điểm"}
                      </LoadingButton>
                    </Stack>
                  </Box>
                </Box>
              </Form>
            </FormikProvider>
          </Box>
        </Box>
      )}
    </Dialog>
  );
}
