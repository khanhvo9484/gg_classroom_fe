import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
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

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

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
  infoGrade: IGradeReviewInfor;
}

export default function GradeReviewRequestDialog(props: SimpleDialogProps) {
  const { courseId } = useParams();
  const { onClose, open, infoGrade } = props;
  const gradeReviewService = new GradeReviewService();
  const [inforGradeReview, setInfoGradeReview] =
    useState<IGradeReviewInfor>(infoGrade);
  const [currentFile, setCurrentFile] = useState(null);

  useEffect(() => {
    setInfoGradeReview(infoGrade);
  }, [infoGrade]);

  const RequestReviewSchema = Yup.object().shape({
    expectedGrade: Yup.number().required("Bạn cần nhập điểm mình mong muốn!"),
    explaination: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      expectedGrade: 0,
      explaination: "",
    },
    validationSchema: RequestReviewSchema,
    onSubmit: async (values) => {
      try {
        const payload: IGradeReviewRequest = {
          expectedGrade: values.expectedGrade,
          explaination: values.explaination,
          courseId: courseId,
          studentId: infoGrade.studentId,
          gradeId: infoGrade.gradeId,
          currentGrade: infoGrade.currentGrade,
          gradeName: infoGrade.name,
          file: currentFile,
        };

        console.log("REQUEST: ", payload);

        const response = await gradeReviewService.createGradeReview(payload);

        console.log("response: ", response);

        toast.success("Yêu cầu phúc khảo thành công.");

        onClose();
      } catch (error) {
        console.log(error);
        toast.error("Yêu cầu phúc khảo thất bại.");
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleClose = () => {
    onClose();
    formik.resetForm();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
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
              Phúc khảo điểm
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
                      <Typography>Tên: {infoGrade.name}</Typography>
                      <Typography>
                        Điểm hiện tại: {infoGrade.currentGrade}
                      </Typography>
                    </Box>

                    <TextField
                      fullWidth
                      required
                      autoComplete="Điểm mong muốn"
                      label="Điểm mong muốn"
                      inputProps={{ min: 0, max: 10 }}
                      type="number"
                      {...getFieldProps("expectedGrade")}
                      error={Boolean(
                        touched.expectedGrade && errors.expectedGrade
                      )}
                      helperText={touched.expectedGrade && errors.expectedGrade}
                    />

                    <TextField
                      fullWidth
                      autoComplete="Lý do cần phúc khảo"
                      label="Lý do"
                      {...getFieldProps("explaination")}
                      error={Boolean(
                        touched.explaination && errors.explaination
                      )}
                      helperText={touched.explaination && errors.explaination}
                      multiline
                      minRows={3}
                    />

                    <Stack direction="row">
                      <Button
                        component={"label"}
                        sx={{ width: 2 }}
                        startIcon={<AttachFileIcon />}
                      >
                        <VisuallyHiddenInput
                          type="file"
                          {...getFieldProps("file")}
                          onInputCapture={(event) => {
                            console.log(
                              (event.target as HTMLInputElement).files[0]
                            );
                            setCurrentFile(
                              (event.target as HTMLInputElement).files[0]
                            );
                          }}
                        />
                      </Button>
                      {currentFile && (
                        <img
                          src={URL.createObjectURL(currentFile)}
                          alt={"Minh chứng"}
                          width={150}
                        />
                      )}
                    </Stack>
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
                          errors.expectedGrade ||
                            !touched.expectedGrade ||
                            errors.explaination
                        )}
                      >
                        {isSubmitting ? "loading..." : "Yêu cầu phúc khảo"}
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
