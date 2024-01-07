import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {Grid, IconButton } from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';
import GppBadIcon from '@mui/icons-material/GppBad';
import UserModel from "@/models/user.model";

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function convertDob(dob: string){
    return (new Date(dob)).toDateString()
}

interface Props {
    account: UserModel
}

const AccountComponent: React.FC<Props> = ({
    account
}) => {

    const avatarColor = stringToColor(account.name);
    const dob = convertDob(account.dob);

    return (
        <>
            <ListItem sx={{borderRadius: 2}}
            >
                <Grid container >
                    <Grid xs={1} item>
                        <Avatar sx={{ bgcolor: `${avatarColor}` }} aria-label="recipe"
                        src={account.avatar}>
                        </Avatar>
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
                        <IconButton>
                            <GppBadIcon color={account.isBlocked ? "warning" : "action"}/>
                        </IconButton>
                        <IconButton>
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
