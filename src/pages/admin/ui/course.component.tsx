import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { ICourse } from "@/models/class.model";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import { ClassService } from "@/service/class.service";
import { mutate } from "swr";
import LoadingContext from "@/context/loading.contenxt";
import { useContext } from "react";
import toast from "react-hot-toast";

interface Props {
  course: ICourse;
}

const CourseComponent: React.FC<Props> = ({ course }) => {
  const classService = new ClassService();
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const handleActiveClick = async (course: ICourse) => {
    startLoading();
    if (course.isDeleted) {
      try {
        await classService.reviveCourse(course);
        await mutate("all-courses", []);
        toast.success("Tái khởi động lớp học thành công.");
      } catch (error) {
        toast.error("Tái khởi động lớp học thất bại.");
      }
    } else {
      try {
        await classService.archivedCourse(course);
        await mutate("all-courses", []);
        toast.success("Ngừng hoạt động lớp học thành công.");
      } catch (error) {
        toast.error("Ngừng hoạt động lớp học thất bại.");
      }
    }
    stopLoading();
  };

  return (
    <>
      <ListItem sx={{ borderRadius: 2 }} key={course.id}>
        <Grid container>
          <Grid xs={3} item>
            <Typography variant="body1" sx={{ fontSize: 14 }}>
              {course.name}
            </Typography>
          </Grid>
          <Grid xs={3} item>
            <Typography variant="body1" sx={{ marginLeft: 1, fontSize: 14 }}>
              {course.description}
            </Typography>
          </Grid>
          <Grid xs={3} item>
            <Typography variant="body1" sx={{ marginLeft: 2, fontSize: 14 }}>
              {course.courseOwner.name}
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography variant="body1" sx={{ marginLeft: 3, fontSize: 14 }}>
              {course.inviteCode}
            </Typography>
          </Grid>
          <Grid
            xs={1}
            sx={{ mt: -1, display: "inline-flex", justifyContent: "center" }}
            item
          >
            <Tooltip
              title={
                course?.isDeleted
                  ? "Lớp học ngừng hoạt động, nhấn để tái khởi động lớp học."
                  : "Lớp học đang hoạt động, nhấn để ngừng hoạt động lớp học."
              }
            >
              <IconButton onClick={() => handleActiveClick(course)}>
                {course?.isDeleted ? (
                  <SpeakerNotesOffIcon color="error" />
                ) : (
                  <SpeakerNotesIcon color="primary" />
                )}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </ListItem>
      <Divider component={"li"} />
    </>
  );
};

export default CourseComponent;
