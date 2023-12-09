import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ImageRead from "@/assets/images/img_read.jpg";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ClassCodeComponent from "./ui/class-code.component";
import PostComponent from "./ui/card-post.component";
import { useEffect, useState } from "react";
import { ICourse } from "@/models/class.model";
import { ClassService } from "@/service/class.service";
import { useParams } from "react-router-dom";

// import { useState } from "react";

const NewsClassPage = () => {
  const classService = new ClassService();
  const [isLoading, setLoading] = useState(false);
  const [course, setCourse] = useState<ICourse>(null);
  const { courseId } = useParams();

  useEffect(() => {
    const getCourseById = async (courseId: string) => {
      try {
        const response = await classService.getCourseById(courseId);

        setCourse(response.data);
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    if (courseId) {
      getCourseById(courseId);
    }
  }, []);

  return (
    <Box sx={{ marginY: "2rem" }}>
      {course && (
        <Container maxWidth="md" sx={{ paddingX: "none !important" }}>
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={ImageRead}
              sx={{ objectFit: "cover", width: "100%", borderRadius: "0.5rem" }}
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
                <ClassCodeComponent code={course.inviteCode} />
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
  );
};

export default NewsClassPage;
