import { Button, Grid, Typography } from "@mui/material";
import { GradeReviewStatus } from "./review-list.component";
import { convertUtcToVietnamTime } from "@/utils/common.util";

const StudentGradeReviewItem = (params: {
  studentName: string;
  assignmentName: string;
  currentGrade: string;
  expectedGrade: string;
  status: string;
  createdAt: string;
}) => {
  const {
    studentName,
    assignmentName,
    currentGrade,
    expectedGrade,
    status,
    createdAt,
  } = params;
  return (
    <Grid container sx={{}}>
      <Grid xs={2}>
        <Typography variant="body1">{studentName}</Typography>
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" sx={{ marginLeft: 1 }}>
          {assignmentName}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" sx={{ marginLeft: 2 }}>
          {currentGrade}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" sx={{ marginLeft: 3 }}>
          {expectedGrade}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Button
          variant={"outlined"}
          color={
            status === GradeReviewStatus.APPROVED
              ? "primary"
              : status === GradeReviewStatus.PENDING
              ? "warning"
              : "error"
          }
          sx={{ marginLeft: 3 }}
        >
          <Typography variant="body1" sx={{}}>
            {status}
          </Typography>
        </Button>
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" sx={{ marginLeft: 3 }}>
          {convertUtcToVietnamTime(createdAt)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StudentGradeReviewItem;
