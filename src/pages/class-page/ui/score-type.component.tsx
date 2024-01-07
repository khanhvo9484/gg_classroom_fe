/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { IGradeItem, IGradeItemComponent } from "@/models/grade.model";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import makeStyles from "@mui/styles/makeStyles";
import {
  Control,
  UseFormRegister,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";

interface Props {
  gradeItemComponent: IGradeItemComponent;
  index: number;
  onDeleteGradeItem: (index: number) => void;
  updateRemainPercent: () => void;
  register: UseFormRegister<Record<string, any>>; // UseFormRegister is the correct type
  control: Control;
  getValues: UseFormGetValues<{
    grades: IGradeItemComponent[];
  }>;
  setValue: UseFormSetValue<{
    grades: IGradeItemComponent[];
  }>;
  addSubGrade: (index: number) => void;
  deleteSubGrade: (parentIndex: number, subIndex: number) => void;
}

const useStyles = makeStyles(() => ({
  inputNumberStyle: {
    width: "206px",
  },
  boxHover: {
    "&:hover $closeIcon": {
      visibility: "visible",
    },
  },
  closeIcon: {
    visibility: "hidden",
  },
}));

const ScoreTypeComponent: React.FC<Props> = ({
  gradeItemComponent,
  index,
  onDeleteGradeItem,
  register,
  updateRemainPercent,
  getValues,
  setValue,
  addSubGrade,
  deleteSubGrade,
}) => {
  const [isExpand, setIsExpand] = useState<boolean>(true);
  const [gradeItemSub, setGradeItemSub] = useState<IGradeItem[]>(
    gradeItemComponent.gradeSubComponent!
  );

  const classes = useStyles();

  const handleDeleteGradeItem = () => {
    onDeleteGradeItem(index);
    setGradeItemSub(null);
    console.log("hien tai: ", gradeItemComponent);
  };

  const handeOnChange = () => {
    console.log("dang change");
    updateRemainPercent();
  };

  const handleExpandSubGrade = () => {
    console.log("Da vao day line 26");
    setIsExpand(!isExpand);
  };

  const handleAddSubGrade = (index) => {
    console.log("haha");
    addSubGrade(index);
  };

  const handleSubGradeChange = (subGrade: IGradeItem) => {
    console.log(subGrade);

    // console.log("value form: ", getValues().grades);

    calculatePercent();
  };

  const handleDeleteSubGradeItem = (parentIndex: number, subIndex: number) => {
    console.log(index);
    deleteSubGrade(parentIndex, subIndex);
    console.log("grade sub: ", gradeItemSub);
    setGradeItemSub(gradeItemSub);
    setValue(`grades.${index}.gradeSubComponent`, gradeItemSub);
    updateRemainPercent();
  };

  const calculatePercent = () => {
    console.log("index", index);
    const formValue = getValues().grades;
    console.log("form value: ", formValue);
    const gradeStrucItem = formValue.at(index);
    const percenParent = +gradeStrucItem.percentage;
    let sum = 0;

    gradeStrucItem.gradeSubComponent.forEach((item) => {
      sum += +item.percentage;
    });

    console.log(sum);
    console.log(gradeStrucItem);

    const newRemainingPercent = percenParent - sum;

    if (newRemainingPercent < 0) {
      setValue(`grades.${index}.percentage`, sum.toString());
    }
    updateRemainPercent();

    console.log("Con lai: ", newRemainingPercent);
  };
  return (
    <>
      <Box
        sx={{
          mb: "1rem",
          zIndex: 99999999,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        component={"form"}
      >
        {/* Parent */}
        <Box>
          <FormControl variant="filled" sx={{ mr: 3 }}>
            <InputLabel htmlFor="component-filled">Danh mục điểm</InputLabel>
            <FilledInput
              id="component-filled"
              defaultValue={gradeItemComponent.name}
              name={`grades[${index}].name`}
              {...register(`grades[${index}].name`, {
                required: true,
              })}
            />
          </FormControl>
          <FormControl required variant="filled" sx={{ mr: "18px" }}>
            <InputLabel htmlFor="component-filled">Tỉ lệ %</InputLabel>
            <FilledInput
              className={classes.inputNumberStyle}
              type="number"
              id="component-filled"
              inputProps={{ min: 0, max: 100 }}
              name={`grades[${index}].percentage`}
              {...register(`grades[${index}].percentage`, {
                required: true,
                onChange: () => handeOnChange(),
              })}
            />
          </FormControl>

          <IconButton
            sx={{
              visibility:
                gradeItemSub && gradeItemSub.length > 0 ? "visible" : "hidden",
            }}
            size="large"
            onClick={handleExpandSubGrade}
          >
            {isExpand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
          <IconButton size="large" onClick={() => handleAddSubGrade(index)}>
            <AddIcon />
          </IconButton>
          <IconButton size="large" onClick={() => handleDeleteGradeItem()}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Child loop*/}
        <Box sx={{ pl: 0, pt: 2 }}>
          {isExpand &&
            gradeItemSub &&
            gradeItemSub.map((item, idx) => (
              <Box
                key={item.id || idx}
                sx={{ display: "flex" }}
                className={classes.boxHover}
              >
                <Box
                  sx={{
                    borderLeft: "3px solid rgb(25,103,210)",
                    paddingLeft: "26px",
                  }}
                ></Box>
                <FormControl required={true} variant="filled" sx={{ mr: 3 }}>
                  <InputLabel htmlFor="component-filled">
                    Danh mục điểm
                  </InputLabel>
                  <FilledInput
                    id="component-filled"
                    // defaultValue={item.name}
                    {...register(
                      `grades[${index}].gradeSubComponent.${idx}.name`,
                      {
                        required: true,
                      }
                    )}
                  />
                </FormControl>
                <FormControl required variant="filled" sx={{ mr: 1 }}>
                  <InputLabel htmlFor="component-filled">Tỉ lệ %</InputLabel>
                  <FilledInput
                    id="component-filled"
                    type="number"
                    // defaultValue={item.percentage}
                    inputProps={{ min: 0, max: 100 }}
                    className={classes.inputNumberStyle}
                    {...register(
                      `grades[${index}].gradeSubComponent.${idx}.percentage`,
                      {
                        required: true,
                        onChange: () => handleSubGradeChange(item),
                      }
                    )}
                  />
                </FormControl>

                <IconButton
                  size="large"
                  className={classes.closeIcon}
                  onClick={() => {
                    handleDeleteSubGradeItem(index, idx);
                  }}
                >
                  <CloseIcon sx={{ pb: "22px" }} />
                </IconButton>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default ScoreTypeComponent;
