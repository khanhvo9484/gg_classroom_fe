/* eslint-disable @typescript-eslint/no-explicit-any */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "@mui/material/Link";
import { useLocation } from "react-router-dom";
import UserModel from "../../models/user.model";
import { useSelector } from "react-redux";
import AvatarDropdown from "../../components/avatar.dropdown.menu.component";
import logo from "@/assets/icons/k3_logo.png";
import LinearProgress from "@mui/material/LinearProgress";
import { useContext } from "react";
import LoadingContext from "@/context/loading.contenxt";
import { selectUser } from "@/redux/auth.slice";

const pages = [{ title: "Lớp học của tôi", link: "/home" }];

function Header() {
  const { isLoading } = useContext(LoadingContext);
  const userProfile = useSelector(selectUser);

  const location = useLocation();

  const path = location.pathname;
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
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
            {userProfile ? (
              <AvatarDropdown user={userProfile} />
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
  );
}
export default Header;
