import { Box } from "@mui/material";
import GradeTableComponent from "./ui/grade-table/grade-table.component";

const GradesPage = () => {
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <GradeTableComponent></GradeTableComponent>
      </Box>
    </>
  );
};

export default GradesPage;
