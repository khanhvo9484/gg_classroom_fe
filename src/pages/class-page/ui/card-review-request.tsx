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
import {
  Button,
  Divider,
  Grid,
  Box,
  Menu,
  MenuItem,
  Container,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useState, useEffect, useRef, useContext } from "react";
import CommentInputComponent from "./comment-input.component";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImgsViewer from "react-images-viewer";
import { customAxios } from "@/api/custom-axios";
import { IGradeReviewResponseKZ } from "../review-request-list/ui/review-list.component";
import { GradeReviewStatusDict } from "../review-request-list/ui/review-list.component";
import {
  Bookmark as BookmarkIcon,
  Notes as NotesIcon,
} from "@mui/icons-material";
import socket from "@/socket/socket";
import { GradeReviewStatus } from "@/models/grade.review.model";
import FinalizeGradeDialog from "@/components/ui/dialog/finalize-grade-accept.dialog.component";
import FinalizeGradeRejectDialog from "@/components/ui/dialog/finalize-grade-reject.dialog.component";
import { convertUtcToVietnamTime } from "@/utils/common.util";
import RoleContext from "@/context/role.context";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
export interface IGradeReviewComment {
  id: string;
  userId: string;
  gradeReviewId: string;
  content: string;

  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  user: UserModel;
  gradeReview: IGradeReviewResponseKZ;
}

export interface IGradeReviewFinal {
  createdAt: Date;
  deletedAt: Date;

  explaination: string;

  finalGrade: number;
  gradeReviewId: string;
  reviewer: UserModel;
  reviewerId: string;
  updatedAt: Date;
}

interface Props {}

