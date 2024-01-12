import unauthorizedImg from "@/assets/images/unauthorize/unauthorized.jpg";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
const UnauthorizedPage = () => {
  document.title = "403 | Không có quyền truy cập";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        component="img"
        src={unauthorizedImg}
      ></Box>
      <Link to={"/"}>
        <Button variant="contained">Trở về trang chủ</Button>
      </Link>
    </Box>
  );
};

export default UnauthorizedPage;
