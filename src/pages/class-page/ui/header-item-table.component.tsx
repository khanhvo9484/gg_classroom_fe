import { Box, IconButton, Typography, styled } from "@mui/material";
import { IHeaderParams } from "ag-grid-community";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";
import { GradeFileService } from "@/service/grade.file.service";
import toast from "react-hot-toast";

interface Props extends IHeaderParams {
  name: string;
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateBoard: (data: any) => void;
}

const options = ["Tải bảng điểm mẫu", "Upload điểm"];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const HeaderItemTableComponent: React.FC<Props> = ({
  name,
  id,
  updateBoard,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isShowMoreButton, setIsShowMoreButton] = useState<boolean>(false);
  // const [selectedIndex, setSelectedIndex] = useState(null);
  const gradeFileService = new GradeFileService();

  const { courseId } = useParams();

  console.log("id: ", id);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: MouseEvent, index: number) => {
    console.log(event, index);
    // setSelectedIndex(index);

    if (index === 0) {
      // Tải bảng điểm mẫu
      downloadTemplate();
    } else if (index === 1) {
      // Upload diiem
    }
  };

  const downloadTemplate = () => {
    console.log("Download temp late: ", id, courseId);
    gradeFileService.getStudentGradeTemplateById(courseId, id);
    handleClose();
  };

  const uploadGrade = async (event) => {
    console.log("Upload: ", id, courseId);
    console.log("vao day kho9ng");
    handleClose();

    try {
      const response = await gradeFileService.uploadStudentGradeById(
        event.target.files[0],
        courseId,
        id
      );
      event.target.value = null;
      console.log("Resposne: ", response.data.data);
      updateBoard(response.data.data);

      toast.success("Upload điểm thành công");
    } catch (error) {
      toast.error("Tải lên bảng học sinh thất bại.");
      console.log(error);
      // throw error;
    }
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

          <MenuItem key={"Students Mapping Sheet"} component="label">
            {options[1]}
            <VisuallyHiddenInput
              type="file"
              onInputCapture={(event) => {
                uploadGrade(event);
              }}
            />
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default HeaderItemTableComponent;