const GradeReviewPost: React.FC<Props> = () => {
  document.title = "Phúc khảo";
  const { courseId } = useParams();
  const { reviewId } = useParams();
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [review, setReview] = useState<IGradeReviewResponseKZ>(null);
  const { isTeacher, setIsTeacher } = useContext(RoleContext);
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [isOpenFinalizeGradeDialog, setIsFinalizeGradeDialog] = useState(false);
  const [isOpenFinalizeGradeRejectDialog, setIsFinalizeGradeRejectDialog] =
    useState(false);

  const [finalResult, setFinalResult] = useState<IGradeReviewFinal>(null);
  const [isLoading, setIsLoading] = useState(true);
  const openImageViewer = useCallback(() => {
    setIsViewerOpen(true);
  }, []);
  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };
  const navigate = useNavigate();

  const [commentData, setCommentData] = useState<IGradeReviewComment[]>([]);
  const lastCommentRef = useRef(null);

  const updateData = (newComment: IGradeReviewComment) => {
    setCommentData([...commentData, newComment]);
  };

  const rollbackData = (newComment: IGradeReviewComment) => {
    setCommentData(
      commentData.filter((comment) => comment.id !== newComment.id)
    );
  };

  const handleBackClick = () => {
    navigate(`/course/${courseId}/grade-review`, { replace: true });
  };

  const scrollToLastesComment = () => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      const { data: response } = await customAxios.get(
        "grade-review/get/" + reviewId,
        {}
      );

      setReview(response.data);
      setCommentData(response.data.comments);

      if (
        Array.isArray(response.data.final) &&
        response.data.final.length > 0
      ) {
        setFinalResult(response.data.final[0]);
      }

      setIsLoading(false);
      return response.data;
    };
    fetcher();

    socket.emit("joinPost", { postId: reviewId });
    socket.on("onReceiveNewComment", (data) => {
      const objectData = JSON.parse(data);
      if (objectData?.user?.id !== user.id) {
        setCommentData((prevCommentData) => [...prevCommentData, objectData]);
        setTimeout(() => {
          scrollToLastesComment();
        }, 100);
      }
    });
    socket.on("joinedPost", (data) => {});

    return () => {
      socket.off("joinPost");
      socket.off("onReceiveNewComment");
      socket.off("joinedPost");
    };
  }, []);
  useEffect(() => {
    scrollToLastesComment();
  }, [commentData]);

  return (
    <>
      {isLoading && <LinearProgress sx={{ top: -5 }} />}
      <Container>
        <Card
          sx={{
            marginTop: "1rem",
            borderRadius: "0.5rem",
            border: "0.0625rem solid #dadce0",
          }}
          variant="outlined"
        >
          {!isLoading && (
            <>
              <CardHeader
                sx={{ paddingBottom: "0" }}
                avatar={
                  <>
                    <Tooltip title={"Xem danh sách"}>
                      <IconButton
                        aria-label="settings"
                        sx={{
                          color: "#646464",
                          ":hover": {
                            backgroundColor: "transparent",
                            color: "#3e8aed",
                          },
                          borderRadius: "10px",
                        }}
                        onClick={handleBackClick}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    </Tooltip>

                    <AvatarHelper sx={{}} user={review.user} />
                  </>
                }
                action={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      variant="outlined"
                      color={
                        review?.status === "pending"
                          ? "warning"
                          : review?.status === "approved"
                          ? "success"
                          : "error"
                      }
                    >
                      {GradeReviewStatusDict[review?.status]}
                    </Button>
                    {/* {isTeacher && <Button variant="contained">Sửa điểm</Button>} */}

                    {isTeacher && (
                      <IconButton
                        aria-label="settings"
                        onClick={handleMenuClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </Box>
                }
                title={
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {review.user.name}
                  </Typography>
                }
                subheader={convertUtcToVietnamTime(review.createdAt)}
              />

              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem
                  key={"Đồng ý phúc khảo"}
                  onClick={() => {
                    setIsFinalizeGradeDialog(true);
                  }}
                  disabled={review.status !== GradeReviewStatus.PENDING}
                >
                  {"Đồng ý phúc khảo"}
                </MenuItem>
                <MenuItem
                  key={"Từ chối phúc khảo"}
                  onClick={() => {
                    setIsFinalizeGradeRejectDialog(true);
                  }}
                  disabled={review.status !== GradeReviewStatus.PENDING}
                >
                  {"Từ chối phúc khảo"}
                </MenuItem>
              </Menu>
              <CardContent sx={{ borderBottom: "0.0625rem solid #dadce0" }}>
                <Grid container sx={{ my: 1 }}>
                  <Grid xs={6} container rowSpacing={1} item>
                    <Grid xs={12} item>
                      <Card elevation={0}>
                        <CardHeader
                          title={
                            <Typography variant="h6">
                              {`Phúc khảo điểm ${review.gradeName}`}
                            </Typography>
                          }
                        />
                      </Card>
                      <Divider />
                    </Grid>
                    <Grid container xs={12} item>
                      <Grid xs={6} item>
                        <Card elevation={0}>
                          <CardContent>
                            <Typography variant="body1" color="text.main">
                              Điểm hiện tại: {review.currentGrade}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid xs={6} item>
                        <Card elevation={0}>
                          <CardContent>
                            <Typography variant="body1" color="text.main">
                              Điểm mong muốn: {review.expectedGrade}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>

                    <Grid xs={12} item>
                      <Card elevation={0}>
                        <CardHeader
                          title={
                            <Typography variant="body1">{`Lý do`}</Typography>
                          }
                          sx={{ maxHeight: 5 }}
                        />
                        <Divider />
                        <CardContent>
                          <Typography variant="body1" color="text.main">
                            {`${review.explaination}`}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  <Grid xs={1} item></Grid>
                  <Grid xs={4} item>
                    {review.imgURL && (
                      <Card sx={{ height: "95%" }} elevation={0}>
                        <CardHeader
                          title={
                            <Typography variant="h6">{`Minh chứng`}</Typography>
                          }
                        />
                        <Divider />
                        <CardContent
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={review.imgURL}
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
                                  src: review.imgURL,
                                },
                              ]}
                              isOpen={isViewerOpen}
                              onClose={closeImageViewer}
                            />
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
              {finalResult && review && (
                <Box>
                  <Divider />
                  <Card
                    sx={{
                      backgroundColor:
                        review.status === GradeReviewStatus.APPROVED
                          ? "#5975af"
                          : "#a25757",
                    }}
                  >
                    <CardHeader
                      sx={{ color: "white" }}
                      title={
                        <>
                          <Grid container>
                            <Grid xs={6}>
                              <Grid xs={12} sx={{ display: "flex" }}>
                                <BookmarkIcon></BookmarkIcon>
                                <Typography variant="body1">
                                  Điểm cuối cùng: {finalResult?.finalGrade}
                                </Typography>
                              </Grid>

                              <Grid xs={12} sx={{ display: "flex" }}>
                                <NotesIcon
                                  sx={{ fontSize: "1.4rem" }}
                                ></NotesIcon>
                                <Typography sx={{ fontSize: "0.8rem" }}>
                                  Chú thích: {finalResult?.explaination}
                                </Typography>
                              </Grid>
                              <Grid xs={12}>
                                <Typography
                                  sx={{
                                    fontSize: "0.8rem",
                                    marginLeft: "1.8rem",
                                  }}
                                >
                                  2:01 31-22-2023
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid
                              xs={6}
                              container
                              sx={{
                                backgroundColor:
                                  review.status === GradeReviewStatus.APPROVED
                                    ? "#3b4570"
                                    : "#763535",
                                padding: 2,
                                borderRadius: 2,
                              }}
                            >
                              <Grid xs={12}>
                                <Typography>
                                  Giáo viên: {finalResult?.reviewer?.name}
                                </Typography>
                              </Grid>
                              <Grid xs={12}>
                                <Typography>
                                  Email: {finalResult?.reviewer?.email}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      }
                    ></CardHeader>
                  </Card>
                </Box>
              )}

              <Box sx={{ display: "flex", justifyContent: "right" }}>
                <Typography
                  onClick={scrollToLastesComment}
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                      textDecoration: "underline",
                    },
                    padding: "0.5rem",
                    color: "rgb(67, 138, 237)",
                  }}
                  variant="subtitle1"
                >
                  Xem bình luận mới nhất
                </Typography>
              </Box>
              <Box sx={{ overflowY: "auto", maxHeight: "400px", flexGrow: 1 }}>
                {commentData &&
                  commentData.map((comment, index) => {
                    const isLastComment = index === commentData.length - 1;
                    return (
                      <div
                        key={index}
                        ref={isLastComment ? lastCommentRef : null}
                      >
                        <CommentComponent
                          comment={comment}
                          _bgColor={isLastComment ? "#cfe2fa52" : undefined}
                        />
                      </div>
                    );
                  })}
              </Box>

              <Box sx={{ position: "sticky", bottom: 0 }}>
                <CommentInputComponent
                  updateData={updateData}
                  rollbackData={rollbackData}
                  courseId={review.courseId}
                  ownerId={review.studentId}
                  gradeReviewId={review.id}
                />
              </Box>

              <CardActions disableSpacing></CardActions>
            </>
          )}
        </Card>
      </Container>
      <FinalizeGradeDialog
        open={isOpenFinalizeGradeDialog}
        onClose={() => {
          setIsFinalizeGradeDialog(false);
        }}
        infoGrade={review}
        title={"Cập nhật điểm của học sinh"}
      />
      <FinalizeGradeRejectDialog
        open={isOpenFinalizeGradeRejectDialog}
        onClose={() => {
          setIsFinalizeGradeRejectDialog(false);
        }}
        infoGrade={review}
        title={"Từ chối phúc khảo"}
      ></FinalizeGradeRejectDialog>
    </>
  );
};

export default GradeReviewPost;
