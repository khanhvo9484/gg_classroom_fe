import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import Typography from "@mui/material/Typography";
import {Grid, IconButton } from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';
import GppBadIcon from '@mui/icons-material/GppBad';
import UserModel from "@/models/user.model";

function convertDob(dob: string){
    return (new Date(dob)).toDateString()
}

interface Props {
    account: UserModel
}

const AccountComponent: React.FC<Props> = ({
    account
}) => {

    const dob = convertDob(account.dob);

    const HandleSuspendClick = () => {

    }

    const HandleBanClick = () => {

    }

    return (
        <>
            <ListItem sx={{borderRadius: 2}} key={account.id}
            >
                <Grid container >
                    <Grid xs={1} item>
                        <AvatarHelper sx={{}}
                                user={account}/>
                    </Grid>
                    <Grid xs={2} item>
                        <Typography
                            variant="body1"
                            sx={{fontSize:14}}
                            >
                            {account.name}
                        </Typography>
                    </Grid>
                    <Grid xs={3} item>
                        <Typography
                            variant="body1"
                            sx={{ marginLeft: 1, fontSize:14 }}
                            >
                            {account.email}
                        </Typography>
                    </Grid>
                    <Grid xs={2} item>
                        <Typography
                            variant="body1"
                            sx={{ marginLeft: 2, fontSize:14 }}
                            >
                            {account.phone_number}
                        </Typography>
                    </Grid>
                    <Grid xs={2} item>
                        <Typography
                            variant="body1"
                            sx={{ marginLeft: 3, fontSize:14 }}
                            >
                            {dob}
                        </Typography>
                    </Grid>
                    <Grid xs={2} sx={{mt: -1}} item>
                        <IconButton onClick={() => HandleSuspendClick()}>
                            <GppBadIcon color={account.isBlocked ? "warning" : "action"}/>
                        </IconButton>
                        <IconButton onClick={() => HandleBanClick()}>
                            <BlockIcon color={account.isBlocked ? "error" : "action"} />
                        </IconButton>
                    </Grid>
                </Grid>
            </ListItem>
            <Divider/>
        </>
    );
};

export default AccountComponent;
