import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ReviewRequestListComponent from "./ui/review-list.component";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "@/context/loading.contenxt";
import { ClassService } from "@/service/class.service";
import { useParams } from "react-router-dom";

const ReviewRequestPage = () => {
  const classService = new ClassService();
  const { courseId } = useParams();
  const { startLoading, stopLoading } = useContext(LoadingContext);

  return (
    <Box sx={{ marginY: "2rem", minHeight: "600px" }}>
      <Container
        maxWidth={false}
        sx={{
          //   height: "500px",
          maxWidth: "808px",
        }}
      >
        <ReviewRequestListComponent/>
      </Container>
    </Box>
  );
};

export default ReviewRequestPage;
