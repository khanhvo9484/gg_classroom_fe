import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import { Stack, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { GradeFileService } from "@/service/grade.file.service";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import toast from "react-hot-toast";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";

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

export default function SheetMenu({ onExportCSV, onUploadStudentList }) {
  const { courseId } = useParams();

  const [anchorElUpload, setAnchorElUpload] =
    React.useState<null | HTMLElement>(null);
  const openUpload = Boolean(anchorElUpload);
  const handleClickUpload = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUpload(event.currentTarget);
  };
  const handleCloseUpload = () => {
    setAnchorElUpload(null);
  };

  const gradeFileService = new GradeFileService();

  const [anchorElDownload, setAnchorElDownload] =
    React.useState<null | HTMLElement>(null);
  const openDownload = Boolean(anchorElDownload);

  const handleClickDownload = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDownload(event.currentTarget);
  };

  const handleCloseDownload = () => {
    setAnchorElDownload(null);
  };

  const handleUploadStudent = async (event) => {
    try {
      const response = await gradeFileService.uploadStudentList(
        event.target.files[0],
        courseId
      );
      event.target.value = null;

      onUploadStudentList(response.data);
      handleCloseUpload();
      toast.success("Tải lên bảng học sinh thành công.");
    } catch (error) {
      toast.error("Tải lên bảng học sinh thất bại.");
      console.log(error);
    }
  };

  const handleUploadStudentMapping = async (event) => {
    try {
      const response = await gradeFileService.uploadStudentMappingList(
        event.target.files[0],
        courseId
      );
      event.target.value = null;

      if (response.status == 201) {
        handleCloseUpload();
        toast.success("Tải lên bảng đăng ký MSSV thành công.");
      } else {
        toast.error("Tải lên bảng đăng ký MSSV thất bại.");
      }
    } catch (error) {
      toast.error("Tải lên bảng đăng ký MSSV thất bại.");
    }
  };

  const handleUploadStudentList = async (event) => {
    try {
      const response = await gradeFileService.uploadStudentList(
        event.target.files[0],
        courseId
      );
      event.target.value = null;

      if (response.status == 201) {
        handleCloseUpload();
        toast.success("Tải lên bảng đăng ký danh sách sinh viên thành công.");
      } else {
        toast.error("Tải lên bảng đăng ký danh sách sinh viên thất bại.");
      }
    } catch (error) {
      toast.error("Tải lên bảng đăng ký danh sách sinh viên thất bại.");
    }
  };

  return (
    <Stack direction="row" sx={{ gap: 2 }}>
      <Tooltip title="Tải các bản mẫu">
        <IconButton
          aria-label="more"
          id="upload-button"
          aria-controls={openDownload ? "upload-menu" : undefined}
          aria-expanded={openDownload ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClickDownload}
        >
          <CloudDownloadOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="download-menu"
        MenuListProps={{
          "aria-labelledby": "download-button",
        }}
        anchorEl={anchorElDownload}
        open={openDownload}
        onClose={handleCloseDownload}
      >
        <MenuItem
          key={"Students Template"}
          onClick={() => {
            gradeFileService.getStudentGradeTemplate();
          }}
        >
          {"Tải mẫu DS học sinh"}
        </MenuItem>
        <MenuItem
          key={"Students Mapping Template"}
          onClick={() => {
            gradeFileService.getStudentGradeMappingIdTemplate(courseId);
          }}
        >
          {"Tải mẫu gán MSSV"}
        </MenuItem>
        <MenuItem
          key={"Grade Students CSV"}
          onClick={() => {
            handleCloseDownload();
            onExportCSV();
          }}
        >
          {"Xuất bảng điểm CSV"}
        </MenuItem>
      </Menu>
      <Tooltip title="Upload điểm, danh sách học sinh">
        <IconButton
          aria-label="more"
          id="upload-button"
          aria-controls={openUpload ? "upload-menu" : undefined}
          aria-expanded={openUpload ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClickUpload}
        >
          <UploadFileRoundedIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="upload-menu"
        MenuListProps={{
          "aria-labelledby": "upload-button",
        }}
        anchorEl={anchorElUpload}
        open={openUpload}
        onClose={handleCloseUpload}
      >
        <MenuItem key={"Students Sheet"} component={"label"}>
          {"Tải lên bảng điểm"}
          <VisuallyHiddenInput
            type="file"
            onInputCapture={(event) => {
              handleUploadStudent(event);
            }}
          />
        </MenuItem>
        <MenuItem key={"Students Mapping Sheet"} component="label">
          {"Bảng đăng ký MSSV"}
          <VisuallyHiddenInput
            type="file"
            onInputCapture={(event) => {
              handleUploadStudentMapping(event);
            }}
          />
        </MenuItem>
        <MenuItem key={"Students Sheet"} component="label">
          {"Bảng danh sách sinh viên"}
          <VisuallyHiddenInput
            type="file"
            onInputCapture={(event) => {
              handleUploadStudentList(event);
            }}
          />
        </MenuItem>
      </Menu>
    </Stack>
  );
}
