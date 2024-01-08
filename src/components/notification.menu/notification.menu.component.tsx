import { Badge, IconButton, Popper, Paper, Fade } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import React from "react";
import Notification from "./notification.component";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import useNotification from "@/hooks/notification.hook";
import socket from "@socket/socket";
import { useState, useEffect } from "react";
import { INotification } from "@/models/notification.model";
export default function NotificationMenu() {
  const auth = useSelector(selectUser);
  const { notifications, notificationIsLoading, notificationError } =
    useNotification(auth.id);

  const [notificationData, setNotificationData] = useState(
    Array.isArray(notifications) ? notifications : []
  );
  const [notificationCount, setNotificationCount] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);

    // socket emit
    socket.emit("setNotificationIsRead", { userId: auth.id });
    setNotificationCount(null);
    const temp: INotification[] = notificationData.map((notification) => {
      return {
        ...notification,
        isRead: true,
      };
    });
    setNotificationData(temp);
  };

  socket.on("onSetNotificationIsRead", (data) => {
    if (data) {
      // Do something when notification is read
    }
  });

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  useEffect(() => {
    setNotificationData(Array.isArray(notifications) ? notifications : []);
    const count =
      Array.isArray(notifications) &&
      notifications.filter((notification) => !notification.isRead).length;
    if (count === 0) {
      setNotificationCount(null);
    } else {
      setNotificationCount(count);
    }

    // Update notificationCount based on the calculated count
  }, [notifications]);

  useEffect(() => {
    socket.on("onReceiveNotification", (data) => {
      const objectData = JSON.parse(data);
      setNotificationData((previous) => [objectData, ...previous]);
      const count = notificationCount + 1;
      setNotificationCount(count);
    });

    return () => {
      socket.off("onReceiveNotification");
    };
  }, []);

  return (
    <>
      <Badge badgeContent={notificationCount} color="error">
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <IconButton size="small" onClick={handleClick}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
        </ClickAwayListener>
      </Badge>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        sx={{ zIndex: 1202 }}
        placement="bottom-end"
      >
        <Fade in={open}>
          <Paper
            sx={{
              border: "0.5px solid #6566660a",
              p: 0,
              bgcolor: "background.paper",
              borderRadius: "12px",
              maxWidth: 300,
              minWidth: 300,
              maxHeight: 600, // Set your desired maximum height
              overflowY: "auto", // Add scrollbar when content exceeds maxHeight
            }}
          >
            {notifications && (
              <>
                {notifications.map((notification, index) => (
                  <Notification key={index} notification={notification} />
                ))}
              </>
            )}
          </Paper>
        </Fade>
      </Popper>
    </>
  );
}
