import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import IconButton from "@mui/material/IconButton";

interface Props {
  title: string;
}

const memberList = [
  "Khang Trần Duy",
  "Khanh Võ Nhất",
  "Khoa Nguyễn Đăng",
  "Khang Trần Duy",
  "Khanh Võ Nhất",
  "Khoa Nguyễn Đăng",
];

const MemberListComponent: React.FC<Props> = ({ title }) => {
  const isTeacher = true;

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
        <Typography
          variant="h4"
          sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
        >
          {title}
        </Typography>
        {isTeacher && (
          <IconButton
            aria-label="settings"
            size="large"
            sx={{ color: "rgb(25,103,210)" }}
          >
            <PersonAddAltOutlinedIcon fontSize="inherit" />
          </IconButton>
        )}
      </Box>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {memberList.map((member, index) => {
          return (
            <>
              <ListItem key={index} alignItems="center">
                <ListItemAvatar sx={{ marginTop: 0, minWidth: 50 }}>
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {member}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider
                sx={{ marginTop: 1 }}
                variant="fullWidth"
                component="li"
              />
            </>
          );
        })}
      </List>
    </Box>
  );
};

export default MemberListComponent;
