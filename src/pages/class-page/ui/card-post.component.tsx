import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import CommentComponent from "./comment.component";

const PostComponent = () => {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "0.5rem",
        border: "0.0625rem solid #dadce0",
      }}
      variant="outlined"
    >
      <CardHeader
        sx={{ paddingBottom: "0" }}
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Khầy Khan
          </Typography>
        }
        subheader="December 12, 2023"
      />
      <CardContent sx={{ borderBottom: "0.0625rem solid #dadce0" }}>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardContent sx={{ padding: 0 }}>
        <CommentComponent />
      </CardContent>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
};

export default PostComponent;
