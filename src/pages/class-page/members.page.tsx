import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MemberListComponent from "./ui/list-member.component";

const MembersPage = () => {
  return (
    <Box sx={{ marginY: "2rem" }}>
      <Container
        maxWidth={false}
        sx={{
          //   height: "500px",
          maxWidth: "808px",
        }}
      >
        <MemberListComponent title="Giáo viên" />
        <MemberListComponent title="Sinh viên" />
      </Container>
    </Box>
  );
};

export default MembersPage;
