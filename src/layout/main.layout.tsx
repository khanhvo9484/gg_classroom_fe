/* eslint-disable @typescript-eslint/no-explicit-any */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AvatarDropdown from "../components/avatar.dropdown.menu.component";
import logo from "@/assets/icons/k3_logo.png";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { Collapse, LinearProgress, MenuItem } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { ClassService } from "@/service/class.service";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListItemNavLink from "@/components/ui/list-item-button-navlink.component";
import ListItemNavLinkAvatar from "@/components/ui/list-item-button-navlink-avatar.component";
import AddIcon from "@mui/icons-material/Add";
import { Outlet } from "react-router-dom";
import AddCourseDialog from "@/components/ui/dialog/add-course.dialog.component";
import { Toaster } from "react-hot-toast";
import FadeInJoin from "@/components/join.fadein.component";
import Zoom from "@mui/material/Zoom";
import LoadingContext from "@/context/loading.contenxt";
import { useContext, useEffect, useState } from "react";
import JoinCodeByCodeDialog from "@/components/ui/dialog/join-course-by-code-dialog.component";
import Menu from "@mui/material/Menu";
import { selectUser } from "@/redux/auth.slice";
import { useDispatch } from "react-redux";
import { selectCourses } from "@/redux/courses.slice";
import { setCourses } from "@/redux/courses.slice";
import NotificationMenu from "@/components/notification.menu/notification.menu.component";
const drawerWidth = 280;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 20px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 20px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  "& .MuiBackdrop-root": {
    display: "none",
  },
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

