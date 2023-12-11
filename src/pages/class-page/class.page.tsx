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
  const { setIsTeacher } = useContext(RoleContext);
  const location = useLocation();
  const { courseId } = useParams();
  const [stateCourse, setStateCourse] = useState("");
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const classes = useStyles();

  const getPartAfterCourseId = () => {
    const pathSegments = location.pathname.split("/");
    const courseIndex = pathSegments.indexOf("course");

    let partAfterCourseId = "";
    if (courseIndex !== -1 && courseIndex < pathSegments.length - 1) {
      partAfterCourseId = pathSegments.slice(courseIndex + 2).join("/");
    }

    return partAfterCourseId;
  };

  useEffect(() => {
    const str = getPartAfterCourseId();
    switch (str) {
      case "news":
        setValue(0);
        break;
      case "members":
        setValue(1);
        break;
    }
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getCourseById = async (courseId: string) => {
      try {
        const response = await classService.getCourseById(courseId);
        const role = response.data.roleInCourse;

        if (role === "teacher") {
          setIsTeacher(true);
        }
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    if (courseId) {
      getCourseById(courseId);
    }
  }, []);

  useEffect(() => {
    navigate(`/course/${courseId}/news`, { replace: true });
  }, [stateCourse]);

  useEffect(() => {
    setStateCourse(courseId);
  });
  return (
    <Box>
      <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
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
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
};

export default ClassPage;
