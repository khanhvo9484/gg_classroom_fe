import { Box, IconButton, Typography } from "@mui/material";
import { IHeaderParams } from "ag-grid-community";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Props extends IHeaderParams {
  name: string;
  id: string;
}

const options = ["Xoá", "Trả lại tất cả"];

const HeaderItemTableComponent: React.FC<Props> = ({ name }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isShowMoreButton, setIsShowMoreButton] = useState<boolean>(false);
  // const [selectedIndex, setSelectedIndex] = useState(null);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: MouseEvent, index: number) => {
    console.log(event, index);
    // setSelectedIndex(index);
  };

  const handleOpenMore = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const enableMoreButton = () => {
    setIsShowMoreButton(true);
  };

  const disableMoreButton = () => {
    setIsShowMoreButton(false);
  };

  return (
    <>
      <Box
        sx={{ minWidth: "100px" }}
        onMouseEnter={() => enableMoreButton()}
        onMouseLeave={() => disableMoreButton()}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: 500 }}>{name}</Typography>
          {isShowMoreButton && (
            <IconButton
              aria-label="settings"
              onClick={(event) => handleOpenMore(event)}
              sx={{ p: 0 }}
            >
              <MoreVertIcon />
            </IconButton>
          )}
        </Box>

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
          <MenuItem key={0} onClick={(event) => handleMenuItemClick(event, 0)}>
            {options[0]}
          </MenuItem>
          <MenuItem key={1} onClick={(event) => handleMenuItemClick(event, 1)}>
            {options[1]}
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default HeaderItemTableComponent;
