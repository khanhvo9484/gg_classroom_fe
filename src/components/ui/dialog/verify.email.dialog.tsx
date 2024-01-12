import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, Button, Divider, Link, Stack} from "@mui/material";
import { Typography } from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function VerifyEmailDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <Box sx={{ py: 2 }}>
            <DialogTitle sx={{ pb: 0 }}>
                <Typography
                sx={{
                    fontWeight: 400,
                    fontSize: 25,
                    textAlign: "left",
                }}
                >
                Xác thực tài khoản email
                </Typography>
            </DialogTitle>
            <Divider sx={{borderWidth: 3}}/>
            <Box sx={{ p: 4 }}>
                <Box sx={{ p: 2 }}>
                    <Stack direction={"row"} sx={{display: "inline-flex", justifyContent: "center", width: "100%"}}>
                        <Box
                            component="img"
                            src={
                            "https://firebasestorage.googleapis.com/v0/b/k3-learning.appspot.com/o/k3_logo.png?alt=media&token=c6bb7cec-03d8-4767-b00b-915145956430"
                            }
                            sx={{ objectFit: "fit", width: "250px"}}
                        />
                    </Stack>
                    <Box sx={{ p: 2 }}>
                        <Typography
                        color="text.secondary"
                        gutterBottom
                        variant="body1"
                        component="div"
                        >
                            Mail xác thực tài khoản vừa được gửi đến bạn.
                            Hãy kiểm tra lại hòm thư của bạn để xác thực tài khoản.
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ my: 2 }}
                    >
                        <Link href="./profile">
                            <Button variant="outlined" size="large">
                                Trở lại trang cá nhân
                            </Button>
                        </Link>
                    </Stack>
                </Box>
            </Box>
        </Box>
    </Dialog>
  );
}
