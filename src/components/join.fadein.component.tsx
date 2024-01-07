import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { Stack, TextField } from "@mui/material";
import UserModel from "@/models/user.model";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { customAxios } from "@/api/custom-axios";
import { Form, FormikProvider, useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";

const FadeInJoin = ({ onFadeClose }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user: UserModel = useSelector((state: any) => state.auth.user);

  const LoginSchema = Yup.object().shape({
    inviteCode: Yup.string().required("Bạn cần nhập mã mời của lớp học"),
  });
  const formik = useFormik({
    initialValues: {
      inviteCode: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          inviteCode: values.inviteCode,
        };

        const response = await customAxios.post(
          "/courses/join-by-invite-code",
          payload
        );

        if (response.status) {
          toast.success("Tham gia vào lớp học thành công");
          onFadeClose();
        } else {
          toast.error("Có lỗi trong quá trình tham gia lớp. Thử lại sau.");
          console.log(response);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Box>
      <AppBar
        position="fixed"
        color="transparent"
        style={{ background: "white" }}
        sx={{ boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ mr: 2 }}>
              <IconButton
                size="large"
                onClick={() => {
                  onFadeClose();
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                gap: 1,
                color: "text.primary",
              }}
            >
              <Typography variant="h6" component="div">
                Tham gia lớp học
              </Typography>
            </Box>

            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  disabled={Boolean(!touched.inviteCode || errors.inviteCode)}
                >
                  {isSubmitting ? "loading..." : "Tham gia"}
                </LoadingButton>
              </Form>
            </FormikProvider>
          </Toolbar>
        </Container>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
          justifyContent: "center",
          mt: 15,
        }}
      >
        <Card sx={{ width: 600 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14, mb: 1 }}
                color="text.secondary"
                gutterBottom
              >
                Bạn đang đăng nhập bằng tài khoản
              </Typography>
              <Box>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    ml: 1,
                    maxWidth: 280,
                  }}
                >
                  <Avatar
                    sx={{ minWidth: 15, minHeight: 15, mr: 2 }}
                    src={user.avatar}
                  ></Avatar>
                  <ListItemText primary={user.name} secondary={user.email} />
                </Stack>
              </Box>
            </CardContent>
            <CardActions sx={{ mt: 3, mr: 1 }}>
              <Button size="small" variant="outlined">
                Chuyển đổi tài khoản
              </Button>
            </CardActions>
          </Stack>
        </Card>
        <Card sx={{ width: 600 }}>
          <CardContent>
            <Typography sx={{ fontSize: 20, mb: 1 }} gutterBottom>
              Mã lớp
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Đề nghị giáo viên của bạn cung cấp mã lớp rồi nhập mã đó vào đây.
            </Typography>
            <FormikProvider value={formik}>
              <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <TextField
                  autoComplete="Mã lớp"
                  label="Mã lớp"
                  {...getFieldProps("inviteCode")}
                  error={Boolean(touched.inviteCode && errors.inviteCode)}
                  helperText={touched.inviteCode && errors.inviteCode}
                  InputProps={{}}
                />
              </Form>
            </FormikProvider>
          </CardContent>
        </Card>
        <Box sx={{ width: 600, ml: 5 }}>
          <Typography variant="h4" sx={{ fontSize: 20, mb: 1 }} component="div">
            Cách đăng nhập bằng mã lớp học
          </Typography>
          <ul>
            <li>
              <ListItemText
                sx={{ fontSize: 20, mb: 1 }}
                secondary={"Sử dụng tài khoản được cấp phép"}
              />
            </li>
            <li>
              <ListItemText
                sx={{ fontSize: 20, mb: 1 }}
                secondary={
                  "Sử dụng mã lớp học gồm 5-7 chữ cái hoặc số, không có dấu cách hoặc ký hiệu"
                }
              />
            </li>
          </ul>
          <Typography>
            Nếu bạn đang gặp vấn đề khi tham gia lớp học, hãy chuyển đến bài
            viết trong Trung tâm trợ giúp
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FadeInJoin;
