import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { Grid, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import StudentGradeReviewItem from "./review-item";
import { useState, useEffect, useContext } from "react";
import { customAxios } from "@/api/custom-axios";
import UserModel from "@/models/user.model";
import RoleContext from "@/context/role.context";
import LinearProgress from "@mui/material/LinearProgress";

export interface IGradeReviewFinal {
  gradeReviewId: string;
  gradeReviewerId: string;
  finalGrade: number;
  createdAt?: string;
}
export interface IGradeReviewResponseKZ {
  id: string;
  studentId: string;
  courseId: string;
  gradeId: string;
  gradeName: string;
  percentage: number;
  currentGrade: number;
  expectedGrade: number;
  explaination: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  imgURL?: string;
  status?: string;
  user?: UserModel;
  final?: IGradeReviewFinal;
}
export enum GradeReviewStatus {
  PENDING = "Đang chờ",
  APPROVED = "Đã chấp nhận",
  REJECTED = "Đã từ chối",
}
export const GradeReviewStatusDict = {
  pending: GradeReviewStatus.PENDING,
  approved: GradeReviewStatus.APPROVED,
  rejected: GradeReviewStatus.REJECTED,
};
interface Props {}
const API_GRADE_REVIEW_LIST =
  "/grade-review/all-grade-review/{courseId}?roleInCourse={roleInCourseInput}";
const ReviewRequestListComponent: React.FC<Props> = () => {
  const { courseId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isTeacher } = useContext(RoleContext);
  useEffect(() => {
    try {
      const fetcher = async (): Promise<IGradeReviewResponseKZ[]> => {
        if (isTeacher) {
          const { data: response } = await customAxios.get(
            API_GRADE_REVIEW_LIST.replace("{courseId}", courseId).replace(
              "{roleInCourseInput}",
              "teacher"
            )
          );
          setReviews(response.data);
          setIsLoading(false);
          return response.data;
        } else {
          const { data: response } = await customAxios.get(
            API_GRADE_REVIEW_LIST.replace("{courseId}", courseId).replace(
              "{roleInCourseInput}",
              "student"
            )
          );

          setReviews(response.data);
          setIsLoading(false);
          return response.data;
        }
      };
      fetcher();
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  }, []);

  const navigate = useNavigate();

  const handleRequestClick = (reviewRequestId: string) => {
    navigate(`/course/${courseId}/grade-review/${reviewRequestId}`, {
      replace: true,
    });
  };

  return (
    <>
      {isLoading && <LinearProgress sx={{ top: -36 }} />}
      {!isLoading && (
        <Box sx={{ marginBottom: 10 }}>
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
            {reviews.length === 0 && (
              <Typography
                sx={{ margin: "2rem auto", textAlign: "center" }}
                variant="body1"
                gutterBottom
              >
                Hiện không có yêu cầu nào
              </Typography>
            )}
            {reviews.length > 0 &&
              reviews.map((review: IGradeReviewResponseKZ) => {
                return (
                  <ListItemButton
                    sx={{
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onClick={() => handleRequestClick(review.id)}
                  >
                    <StudentGradeReviewItem
                      key={review.id}
                      studentName={review.user?.name}
                      assignmentName={review.gradeName}
                      status={GradeReviewStatusDict[review.status]}
                      currentGrade={review.currentGrade.toString()}
                      expectedGrade={review.expectedGrade.toString()}
                      createdAt={review.createdAt}
                    />
                  </ListItemButton>
                );
              })}

            <Divider sx={{ marginTop: 1 }} variant="fullWidth" component="li" />
          </List>
        </Box>
      )}
    </>
  );
};

export default ReviewRequestListComponent;
