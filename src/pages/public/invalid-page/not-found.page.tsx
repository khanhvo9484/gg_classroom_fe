import React from "react";
import notFound from "@/assets/images/not-found/notFound.jpg";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  document.title = "404 | Không tìm thấy trang";
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
        src={notFound}
      ></Box>
      <Link to={"/"}>
        <Button variant="contained">Trở về trang chủ</Button>
      </Link>
    </Box>
  );
};

export default NotFoundPage;
