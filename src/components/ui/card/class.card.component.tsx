import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { CardActions, IconButton } from "@mui/material";
import FolderOpenOutlined from "@mui/icons-material/FolderOpenOutlined";
import AssignmentOutlined from "@mui/icons-material/AssignmentOutlined";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CardMenu from "../../../components/card.dropdown.menu.component";
import { ICourse } from "../../../models/class.model";
import { useEffect, useState } from "react";
import gradientColors from "@/data/gradient.color";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import { string } from "yup";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

interface Props {
  course: ICourse;
}

function shortName(name: string) {
  const nameParts = name.split(" ");
  let displayName = "";

  if (nameParts.length > 1) {
    displayName = name.split(" ")[0][0] + name.split(" ")[1][0];
  } else {
    displayName = name.split(" ")[0][0];
  }

  return displayName;
}

const ClassCard: React.FC<Props> = ({ course }) => {
  const userProfile = useSelector(selectUser);

  const AvatarBgColor = stringToColor(course.courseOwner.name);
  const colors = gradientColors;

  const [bgGradient, setBgGradient] = useState(
    "linear-gradient(to right, #FFFFFF, #FFFFFF)"
  ); // Default background color

  const displayNameOwner = () => {
    return userProfile.id !== course.courseOwnerId
      ? course.courseOwner.name
      : "";
  };

  const displayAvatarOwner = () => {
    if (userProfile.id !== course.courseOwnerId){
      return (
        <CardActionArea
        href="#"
        sx={{
          minHeight: 180,
        }}
        >
          {(course.courseOwner && course.courseOwner.avatar)
          ? (
            <Avatar
                aria-label="recipe"
                sx={{
                  minWidth: 80,
                  minHeight: 80,
                  mt: -5,
                  ml: 29,
                  bgcolor: AvatarBgColor,
                }}
                src={course.courseOwner.avatar}
            ></Avatar>
          )
          : (
            <Avatar
                aria-label="recipe"
                sx={{
                  minWidth: 80,
                  minHeight: 80,
                  mt: -5,
                  ml: 29,
                  bgcolor: AvatarBgColor,
                  children: shortName(course.courseOwner.name),
                }}
            ></Avatar>
          )}
        </CardActionArea>
      )
    } else {
      return (
        <Box
        sx={{
          minHeight: 180,
        }}
        >
          <Box
            sx={{
              mt: -5
            }}
          ></Box>
        </Box>
      )
    }
  };

  useEffect(() => {
    // Function to randomly select a color combination
    const getRandomGradient = () => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      const colorCombination = colors[randomIndex].colors;
      return `linear-gradient(to right bottom, ${colorCombination.join(", ")})`;
    };

    setBgGradient(getRandomGradient());
  }, []);

  return (
    <Card
      sx={{
        border: "0.5px solid rgba(42, 42, 42, 0.329)",
        borderRadius: 3,
        maxWidth: 330,
        maxHeight: 350,
        ":hover": {
          boxShadow: 10, // theme.shadows[20]
        },
      }}
    >
      <CardHeader
        sx={{
          background: bgGradient,
          color: "primary.contrastText",
          minHeight: 100,
          maxHeight: 100,
        }}
        action={<CardMenu />}
        title={
          <Link href={`/course/${course.id}/news`} underline="none">
            <Typography
              variant="h5"
              component="div"
              color="info.light"
              sx={{
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {course.name}
              <Typography
                color="info.light"
                sx={{
                  ":hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {course.description}
              </Typography>
            </Typography>
          </Link>
        }
        subheader={
          <Link href="#" underline="none">
            <Typography
              gutterBottom
              component="div"
              color="info.light"
              sx={{
                mb: 0,
                ":hover": {
                  textDecoration: "underline", // theme.shadows[20]
                },
              }}
            >
              {displayNameOwner()}
            </Typography>
          </Link>
        }
      />
      {displayAvatarOwner()}
      <CardActions
        sx={{ pl: 28, borderTop: "0.5px solid rgba(42, 42, 42, 0.329)" }}
      >
        <IconButton>
          <AssignmentOutlined fontSize="medium" />
        </IconButton>
        <IconButton>
          <FolderOpenOutlined fontSize="medium" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ClassCard;
