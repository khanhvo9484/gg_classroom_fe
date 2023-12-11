import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClassService } from "@/service/class.service";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import CancelIcon from "@mui/icons-material/Cancel";
const VerifyTokenInvitePage = () => {
  const classService = new ClassService();
  const [verifyValid, setVerifyValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifyInvalid, setVerifyInvalid] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const displayTitle = () => {
    if (isLoading) {
      setTitle("Đang thực hiện xác thực");
    } else if (verifyValid) {
      setTitle("Tham gia lớp thành công!");
    } else if (!verifyValid) {
      setTitle("Xác thực thất bại");
    }
  };

  const displayContent = () => {
    if (isLoading) {
      setContent("Vui lòng chờ đợi trong giây lát...");
    } else if (verifyValid) {
      setContent("Đang thực hiện điều hướng...");
    } else if (!verifyValid) {
      setContent("");
    }
  };
  useEffect(() => {
    setIsLoading(true);
    const verifyTokenInviteCourse = async () => {
      try {
        const response = await classService.verifyTokenInviteCourse({
          inviteToken: token,
        });

        setVerifyValid(true);
        setIsLoading(false);
        setTimeout(() => {
          navigate(`/course/${response.data.courseId}`, { replace: true });
        }, 1000);
      } catch (error) {
        setVerifyValid(false);
        setVerifyInvalid(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      verifyTokenInviteCourse();
    }
  }, []);

  useEffect(() => {
    displayTitle();
    displayContent();
  }, [isLoading, verifyValid]);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {verifyValid && (
        <SchoolIcon
          color="success"
          sx={{ fontSize: 130, zIndex: 10, position: "absolute", top: "26%" }}
        />
      )}

      {isLoading && (
        <SafetyCheckIcon
          color="secondary"
          sx={{ fontSize: 130, zIndex: 10, position: "absolute", top: "26%" }}
        />
      )}

      {isVerifyInvalid && (
        <CancelIcon
          sx={{
            color: "red",
            fontSize: 130,
            zIndex: 10,
            position: "absolute",
            top: "28%",
          }}
        />
      )}

      <Card
        sx={{
          height: 200,
          width: 460,
          textAlign: "center",
          boxShadow: 3,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{ fontWeight: 500, mt: 3 }}
            component="div"
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, mt: 3 }}
            component="div"
          >
            {content}
          </Typography>
          {verifyValid && (
            <CircularProgress disableShrink size="1.5rem" sx={{ mt: 1 }} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default VerifyTokenInvitePage;
