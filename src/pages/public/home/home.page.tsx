import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ClassCard from "../../../components/ui/card/class.card.component";
import { Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { ClassService } from "@/service/class.service";
import LoadingContext from "@/context/loading.contenxt";
import toast from "react-hot-toast";
import { customAxios } from "@/api/custom-axios";
import { selectCourses } from "@/redux/courses.slice";
import { setCourses } from "@/redux/courses.slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import noCourseImg from "@/assets/images/empty-course-list/no-course.png";
import { ICourse } from "@/models/class.model";
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

  async function archiveCourse(course: ICourse) {
    try {
      const response = await classService.archivedCourse(course);

      if (response) {
        toast.success("Lưu trữ lớp học thành công.");
        dispatch(
          setCourses({
            courses: courses.filter((courseE) => courseE.id !== course.id),
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
          sx={{
            justifyContent: "space-around",
            alignItems: "flex-start",
          }}
        >
          {courses && courses.length === 0 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
                width: "100%",
                mt: 10,
              }}
            >
              <Box
                sx={{
                  maxWidth: "500px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
                component={"img"}
                src={noCourseImg}
                alt="no course"
              ></Box>
              <Box sx={{ marginTop: "1rem" }}>
                <Typography variant="h6">
                  Bạn chưa tham gia lớp học nào.
                </Typography>
              </Box>
            </Box>
          )}
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
