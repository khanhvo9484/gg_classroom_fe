import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { Grid, ListItemButton, Popover } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StudentGradeReviewItem from "./review-item";

interface Props {}

const ReviewRequestListComponent: React.FC<Props> = () => {
  const { courseId } = useParams();

  const navigate = useNavigate();

  const handleRequestClick = (reviewRequestId: string) => {
    navigate(`/course/${courseId}/grade-review/${reviewRequestId}`, {
      replace: true,
    });
  };

  return (
    <Box sx={{ marginTop: 4, marginBottom: 10 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgb(95,99,104)",
          paddingBottom: 1,
        }}
      >
        <Grid container>
          <Grid xs={2}>
            <Typography
              variant="h6"
              sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
            >
              {`Tên sinh viên`}
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography
              variant="h6"
              sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
            >
              {`Tên bài tập`}
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography
              variant="h6"
              sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
            >
              {`Điểm hiện tại`}
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography
              variant="h6"
              sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
            >
              {`Điểm mong muốn`}
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography
              variant="h6"
              sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
            >
              {`Trạng thái`}
            </Typography>
          </Grid>
          <Grid xs={2}>
            <Typography
              variant="h6"
              sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
            >
              {`Thời gian`}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItemButton
          sx={{ borderRadius: 2 }}
          onClick={() => handleRequestClick("1")}
        >
          <StudentGradeReviewItem
            studentName="Khoa"
            assignmentName="BTVN"
            status="Đang chờ"
            currentGrade="9"
            expectedGrade="10"
            createdAt="1222"
          />
        </ListItemButton>
        <Divider sx={{ marginTop: 1 }} variant="fullWidth" component="li" />
      </List>
    </Box>
  );
};

export default ReviewRequestListComponent;
