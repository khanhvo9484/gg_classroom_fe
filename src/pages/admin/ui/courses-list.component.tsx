import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import useAllCourses from "@/hooks/all-courses.hook";
import CourseComponent from "./course.component";

interface Props {
}

const CourseListComponent: React.FC<Props> = () => {

    const { courses } = useAllCourses();

    return (
        <Box sx={{ marginTop: 4, marginBottom: 10 }}>
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
                    <Grid xs={2} item>
                        <Typography
                            variant="h6"
                            sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                            >
                            {`Giảng viên`}
                        </Typography>
                    </Grid>
                    <Grid xs={2} item>
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
                    {courses && courses.map((course) => {
                         return (<CourseComponent course={course}/>)
                    })}
            </List>
        </Box>
    );
};

export default CourseListComponent;
