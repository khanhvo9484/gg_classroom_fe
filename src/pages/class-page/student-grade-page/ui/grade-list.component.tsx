import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Divider } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import StarIcon from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import Box from "@mui/material/Box";
import { useState } from "react";
import GradeReviewRequestDialog from "@/components/ui/dialog/review-grade-request.dialog.component";
import {
  IGradeItem,
  IGradeItemComponent,
  IGradeStructure,
  IStudentGrade,
} from "@/models/grade.model";
import { IGradeReviewInfor } from "@/models/grade.review.model";

const itemStyle = {
  borderRadius: 2,
};

interface Props {
  grade: IGradeStructure;
  gradeStudent: IStudentGrade;
}

const GradeList: React.FC<Props> = ({ grade, gradeStudent }) => {
  const [isGradeReviewDialogOpen, setIsGradeReviewDialogOpen] = useState(false);
  const [inforGradeReview, setInforGradeReview] = useState<IGradeReviewInfor>();
  const auth = useSelector(selectUser);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function isIGradeItemComponent(item: any): item is IGradeItemComponent {
    return "gradeSubComponent" in item;
  }

  const handleListItemClick = (
    event,
    item: IGradeItemComponent | IGradeItem
  ) => {
    if (isIGradeItemComponent(item)) {
      if (item.gradeSubComponent.length) {
        console.log("KHONG LAM GI");
        return;
      }

      createGradeReview(item);
    } else {
      createGradeReview(item);
    }
  };

  const createGradeReview = (item: IGradeItemComponent | IGradeItem) => {
    console.log(item);
    setIsGradeReviewDialogOpen(true);

    const inforGradeReview: IGradeReviewInfor = {
      studentId: auth.id,
      gradeId: item.id,
      currentGrade: isIGradeItemComponent(item)
        ? +item.totalGrade
        : +item.grade,
      name: item.name,
    };

    setInforGradeReview(inforGradeReview);

    console.log("INFOR: ", inforGradeReview);
  };

  return (
    <>
      <List
        sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 5 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {grade?.gradeComponent?.map((gradeItem) => {
          return (
            <>
              <ListItemButton
                onClick={(event) => {
                  handleListItemClick(event, gradeItem);
                }}
                sx={itemStyle}
                key={gradeItem._id}
              >
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary={gradeItem.name} />
                <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <ListItemText
                    primary={`Điểm: ${gradeItem.totalGrade}`}
                    secondary={`${gradeItem.percentage}%`}
                  />
                </Box>
              </ListItemButton>
              <Collapse in={true} timeout="auto" unmountOnExit>
                <Divider />
                <List component="div" disablePadding>
                  {gradeItem.gradeSubComponent?.map((subGrade) => {
                    return (
                      <ListItemButton
                        sx={{ ...itemStyle, pl: 6 }}
                        key={subGrade._id}
                        onClick={(event) => {
                          handleListItemClick(event, subGrade);
                        }}
                      >
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary={subGrade.name} />
                        <Box sx={{ display: "flex", justifyContent: "end" }}>
                          <ListItemText
                            primary={`Điểm: ${subGrade.grade}`}
                            secondary={`${subGrade.percentage}%`}
                          />
                        </Box>
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            </>
          );
        })}
      </List>

      <GradeReviewRequestDialog
        open={isGradeReviewDialogOpen}
        onClose={() => {
          setIsGradeReviewDialogOpen(false);
        }}
        infoGrade={inforGradeReview}
      />
    </>
  );
};

export default GradeList;