function Header() {
  const classService = new ClassService();
  const { isLoading, stopLoading, startLoading } = useContext(LoadingContext);
  const [sidebarState, setSidebarState] = useState(true);
  const [sidebarStateHover, setSidebarStateHover] = useState(false);
  const [isSchoolOpen, setIsSchoolOpen] = useState(true);
  const [isEnrolledOpen, setIsEnrolledOpen] = useState(true);
  const [isCreateCourseDialogOpen, setIsCreateCourseDialogOpen] =
    useState(false);
  const [isOpenJoinCourseByCodeDialog, setIsOpenJoinCourseByCodeDialog] =
    useState(false);
  const [isOpenFadeInJoin, setIsOpenFadeInJoin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("");
  const userProfile = useSelector(selectUser);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenuAdd = Boolean(anchorEl);

  const handleOpenMenuAdd = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenuAdd = () => {
    setAnchorEl(null);
  };

  function updateCourses(courseId) {
    console.log(`Just update courses: ${courseId}`);
  }

  function onFadeClose() {
    setIsOpenFadeInJoin(false);
  }

  const location = useLocation();
  const path = location.pathname;
  const courses = useSelector(selectCourses);

  const getCurrentPageFromURL = () => {
    const elements = path.split("/");
    if (elements[1] == "home") {
      setCurrentPage("Màn hình chính");
    } else if (elements[1] == "course") {
      const name = courses.find((course) => (course.id == elements[2]) ? course.name : false)?.name;
      setCurrentPage(name);
    }
    return;
  }

  useEffect(() => {
    getCurrentPageFromURL();
    startLoading();
    const getAllCourse = async () => {
      try {
        const response = await classService.getAllCourse();

        dispatch(
          setCourses({
            courses: response.data,
          })
        );
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    if (courses.length == 0) {
      getAllCourse();
    }
    stopLoading();
  }, []);


  return (
    <>
      <Box sx={{ display: { xl: "none", xs: "block" } }}>
        <Zoom in={isOpenFadeInJoin} mountOnEnter unmountOnExit>
          <Box sx={{ zIndex: 9999999 }}>
            <FadeInJoin
              onFadeClose={() => {
                onFadeClose();
              }}
            />
          </Box>
        </Zoom>
      </Box>

      {!isOpenFadeInJoin && (
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="fixed"
            color="transparent"
            style={{ background: "white" }}
            sx={{ boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)", zIndex: 1201 }}
          >
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Box sx={{ mr: 2 }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                    onClick={() => {
                      setSidebarState(true);
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
                <Link
                  // href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                  }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <img
                    src={logo}
                    style={{
                      height: "30px",
                      width: "auto",
                      margin: "auto 0",
                      display: "block",
                      cursor: "pointer",
                    }}
                  ></img>
                </Link>

                <Link
                  // href="/home"
                  underline="none"
                  sx={{
                    ml: 2,
                    mr: 2,
                    mb: 0,
                    ":hover": {
                      color: "#a69bfd",
                      cursor: "pointer",
                      backgroundColor: "#eeeeee5b",
                    },
                    color: "text.primary",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                      cursor: "pointer",

                      padding: "5px 10px",
                    }}
                    component="div"
                    onClick={() => {
                      navigate("/home");
                    }}
                  >
                    {"LỚP HỌC"}
                  </Typography>
                </Link>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    gap: 1,
                  }}
                >
                  {currentPage ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <ArrowForwardIosIcon fontSize="small" />{" "}
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{ fontWeight: 500 }}
                      >
                        {" "}
                        {currentPage}
                      </Typography>
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>

                <NotificationMenu />

                <IconButton
                  size="small"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  // onClick={() => {
                  //   setIsCreateCourseDialogOpen(true);
                  // }}
                  onClick={(event) => {
                    handleOpenMenuAdd(event);
                  }}
                  sx={{ ml: 1 }}
                >
                  <AddIcon />
                </IconButton>
                <Menu
                  id="lock-menu"
                  open={openMenuAdd}
                  anchorEl={anchorEl}
                  onClose={handleCloseMenuAdd}
                  MenuListProps={{
                    "aria-labelledby": "lock-button",
                    role: "listbox",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setIsOpenJoinCourseByCodeDialog(true);
                      setAnchorEl(null);
                    }}
                  >
                    Tham gia lớp học
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setIsCreateCourseDialogOpen(true);
                      setAnchorEl(null);
                    }}
                  >
                    Tạo lớp học
                  </MenuItem>
                </Menu>

                <Box sx={{ flexGrow: 0 }}>
                  {userProfile ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "0.5rem",
                      }}
                    >
                      <Box sx={{ maxWidth: "100px" }}>
                        <Typography
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "100%",
                          }}
                        >
                          {userProfile.name}
                        </Typography>
                      </Box>
                      <AvatarDropdown user={userProfile} />
                    </Box>
                  ) : path !== "/login" ? (
                    <Link href="/login">
                      <Button variant="outlined" size="large">
                        Đăng nhập
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/sign-up">
                      <Button variant="outlined" size="large">
                        Đăng ký
                      </Button>
                    </Link>
                  )}
                </Box>
              </Toolbar>
            </Container>
            {isLoading && <LinearProgress />}
          </AppBar>

          <Drawer
            sx={{
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                overflowX: "hidden",
                "&::-webkit-scrollbar": {
                  width: 8, // Width of the scrollbar
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f5f5f5", // Color of the track
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#B2BABB", // Color of the thumb
                  borderRadius: 10, // Radius of the thumb
                },
              },
              maxWidth: drawerWidth,
            }}
            onMouseEnter={() => {
              setSidebarStateHover(true);
            }}
            onMouseLeave={() => {
              setSidebarStateHover(false);
            }}
            variant="permanent"
            anchor="left"
            open={sidebarState || sidebarStateHover}
          >
            <DrawerHeader></DrawerHeader>
            <Divider />
            <List>
              <ListItemNavLink
                link="/home"
                text="Màn hình chính"
                Icon={HomeIcon}
                onClick={setCurrentPage}
              />
              <ListItemNavLink
                link="/calendar"
                text="Lịch"
                Icon={CalendarTodayIcon}
                onClick={setCurrentPage}
              />
            </List>
            <Divider />
            <List>
              <ListItemButton
                sx={{ ml: -2 }}
                onClick={() => {
                  setIsSchoolOpen(!isSchoolOpen);
                }}
              >
                {isSchoolOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                <ListItemIcon>
                  <PeopleAltOutlinedIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      noWrap={true}
                      variant="body1"
                      color="text.primary"
                      fontSize={16}
                      sx={{
                        underline: "none",
                      }}
                    >
                      {"Giảng dạy"}
                    </Typography>
                  }
                />
              </ListItemButton>
              <Collapse in={isSchoolOpen} timeout="auto" unmountOnExit>
                <List>
                  <ListItemNavLink
                    link="/own-class-review"
                    text="Cần xem xét"
                    Icon={TopicOutlinedIcon}
                    onClick={setCurrentPage}
                  />
                  {courses &&
                    courses.map((course) => {
                      return (
                        userProfile.id === course.courseOwnerId && (
                          <ListItemNavLinkAvatar
                            link={`/course/${course.id}`}
                            course={course}
                            key={course.id}
                            setCurrentPage={setCurrentPage}
                          />
                        )
                      );
                    })}
                </List>
              </Collapse>
            </List>
            <Divider />
            <List>
              <ListItemButton
                sx={{ ml: -2 }}
                onClick={() => {
                  setIsEnrolledOpen(!isEnrolledOpen);
                }}
              >
                {isEnrolledOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                <ListItemIcon>
                  <SchoolOutlinedIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      noWrap={true}
                      variant="body1"
                      color="text.primary"
                      fontSize={16}
                      sx={{
                        underline: "none",
                      }}
                    >
                      {"Đã đăng ký"}
                    </Typography>
                  }
                />
              </ListItemButton>
              <Collapse in={isEnrolledOpen} timeout="auto" unmountOnExit>
                <ListItemNavLink
                  link="/joined-class-review"
                  text="Đang được xem xét"
                  Icon={FactCheckOutlinedIcon}
                  onClick={setCurrentPage}
                />
                {courses &&
                  courses.map((course) => {
                    return (
                      userProfile.id !== course.courseOwnerId && (
                        <ListItemNavLinkAvatar
                          link={`/course/${course.id}`}
                          course={course}
                          key={course.id}
                          setCurrentPage={setCurrentPage}
                        />
                      )
                    );
                  })}
              </Collapse>
            </List>
            <Divider />
            <List>
              <ListItemNavLink
                link="/archived"
                text="Lớp học đã lưu trữ"
                Icon={ArchiveOutlinedIcon}
                onClick={setCurrentPage}
              />
              <ListItemNavLink
                link="/setting"
                text="Cài đặt"
                Icon={SettingsOutlinedIcon}
                onClick={setCurrentPage}
              />
            </List>
            <Divider />
          </Drawer>
          <Main open={sidebarState || sidebarStateHover}>
            <DrawerHeader />
            <AddCourseDialog
              open={isCreateCourseDialogOpen}
              updateCourses={updateCourses}
              onClose={() => {
                setIsCreateCourseDialogOpen(false);
              }}
            />
            <JoinCodeByCodeDialog
              open={isOpenJoinCourseByCodeDialog}
              onClose={() => {
                setIsOpenJoinCourseByCodeDialog(false);
              }}
            ></JoinCodeByCodeDialog>
            <Box>
              <Outlet />
            </Box>
          </Main>
        </Box>
      )}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            fontFamily: "Roboto",
          },
        }}
      />
    </>
  );
}
export default Header;
