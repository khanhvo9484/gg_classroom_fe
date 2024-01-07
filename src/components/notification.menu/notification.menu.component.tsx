import { Badge, IconButton, Popper, Paper, Fade } from "@mui/material";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import React from "react";
import Notification from "./notification.component";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

export default function NotificationMenu() {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      <Badge badgeContent={4} color="error">
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <IconButton
            size="small"
            onClick={handleClick}
          >
            <NotificationsNoneOutlinedIcon />
          </IconButton>
        </ClickAwayListener>
      </Badge>
      <Popper id={id} open={open} anchorEl={anchorEl} sx={{zIndex: 1202}}
      placement="bottom-end">
        <Fade in={open}>
          <Paper sx={{ border: 1, p: 1, bgcolor: 'background.paper', borderRadius: "12px",
          maxWidth: 300, minWidth: 300 }}>
            <Notification />
            <Notification />
          </Paper>
        </Fade>
      </Popper>
    </>
  );
}



