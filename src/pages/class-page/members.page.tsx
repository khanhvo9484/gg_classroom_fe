import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import MemberListComponent from "./ui/list-member.component";
import { useContext } from "react";
import LoadingContext from "@/context/loading.contenxt";

const MembersPage = () => {
  const { stopLoading } = useContext(LoadingContext);
  stopLoading();
  return (
    <Box sx={{ marginY: "2rem" }}>
      <Container
        maxWidth={false}
        sx={{
          //   height: "500px",
          maxWidth: "808px",
        }}
      >
        <MemberListComponent key={1} isTeacherList={true} title="Giáo viên" />
        <MemberListComponent key={2} isTeacherList={false} title="Sinh viên" />
      </Container>
    </Box>
  );
};

export default MembersPage;
