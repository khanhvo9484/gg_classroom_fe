import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { forwardRef, useEffect, useState } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Subject, debounceTime } from "rxjs";
import { ClassService } from "@/service/class.service";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import { useNavigate } from "react-router-dom";
import NotifyModalComponent from "../modals/notify-modal.component";
import { useDispatch } from "react-redux";
import { setCourses } from "@/redux/courses.slice";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

const codeRegex = /^[a-zA-Z0-9]{5,7}$/;

const JoinCodeByCodeDialog: React.FC<SimpleDialogProps> = ({
  open,
  onClose,
}) => {
  const classService = new ClassService();
  const [code, setCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const user = useSelector(selectUser);
  const codeValueSubject = new Subject();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    codeValueSubject.pipe(debounceTime(700)).subscribe((value: string) => {
      if (value == "") {
        setIsCodeValid(true);
      } else {
        setIsCodeValid(codeRegex.test(value));
      }
      setCode(value);
    });
  });

  const handleCodeValueChange = (event) => {
    codeValueSubject.next(event.target.value);
  };

  const handleJoinCourse = async () => {
    setLoading(true);
    try {
      const response = await classService.joinCourseByInviteCode({
        userId: user.id,
        inviteCode: code,
      });

      const { data: newCourses } = await classService.getAllCourse();

      dispatch(
        setCourses({
          courses: newCourses,
        })
      );

      onClose();
      setTimeout(() => {
        navigate(`/course/${response.data.courseId}`, { replace: true });
      }, 500);
    } catch (error) {
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };
  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", bgcolor: "white" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ color: "#5f6368" }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 3, flex: 1, color: "#5f6368" }}
              variant="subtitle1"
              component="div"
            >
              Tham gia lớp học
            </Typography>
            <Button
              autoFocus
              variant="contained"
              disabled={!isCodeValid || code.length === 0 || isLoading}
              onClick={() => handleJoinCourse()}
            >
              {!isLoading ? "Tham gia" : "Đang tham gia..."}
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Card sx={{ mt: "8rem", width: "35rem", height: "20rem" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Mã lớp
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1.5 }}
                color="text.secondary"
              >
                Đề nghị giáo viên của bạn cung cấp mã lớp rồi nhập mã đó vào
                đây.
              </Typography>
              <TextField
                sx={{ width: "17rem", mt: 1, height: "4rem" }}
                required
                id="outlined-basic"
                label="Mã lớp"
                variant="outlined"
                onChange={(event) => handleCodeValueChange(event)}
                error={!isCodeValid}
                helperText={
                  !isCodeValid
                    ? "Mã lớp học có 5-7 ký tự gồm cả chữ cái và số, không có dấu cách hoặc ký hiệu"
                    : ""
                }
              />
            </CardContent>
            <CardContent>
              <Typography sx={{ fontWeight: 500 }}>
                &nbsp;Cách đăng nhập bằng mã lớp học
              </Typography>
              <ul>
                <li>
                  <Typography> Sử dụng tài khoản được cấp phép</Typography>
                </li>
                <li>
                  <Typography>
                    Sử dụng mã lớp học gồm 5-7 chữ cái hoặc số, không có dấu
                    cách hoặc ký hiệu{" "}
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Box>
      </Dialog>
      <NotifyModalComponent
        isOpen={isError}
        title="Đã xảy ra lỗi"
        content="Không thể tham gia lớp học. Hãy kiểm tra mã và tài khoản rồi thử lại."
        onClose={() => {
          setIsError(false);
        }}
      />
    </>
  );
};

export default JoinCodeByCodeDialog;
