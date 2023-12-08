import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const CommentComponent = () => {
  return (
    <CardHeader
      sx={{}}
      avatar={
        <Avatar
          sx={{ bgcolor: "blue", width: 32, height: 32 }}
          aria-label="recipe"
        >
          KT
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={
        <Box sx={{ display: "flex", gap: 1 }}>
          {" "}
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Khầy Khan
          </Typography>
          <Typography variant="body2">2:01</Typography>
        </Box>
      }
      subheader={
        <Typography mt={0.5} variant="body2">
          Bài giảng hay lắm thầy ơi
        </Typography>
      }
    />
  );
};

export default CommentComponent;
