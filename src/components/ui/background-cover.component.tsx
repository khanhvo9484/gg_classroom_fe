import { Box } from "@mui/material";
import coverImage from "../../assets/images/cover.jpg";

const BackgroundCover = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        src={coverImage}
        sx={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </Box>
  );
};

export default BackgroundCover;
