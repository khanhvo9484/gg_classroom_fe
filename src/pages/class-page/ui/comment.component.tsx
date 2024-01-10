import CardHeader from "@mui/material/CardHeader";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import UserModel from "@/models/user.model";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider, Typography, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

export interface Comment {
  account: UserModel;
  comment: string;
  createdTime: string;
}

export interface CommentProps {
  comment: Comment;
}

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  return (
    <CardContent>
      <CardHeader
        sx={{}}
        avatar={<AvatarHelper sx={{}} user={comment?.account} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box sx={{ display: "flex", gap: 1 }}>
            {" "}
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {comment?.account.name}
            </Typography>
            <Typography variant="body2">{comment?.createdTime}</Typography>
          </Box>
        }
        subheader={
          <Typography mt={0.5} variant="body2">
            {comment?.comment}
          </Typography>
        }
      />
      <Divider />
    </CardContent>
  );
};

export default CommentComponent;
