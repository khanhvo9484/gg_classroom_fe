import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

export default function ListItemNavLinkAvatar({
  link,
  course,
  setCurrentPage,
}) {
  return (
    <NavLink to={link}
    onClick={() => setCurrentPage(course.name)}
    style={() => {
      return {
        textDecoration: "none",
      };
    }}>
      {({ isActive}) => (
        <ListItemButton
        sx={{
          ml: 1,
          maxWidth: 280,
          fontWeight: isActive ? "bold" : "",
          backgroundColor: isActive ? 'secondary.main' : "",
          borderTopRightRadius: isActive ? 32 : 0,
          borderBottomRightRadius: isActive ? 32 : 0,
        }}
      >
        <Avatar
          sx={{ minWidth: 30, minHeight: 30, mr: 2 }}
          src={course.courseOwner.avatar}
        ></Avatar>
        <ListItemText disableTypography
          primary={<Typography
            noWrap={true}
            variant="h6"
            color="text.primary"
            sx={{
              underline:"none",
            }}
          >
            {course.name}
          </Typography>}
          secondary={<Typography
            noWrap={true}
            fontSize={15}
            color="text.primary"
            sx={{
              underline:"none",
            }}
          >
            {course.description}
          </Typography>} />
      </ListItemButton>
      )}
    </NavLink>
  );
}
