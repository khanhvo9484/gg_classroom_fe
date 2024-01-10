import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import CommentComponent from "./comment.component";
import UserModel from "@/models/user.model";
import { useState } from "react";
import CommentInputComponent from "./comment-input.component";

export interface Comment {
  account: UserModel,
  comment: string,
  createdTime: string,
}

export interface Props {
}

const commentsList: Comment[] = [
  {
    account: {
      "id": "USA8FONM4c",
      "name": "Khoa Khang Khanh",
      "email": "khoa@gmail.com",
      "role": "admin",
      "avatar": null,
      "bio": null,
      "phone_number": null,
      "dob": "2002-04-02T00:00:00.000Z",
      "studentOfficialId": null,
      "isBlocked": false,
      "isSuspended": false,
      "accountType": "local"
    },
    comment: "Thầy ơi phúc khảo nhẹ tay.",
    createdTime: "2:01",
  },
  {
    account: {
      "id": "USA8FONM4c",
      "name": "Khoa Khang Khanh",
      "email": "khoa@gmail.com",
      "role": "admin",
      "avatar": null,
      "bio": null,
      "phone_number": null,
      "dob": "2002-04-02T00:00:00.000Z",
      "studentOfficialId": null,
      "isBlocked": false,
      "isSuspended": false,
      "accountType": "local"
    },
    comment: "Thầy ơi phúc khảo nhẹ tay.",
    createdTime: "2:01",
  },
  {
    account: {
      "id": "USA8FONM4c",
      "name": "Khoa Khang Khanh",
      "email": "khoa@gmail.com",
      "role": "admin",
      "avatar": null,
      "bio": null,
      "phone_number": null,
      "dob": "2002-04-02T00:00:00.000Z",
      "studentOfficialId": null,
      "isBlocked": false,
      "isSuspended": false,
      "accountType": "local"
    },
    comment: "Thầy ơi phúc khảo nhẹ tay.",
    createdTime: "2:01",
  },
]

const PostComponent: React.FC<Props> = () => {
  const account = commentsList[0].account;
  const [commentData, setCommentData ] = useState(commentsList);
  const updateData = (newComment: Comment) => {
    setCommentData([...commentData, newComment]);
  }

  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: "0.5rem",
        border: "0.0625rem solid #dadce0",
      }}
      variant="outlined"
    >
      <CardHeader
        sx={{ paddingBottom: "0" }}
        avatar={
          <AvatarHelper sx={{}} user={account}/>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Khầy Khan
          </Typography>
        }
        subheader="December 12, 2023"
      />
      <CardContent sx={{ borderBottom: "0.0625rem solid #dadce0" }}>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      {commentData && commentData.map((comment,) => {
          return (
              <CommentComponent comment={comment}/>
          )
      })}
      <CommentInputComponent updateData={updateData}/>
      <CardActions disableSpacing></CardActions>
    </Card>
  );
};

export default PostComponent;
