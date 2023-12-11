import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import UserModel from "../models/user.model";
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
import { ICourse } from "@/models/class.model";
import Typography from "@mui/material/Typography";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListItemNavLink from "@/components/ui/list-item-button-navlink.component";
import ListItemNavLinkAvatar from "@/components/ui/list-item-button-navlink-avatar.component";
import AddIcon from "@mui/icons-material/Add";
import { Outlet } from "react-router-dom";
import AddCourseDialog from "@/components/ui/dialog/add-course.dialog.component";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import FadeInJoin from "@/components/join.fadein.component";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Zoom from "@mui/material/Zoom";
import LoadingContext from "@/context/loading.contenxt";
import { useContext, useEffect, useState } from "react";
import JoinCodeByCodeDialog from "@/components/ui/dialog/join-course-by-code-dialog.component";
import Menu from "@mui/material/Menu";
import { selectUser } from "@/redux/auth.slice";
const drawerWidth = 300;

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
  padding: theme.spacing(3),
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
    const userProfile = useSelector(selectUser);
  const classService = new ClassService();
  const navigate = useNavigate();
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

  const [courses, setCourses] = useState<ICourse[]>(null);
  const [currentPage, setCurrentPage] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenuAdd = Boolean(anchorEl);

  const handleOpenMenuAdd = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenuAdd = () => {
    setAnchorEl(null);
  };

  function updateCourses(courseId) {
    navigate(`/course/${courseId}`, { replace: true });
  }

  function onFadeClose() {
    setIsOpenFadeInJoin(false);
    navigate(`/home/home/`, { replace: true });
    navigate(0);
  }

  useEffect(() => {
    startLoading();
    const getAllCourse = async () => {
      try {
        const response = await classService.getAllCourse();

        setCourses(response.data);
        stopLoading();
      } catch (error) {
        console.log(error);
        // throw error;
      }
    };

    getAllCourse();
  }, []);

  const user: UserModel = useSelector((state: any) => state.auth.user);
  const location = useLocation();
  const path = location.pathname;
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
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
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
                  href="/home"
                  underline="none"
                  sx={{
                    ml: 2,
                    mr: 2,
                    mb: 0,
                    ":hover": {
                      color: "#19aa77",
                    },
                    color: "text.primary",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 400 }}
                    component="div"
                  >
                    {"Lớp học"}
                  </Typography>
                </Link>

                <Box
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", md: "flex" },
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 400 }}
                  >
                    {currentPage ? (
                      <>
                        <ArrowForwardIosIcon
                          sx={{ mb: "-3px" }}
                          fontSize="small"
                        />{" "}
                        {currentPage}
                      </>
                    ) : (
                      ""
                    )}
                  </Typography>
                </Box>

                <IconButton
                  size="large"
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
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => {
                    setIsOpenFadeInJoin(!isOpenFadeInJoin);
                  }}
                >
                  <LibraryAddIcon />
                </IconButton>

                <Box sx={{ flexGrow: 0 }}>
                  {user && user.name ? (
                    <AvatarDropdown name={user.name} />
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
              />
              <ListItemNavLink
                link="/calendar"
                text="Lịch"
                Icon={CalendarTodayIcon}
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
                <ListItemText primary="Giảng dạy" />
              </ListItemButton>
              <Collapse in={isSchoolOpen} timeout="auto" unmountOnExit>
                <List>
                  <ListItemNavLink
                    link="/review"
                    text="Cần xem xét"
                    Icon={TopicOutlinedIcon}
                  />
                  {courses &&
                    courses.map((course) => {
                      return (
                        ((userProfile.id === course.courseOwnerId) &&
                        <ListItemNavLinkAvatar
                            link={`/course/${course.id}`}
                            course={course}
                            key={course.id}
                            setCurrentPage={setCurrentPage}
                        />)
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
                <ListItemText primary="Đã đăng ký" />
              </ListItemButton>
              <Collapse in={isEnrolledOpen} timeout="auto" unmountOnExit>
                <ListItemNavLink
                  link="/review2"
                  text="Việc cần làm"
                  Icon={FactCheckOutlinedIcon}
                />
                {courses &&
                    courses.map((course) => {
                      return (
                        ((userProfile.id !== course.courseOwnerId) &&
                        <ListItemNavLinkAvatar
                            link={`/course/${course.id}`}
                            course={course}
                            key={course.id}
                            setCurrentPage={setCurrentPage}
                        />)
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
              />
              <ListItemNavLink
                link="/setting"
                text="Cài đặt"
                Icon={SettingsOutlinedIcon}
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
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
export default Header;
