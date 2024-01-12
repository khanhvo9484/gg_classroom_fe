import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { CardActions, CardHeader, IconButton, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UserModel from "@/models/user.model";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import VerifyEmailDialog from "./dialog/verify.email.dialog";
import { useState } from "react";
import { customAxios } from "@/api/custom-axios";
import toast from "react-hot-toast";

interface Props {
  member: UserModel;
  openEditForm: () => void;
}

const ProfileComponent: React.FC<Props> = ({ member, openEditForm }) => {
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);

  const sendVerifyEmail = async () => {
    try {
      const { data: response } = await customAxios.post(
        "/auth/send-verify-email",
        {
          email: member.email
        }
      );
      console.log(response);
      if (response.message == "Send verify email successfully") {
        setIsOpenDialog(true);
      } else {
        toast.error("yêu cầu xác thực email thất bại, hãy thử lại sau.");
      }
    } catch (error) {
      console.log(error);
      toast.error("yêu cầu xác thực email thất bại, hãy thử lại sau.");
    }
  }

  return (
    <Grid container spacing={2} sx={{ height: "400px" }}>
      <VerifyEmailDialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}/>
      <Grid xs={4}>
        <Box sx={{ height: "100%" }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent
              sx={{
                mt: 3,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <AvatarHelper user={member} sx={{}} />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontWeight: 600 }}
              >
                {member.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {member.bio}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton>
                  <FacebookIcon fontSize="large" />
                </IconButton>
                <IconButton>
                  <InstagramIcon fontSize="large" />
                </IconButton>
                <IconButton>
                  <LinkedInIcon fontSize="large" />
                </IconButton>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Grid>

      <Grid xs={8}>
        <Box sx={{ height: "100%" }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardHeader
              title="Thông tin cá nhân"
              sx={{
                borderBottom: "1px solid #ccc",
                backgroundColor: "#f8f9fa",
              }}
            />

            <CardContent>
              <Grid container spacing={3} sx={{ my: 1 }}>
                <Grid xs={4}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Họ và Tên
                  </Typography>
                  <Typography gutterBottom>{member.name}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Số điện thoại
                  </Typography>
                  <Typography gutterBottom>{member.phoneNumber}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography
                    gutterBottom
                    sx={{
                      fontWeight: 550,
                    }}
                  >
                    Email
                  </Typography>
                  <Typography
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%", // Ensures it takes 100% of the container width
                    }}
                  >
                    {member.email}
                  </Typography>
                  {!member.isVerified && (
                    <Tooltip title={"Nhấn để thực hiện xác thực tài khoản email"}>
                      <Typography variant="subtitle2" sx={{ color: "red", fontSize:12, ml: -1,
                      textTransform: "none",
                      ":hover": {
                        backgroundColor: "transparent",
                        textDecorationLine: "underline"
                      } }} component={Button}
                      onClick={() => sendVerifyEmail()}>
                        *Email chưa được xác thực
                      </Typography>
                    </Tooltip>
                  )}
                </Grid>
                <Grid xs={4}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Ngày sinh
                  </Typography>
                  <Typography>{member.dob}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    MSSV
                  </Typography>
                  <Typography gutterBottom>
                    {member.studentOfficialId || "Chưa có MSSV"}
                  </Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Mật khẩu
                  </Typography>
                  <Typography gutterBottom sx={{ fontWeight: 500 }}>
                    ******
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 6, float: "right" }}>
                <Button variant="contained" onClick={() => openEditForm()}>
                  Chỉnh sửa
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfileComponent;
