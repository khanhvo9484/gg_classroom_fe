import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ClassCard from "../../../components/ui/card/class.card.component";
import { Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import { ClassService } from "@/service/class.service";
import LoadingContext from "@/context/loading.contenxt";
import toast from "react-hot-toast";
import { customAxios } from "@/api/custom-axios";
import { selectCourses } from "@/redux/courses.slice";
import { setCourses } from "@/redux/courses.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const HomePage = () => {
  document.title = "E-learning | Màn hình chính";
  const classService = new ClassService();
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const courses = useSelector(selectCourses);
  const dispatch = useDispatch();

  useEffect(() => {
    startLoading();
    const getAllCourse = async () => {
      try {
        const response = await classService.getAllCourse();

        dispatch(
          setCourses({
            courses: response.data,
          })
        );
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    if (!courses) {
      getAllCourse();
    }
    stopLoading();
  }, []);

  async function leaveCourse(courseId: string) {
    try {
      const payload = {
        courseId: courseId,
      };
      // 👇️ const data: CreateUserResponse
      const response = await customAxios.post("/courses/leave-course", payload);

      if (response) {
        toast.success("Rời lớp học thành công.");
        dispatch(
          setCourses({
            courses: courses.filter((course) => course.id !== courseId),
          })
        );
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
      const response = await customAxios.post(
        `/courses/delete-course/${courseId}`
      );

      if (response) {
        toast.success("Lưu trữ lớp học thành công.");
        dispatch(
          setCourses({
            courses: courses.filter((course) => course.id !== courseId),
          })
        );
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
                  deleteCourse={null}
                  reviveCourse={null}
                />
              );
            })}
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
