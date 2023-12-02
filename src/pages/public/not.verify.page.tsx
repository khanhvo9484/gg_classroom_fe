import Typography from "@mui/material/Typography";
import { Box, Link, Button, Stack } from "@mui/material";

const NotVerify = () => {
    document.title = "Tài khoản chưa được xác thực";

    return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ p: 2 }}>
                <Box
                    component="img"
                    src={
                    "https://firebasestorage.googleapis.com/v0/b/k3-learning.appspot.com/o/k3_logo.png?alt=media&token=c6bb7cec-03d8-4767-b00b-915145956430"
                    }
                    sx={{ objectFit: "fit", width: "250px" }}
                />
                <Box sx={{ p: 2 }}>
                    <Typography
                    color="text.secondary"
                    gutterBottom
                    variant="body1"
                    component="div"
                    >
                        Tài khoản của bạn hiện chưa được xác thực email.
                        Hãy kiểm tra lại hòm thư của bạn để xác thực tài khoản.
                    </Typography>
                </Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ my: 2 }}
                >
                    <Link href="/">
                        <Button variant="outlined" size="large">
                            Về trang chủ
                        </Button>
                    </Link>
                </Stack>
            </Box>
        </Box>
    );
};

export default NotVerify;
