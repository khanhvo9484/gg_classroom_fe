import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import GradeList from "@/pages/class-page/student-grade-page/ui/grade-list.component";
import { IGradeStructure, IStudentGrade } from "@/models/grade.model";

interface Props {
  grade: IGradeStructure;
  gradeStudent: IStudentGrade;
}

const GradePageBodyComponent: React.FC<Props> = ({ grade, gradeStudent }) => {
  const user = useSelector(selectUser);

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
        <List>
          <ListItem key={1} alignItems="center">
            <ListItemAvatar sx={{ marginTop: 0, minWidth: 50 }}>
              <AvatarHelper
                sx={{
                  width: 64,
                  height: 64,
                }}
                user={user}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="h4"
                  sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                >
                  {user.name}
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
      {grade && (<GradeList grade={grade} gradeStudent={gradeStudent} />)}
      {!grade && (
        <Typography
          sx={{ margin: "2rem auto", textAlign: "center" }}
          variant="body1"
          gutterBottom
        >
          Hiện giáo viên chưa công bố điểm chính thức nào của bạn.
        </Typography>
      )}
    </Box>
  );
};

export default GradePageBodyComponent;
