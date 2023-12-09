import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import UserModel from "../../models/user.model";
import { useSelector } from "react-redux";
import AvatarDropdown from "../../components/avatar.dropdown.menu.component";
import logo from "@/assets/icons/k3_logo.png";
import { styled } from '@mui/material/styles';
import { Collapse } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { ClassService } from "@/service/class.service";
import { ICourse } from "@/models/class.model";
import Avatar from "@mui/material/Avatar";

const drawerWidth = 260;


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  "& .MuiBackdrop-root": {
    display: "none"
  }
}));
import * as React from 'react';

const pages = [{ title: "Lớp học của tôi", link: "/home" }];

function Header() {
    const [ sidebarState, setSidebarState ] = React.useState();
    const [ isSchoolOpen, setIsSchoolOpen ] = React.useState(true);
    const [ isEnrolledOpen, setIsEnrolledOpen ] = React.useState(true);

    const classService = new ClassService();
    const [loading, setLoading] = React.useState(false);
    const [courses, setCourses] = React.useState<ICourse[]>(null);

    React.useEffect(() => {
      // setLoading(true);
        const getAllCourse = async () => {
            try {
            const response = await classService.getAllCourse();

            setCourses(response.data);
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
        <Box>
            <AppBar
                position="fixed"
                color="transparent"
                style={{ background: 'white' }}
                sx={{ boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
                    zIndex: 9999999
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ mr: 2}}>
                            <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={() => {setSidebarState(!sidebarState)}}
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
                            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}
                        >
                            {pages.map((page) => (
                            <Button
                                key={page.title}
                                sx={{ my: 2, color: "black", display: "block" }}
                                href={page.link}
                            >
                                {page.title}
                            </Button>
                            ))}
                        </Box>

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
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={sidebarState}
            >
                <DrawerHeader>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem sx={{ml:1}} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon fontSize="medium"/>
                            </ListItemIcon>
                            <ListItemText primary={'Màn hình chính'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ml:1}} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <CalendarTodayIcon fontSize="medium"/>
                            </ListItemIcon>
                            <ListItemText primary={"Lịch"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItemButton sx={{ml: -2}} onClick={() => {setIsSchoolOpen(!isSchoolOpen)}}>
                        {isSchoolOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                        <ListItemIcon>
                            <PeopleAltOutlinedIcon  fontSize="medium"/>
                        </ListItemIcon>
                        <ListItemText primary="Giảng dạy" />
                    </ListItemButton>
                    <Collapse in={isSchoolOpen} timeout="auto" unmountOnExit>
                        <List>
                            <ListItemButton sx={{ml:1}}>
                                <ListItemIcon>
                                    <TopicOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Cần xem xét" />
                            </ListItemButton>
                            {courses &&
                                courses.map((course, index) => {
                                return (
                                    <ListItemButton sx={{ml:1}} key={index}>
                                        <Avatar sx={{ minWidth: 30,
                                                      minHeight: 30,
                                                      mr: 2
                                                    }}
                                                    src={course.courseOwner.avatar}>
                                        </Avatar>
                                        <ListItemText primary={course.name}
                                                      secondary={course.description}/>
                                    </ListItemButton>
                                );
                            })}
                        </List>
                    </Collapse>
                </List>
                <Divider />
                <List>
                    <ListItemButton sx={{ml: -2}} onClick={() => {setIsEnrolledOpen(!isEnrolledOpen)}}>
                        {isEnrolledOpen ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                        <ListItemIcon>
                            <SchoolOutlinedIcon  fontSize="medium"/>
                        </ListItemIcon>
                        <ListItemText primary="Đã đăng ký" />
                    </ListItemButton>
                    <Collapse in={isEnrolledOpen} timeout="auto" unmountOnExit>
                        <List>
                            <ListItemButton sx={{ml:1}}>
                                <ListItemIcon>
                                    <FactCheckOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Việc cần làm" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
                <Divider />
                <List>
                    <ListItem sx={{ml:1}} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ArchiveOutlinedIcon fontSize="medium"/>
                            </ListItemIcon>
                            <ListItemText primary={'Lớp học đã lưu trữ'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem sx={{ml:1}} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <SettingsOutlinedIcon fontSize="medium"/>
                            </ListItemIcon>
                            <ListItemText primary={"Cài đặt"} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        </Box>
    );
}
export default Header;
