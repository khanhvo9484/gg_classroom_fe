import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import BackgroundLetterAvatars from "./avatar.for.name.component";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import UserModel from "@/models/user.model";

interface Props {
  user: UserModel;
}

const AvatarDropdown: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      navigate(`/${menuItem}`);
    };
  };

  return (
    <Dropdown>
      <MenuButton
        sx={{
          border: "none",
        }}
      >
        <BackgroundLetterAvatars user={user} />
      </MenuButton>
      <Menu slots={{ listbox: Listbox }}>
        <MenuItem onClick={createHandleMenuClick("profile")}>
          <Typography variant="body1">Trang cá nhân</Typography>
        </MenuItem>
        <MenuItem onClick={createHandleMenuClick("sign-out")}>
          <Typography variant="body1">Đăng xuất</Typography>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default AvatarDropdown;
const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E6",
  700: "#0059B3",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Listbox = styled("ul")(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 4px 10px rgba(40, 40, 40, 0.1);
    z-index: 1;
    `
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;

    &:last-of-type {
      border-bottom: none;
    }

    &.${menuItemClasses.focusVisible} {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
      background-color: ${
        theme.palette.mode === "dark" ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }

    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }

    &:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[50]};
      color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
    }
    
    `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }

    &:active {
      background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
    }

    &:focus-visible {
      box-shadow: 0 0 0 4px ${
        theme.palette.mode === "dark" ? blue[300] : blue[200]
      };
      outline: none;
    }
    `
);
