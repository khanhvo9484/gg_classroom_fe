import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ClassCard from "@/components/ui/card/class.card.component";
import { Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ClassService } from "@/service/class.service";
import LoadingContext from "@/context/loading.contenxt";
import toast from "react-hot-toast";
import { customAxios } from "@/api/custom-axios";
import { ICourse } from "@/models/class.model";
import { useDispatch } from "react-redux";
import { selectCourses } from "@/redux/courses.slice";
import { setCourses } from "@/redux/courses.slice";
import { useSelector } from "react-redux";

const ArchivedCoursesPage = () => {
    document.title = "E-learning | Trang lưu trữ lớp học";
    const classService = new ClassService();
    const { startLoading, stopLoading } = useContext(LoadingContext);
    const [courses, setArchivedCourses] = useState<ICourse[]>([])
    const courseStillActivate = useSelector(selectCourses);
    const dispatch = useDispatch();


    useEffect(() => {
        startLoading();
        const getAllArchivedCourse = async () => {
            try {
                const response = await classService.getAllArchivedCourse();
                setArchivedCourses(response.data)

            } catch (error) {
                console.log(error);
                // throw error;
            }
        };

        getAllArchivedCourse();
        stopLoading();
    }, []);

    async function deleteCourse(courseId: string) {
        try {
        // 👇️ const data: CreateUserResponse
        const response = await customAxios.post(
            `/courses/real-delete-course/${courseId}`
        );

        if (response) {
            toast.success("Xóa lớp học thành công.");
            setArchivedCourses(courses.filter((course) => course.id !== courseId));
        } else {
            toast.error("Xóa lớp học không thành công. Lỗi dữ liệu nhận về.");
        }
        } catch (error) {
            console.log(error);
            toast.error("Xóa lớp học không thành công.");
        }
    }

    async function reviveCourse(course : ICourse) {
        const payload = {
            description: course.description,
            name: course.name,
            isDeleted: false,
            id: course.id,
        };
        try {
            const response = await customAxios.put(
                "/courses/update-course",
                payload
            );

            if (response) {
                toast.success("Khôi phục lớp học thành công.");
                setArchivedCourses(courses.filter((courseFilter) => courseFilter.id !== course.id));
                dispatch(
                    setCourses({
                    courses : [...courseStillActivate, course]
                    })
                );
            } else {
                toast.error("Khôi phục lớp học không thành công.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Khôi phục lớp học không thành công.");
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
                            deleteCourse={() => {
                                deleteCourse(course.id);
                            }}
                            reviveCourse={() => {
                                reviveCourse(course);
                            }}
                            archiveCourse={() => console.log("Archive course")}
                            leaveCourse={() => console.log("Leave course")}
                        />
                    );
                    })}
                </Stack>
            </Container>
        </Box>
  );
};

export default ArchivedCoursesPage;
