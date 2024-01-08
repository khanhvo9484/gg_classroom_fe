import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import stringAvatar from "@/utils/common.util";

export default function ListItemNavLinkAvatar({
  link,
  course,
  setCurrentPage,
}) {
  return (
    <NavLink
      to={link}
      onClick={() => setCurrentPage(course.name)}
      style={() => {
        return {
          textDecoration: "none",
        };
      }}
    >
      {({ isActive }) => (
        <ListItemButton
          sx={{
            ml: 1,
            maxWidth: 280,
            fontWeight: isActive ? "bold" : "",
            backgroundColor: isActive ? "secondary.light" : "",
            borderTopRightRadius: isActive ? 32 : 0,
            borderBottomRightRadius: isActive ? 32 : 0,
          }}
        >
          {course.courseOwner.avatar ? (
            <Avatar
              sx={{ width: 24, height: 24, mr: 3 }}
              src={course.courseOwner.avatar}
            ></Avatar>
          ) : (
            <Avatar {...stringAvatar({ name: course.courseOwner.name })} />
          )}

          <ListItemText
            disableTypography
            primary={
              <Typography
                noWrap={true}
                variant="body1"
                fontSize={16}
                color="text.primary"
                sx={{
                  underline: "none",
                }}
              >
                {course.name}
              </Typography>
            }
            secondary={
              <Typography
                noWrap={true}
                fontSize={12}
                color="text.primary"
                sx={{
                  underline: "none",
                }}
              >
                {course.description}
              </Typography>
            }
          />
        </ListItemButton>
      )}
    </NavLink>
  );
}
