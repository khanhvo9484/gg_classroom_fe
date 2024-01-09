import {
  Divider,
  Card,
  CardHeader,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";
import { INotification } from "@/models/notification.model";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";

export default function Notification(props: { notification: INotification }) {
  const { notification } = props;
  console.log(notification);

  const { courseId } = useParams();
  const navigate = useNavigate();
  const handleNotificationClick = (targetId: string) => {
    navigate(`/course/${courseId}/grade-review/${targetId}`, { replace: true });
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 3,
          border: "0.5px solid #6566660a",
          backgroundColor: notification.isRead ? "" : "#dfeaf7cf",
        }}
      >
        <CardActionArea onClick={() => handleNotificationClick("1")}>
          <CardHeader
            sx={{ paddingBottom: "5px" }}
            avatar={
              <AvatarHelper user={notification.actor} sx={{}}/>
            }
            title={
              <Typography variant="body1" sx={{ fontSize: 15 }}>
                <span style={{ fontWeight: 700 }}>{notification.actor.name}</span>{" "}
                {notification.content}
              </Typography>
            }
            subheader={
              <Typography sx={{ fontSize: 10 }}>
                {notification.createAt}
              </Typography>
            }
          />
        </CardActionArea>
      </Card>
      <Divider sx={{ mb: 1 }} />
    </>
  );
}
