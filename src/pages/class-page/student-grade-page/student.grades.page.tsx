import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import GradePageBodyComponent from "./ui/grade-page-body.component";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import { IGradeStructure, IStudentGrade } from "@/models/grade.model";
import { GradeService } from "@/service/grade.service";
import { LinearProgress } from "@mui/material";

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
        const response = await gradeService.getGradeByStudentId(
          user.studentOfficialId!,
          courseId
        );

        setGradeStudent(response.data);
        setGrade(response.data.grade);
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
              //   height: "500px",
              maxWidth: "808px",
            }}
          >
            <GradePageBodyComponent grade={grade} gradeStudent={gradeStudent} />
          </Container>
        </Box>
      )}
    </>
  );
};

export default StudentViewGradePage;
