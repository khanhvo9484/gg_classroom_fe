import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DescriptionIcon from "@mui/icons-material/Description";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import PlaceIcon from "@mui/icons-material/Place";
import "./footer.css";
import qrCode from "../../assets/images/QR.png";
const Footer = () => {
  return (
    <>
      <Box
        className="footer-box"
        sx={{
          width: "100%",
          bottom: 0,
          left: 0,
          mt: 3,
          py: 2,
          borderTop: "1px solid #e9e4e4",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Container className="footer-container" maxWidth="lg" sx={{ py: 2 }}>
          <Box
            className="footer-content"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {/* information */}
            <Stack>
              <Typography variant="h5" sx={{ fontWeight: "500" }}>
                Công ty Cổ phần K3 Learning Việt Nam
              </Typography>
              <Box
                sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Box sx={{ gap: 3, display: "flex" }}>
                  <Typography variant="body2" className="info-text">
                    <PhoneAndroidIcon fontSize="small" className="icon" />
                    Giấy phép đăng ký kinh doanh số: &nbsp;<b>023119819</b>
                  </Typography>
                  <Typography variant="body2" className="info-text">
                    <DescriptionIcon fontSize="small" className="icon" />
                    Giấy phép hoạt động dịch vụ việc làm số: &nbsp;
                    <b>18/SLĐTBXH-GP</b>
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{}} className="info-text">
                  <PlaceIcon fontSize="small" className="icon" />
                  Trụ sở HCM: &nbsp;
                  <b>
                    227 Nguyễn Văn Cừ, Phường 4, Quận 5, Thành Phố Hồ Chí Minh,
                    Việt Nam{" "}
                  </b>
                </Typography>
                <Typography variant="body2" sx={{}} className="info-text">
                  <PlaceIcon fontSize="small" className="icon" />
                  Chi nhánh HCM:&nbsp;
                  <b>
                    Tòa nhà Dali, 24C Phan Đăng Lưu, P.6, Q.Bình Thạnh, TP HCM{" "}
                  </b>
                </Typography>
              </Box>
            </Stack>
            <Box className="box-qr">
              <img width={140} height={140} src={qrCode} alt="" />
            </Box>
            {/* QR */}
          </Box>
          <Typography
            variant="body2"
            textAlign={"center"}
            sx={{ mt: 2, color: "#4d5965", fontWeight: 300 }}
          >
            © 2020-2023 K3 Learning Vietnam JSC. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
