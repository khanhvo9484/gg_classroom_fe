import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import GradePageBodyComponent from "./ui/grade-page-body.component";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import { IGradeStructure, IStudentGrade } from "@/models/grade.model";
import { GradeService } from "@/service/grade.service";
import { LinearProgress, Typography } from "@mui/material";
import { Button, Link, Stack } from "@mui/material";
import noCourseImg from "@/assets/images/empty-course-list/no-course.png";

const StudentViewGradePage = () => {
  const gradeService = new GradeService();
  const { courseId } = useParams();
  const user = useSelector(selectUser);

  const [gradeStudent, setGradeStudent] = useState<IStudentGrade>();
  const [grade, setGrade] = useState<IGradeStructure>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getGradeMemberById = async () => {
      try {
        setIsLoading(true);
        if (user?.studentOfficialId){
          const response = await gradeService.getGradeByStudentId(
            user.studentOfficialId!,
            courseId
          );

          setGradeStudent(response.data);
          setGrade(response.data.grade);
        } else {
          setGradeStudent(null);
          setGrade(null);
        }
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      getGradeMemberById();
    }
  }, [courseId]);

  return (
    <>
      {isLoading && <LinearProgress sx={{ top: -5 }} />}

      {!isLoading && (
        <Box sx={{ marginY: "2rem", minHeight: "600px" }}>
          <Container
            maxWidth={false}
            sx={{
              maxWidth: "808px",
            }}
          >
            {user?.studentOfficialId ?
              <GradePageBodyComponent grade={grade} gradeStudent={gradeStudent} /> :
              (
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ my: 2 }}
                >
                  <Box
                    sx={{
                      width: "50%",
                      height: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    component="img"
                    src={noCourseImg}
                  ></Box>
                  <Typography sx={{mb: 2, mt:1}}>
                  Hiện bạn chưa có MSSV, bạn có thể cập nhật ở trang cá nhân, hoặc yêu cầu giáo viên của bạn thiết lập.
                  </Typography>
                  <Link href="/profile">
                      <Button variant="outlined" size="large">
                          Đến trang cá nhân
                      </Button>
                  </Link>
                </Stack>
              )
            }
          </Container>
        </Box>
      )}
    </>
  );
};

export default StudentViewGradePage;
