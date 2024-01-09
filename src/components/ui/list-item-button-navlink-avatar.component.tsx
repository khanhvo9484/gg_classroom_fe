import { NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";

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
          <AvatarHelper
            user={course.courseOwner} sx={{mr: 3, ml:-1}}
          ></AvatarHelper>

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
