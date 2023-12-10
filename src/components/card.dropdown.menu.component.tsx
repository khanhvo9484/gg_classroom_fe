import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

export default function CardMenu({isOwner, archiveCourse, leaveCourse, editCourse}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        sx={{color: "primary.contrastText"}}
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      {isOwner
        ? (
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem key={"Chỉnh sửa"} onClick={() =>{editCourse();
                                                     handleClose();}}>
              {"Chỉnh sửa"}
            </MenuItem>
            <MenuItem key={"Lưu trữ"} onClick={() =>{archiveCourse();
                                                     handleClose();}}>
              {"Lưu trữ"}
            </MenuItem>
          </Menu>
        ) : (
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem key={"Di chuyển"} onClick={() =>{console.log("Nhấn di chuyển");
                                                       handleClose();}}>
            {"Di chuyển"}
            </MenuItem>
            <MenuItem key={"Hủy đăng ký"} onClick={() =>{leaveCourse();
                                                         handleClose();}}>
              {"Hủy đăng ký"}
            </MenuItem>
          </Menu>
        )}
    </div>
  );
}