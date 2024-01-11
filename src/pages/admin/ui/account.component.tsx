import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, Tooltip } from "@mui/material";
import GppGoodIcon from "@mui/icons-material/GppGood";
import GppBadIcon from "@mui/icons-material/GppBad";
import UserModel from "@/models/user.model";
import { useContext } from "react";
import LoadingContext from "@/context/loading.contenxt";
import { AdminService } from "@/service/admin.service";
import { mutate } from "swr";
import toast from "react-hot-toast";

function convertDob(dob: string) {
  return new Date(dob).toDateString();
}

interface Props {
  account: UserModel;
}

const AccountComponent: React.FC<Props> = ({ account }) => {
  const dob = convertDob(account.dob);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const adminService = new AdminService();

  const HandleBanClick = async () => {
    startLoading();
    if (account.isBlocked) {
      try {
        await adminService.unblockUser(account.id);
        await mutate("all-users", []);
        toast.success("Mở khóa tài khoản người dùng thành công.");
      } catch (error) {
        toast.error("Mở khóa tài khoản người dùng thất bại.");
      }
    } else {
      try {
        await adminService.blockUser(account.id);
        await mutate("all-users", []);
        toast.success("Khóa tải khoản người dùng thành công.");
      } catch (error) {
        toast.error("Khóa tài khoản người dùng thất bại thất bại.");
      }
    }
    stopLoading();
  };

  return (
    <>
      <ListItem sx={{ borderRadius: 2 }} key={account.id}>
        <Grid container>
          <Grid xs={1} item>
            <AvatarHelper sx={{}} user={account} />
          </Grid>
          <Grid xs={2} item>
            <Typography variant="body1" sx={{ fontSize: 14 }}>
              {account.name}
            </Typography>
          </Grid>
          <Grid xs={3} item>
            <Typography variant="body1" sx={{ marginLeft: 1, fontSize: 14 }}>
              {account.email}
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography variant="body1" sx={{ marginLeft: 2, fontSize: 14 }}>
              {account.phoneNumber}
            </Typography>
          </Grid>
          <Grid xs={2} item>
            <Typography variant="body1" sx={{ marginLeft: 3, fontSize: 14 }}>
              {dob}
            </Typography>
          </Grid>
          <Grid
            xs={2}
            sx={{ mt: -1, display: "inline-flex", justifyContent: "center" }}
            item
          >
            <IconButton onClick={() => HandleBanClick()} sx={{ ml: 2 }}>
              <Tooltip
                title={
                  account?.isBlocked
                    ? "Tài khoản bị khóa, nhấn để mở khóa tài khoản."
                    : "Tài khoản đang hoạt động, nhấn để khóa tài khoản."
                }
              >
                {account?.isBlocked ? (
                  <GppBadIcon color={"warning"} />
                ) : (
                  <GppGoodIcon color={"success"} />
                )}
              </Tooltip>
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
      <Divider component={"li"} key={convertDob(account.dob)} />
    </>
  );
};

export default AccountComponent;
