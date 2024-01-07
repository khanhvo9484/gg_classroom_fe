import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import GradePageBodyComponent from "./ui/grade-page-body.component";
import { useContext, useEffect, useState } from "react";
import LoadingContext from "@/context/loading.contenxt";
import { ClassService } from "@/service/class.service";
import { useParams } from "react-router-dom";
import RoleContext from "@/context/role.context";

const StudentViewGradePage = () => {
  const classService = new ClassService();
  const { courseId } = useParams();
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const { isTeacher } = useContext(RoleContext);

  useEffect(() => {
    
  }, []);

  if (isTeacher){
    return (<></>)
  } else {
    return (
      <Box sx={{ marginY: "2rem", minHeight: "600px" }}>
        <Container
            maxWidth={false}
            sx={{
            //   height: "500px",
            maxWidth: "808px",
            }}
        >
            <GradePageBodyComponent/>
        </Container>
      </Box>
    )
  }
};

export default StudentViewGradePage;
