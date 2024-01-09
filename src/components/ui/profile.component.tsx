import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { CardActions, CardHeader, IconButton } from "@mui/material";
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

interface Props {
  member: UserModel;
  openEditForm: () => void;
}

const ProfileComponent: React.FC<Props> = ({ member, openEditForm }) => {
  return (
    <Grid container spacing={2} sx={{ height: "400px" }}>
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
              <AvatarHelper
                user={member} sx={{}}
              />
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
                  <Typography gutterBottom>{member.phone_number}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Email
                  </Typography>
                  <Typography>{member.email}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Ngày sinh
                  </Typography>
                  <Typography>{member.dob}</Typography>
                </Grid>
                <Grid xs={4}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Vai trò
                  </Typography>
                  <Typography gutterBottom>{member.role}</Typography>
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
