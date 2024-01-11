import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import UserModel from "@/models/user.model";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import CommentComponent from "./comment.component";
import { Button, Divider, Grid, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useContext, useState } from "react";
import RoleContext from "@/context/role.context";
import CommentInputComponent from "./comment-input.component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImgsViewer from "react-images-viewer";
export interface Comment {
  account: UserModel;
  comment: string;
  createdTime: string;
}

const commentsList: Comment[] = [
  {
    account: {
      id: "USA8FONM4c",
      name: "Khoa Khang Khanh",
      email: "khoa@gmail.com",
      role: "admin",
      avatar: null,
      bio: null,
      phone_number: null,
      dob: "2002-04-02T00:00:00.000Z",
      studentOfficialId: null,
      isBlocked: false,
      isSuspended: false,
      accountType: "local",
    },
    comment: "Thầy ơi phúc khảo nhẹ tay.",
    createdTime: "2:01",
  },
  {
    account: {
      id: "USA8FONM4c",
      name: "Khoa Khang Khanh",
      email: "khoa@gmail.com",
      role: "admin",
      avatar: null,
      bio: null,
      phone_number: null,
      dob: "2002-04-02T00:00:00.000Z",
      studentOfficialId: null,
      isBlocked: false,
      isSuspended: false,
      accountType: "local",
    },
    comment: "Thầy ơi phúc khảo nhẹ tay.",
    createdTime: "2:01",
  },
  {
    account: {
      id: "USA8FONM4c",
      name: "Khoa Khang Khanh",
      email: "khoa@gmail.com",
      role: "admin",
      avatar: null,
      bio: null,
      phone_number: null,
      dob: "2002-04-02T00:00:00.000Z",
      studentOfficialId: null,
      isBlocked: false,
      isSuspended: false,
      accountType: "local",
    },
    comment: "Thầy ơi phúc khảo nhẹ tay.",
    createdTime: "2:01",
  },
];

interface Props {}

const GradeReviewPost: React.FC<Props> = () => {
  const { courseId } = useParams();
  const { reviewId } = useParams();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };
  const navigate = useNavigate();

  const { isTeacher } = useContext(RoleContext);
  const [commentData, setCommentData] = useState(commentsList);

  console.log(commentData);

  const updateData = (newComment: Comment) => {
    setCommentData([...commentData, newComment]);
  };

  const handleBackClick = () => {
    navigate(`/course/${courseId}/grade-review`, { replace: true });
  };

  const account = commentsList[0].account;

  return (
    <Card
      sx={{
        marginTop: "1rem",
        width: "100%",
        borderRadius: "0.5rem",
        border: "0.0625rem solid #dadce0",
      }}
      variant="outlined"
    >
      <IconButton aria-label="settings">
        <ArrowBackIcon onClick={handleBackClick} />
        <Typography variant="body1">Xem danh sách</Typography>
      </IconButton>

      <CardHeader
        sx={{ paddingBottom: "0" }}
        avatar={<AvatarHelper sx={{}} user={account} />}
        action={
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button variant="outlined">Đang chờ</Button>
            {/* {isTeacher && <Button variant="contained">Sửa điểm</Button>} */}

            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </Box>
        }
        title={
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Khầy Khan
          </Typography>
        }
        subheader="December 12, 2023"
        content="Thầy ơi phúc khảo nhẹ tay."
      />
      <CardContent sx={{ borderBottom: "0.0625rem solid #dadce0" }}>
        <Grid container sx={{ my: 1 }}>
          <Grid xs={6} container rowSpacing={1}>
            <Grid xs={12}>
              <Card elevation={0}>
                <CardHeader
                  title={
                    <Typography variant="h6">
                      {`Phúc khảo điểm BTVN môn toán`}
                    </Typography>
                  }
                />
              </Card>
              <Divider />
            </Grid>
            <Grid container xs={12}>
              <Grid xs={6}>
                <Card elevation={0}>
                  <CardContent>
                    <Typography variant="body1" color="text.main">
                      Điểm hiện tại: 10
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid xs={6}>
                <Card elevation={0}>
                  <CardContent>
                    <Typography variant="body1" color="text.main">
                      Điểm mong muốn: 10
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid xs={12}>
              <Card elevation={0}>
                <CardHeader
                  title={<Typography variant="body1">{`Lý do`}</Typography>}
                  sx={{ maxHeight: 5 }}
                />
                <Divider />
                <CardContent>
                  <Typography variant="body1" color="text.main">
                    {`Vì thích thế`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid xs={1}></Grid>
          <Grid xs={4}>
            <Card sx={{ height: "95%" }} elevation={0}>
              <CardHeader
                title={<Typography variant="h6">{`Minh chứng`}</Typography>}
              />
              <Divider />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={
                    "https://th.bing.com/th/id/R.2b67507bc688b741fee318af9506d5ec?rik=ZX7wqbJJAtPTyw&riu=http%3a%2f%2fclipart-library.com%2fimg%2f952237.png&ehk=ABOxpusyEfjVw9LgAkVmMBT7t%2bhAIMRbNh2LavXmn3E%3d&risl=&pid=ImgRaw&r=0"
                  }
                  alt={"Minh chứng"}
                  width={"auto"}
                  height={250}
                  style={{ objectFit: "contain", cursor: "pointer" }}
                  onClick={() => openImageViewer()}
                />
                {isViewerOpen && (
                  <ImgsViewer
                    imgs={[
                      {
                        src: "https://th.bing.com/th/id/R.2b67507bc688b741fee318af9506d5ec?rik=ZX7wqbJJAtPTyw&riu=http%3a%2f%2fclipart-library.com%2fimg%2f952237.png&ehk=ABOxpusyEfjVw9LgAkVmMBT7t%2bhAIMRbNh2LavXmn3E%3d&risl=&pid=ImgRaw&r=0",
                      },
                    ]}
                    isOpen={isViewerOpen}
                    onClose={closeImageViewer}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
      <Box>
        <Divider />
        <Card>
          <CardHeader
            title={
              <Box>
                <Typography variant="body1">Điểm cuối cùng: 10</Typography>
                <Typography>Thời gian phúc khảo: 2:01</Typography>
                <Typography>Giáo viên: Khầy Khan</Typography>
                <Typography variant="body1">{`Minh chứng`}</Typography>
              </Box>
            }
          ></CardHeader>
        </Card>
      </Box>
      {commentData &&
        commentData.map((comment) => {
          return <CommentComponent comment={comment} />;
        })}
      <CommentInputComponent updateData={updateData} />
      <CardActions disableSpacing></CardActions>
    </Card>
  );
};

export default GradeReviewPost;
