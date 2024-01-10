import { IconButton, MenuItem, Typography, styled, Menu } from "@mui/material";
import Box from "@mui/material/Box";
import { IHeaderGroupParams } from "ag-grid-community";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, MouseEvent } from "react";
import { GradeFileService } from "@/service/grade.file.service";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { ClassService } from "@/service/class.service";
import { IGradeStructureResponse } from "@/models/grade.model";

interface Props extends IHeaderGroupParams {
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

const HeaderGroupTableComponent: React.FC<Props> = ({
  name,
  idParent,
  idChild,
  updateBoard,
  handleMakeFinallize,
  percentage,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isShowMoreButton, setIsShowMoreButton] = useState<boolean>(false);
  // const [selectedIndex, setSelectedIndex] = useState(null);
  const gradeFileService = new GradeFileService();
  const classService = new ClassService();

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
      downloadTemplate();
    }
  };

  const downloadTemplate = () => {
    gradeFileService.getStudentGradeTemplateById(courseId, idParent);
    handleClose();
  };

  const uploadGrade = async (event) => {
    handleClose();

    try {
      const response = await gradeFileService.uploadStudentGradeById(
        event.target.files[0],
        courseId,
        idParent
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

  const handleMarkFinalizeGrade = async () => {
    try {
      const response = await classService.markFinalizeGrade({
        courseId,
        gradeComponentId: idParent,
      });

      toast.success("Công bố điểm thành công");
      handleMakeFinallize(response);
    } catch (error) {
      toast.error("Thất bại, đã có lỗi xảy ra!");
    } finally {
      handleClose();
    }
  };
  return (
    <>
      <Box
        onMouseEnter={() => enableMoreButton()}
        onMouseLeave={() => disableMoreButton()}
        sx={{ width: "100%" }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: 500, flex: 0 }}>
            {name} {`(${percentage}%)`}
          </Typography>
          {isShowMoreButton && (
            <IconButton
              aria-label="settings"
              onClick={(event) => handleOpenMore(event)}
              sx={{ position: "absolute", right: "40px" }}
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

export default HeaderGroupTableComponent;
