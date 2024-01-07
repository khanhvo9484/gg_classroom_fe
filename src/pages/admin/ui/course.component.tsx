import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {Grid, IconButton } from "@mui/material";
import { ICourse } from "@/models/class.model";
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';

interface Props {
    course: ICourse
}

const CourseComponent: React.FC<Props> = ({
    course
}) => {

    return (
        <>
            <ListItem sx={{borderRadius: 2}}
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
                    <Grid xs={2} item>
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
                    <Grid xs={2} sx={{mt: -1}} item>
                        <IconButton>
                            {course.isDeleted
                            ? (<SpeakerNotesIcon color="primary" />)
                            : (<SpeakerNotesOffIcon color="error" />)}
                        </IconButton>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider/>
        </>
    );
};

export default CourseComponent;
