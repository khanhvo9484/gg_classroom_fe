import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import { CardActions, IconButton } from "@mui/material";
import FolderOpenOutlined from "@mui/icons-material/FolderOpenOutlined";
import AssignmentOutlined from "@mui/icons-material/AssignmentOutlined";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardHeader } from "@mui/material";
import CardMenu from "@/components/card.dropdown.menu.component";
import { ICourse } from "@/models/class.model";
import React, { useEffect, useState } from "react";
import gradientColors from "@/data/gradient.color";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import EditCourseDialog from "../dialog/edit-course.dialog.component";
import MovingIcon from "@mui/icons-material/Moving";
import Tooltip from "@mui/material/Tooltip";
import CardArchivedMenu from "@/components/card.dropdown.menu.archived.component";
import ImageRead from "@/assets/images/img_read.jpg";
import ImageBackToSchool from "@/assets/images/img_backtoschool.jpg";
import ImageLearnLang from "@/assets/images/img_learnlanguage.jpg";
import ImageGrad from "@/assets/images/img_graduation.jpg";
import AvatarHelper from "@/utils/avatar-helper/avatar.helper";
import { useNavigate } from "react-router-dom";

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
  archiveCourse: () => void;
  leaveCourse: () => void;
  reviveCourse: () => void;
  deleteCourse: () => void;
}

function getRandomImage() {
  const images = [ImageRead, ImageBackToSchool, ImageLearnLang, ImageGrad];
  const randomIndex = Math.floor(Math.random() * images.length);

  return images[randomIndex];
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

const ClassCard: React.FC<Props> = ({
  course,
  archiveCourse,
  leaveCourse,
  reviveCourse,
  deleteCourse,
}) => {
  const userProfile = useSelector(selectUser);
  const [isEditCourseDialogOpen, setIsEditCourseDialogOpen] = useState(false);

  const AvatarBgColor = stringToColor(course.courseOwner.name);
  const colors = gradientColors;

  const [, setBgGradient] = useState(
    "linear-gradient(to right, #FFFFFF, #FFFFFF)"
  ); // Default background color
  const navigate = useNavigate();

  const handleNavigation = () => {
    // Use the history.push method to navigate to the desired page
    navigate(`/course/${course.id}`);
  };

  function updateCourses() {
    console.log("Update courses success!");
  }

  function editCourse() {
    setIsEditCourseDialogOpen(true);
  }

  const displayNameOwner = () => {
    return userProfile.id !== course.courseOwnerId
      ? course.courseOwner.name
      : "";
  };

  const displayAvatarOwner = () => {
    if (userProfile.id !== course.courseOwnerId) {
      return (
        <CardActionArea
          href="#"
          sx={{
            height: 170,
          }}
        >
          {course.courseOwner && (
            <AvatarHelper
              user={course.courseOwner}
              sx={{
                minWidth: 80,
                minHeight: 80,
                mt: -5,
                ml: 29,
                bgcolor: AvatarBgColor,
              }}
            />
          )}
        </CardActionArea>
      );
    } else {
      return (
        <Box
          sx={{
            height: 170,
          }}
        >
          <Box
            sx={{
              mt: -5,
            }}
          ></Box>
        </Box>
      );
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
        width: "20rem",
        height: "20.375rem",
        ":hover": {
          boxShadow:
            "0 1px 2px 0 rgba(60,64,67,.3), 0 2px 6px 2px rgba(60,64,67,.15)", // theme.shadows[20]
        },
      }}
    >
      <CardHeader
        sx={{
          color: "primary.contrastText",
          minHeight: 100,
          maxHeight: 100,
          backgroundImage: `url(${getRandomImage()})`,
          backgroundSize: "cover",
        }}
        action={
          !course.isDeleted ? (
            <CardMenu
              archiveCourse={() => {
                archiveCourse();
              }}
              leaveCourse={() => {
                leaveCourse();
              }}
              editCourse={() => {
                editCourse();
              }}
              isOwner={Boolean(userProfile.id === course.courseOwnerId)}
            />
          ) : (
            <CardArchivedMenu
              reviveCourse={() => reviveCourse()}
              deleteCourse={() => deleteCourse()}
            />
          )
        }
        title={
          // <Link href={`/course/${course.id}`} underline="none">
          <Typography
            variant="h6"
            component="div"
            color="info.light"
            sx={{
              ":hover": {
                textDecoration: "underline",
                cursor: "pointer",
              },
            }}
            onClick={handleNavigation}
          >
            {course.name}
            <Typography
              color="info.light"
              sx={{
                ":hover": {
                  textDecoration: "underline",
                },
                cursor: "pointer",
              }}
            >
              {course.description}
            </Typography>
          </Typography>
          // </Link>
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
      {userProfile.id === course.courseOwnerId ? (
        <CardActions
          sx={{
            justifyContent: "end",
            borderTop: "0.5px solid rgba(42, 42, 42, 0.329)",
            mr: 1,
          }}
        >
          <Tooltip title={`Mở sổ điểm cho ${course.name}`}>
            <IconButton>
              <MovingIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title={`Mở thư mục cho ${course.name}`}>
            <IconButton>
              <FolderOpenOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>
        </CardActions>
      ) : (
        <CardActions
          sx={{
            justifyContent: "end",
            borderTop: "0.5px solid rgba(42, 42, 42, 0.329)",
          }}
        >
          <Tooltip title={`Mở bài tập cho ${course.name}`}>
            <IconButton>
              <AssignmentOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Tooltip title={`Mở thư mục cho ${course.name}`}>
            <IconButton>
              <FolderOpenOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>
        </CardActions>
      )}
      <EditCourseDialog
        open={isEditCourseDialogOpen}
        updateCourses={updateCourses}
        onClose={() => {
          setIsEditCourseDialogOpen(false);
        }}
        course={course}
      />
    </Card>
  );
};

export default ClassCard;
