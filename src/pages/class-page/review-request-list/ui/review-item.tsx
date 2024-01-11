import { Grid, Typography } from "@mui/material";
import React from "react";

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
    <Grid container>
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
        <Typography variant="body1" sx={{ marginLeft: 3 }}>
          {status}
        </Typography>
      </Grid>
      <Grid xs={2}>
        <Typography variant="body1" sx={{ marginLeft: 3 }}>
          {createdAt}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default StudentGradeReviewItem;