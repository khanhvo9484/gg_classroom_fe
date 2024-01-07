import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import { useParams } from "react-router-dom";

import useGrade from "@/hooks/grade.hook";
import GradeList from "@/pages/class-page/student-grade-page/ui/grade-list.component";

interface Props {

}

const GradePageBodyComponent: React.FC<Props> = () => {
    const user = useSelector(selectUser);

    return (
        <Box sx={{ marginTop: 4, marginBottom: 10 }}>
            <Box
                sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: "1px solid rgb(95,99,104)",
                paddingBottom: 1,
                }}
            >
                <List>
                    <ListItem key={1} alignItems="center">
                        <ListItemAvatar sx={{ marginTop: 0, minWidth: 50 }}>
                            <Avatar
                            sx={{
                                bgcolor: "#4173E0",
                                width: 64,
                                height: 64,
                            }}
                            src={user.avatar}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="h4"
                                    sx={{ marginLeft: 2, color: "rgb(25,103,210)" }}
                                >
                                    {user.name}
                                </Typography>
                            }
                        />
                    </ListItem>
                </List>
            </Box>
            <GradeList/>
        </Box>
    );
};

export default GradePageBodyComponent;
