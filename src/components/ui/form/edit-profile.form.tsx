import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { CardActions, CardHeader, IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MemberModel } from "../../../models/member.model";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
interface Props {
  member: MemberModel;
}

const EditProfileForm: React.FC<Props> = ({ member }) => {
  return (
    <Grid container spacing={2} sx={{ height: "450px" }}>
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
              <Avatar
                alt="Remy Sharp"
                src={member.image}
                sx={{ width: 156, height: 156, mb: 3 }}
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
                {member.description}
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
              title="Thiết lập tài khoản"
              sx={{
                borderBottom: "1px solid #ccc",
                backgroundColor: "#f8f9fa",
              }}
            />

            <CardContent>
              <Grid container spacing={3} sx={{ my: 1 }}>
                <Grid xs={6}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Họ
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={6}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Tên
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={6}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Số điện thoại
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={6}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Email
                  </Typography>
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                  />
                </Grid>
                <Grid xs={6}>
                  <Typography gutterBottom sx={{ fontWeight: 550 }}>
                    Ngày sinh
                  </Typography>
                  <DatePicker
                    format="DD/MM/YYYY"
                    sx={{ width: "100%" }}
                    slotProps={{
                      textField: { size: "small" },
                    }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ pt: 0, float: "right" }}>
                <Button variant="contained">Cập nhật</Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EditProfileForm;
