import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { MouseEvent, useState } from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ContentCut from "@mui/icons-material/ContentCut";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const options = [
  "Sao chép đường liên kết mời tham gia lớp học",
  "Sao chép mã lớp",
];

const iconMapping = {
  0: <InsertLinkIcon fontSize="small" />,
  1: <ContentCopy fontSize="small" />,
  2: <ChangeCircleIcon fontSize="small" />,
  3: <ContentCut fontSize="small" />,
};

interface Props {
  code: string;
}

const ClassCodeComponent: React.FC<Props> = ({ code }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { courseId } = useParams();

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: MouseEvent, index: number) => {
    handleClose();

    switch (index) {
      case 0:
        handleCopyInviteLinkJoinCourse();
        return;

      case 1:
        handleCopyCode();
        return;
    }
  };

  const handleCopyInviteLinkJoinCourse = () => {
    const currentDomain = window.location.origin;
    const strLink = currentDomain + `/course/${courseId}?code=${code}`;

    navigator.clipboard.writeText(strLink.trim());
    toast.success("Đã sao chép đường liên kết", {
      position: "bottom-left",
    });
  };

  const handleCopyCode = () => {
    console.log("Copy code: ", code);
    navigator.clipboard.writeText(code.trim());
    toast.success("Đã sao chép mã lớp", {
      position: "bottom-left",
    });
  };

  const handleOpenMore = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <Card sx={{ width: "14rem", mb: 2, border: "0.0625rem solid #dadce0" }}>
      <CardHeader
        title={
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ fontWeight: 500 }}
          >
            Mã lớp
          </Typography>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={(event) => handleOpenMore(event)}
          >
            <MoreVertIcon />
          </IconButton>
        }
      />
      <Menu
        id="lock-menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            <ListItemIcon>{iconMapping[index]}</ListItemIcon>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <CardContent sx={{ paddingTop: "0", paddingBottom: "16px" }}>
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: "rgb(25,103,210)",
          }}
        >
          {code}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClassCodeComponent;
