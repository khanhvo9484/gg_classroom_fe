import { Box, IconButton, Menu, Typography, styled } from "@mui/material";
import { IHeaderParams } from "ag-grid-community";
import MenuItem from "@mui/material/MenuItem";
import { MouseEvent, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useParams } from "react-router-dom";
import { GradeFileService } from "@/service/grade.file.service";
import toast from "react-hot-toast";
import { ClassService } from "@/service/class.service";
import { IGradeStructureResponse } from "@/models/grade.model";

interface Props extends IHeaderParams {
  name: string;
  idParent: string;
  idChild: string;
  percentage: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateBoard: (data: any) => void;
  handleMakeFinallize: (gradesStruct: IGradeStructureResponse) => void;
}

const options = ["Công bố điểm", "Tải bảng điểm mẫu", "Upload điểm"];

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
  idParent,
  updateBoard,
  idChild,
  percentage,
  handleMakeFinallize,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isShowMoreButton, setIsShowMoreButton] = useState<boolean>(false);
  const gradeFileService = new GradeFileService();
  const classService = new ClassService();

  console.log("parent: ", idParent, idChild);

  const { courseId } = useParams();

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event: MouseEvent, index: number) => {
    console.log(event, index);
    // setSelectedIndex(index);

    if (index === 0) {
      // Tải bảng điểm mẫu
    } else if (index === 1) {
      // Upload diiem
      downloadTemplate();
    }
  };

  const downloadTemplate = () => {
    gradeFileService.getStudentGradeTemplateById(courseId, idParent);
    handleClose();
  };

  const uploadGrade = (event) => {
    handleClose();

    const response = gradeFileService.uploadStudentGradeById(
      event.target.files[0],
      courseId,
      idParent
    );
    event.target.value = null;

    toast
      .promise(response, {
        loading: "Đang xử lí...",
        success: "Upload điểm thành công",
        error: "Có lỗi xảy ra. Upload điểm thất bại!",
      })
      .then((response) => {
        updateBoard(response.data.data);
      });
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

  const handleMarkFinalizeGrade = () => {
    handleClose();

    const response = classService.markFinalizeGrade({
      courseId,
      gradeComponentId: idParent,
    });

    toast
      .promise<IGradeStructureResponse>(response, {
        loading: "Đang xử lí...",
        success: "Công bố điểm thành công",
        error: "Thất bại, đã có lỗi xảy ra!",
      })
      .then((response) => {
        handleMakeFinallize(response);
      });
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
          <Typography sx={{ fontWeight: 500 }}>
            {name} {`(${percentage}%)`}
          </Typography>
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
          {idParent && !idChild && (
            <MenuItem key={0} onClick={() => handleMarkFinalizeGrade()}>
              {options[0]}
            </MenuItem>
          )}

          <MenuItem key={1} onClick={(event) => handleMenuItemClick(event, 1)}>
            {options[1]}
          </MenuItem>

          <MenuItem key={"Students Mapping Sheet"} component="label">
            {options[2]}
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
