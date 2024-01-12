import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ReviewRequestListComponent from "./ui/review-list.component";

const ReviewRequestPage = () => {
  document.title = "Danh sách phúc khảo";
  return (
    <Box sx={{ marginY: "2rem", minHeight: "600px" }}>
      <Container maxWidth={false}>
        <ReviewRequestListComponent />
      </Container>
    </Box>
  );
};

export default ReviewRequestPage;
