import CardHeader from "@mui/material/CardHeader";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import UserModel from "@/models/user.model";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Divider, Typography, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { IGradeReviewComment } from "./card-review-request";
import { convertUtcToVietnamTime } from "@/utils/common.util";
export interface CommentProps {
  comment: IGradeReviewComment;
  _bgColor?: string;
}

const CommentComponent: React.FC<CommentProps> = ({ comment, _bgColor }) => {
  return (
    <CardContent sx={{ backgroundColor: _bgColor || "white" }}>
      <CardHeader
        sx={{}}
        avatar={<AvatarHelper sx={{}} user={comment?.user} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {comment?.user?.name}
            </Typography>
            <Typography variant="body2">
              {convertUtcToVietnamTime(comment?.createdAt)}
            </Typography>
          </Box>
        }
        subheader={
          <Typography mt={0.5} variant="body2">
            {comment?.content}
          </Typography>
        }
      />
      <Divider />
    </CardContent>
  );
};

export default CommentComponent;
