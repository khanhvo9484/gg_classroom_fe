import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CourseListComponent from "./ui/courses-list.component";

const AdminCoursesPage = () => {

  return (
    <Box sx={{ marginY: "2rem", minHeight: "600px" }}>
      <Container
        maxWidth={false}
        sx={{
          //   height: "500px",
          maxWidth: "808px",
        }}
      >
        <CourseListComponent/>
      </Container>
    </Box>
  );
};

export default AdminCoursesPage;
