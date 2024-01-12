import { Box, Typography } from "@mui/material";
import noCourseImg from "@/assets/images/empty-course-list/no-course.png";

const AdminHome = () => {
    return (
        <Box
            sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            }}
        >
            <Box
            sx={{
                maxWidth: "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
            component={"img"}
            src={noCourseImg}
            alt="no course"
            ></Box>
            <Box sx={{ marginTop: "1rem" }}>
            <Typography>Chào mừng bạn đến với trang quản lý ứng dụng K3 Learning.</Typography>
            </Box>
        </Box>
    )
};

export default AdminHome;