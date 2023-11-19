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
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import selectUser from "../../redux/auth.slice";
import UserModel from "../../models/user.model";
import { useSelector } from "react-redux";
import AvatarDropdown from "../../components/avatar.dropdown.menu.component";

const pages = ["Tổng quan", "Tính năng", "Khách hàng"];

function Header() {
  const user: UserModel = useSelector((state: any) => state.auth.user);
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
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

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
                key={page}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
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
  );
}
export default Header;
