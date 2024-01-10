import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Pagination, Stack, TextField } from "@mui/material";
import useAllCourses from "@/hooks/all-courses.hook";
import CourseComponent from "./course.component";
import { ChangeEvent, useState } from "react";

interface Props {
}

const CourseListComponent: React.FC<Props> = () => {

    const { courses } = useAllCourses();
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const coursesPagination = courses?.slice((currentPageNumber - 1)*15, currentPageNumber*15)

    const handlePageChange = (event: ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPageNumber(pageNumber);
    }

    return (
        <Box sx={{ marginTop: 4, marginBottom: 10 }}>
            <Box
                sx={{ display: "flex", alignItems: "center", gap: 3 }}
            >
                <TextField
                id="filter-text-box"
                label="Tìm kiếm"
                type="search"
                onInput={() => console.log("abc")}
                sx={{ width: "400px" }}
                />
            </Box>
            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgb(95,99,104)",
                paddingBottom: 1,
                }}
            >
                <Grid container >
                    <Grid xs={3} item>
                        <Typography
                            variant="h6"
                            sx={{ marginLeft: 1, color: "rgb(25,103,210)" }}
                            >
                            {`Tên môn học`}
                        </Typography>
                    </Grid>
                    <Grid xs={3} item>
                        <Typography
                            variant="h6"
                            sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                            >
                            {`Miêu tả`}
                        </Typography>
                    </Grid>
                    <Grid xs={3} item>
                        <Typography
                            variant="h6"
                            sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                            >
                            {`Giảng viên`}
                        </Typography>
                    </Grid>
                    <Grid xs={3} item>
                        <Typography
                            variant="h6"
                            sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                            >
                            {`Mã mời`}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    {courses && coursesPagination.map((course) => {
                         return (<CourseComponent course={course} key={course.id}/>)
                    })}
            </List>
            {courses && (
                <Stack alignItems="center">
                    <Pagination count={Math.ceil(courses?.length/15)} color="primary"
                    onChange={(event, pageNumber) => handlePageChange(event, pageNumber)}/>
                </Stack>
            )}
        </Box>
    );
};

export default CourseListComponent;
