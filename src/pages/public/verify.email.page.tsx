import Typography from "@mui/material/Typography";
import {
    Box,
    Link,
    Button, Stack
} from "@mui/material";

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SecurityIcon from '@mui/icons-material/Security';


const VerifyEmail = () => {

    document.title = "Xác thực email thành công";

    const [loading, setLoading] = React.useState(true);
    const [success, setSuccess] = React.useState(false);
    const [isVerified, setIsVerified] = React.useState(false);

    const buttonSx = {
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setIsVerified(true);
            setSuccess(true);
        }, 10000);
        return () => {
            console.log(1);
        };
    }, []);


    if (isVerified) {
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
                            Bạn đã xác thực tài khoản Email thành công cho K3 Learning.
                        </Typography>
                    </Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ my: 2 }}
                    >
                        <Link href="/login">
                            <Button variant="outlined" size="large">
                            Đăng nhập
                            </Button>
                        </Link>
                    </Stack>
                </Box>
            </Box>
        )
    } else {
        return (
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ my: 2 }}
            >
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        sx={buttonSx}
                    >
                        {success ? <CheckIcon /> : <SecurityIcon />}
                    </Fab>
                </Box>
                <Box sx={{ m: 1, position: 'relative' }}>
                    <Button
                        variant="contained"
                        sx={{buttonSx,
                            minWidth: 200,
                            marginLeft: 1
                        }}
                        disabled={loading}
                        size="large"
                    >
                        Verifying ...
                    </Button>
                    {loading && (
                        <CircularProgress
                            size={24}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '10%',
                                marginTop: '-12px',
                            }}
                        />
                    )}
                </Box>
            </Stack>
        );
    }
};

export default VerifyEmail;
