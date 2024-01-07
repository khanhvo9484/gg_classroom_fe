import * as React from "react";
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
import { Grid, Typography } from "@mui/material"
import { IGradeSingle, ISubGrade } from "@/models/grade.model";
import { styled } from '@mui/material/styles';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
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
  grade: IGradeSingle;
  subGrade: ISubGrade;
}

export default function GradeReviewRequestDialog(props: SimpleDialogProps) {

    const { courseId } = useParams();
  const { onClose, open, grade, subGrade } = props;
  const gradeReviewService = new GradeReviewService();
  const [ currentFile, setCurrentFile ] = React.useState(null);

  const navigate = useNavigate();

  const RequestReviewSchema = Yup.object().shape({
    expectedGrade: Yup.number().required("Bạn cần nhập điểm mình mong muốn!"),
    explaination: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
        expectedGrade: 0,
        explaination: "",
    },
    validationSchema: RequestReviewSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
            expectedGrade: values.expectedGrade,
            explaination: values.explaination,
            file: currentFile
        };
        const reviewId = 1;
        const response = true;
        if (response) {
            toast.success("Yêu cầu phúc khảo thành công.");
            onClose();
            navigate(`/course/${courseId}/grade-review/${reviewId}`, { replace: true });
        } else {
            toast.error("Yêu cầu phúc khảo thất bại.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Yêu cầu phúc khảo thất bại.");
      }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle sx={{mb: -3}}>
            <Typography gutterBottom sx={{ fontWeight: 400, fontSize: 25, textAlign: 'center' }}>
                {`Phúc khảo điểm: ${grade && grade.gradeComponentName}`}
            </Typography>
        </DialogTitle>
        <Box sx={{display: 'inline-flex', justifyContent: 'center'}}>
            <Divider sx={{ borderBottomWidth: 3, borderBottomColor: "#E5E1DA", width: "90%",  }} />
        </Box>
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
                        <Grid container spacing={3} sx={{ ml:4, my: 1, display: 'flex', justifyContent: 'space-between' }}>
                            <Grid xs={6}>
                                <Typography gutterBottom sx={{ fontWeight: 400, fontSize:20 }}>
                                    {"Điểm hiện tại: "}
                                    <span style={{marginLeft: "5px"}}>{grade && grade.totalGrade}</span>
                                </Typography>
                            </Grid>
                            <Grid xs={6}>
                                <Typography gutterBottom sx={{ fontWeight: 400, fontSize:20 }}>
                                    {"Trị số: "}
                                    <span style={{marginLeft: "5px"}}>{grade && grade.percentage}%</span>
                                </Typography>
                            </Grid>
                        </Grid>
                        <TextField
                            fullWidth
                            required
                            autoComplete="Điểm mong muốn"
                            label="Điểm mong muốn"
                            {...getFieldProps("expectedGrade")}
                            error={Boolean(touched.expectedGrade && errors.expectedGrade)}
                            helperText={touched.expectedGrade && errors.expectedGrade}
                        />

                        <TextField
                            fullWidth
                            autoComplete="Lý do cần phúc khảo"
                            label="Lý do"
                            {...getFieldProps("explaination")}
                            error={Boolean(touched.explaination && errors.explaination)}
                            helperText={touched.explaination && errors.explaination}
                            multiline
                            minRows={3}
                        />

                        <Stack direction="row">
                            <Button component={"label"} sx={{width: 2}}
                            startIcon={<AttachFileIcon />}>
                                <VisuallyHiddenInput type="file"
                                {...getFieldProps("file")}
                                onInputCapture={(event) => {console.log(event.target.files[0]);
                                                            setCurrentFile(event.target.files[0])}}/>
                            </Button>
                            {currentFile && (<img
                                src={URL.createObjectURL(currentFile)}
                                alt={"Minh chứng"}
                                width={150}
                            />)}
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
                            disabled={Boolean(errors.expectedGrade || !touched.expectedGrade
                                            || errors.explaination || !touched.explaination)}
                        >
                            {isSubmitting ? "loading..." : "Yêu cầu phúc khảo"}
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
