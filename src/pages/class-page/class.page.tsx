import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link, Outlet, useParams } from "react-router-dom";
import Button from "@mui/material/Button";

const useStyles = makeStyles(() => ({
  style: {
    paddingTop: "1.2rem !important",
    paddingBottom: "1.2rem !important",
    color: "blue",
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
  //   const location = useLocation();
  const { courseId } = useParams();
  const [value, setValue] = useState("0");
  const classes = useStyles();
  const classid = "ahklq2iqo";

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 2, borderColor: "divider" }}>
        <Tabs sx={{ paddingLeft: 3 }} value={value} onChange={handleChange}>
          <Tab
            sx={{ textTransform: "none" }}
            className={classes.style}
            value="0"
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
            value="1"
            component={(props) => (
              <Button
                {...props}
                component={Link}
                to={`/course/${classid}/members`}
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
