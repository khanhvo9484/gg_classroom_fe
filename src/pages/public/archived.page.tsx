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
import useHomeCourses from "@/hooks/home-courses.hook";

const ArchivedCoursesPage = () => {
    document.title = "E-learning | Trang lưu trữ lớp học";
    const classService = new ClassService();
    const { startLoading, stopLoading } = useContext(LoadingContext);
    const [archivedCourses, setArchivedCourses] = useState<ICourse[]>([])
    const { coursesMutate } = useHomeCourses();


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

        const getAllCourse = async () => {
            if (courseStillActivate.length ==0) {
                const response = await classService.getAllCourse();
                dispatch(
                    setCourses({
                    courses : response.data
                    })
                );
            }
        }

        getAllArchivedCourse();
        getAllCourse();
        stopLoading();
    }, []);

    async function deleteCourse(courseId: string) {
        startLoading();
        try {
        // 👇️ const data: CreateUserResponse
        await classService.archivedCourseById(courseId);

        const response = await customAxios.post(
            `/courses/real-delete-course/${courseId}`
        );

        if (response) {
            toast.success("Xóa lớp học thành công.");
            setArchivedCourses(archivedCourses.filter((course) => course.id !== courseId));
            coursesMutate([]);
        } else {
            toast.error("Xóa lớp học không thành công. Lỗi dữ liệu nhận về.");
        }
        } catch (error) {
            console.log(error);
            toast.error("Xóa lớp học không thành công.");
        }
        stopLoading();
    }

    async function reviveCourse(course : ICourse) {
        startLoading();
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

            console.log(response);

            if (response) {
                toast.success("Khôi phục lớp học thành công.");
                setArchivedCourses(archivedCourses.filter((courseFilter) => courseFilter.id !== course.id));
                coursesMutate([]);
            } else {
                toast.error("Khôi phục lớp học không thành công.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Khôi phục lớp học không thành công.");
        }
        stopLoading();
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
                {archivedCourses &&
                    archivedCourses.map((course, index) => {
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
