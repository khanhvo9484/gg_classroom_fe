import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ClassCard from "../../../components/ui/card/class.card.component";
import { Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ClassService } from "@/service/class.service";
import { ICourse } from "@/models/class.model";
import LoadingContext from "@/context/loading.contenxt";
import toast from "react-hot-toast";
import { customAxios } from "@/api/custom-axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  document.title = "E-learning | Màn hình chính";
  const classService = new ClassService();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const [courses, setCourses] = useState<ICourse[]>(null);

  useEffect(() => {
    startLoading();
    const getAllCourse = async () => {
      try {
        const response = await classService.getAllCourse();

        setCourses(response.data);
        stopLoading();
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    getAllCourse();
  }, []);

  async function leaveCourse(courseId : string) {
    try {
      const payload = {
        courseId : courseId,
      };
      console.log(courseId);
      console.log(payload);
      // 👇️ const data: CreateUserResponse
      const response = await customAxios.post(
        "/courses/leave-course",
        payload
      );

      console.log(payload);
      if (response) {
        toast.success("Rời lớp học thành công.");
        setCourses(courses.filter((course) => course.id !== courseId));
        navigate(`/home/`);
        navigate(0);
      } else {
        toast.error("Rời lớp học không thành công. Lỗi dữ liệu nhận về.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Rời lớp học không thành công.");
    }
  }

  async function archiveCourse(courseId) {
    try {
      const response = await customAxios.delete(
        `/courses/delete-course/${courseId}`
      );

      if (response) {
        toast.success("Lưu trữ lớp học thành công.");
        setCourses(courses.filter((course) => course.id !== courseId));
        navigate(`/home/`);
        navigate(0);
      } else {
        toast.error("Lưu trữ lớp học không thành công.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Lưu trữ lớp học không thành công.");
    }
  }

  return (
    <Box sx={{ m: 5, minHeight: "600px" }}>
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          pb: 2,
          mb: 2,
          borderBottom: "0.5px solid #ccc",
        }}
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
              return (
                <ClassCard
                  key={index}
                  course={course}
                  archiveCourse={() => {
                    archiveCourse(course.id);
                  }}
                  leaveCourse={() => {
                    leaveCourse(course.id);
                  }}
                />
              );
            })}
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
