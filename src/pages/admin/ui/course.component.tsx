import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {Grid, IconButton } from "@mui/material";
import { ICourse } from "@/models/class.model";
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import { ClassService } from "@/service/class.service";
import { mutate } from "swr";
import LoadingContext from "@/context/loading.contenxt";
import { useContext } from "react";

interface Props {
    course: ICourse
}

const CourseComponent: React.FC<Props> = ({
    course
}) => {

    const classService = new ClassService();
    const {startLoading, stopLoading } = useContext(LoadingContext);

    const handleActiveClick = async (course: ICourse) => {
        startLoading();
        if (course.isDeleted) {
            await classService.reviveCourse(course);
            await mutate("all-courses", []);

        } else {
            await classService.archivedCourseById(course.id);
            await mutate("all-courses", []);
        }
        stopLoading();
    }

    return (
        <>
            <ListItem sx={{borderRadius: 2}} key={course.id}
            >
                <Grid container >
                    <Grid xs={3} item>
                        <Typography
                            variant="body1"
                            sx={{fontSize:14}}
                            >
                            {course.name}
                        </Typography>
                    </Grid>
                    <Grid xs={3} item>
                        <Typography
                            variant="body1"
                            sx={{ marginLeft: 1, fontSize:14 }}
                            >
                            {course.description}
                        </Typography>
                    </Grid>
                    <Grid xs={3} item>
                        <Typography
                            variant="body1"
                            sx={{ marginLeft: 2, fontSize:14 }}
                            >
                            {course.courseOwner.name}
                        </Typography>
                    </Grid>
                    <Grid xs={2} item>
                        <Typography
                            variant="body1"
                            sx={{ marginLeft: 3, fontSize:14 }}
                            >
                            {course.inviteCode}
                        </Typography>
                    </Grid>
                    <Grid xs={1} sx={{mt: -1}} item>
                        <IconButton onClick={() => handleActiveClick(course)}>
                            {course.isDeleted
                            ? (<SpeakerNotesIcon color="primary" />)
                            : (<SpeakerNotesOffIcon color="error" />)}
                        </IconButton>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider component={"li"}/>
        </>
    );
};

export default CourseComponent;
