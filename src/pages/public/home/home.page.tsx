import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ClassCard from "../../../components/ui/card/class.card.component";
import Class from "../../../models/class.model";
import { Stack } from "@mui/material";

const khanhClass: Class = {
  classname: "Lập Trình Web",
  teacherName: "Mai Anh Tuấn",
  shortName: "AT",
};

const khangClass: Class = {
  classname: "Cấu Trúc Dữ Liệu Và Giải Thuật",
  teacherName: "Bùi Tiến Lên",
  shortName: "TL",
};

const khoaClass: Class = {
  classname: "CTT4 2020",
  teacherName: "Nguyễn Đăng Khoa",
  shortName: "NDK",
};

const MockData = [
  khanhClass,
  khangClass,
  khoaClass,
  khanhClass,
  khangClass,
  khoaClass,
];

const HomePage = () => {
  document.title = "E-learning | Màn hình chính";
  return (
    <Box sx={{ m: 5 }}>
      <Container
        maxWidth="lg"
        sx={{ height: "100%", pb: 2, mb: 2, borderBottom: "0.5px solid #ccc" }}
      >
        <Stack
          direction="row"
          useFlexGap
          flexWrap="wrap"
          spacing={{ xs: 1, sm: 2 }}
          justifyContent={"space-around"}
        >
          {MockData.map((individualClass, index) => (
            <ClassCard
              key={index}
              classname={individualClass.classname}
              teacherName={individualClass.teacherName}
              shortName={individualClass.shortName}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;
