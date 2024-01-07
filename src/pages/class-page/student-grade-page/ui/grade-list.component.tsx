import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Divider } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import StarIcon from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import GradeReviewRequestDialog from '@/components/ui/dialog/review-grade-request.dialog.component';
import { IGradeSingle, ISubGrade } from '@/models/grade.model';

import useGrade from "@/hooks/grade.hook";

const itemStyle = {
    borderRadius: 2,
}
interface Props {
}

const GradeList: React.FC<Props> = () => {
    const { courseId } = useParams();
    const {grade, gradeIsLoading, gradeError } = useGrade(courseId);
    const user = useSelector(selectUser);

    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const [currentGrade, setCurrentGrade] = React.useState(null);
    const [currentSubGrade, setCurrentSubGrade] = React.useState(null);
    const [isGradeReviewRequestDialogOpen, setIsGradeReviewRequestDialogOpen] = React.useState(false);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        subGrade: ISubGrade,
        grade: IGradeSingle
    ) => {
        setSelectedIndex(index);
        setCurrentGrade(grade);
        setCurrentSubGrade(subGrade);
        setIsGradeReviewRequestDialogOpen(true);
    };

    return (
        <>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 5 }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {!gradeIsLoading && grade.gradeComponent &&
                    grade.gradeComponent.map((grade, index) => {
                        return (
                            <>
                                <ListItemButton
                                    selected={selectedIndex === index}
                                    onClick={(event) => {handleListItemClick(event, index,
                                                                            null,
                                                                            grade)}}
                                    sx={itemStyle}
                                >
                                    <ListItemIcon>
                                        <StarIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={grade.gradeComponentName}/>
                                    <Box sx={{display: 'flex',
                                                        justifyContent: 'end' }}>
                                        <ListItemText primary={`Điểm: ${grade.totalGrade}`}
                                                    secondary={`${grade.percentage}%`} />
                                    </Box>
                                </ListItemButton>
                                <Collapse in={true} timeout="auto" unmountOnExit>
                                    <Divider />
                                    <List component="div" disablePadding>
                                    {grade.gradeSubComponent &&
                                        grade.gradeSubComponent.map((subGrade, subIndex) => {
                                            return (
                                                <ListItemButton sx={{...itemStyle,  pl: 6}}>
                                                    <ListItemIcon>
                                                        <StarBorder />
                                                    </ListItemIcon>
                                                    <ListItemText primary={subGrade.gradeSubComponentName} />
                                                    <Box sx={{display: 'flex',
                                                        justifyContent: 'end' }}>
                                                            <ListItemText primary={`Điểm: ${subGrade.grade}`}
                                                                secondary={`${subGrade.percentage}%`} />
                                                    </Box>
                                                </ListItemButton>
                                            )
                                        })}
                                    </List>
                                </Collapse>
                            </>
                        )
                })}
            </List>
            <GradeReviewRequestDialog
                open={isGradeReviewRequestDialogOpen}
                onClose={() => {
                    setIsGradeReviewRequestDialogOpen(false);
                }}
                grade={currentGrade}
                subGrade={currentSubGrade}
            />
        </>
    );
};

export default GradeList;
