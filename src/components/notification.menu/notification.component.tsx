import { Divider, Card, CardHeader, Typography, Avatar,
    CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";

export default function Notification() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const handleNotificationClick = (targetId: string) => {
        navigate(`/course/${courseId}/grade-review/${targetId}`, {replace: true});
    };

    return (
        <>
            <Card sx={{borderRadius: 3}}>
                <CardActionArea onClick={() => handleNotificationClick("1")}>
                    <CardHeader
                        sx={{ paddingBottom: "5px" }}
                        avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                            R
                        </Avatar>
                        }
                        title={
                        <Typography variant="body1" sx={{fontSize: 15}}>
                        <span style={{fontWeight: 700}}>Khoa</span> đã tạo một bài phúc khảo
                        </Typography>
                        }
                        subheader={
                            <Typography sx={{fontSize: 10}}>
                            5 giờ trước
                            </Typography>
                        }
                    />
                </CardActionArea>
            </Card>
            <Divider sx={{mb: 1}}/>
        </>
    );
}



