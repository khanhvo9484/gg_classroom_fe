import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ImageRead from "@/assets/images/img_read.jpg";
import {
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ClassCodeComponent from "./ui/class-code.component";
import PostComponent from "./ui/card-post.component";
import { useContext, useEffect, useState } from "react";
import { ICourse } from "@/models/class.model";
import { ClassService } from "@/service/class.service";
import { useParams } from "react-router-dom";
import RoleContext from "@/context/role.context";

const NewsClassPage = () => {
  const classService = new ClassService();
  const { isTeacher } = useContext(RoleContext);

  const [isLoading, setIsLoading] = useState(true);

  const [course, setCourse] = useState<ICourse>(null);
  const { courseId } = useParams();

  useEffect(() => {
    const getCourseById = async (courseId: string) => {
      try {
        setIsLoading(true);

        const response = await classService.getCourseById(courseId);

        setCourse(response.data);
      } catch (error) {
        console.log(error);
        // throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      getCourseById(courseId);
    }
  }, [courseId]);

  return (
    <>
      {isLoading && <LinearProgress sx={{ top: -5 }} />}

      <Box sx={{ marginY: "2rem", minHeight: "600px" }}>
        {course && (
          <Container maxWidth="md" sx={{ paddingX: "none !important" }}>
            <Box sx={{ position: "relative" }}>
              <Box
                component="img"
                src={ImageRead}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                  borderRadius: "0.5rem",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  bottom: 16,
                  left: 24,
                  position: "absolute",
                }}
              >
                {course.name}
              </Typography>
            </Box>
            <Box sx={{ marginTop: 2 }}>
              <Grid container sx={{ width: "100%" }}>
                <Grid xs={3}>
                  {isTeacher && <ClassCodeComponent code={course.inviteCode} />}
                  <Card
                    sx={{
                      width: "14rem",
                      mb: 2,
                      border: "0.0625rem solid #dadce0",
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ fontWeight: 500 }}
                        >
                          Sắp đến hạn
                        </Typography>
                      }
                    />

                    <CardContent
                      sx={{ paddingTop: "0", paddingBottom: "16px" }}
                    >
                      <Typography
                        variant="subtitle2"
                        component="div"
                        sx={{
                          color: "rgba(0,0,0,.549)",
                        }}
                      >
                        Tuyệt vời, không có bài tập nào sắp đến hạn!{" "}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  xs={9}
                >
                  <PostComponent />
                  <PostComponent />
                  <PostComponent />
                  <PostComponent />
                </Grid>
              </Grid>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};

export default NewsClassPage;
