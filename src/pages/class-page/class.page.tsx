import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useContext, useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Button from "@mui/material/Button";
import RoleContext from "@/context/role.context";
import { ClassService } from "@/service/class.service";
import LoadingContext from "@/context/loading.contenxt";
import { Card, CardContent, Typography } from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import { selectCourses } from "@/redux/courses.slice";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import useHomeCourses from "@/hooks/home-courses.hook";

const useStyles = makeStyles(() => ({
  style: {
    fontSize: "0.925rem !important",
    fontWeight: "500 !important",
    letterSpaceing: ".01785714em !important",
    paddingTop: "1.2rem !important",
    paddingBottom: "1.2rem !important",
    "&.Mui-selected": {
      "&:hover": {
        backgroundColor: "rgb(232,240,254)",
      },
    },
    "&:hover": {
      backgroundColor: "rgba(32,33,36,0.039)",
      color: "#202124",
    },
  },
}));

const ClassPage = () => {
  const classService = new ClassService();
  const { isTeacher, setIsTeacher } = useContext(RoleContext);
  const location = useLocation();
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const [isJoinCodeByLink, setIsJoinCourseByLink] = useState<boolean>(false);
  const [stateCourse, setStateCourse] = useState("");
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const classes = useStyles();
  const user = useSelector(selectUser);
  const course = useSelector(selectCourses);
  const { startLoading, stopLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { courses, coursesIsLoading } = useHomeCourses();

  const codeInvite = searchParams.get("code");

  console.log("is join course link:L ", isJoinCodeByLink);
  useEffect(() => {
    setIsJoinCourseByLink(false);

    if (codeInvite) {
      if (courses && !coursesIsLoading) {
        if (courses.length > 0) {
          const item_course = courses.find(
            (item) => item.inviteCode === codeInvite
          );

          if (item_course) {
            setIsJoinCourseByLink(false);
            navigate(`/course/${courseId}/news`);
          } else {
            console.log("Da vao day");
            setIsJoinCourseByLink(true);
          }
        } else {
          console.log("Da vao day");
          setIsJoinCourseByLink(true);
        }
      }
    }
  }, [courses]);

  useEffect(() => {
    const str = getPartAfterCourseId();
    setStateCourse(str);
  });

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    // signal
    startLoading();
    const getCourseById = async (courseId: string) => {
      try {
        const response = await classService.getCourseById(courseId, signal);
        const role = response.data.roleInCourse;

        if (role === "teacher") {
          setIsTeacher(true);
        }
        navigateToDefaultTab(role);
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    if (courseId && !isJoinCodeByLink) {
      getCourseById(courseId);
    }
    stopLoading();
    return () => {
      // Cleanup function to handle component unmount
      abortController.abort();
      // Additional cleanup logic if needed
    };
  }, [stateCourse, isJoinCodeByLink]);

  const getPartAfterCourseId = () => {
    const pathSegments = location.pathname.split("/");
    const courseIndex = pathSegments.indexOf("course");

    let partAfterCourseId = "";
    if (courseIndex !== -1 && courseIndex < pathSegments.length - 1) {
      partAfterCourseId = pathSegments.slice(courseIndex + 2).join("/");
    }

    return partAfterCourseId;
  };

  const navigateToDefaultTab = (role: string) => {
    const str = getPartAfterCourseId();
    switch (str) {
      case "student-view-grade":
        if (role === "teacher") {
          setValue(2);
          navigate(`/course/${courseId}/grades`, { replace: true });
        } else {
          setValue(3);
          navigate(`/course/${courseId}/student-view-grade`, { replace: true });
        }
        break;
      case "":
        setValue(0);
        navigate(`/course/${courseId}/news`, { replace: true });
        break;
      case "news":
        setValue(0);
        navigate(`/course/${courseId}/news`, { replace: true });
        break;
      case "members":
        setValue(1);
        navigate(`/course/${courseId}/members`, { replace: true });
        break;
      case "grades":
        if (role === "teacher") {
          setValue(2);
          navigate(`/course/${courseId}/grades`, { replace: true });
        } else {
          setValue(3);
          navigate(`/course/${courseId}/student-view-grade`, { replace: true });
        }
        break;
      case "grade-structure":
        setValue(4);
        navigate(`/course/${courseId}/grade-structure`, { replace: true });
        break;
      case "grade-review":
        setValue(5);
        navigate(`/course/${courseId}/grade-review`, { replace: true });
        break;
      default:
        setValue(5);
        navigate(`/course/${courseId}/${str}`, { replace: true });
        break;
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleJoinClassByLink = async () => {
    setIsLoading(true);
    try {
      const response = await classService.joinCourseByInviteCode({
        userId: user.id,
        inviteCode: codeInvite,
      });

      // const { data: newCourses } = await classService.getAllCourse();

      // dispatch(
      //   setCourses({
      //     courses: newCourses,
      //   })
      // );

      console.log("Is join course: ", isJoinCodeByLink);

      setIsJoinCourseByLink(false);

      console.log("Work: ", isJoinCodeByLink);

      toast.success("Tham gia lớp học thành công");

      // setTimeout(() => {
      //   navigate(`/course/${response.data.courseId}/news`);
      //   // navigate(`/course/CS4qxSp3EZ/news`);
      // }, 500);
    } catch (error) {
      toast.success("Đã có lỗi xảy ra. Yêu cầu thất bại!");
    } finally {
      console.log("End");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box>
        {isJoinCodeByLink && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card sx={{ mt: "10rem", width: "35rem" }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6" component="div">
                  Tham gia
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lớp học giúp các lớp học giao tiếp, tiết kiệm thời gian và
                  luôn có tổ chức.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <SchoolOutlinedIcon
                    color="secondary"
                    sx={{
                      fontSize: 130,
                    }}
                  />
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <LoadingButton
                      disabled={isLoading}
                      loading={isLoading}
                      variant="contained"
                      onClick={() => handleJoinClassByLink()}
                    >
                      Tham gia lớp học
                    </LoadingButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
        {!isJoinCodeByLink && (
          <Box
            sx={{
              borderBottom: 2,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Tabs sx={{ paddingLeft: 3 }} value={value} onChange={handleChange}>
              <Tab
                sx={{ textTransform: "none" }}
                className={classes.style}
                value={0}
                component={(props) => (
                  <Button
                    {...props}
                    component={Link}
                    to={`/course/${courseId}/news`}
                    style={{
                      textDecoration: "none",
                      height: "100%",
                      paddingX: 2,
                    }}
                  />
                )}
                label="Bảng tin"
              />
              <Tab
                sx={{ textTransform: "none" }}
                className={classes.style}
                value={1}
                component={(props) => (
                  <Button
                    {...props}
                    component={Link}
                    to={`/course/${courseId}/members`}
                    style={{
                      textDecoration: "none",
                      height: "100%",
                    }}
                  />
                )}
                label="Mọi người"
              />

              {isTeacher && (
                <Tab
                  sx={{ textTransform: "none" }}
                  className={classes.style}
                  value={2}
                  component={(props) => (
                    <Button
                      {...props}
                      component={Link}
                      to={`/course/${courseId}/grades`}
                      style={{
                        textDecoration: "none",
                        height: "100%",
                      }}
                    />
                  )}
                  label="Điểm"
                />
              )}
              {!isTeacher && (
                <Tab
                  sx={{ textTransform: "none" }}
                  className={classes.style}
                  value={3}
                  component={(props) => (
                    <Button
                      {...props}
                      component={Link}
                      to={`/course/${courseId}/student-view-grade`}
                      style={{
                        textDecoration: "none",
                        height: "100%",
                      }}
                    />
                  )}
                  label="Điểm"
                />
              )}
              <Tab
                sx={{ textTransform: "none" }}
                className={classes.style}
                value={4}
                component={(props) => (
                  <Button
                    {...props}
                    component={Link}
                    to={`/course/${courseId}/grade-structure`}
                    style={{
                      textDecoration: "none",
                      height: "100%",
                    }}
                  />
                )}
                label="Cấu trúc điểm"
              />
              <Tab
                sx={{ textTransform: "none" }}
                className={classes.style}
                value={5}
                component={(props) => (
                  <Button
                    {...props}
                    component={Link}
                    to={`/course/${courseId}/grade-review`}
                    style={{
                      textDecoration: "none",
                      height: "100%",
                    }}
                  />
                )}
                label="Danh sách phúc khảo"
              />
            </Tabs>
          </Box>
        )}

        <Outlet />
      </Box>
      {/* <SettingClassComponent
        open={isOpenSettingCourseDialog}
        onClose={() => {
          setIsOpenSettingCourseDialog(false);
        }}
      /> */}
    </>
  );
};

export default ClassPage;
