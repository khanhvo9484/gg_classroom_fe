import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { Grid, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
}

const ReviewRequestListComponent: React.FC<Props> = ({
}) => {
  const { courseId } = useParams();

  const navigate = useNavigate();

  const handleRequestClick = (reviewRequestId: string) => {
    navigate(`/course/${courseId}/grade-review/${reviewRequestId}`, { replace: true })
  }

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
            <Grid xs={3}>
                <Typography
                    variant="h6"
                    sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                    >
                    {`Tên sinh viên`}
                </Typography>
            </Grid>
            <Grid xs={3}>
                <Typography
                    variant="h6"
                    sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                    >
                    {`Tên bài tập`}
                </Typography>
            </Grid>
            <Grid xs={3}>
                <Typography
                    variant="h6"
                    sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                    >
                    {`Điểm hiện tại`}
                </Typography>
            </Grid>
            <Grid xs={3}>
                <Typography
                    variant="h6"
                    sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                    >
                    {`Điểm mong muốn`}
                </Typography>
            </Grid>
        </Grid>
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItemButton sx={{borderRadius: 2}}
            onClick={() => handleRequestClick("1")}>
                <Grid container >
                    <Grid xs={3}>
                        <Typography
                            variant="body1"
                            >
                            {`Nguyễn Đăng Khoa`}
                        </Typography>
                    </Grid>
                    <Grid xs={3}>
                        <Typography
                            variant="body1"
                            sx={{ marginLeft: 1 }}
                            >
                            {`BTVN`}
                        </Typography>
                    </Grid>
                    <Grid xs={3}>
                        <Typography
                            variant="body1"
                            sx={{ marginLeft: 2 }}
                            >
                            {`10`}
                        </Typography>
                    </Grid>
                    <Grid xs={3}>
                        <Typography
                            variant="body1"
                            sx={{ marginLeft: 3 }}
                            >
                            {`10`}
                        </Typography>
                    </Grid>
                </Grid>
            </ListItemButton>
            <Divider
                sx={{ marginTop: 1 }}
                variant="fullWidth"
                component="li"
            />
      </List>
    </Box>
  );
};

export default ReviewRequestListComponent;
