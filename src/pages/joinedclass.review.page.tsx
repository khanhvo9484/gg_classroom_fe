import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ReviewRequestListComponent from "./class-page/review-request-list/ui/review-list.component";
import { Typography } from "@mui/material";

const JoinedClassReviewRequestPage = () => {

  return (
    <Box sx={{ marginY: "2rem", minHeight: "600px" }}>
      <Container
        maxWidth={false}
        sx={{
          //   height: "500px",
          maxWidth: "808px",
        }}
      >
        <Box
            sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgb(95,99,104)",
            paddingBottom: 1,
            }}
        >
            <Typography
                variant="h4"
                sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                >
                {"Danh sách phúc khảo của bạn ở các lớp"}
            </Typography>
        </Box>
        <ReviewRequestListComponent/>
      </Container>
    </Box>
  );
};

export default JoinedClassReviewRequestPage;
