import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, IconButton } from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';
import GppBadIcon from '@mui/icons-material/GppBad';
import useAllUser from "@/hooks/all-users.hook";
import AccountComponent from "./account.component";

interface Props {
}

const AccountListComponent: React.FC<Props> = () => {

    const { users} = useAllUser();

    return (
        <Box sx={{ marginTop: 4, marginBottom: 10 }}>
            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgb(95,99,104)",
                paddingBottom: 1,
                }}
            >
                <Grid container >
                    <Grid xs={3} item>
                        <Typography
                            variant="h6"
                            sx={{ marginLeft: 9, color: "rgb(25,103,210)" }}
                            >
                            {`Tên`}
                        </Typography>
                    </Grid>
                    <Grid xs={3} item>
                        <Typography
                            variant="h6"
                            sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                            >
                            {`Email`}
                        </Typography>
                    </Grid>
                    <Grid xs={2} item>
                        <Typography
                            variant="h6"
                            sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                            >
                            {`Điện thoại`}
                        </Typography>
                    </Grid>
                    <Grid xs={2} item>
                        <Typography
                            variant="h6"
                            sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                            >
                            {`Ngày sinh`}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <ListItem sx={{borderRadius: 2}}
                    >
                        <Grid container >
                            <Grid xs={1} item>
                                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                                    R
                                </Avatar>
                            </Grid>
                            <Grid xs={2} item>
                                <Typography
                                    variant="body1"
                                    sx={{fontSize:14}}
                                    >
                                    {`Nguyễn Đăng Khoa`}
                                </Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography
                                    variant="body1"
                                    sx={{ marginLeft: 1, fontSize:14 }}
                                    >
                                    {`topsiu1.ds@gmail.com`}
                                </Typography>
                            </Grid>
                            <Grid xs={2} item>
                                <Typography
                                    variant="body1"
                                    sx={{ marginLeft: 2, fontSize:14 }}
                                    >
                                    {`0392512651`}
                                </Typography>
                            </Grid>
                            <Grid xs={2} item>
                                <Typography
                                    variant="body1"
                                    sx={{ marginLeft: 3, fontSize:14 }}
                                    >
                                    {`04/02/2002`}
                                </Typography>
                            </Grid>
                            <Grid xs={2} sx={{mt: -1}} item>
                                <IconButton>
                                    <BlockIcon />
                                </IconButton>
                                <IconButton>
                                    <GppBadIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider/>
                    <ListItem sx={{borderRadius: 2}}
                    >
                        <Grid container >
                            <Grid xs={1} item>
                                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                                    R
                                </Avatar>
                            </Grid>
                            <Grid xs={2} item>
                                <Typography
                                    variant="body1"
                                    sx={{fontSize:14}}
                                    >
                                    {`Nguyễn Đăng Khoa`}
                                </Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography
                                    variant="body1"
                                    sx={{ marginLeft: 1, fontSize:14 }}
                                    >
                                    {`topsiu1.ds@gmail.com`}
                                </Typography>
                            </Grid>
                            <Grid xs={2} item>
                                <Typography
                                    variant="body1"
                                    sx={{ marginLeft: 2, fontSize:14 }}
                                    >
                                    {`0392512651`}
                                </Typography>
                            </Grid>
                            <Grid xs={2} item>
                                <Typography
                                    variant="body1"
                                    sx={{ marginLeft: 3, fontSize:14 }}
                                    >
                                    {`04/02/2002`}
                                </Typography>
                            </Grid>
                            <Grid xs={2} sx={{mt: -1}} item>
                                <IconButton>
                                    <BlockIcon color="error" />
                                </IconButton>
                                <IconButton>
                                    <GppBadIcon color="warning"/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider/>
                    {users && users.map((user) => {
                         return (<AccountComponent account={user}/>)
                    })}
            </List>
        </Box>
    );
};

export default AccountListComponent;
