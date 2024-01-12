import {
  Divider,
  Card,
  CardHeader,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { INotification, NotificationType } from "@/models/notification.model";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import { convertUtcToVietnamTime } from "@/utils/common.util";
export default function Notification(props: { notification: INotification }) {
  const { notification } = props;

  const navigate = useNavigate();
  const handleNotificationClick = () => {
    switch (notification.type) {
      case NotificationType.NEW_GRADE_FINALIZE:
        navigate(`/course/${notification.courseId}/student-view-grade`, {
          replace: true,
        });
        return;
      case NotificationType.NEW_GRADE_REVIEW:
        navigate(
          `/course/${notification.courseId}/grade-review/${notification.targetId}`,
          {
            replace: true,
          }
        );
        return;
      case NotificationType.NEW_GRADE_REVIEW_COMMENT:
        navigate(
          `/course/${notification.courseId}/grade-review/${notification.targetId}`,
          {
            replace: true,
          }
        );
        return;
      case NotificationType.NEW_GRADE_REVIEW_FINALIZE:
        navigate(
          `/course/${notification.courseId}/grade-review/${notification.targetId}`,
          {
            replace: true,
          }
        );
        return;
      case NotificationType.NEW_GRADE_STRUCTURE:
        return;
    }
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
        <CardActionArea onClick={() => handleNotificationClick()}>
          <CardHeader
            sx={{ paddingBottom: "5px" }}
            avatar={<AvatarHelper user={notification?.actor} sx={{}} />}
            title={
              <Typography variant="body1" sx={{ fontSize: 15 }}>
                <span style={{ fontWeight: 700 }}>
                  {notification?.actor?.name}
                </span>{" "}
                {notification?.content}
              </Typography>
            }
            subheader={
              <Typography sx={{ fontSize: 10 }}>
                {convertUtcToVietnamTime(notification?.createdAt)}
              </Typography>
            }
          />
        </CardActionArea>
      </Card>
      <Divider sx={{ mb: 1 }} />
    </>
  );
}
