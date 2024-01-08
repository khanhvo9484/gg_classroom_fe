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
import { Collapse, LinearProgress, MenuItem, Paper } from "@mui/material";
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
const drawerWidth = 250;

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

function AdminLayout() {
  const userProfile = useSelector(selectUser);
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

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("");

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

  useEffect(() => {
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

    if (!courses) {
      getAllCourse();
    }
    stopLoading();
  }, []);

  const user: UserModel = useSelector((state: any) => state.auth.user);
  const courses = useSelector(selectCourses);
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
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

              <NotificationMenu />

              <Box sx={{ flexGrow: 0 }}>
                {user && user.name ? (
                  <AvatarDropdown user={user} />
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
              link="/admin/accounts"
              text="Quản lý tài khoản"
              Icon={HomeIcon}
              onClick={setCurrentPage}
            />
            <ListItemNavLink
              link="/admin/courses"
              text="Quản lý lớp học"
              Icon={CalendarTodayIcon}
              onClick={setCurrentPage}
            />
            <ListItemNavLink
              link="/admin/student-id"
              text="Quản lý MSSV học sinh"
              Icon={CalendarTodayIcon}
              onClick={setCurrentPage}
            />
          </List>
          <Divider />
        </Drawer>
        <Main open={sidebarState || sidebarStateHover}>
          <DrawerHeader />
          <Box>
            <Outlet />
          </Box>
        </Main>
      </Box>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
export default AdminLayout;
