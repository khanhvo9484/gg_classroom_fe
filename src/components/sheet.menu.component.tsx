import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { GradeFileService } from '@/service/grade.file.service';
import {
    useParams,
} from "react-router-dom";

import { styled } from '@mui/material/styles';
import toast from 'react-hot-toast';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function SheetMenu() {
    const {courseId} = useParams();

    const [anchorElUpload, setAnchorElUpload] = React.useState<null | HTMLElement>(null);
    const openUpload = Boolean(anchorElUpload);
    const handleClickUpload = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUpload(event.currentTarget);
    };
    const handleCloseUpload = () => {
        setAnchorElUpload(null);
    };

    const gradeFileService = new GradeFileService();

    const [anchorElDownload, setAnchorElDownload] = React.useState<null | HTMLElement>(null);
    const openDownload = Boolean(anchorElDownload);
    const handleClickDownload = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElDownload(event.currentTarget);
    };
    const handleCloseDownload = () => {
        setAnchorElDownload(null);
    };

    const handleUploadStudent = async (event: any) => {
        try {
            const response = await gradeFileService.uploadStudentList(event.target.files[0], courseId);
            event.target.value = null;

            if (response.status == 201) {
                handleCloseUpload();
                toast.success("Tải lên bảng học sinh thành công.")
            } else {
                toast.error("Tải lên bảng học sinh thất bại.")
            }
        } catch (error) {
            toast.error("Tải lên bảng học sinh thất bại.")
            console.log(error);
            // throw error;
        }
    }

    const handleUploadStudentMapping = async (event: any) => {
        try {
            const response = await gradeFileService.uploadStudentMappingList(event.target.files[0], courseId);
            event.target.value = null;

            if (response.status == 201) {
                handleCloseUpload();
                toast.success("Tải lên bảng đăng ký MSSV thành công.")
            } else {
                toast.error("Tải lên bảng đăng ký MSSV thất bại.")
            }
        } catch (error) {
            toast.error("Tải lên bảng đăng ký MSSV thất bại.")
            console.log(error);
            // throw error;
        }
    }

    return (
        <Stack direction="row">
            <IconButton
                aria-label="more"
                id="upload-button"
                aria-controls={openDownload ? 'upload-menu' : undefined}
                aria-expanded={openDownload ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClickDownload}
            >
                <CloudDownloadOutlinedIcon />
            </IconButton>
            <Menu
                id="download-menu"
                MenuListProps={{
                    'aria-labelledby': 'download-button',
                }}
                anchorEl={anchorElDownload}
                open={openDownload}
                onClose={handleCloseDownload}
            >
                <MenuItem key={"Students Template"}
                onClick={() => {gradeFileService.getStudentGradeTemplate()}}>
                    {"Tải về mẫu bảng học sinh"}
                </MenuItem>
                <MenuItem key={"Students Mapping Template"}
                onClick={() => {gradeFileService.getStudentGradeMappingIdTemplate()}}>
                    {"Tải về mẫu bảng đăng ký MSSV"}
                </MenuItem>
            </Menu>
            <IconButton
                aria-label="more"
                id="upload-button"
                aria-controls={openUpload ? 'upload-menu' : undefined}
                aria-expanded={openUpload ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClickUpload}
            >
                < CloudUploadOutlinedIcon/>
            </IconButton>
            <Menu
                id="upload-menu"
                MenuListProps={{
                    'aria-labelledby': 'upload-button',
                }}
                anchorEl={anchorElUpload}
                open={openUpload}
                onClose={handleCloseUpload}
            >
                <MenuItem key={"Students Sheet"} component={"label"}>
                    {"Bảng học sinh"}
                    <VisuallyHiddenInput type="file"
                    onInputCapture={(event) => {handleUploadStudent(event)}}/>
                </MenuItem>
                <MenuItem key={"Students Mapping Sheet"} component="label">
                    {"Bảng đăng ký MSSV"}
                    <VisuallyHiddenInput type="file"
                    onInputCapture={(event) => {handleUploadStudentMapping(event)}}/>
                </MenuItem>
            </Menu>
        </Stack>
    );
  }