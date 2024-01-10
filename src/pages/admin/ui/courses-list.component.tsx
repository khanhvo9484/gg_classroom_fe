import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, IconButton, Pagination, Stack, TextField } from "@mui/material";
import useAllCourses from "@/hooks/all-courses.hook";
import CourseComponent from "./course.component";
import { ChangeEvent, useState } from "react";
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { inPlaceSort } from 'fast-sort';

interface Props {
}

const CourseListComponent: React.FC<Props> = () => {

    const { courses, coursesMutate } = useAllCourses();
    const [currentPageNumber, setCurrentPageNumber] = useState(1);

    const coursesPagination = courses?.slice((currentPageNumber - 1)*15, currentPageNumber*15)

    const handlePageChange = (event: ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPageNumber(pageNumber);
    }

    const [sortName, setSortName ] = useState(false);
    const [sortDescription, setSortDescription ] = useState(false);
    const [sortCourseOwner, setSortCourseOwner ] = useState(false);
    const [sortInviteCode, setSortInviteCode ] = useState(false);

    const handleSortClick = (attribute: string, state: boolean) => {
        if (!state) {
            switch (attribute) {
                case "name":
                    inPlaceSort(courses).asc([
                        course => course.name,
                    ]);
                    setSortName(true);
                    break;
                case "description":
                    inPlaceSort(courses).asc([
                        course => course.description,
                    ]);
                    setSortDescription(true);
                    break;
                case "courseOwner":
                    inPlaceSort(courses).asc([
                        course => course.courseOwner,
                    ]);
                    setSortCourseOwner(true);
                    break;
                case "inviteCode":
                    inPlaceSort(courses).asc([
                        course => course.inviteCode,
                    ]);
                    setSortInviteCode(true);
                    break;
                default:
                    break;
            }
        } else {
            switch (attribute) {
                case "name":
                    inPlaceSort(courses).desc([
                        course => course.name,
                    ]);
                    setSortName(false);
                    break;
                case "description":
                    inPlaceSort(courses).desc([
                        course => course.description,
                    ]);
                    setSortDescription(false);
                    break;
                case "courseOwner":
                    inPlaceSort(courses).desc([
                        course => course.courseOwner,
                    ]);
                    setSortCourseOwner(false);
                    break;
                case "inviteCode":
                    inPlaceSort(courses).desc([
                        course => course.inviteCode,
                    ]);
                    setSortInviteCode(false);
                    break;
                default:
                    break;
            }
        }
        console.log(courses);
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
                sx={{ width: "400px", mb: 2 }}
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
                        <Stack direction={"row"}>
                            <Typography
                                variant="h6"
                                sx={{ marginLeft: 1, color: "rgb(25,103,210)" }}
                                >
                                {`Tên môn học`}
                            </Typography>
                            <IconButton onClick={() => handleSortClick("name", sortName)}
                            sx={{mt: "-4px"}}>
                                <SortByAlphaIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                    <Grid xs={3} item>
                        <Stack direction={"row"}>
                            <Typography
                                variant="h6"
                                sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                                >
                                {`Miêu tả`}
                            </Typography>
                            <IconButton onClick={() => handleSortClick("description", sortDescription)}
                            sx={{mt: "-4px"}}>
                                <SortByAlphaIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                    <Grid xs={3} item>
                        <Stack direction={"row"}>
                            <Typography
                                variant="h6"
                                sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                                >
                                {`Giảng viên`}
                            </Typography>
                            <IconButton onClick={() => handleSortClick("courseOwner", sortCourseOwner)}
                            sx={{mt: "-4px"}}>
                                <SortByAlphaIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                    <Grid xs={3} item>
                        <Stack direction={"row"}>
                            <Typography
                                variant="h6"
                                sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                                >
                                {`Mã mời`}
                            </Typography>
                            <IconButton onClick={() => handleSortClick("inviteCode", sortInviteCode)}
                            sx={{mt: "-4px"}}>
                                <SortByAlphaIcon />
                            </IconButton>
                        </Stack>
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
