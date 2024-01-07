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
} from "react-router-dom";
import Button from "@mui/material/Button";
import RoleContext from "@/context/role.context";
import { ClassService } from "@/service/class.service";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import IconButton from "@mui/material/IconButton";
import SettingClassComponent from "./ui/setting-class.component";
import SheetMenu from "@/components/sheet.menu.component";
import LoadingContext from "@/context/loading.contenxt";

const useStyles = makeStyles(() => ({
  style: {
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
  // const [stateCourse, setStateCourse] = useState("");
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const classes = useStyles();
  const { startLoading, stopLoading } = useContext(LoadingContext);

  const [isOpenSettingCourseDialog, setIsOpenSettingCourseDialog] =
    useState(false);

  useEffect(() => {
    startLoading()
    const getCourseById = async (courseId: string) => {
      try {
        const response = await classService.getCourseById(courseId);
        const role = response.data.roleInCourse;

        if (role === "teacher") {
          setIsTeacher(true);
          navigateToDefaultTab(role);
        }
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    if (courseId) {
      getCourseById(courseId);
    }
    stopLoading();
  }, [courseId]);

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
        if (role === "teacher"){
          setValue(2);
          navigate(`/course/${courseId}/grades`, { replace: true });
        }
        else {
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
        setValue(2);
        navigate(`/course/${courseId}/grades`, { replace: true });
        break;
      default:
        setValue(4);
        navigate(`/course/${courseId}/${str}`, { replace: true });
        break;
    }
  };


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenSettingCourse = () => {
    setIsOpenSettingCourseDialog(true);
  };

  return (
    <>
      <Box>
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
          <SheetMenu></SheetMenu>
          <IconButton size="large" onClick={() => handleOpenSettingCourse()}>
            <SettingsOutlinedIcon />
          </IconButton>
        </Box>
        <Outlet />
      </Box>
      <SettingClassComponent
        open={isOpenSettingCourseDialog}
        onClose={() => {
          setIsOpenSettingCourseDialog(false);
        }}
      />
    </>
  );
};

export default ClassPage;
