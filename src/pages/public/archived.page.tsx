import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ClassCard from "@/components/ui/card/class.card.component";
import { Stack } from "@mui/material";
import { useContext, useEffect } from "react";
import { ClassService } from "@/service/class.service";
import LoadingContext from "@/context/loading.contenxt";
import toast from "react-hot-toast";
import { customAxios } from "@/api/custom-axios";
import { ICourse } from "@/models/class.model";
import useHomeCourses from "@/hooks/home-courses.hook";
import useArchivedCourses from "@/hooks/archived-courses.hook";

const ArchivedCoursesPage = () => {
    document.title = "E-learning | Trang lưu trữ lớp học";
    const classService = new ClassService();
    const { startLoading, stopLoading } = useContext(LoadingContext);
    const { coursesArchived, coursesArchivedMutate } = useArchivedCourses();
    const { courses, coursesMutate } = useHomeCourses();


    useEffect(() => {
        startLoading();

        const getAllArchivedCourse = async () => {
            try {
                coursesArchivedMutate(coursesArchived);
            } catch (error) {
                console.log(error);
                // throw error;
            }
        };

        if (courses?.length == 0 || !courses) {
            getAllArchivedCourse();
        }

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
            coursesArchivedMutate(coursesArchived);
            coursesMutate(courses);
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
                coursesArchivedMutate(coursesArchived);
                coursesMutate(courses);
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
                {coursesArchived &&
                    coursesArchived.map((course, index) => {
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
