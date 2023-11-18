import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import imageEdu from "../../../assets/images/image.png";
import CardComponent from "../../../components/ui/card/card.component";
import { members } from "../../../data/data";
import { Link } from "react-router-dom";

const LandingPage = () => {
  document.title = "E-learning | Trang chủ";
  return (
    <Box sx={{}}>
      <Container
        maxWidth="lg"
        sx={{ height: "100%", pb: 2, mb: 2, borderBottom: "1px solid #ccc" }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography variant="h3">
              Khám phá tri thức, nâng cao bản thân
              <br /> Chìa khóa tri thức mở cánh cửa tương lai!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Chào mừng bạn đến với ứng dụng học E-learning - nơi mà tri thức
              không bao giờ ngừng chảy và cánh cửa của kiến thức mở ra trước mắt
              bạn mọi lúc, mọi nơi. Được thiết kế để đáp ứng nhu cầu học tập đa
              dạng của mọi người, ứng dụng chúng tôi mang lại trải nghiệm học
              tập linh hoạt và hiệu quả.
            </Typography>
            <Stack direction={"row"} spacing={2}>
              <Button variant="contained" size="large">
                Trải nghiệm ứng dụng
              </Button>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="large">
                  Đăng ký
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Box
            component="img"
            src={imageEdu}
            sx={{ objectFit: "fit", width: "580px" }}
          />
        </Box>
      </Container>
      <Box sx={{ backgroundColor: "" }}>
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Typography variant="h5">Đội ngũ của chúng tôi</Typography>
          <Stack
            spacing={4}
            direction={"row"}
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          >
            {members.map((member, index) => {
              return <CardComponent key={index} member={member} />;
            })}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
