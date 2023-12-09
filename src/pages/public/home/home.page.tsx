import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ClassCard from "../../../components/ui/card/class.card.component";
// import Class from "../../../models/class.model";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ClassService } from "@/service/class.service";
import { ICourse } from "@/models/class.model";

const HomePage = () => {
  document.title = "E-learning | Màn hình chính";
  const classService = new ClassService();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<ICourse[]>(null);

  useEffect(() => {
    // setLoading(true);

    const getAllCourse = async () => {
      try {
        const response = await classService.getAllCourse();

        setCourses(response.data);
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    getAllCourse();
  }, []);

  return (
    <Box sx={{ m: 5 }}>
      <Container
        maxWidth="lg"
        sx={{ height: "100%", pb: 2, mb: 2, borderBottom: "0.5px solid #ccc" }}
      >
        <Stack
          direction="row"
          useFlexGap
          flexWrap="wrap"
          spacing={{ xs: 1, sm: 2 }}
          justifyContent={"space-around"}
        >
          {courses &&
            courses.map((course, index) => {
              return <ClassCard key={index} course={course} />;
            })}
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
