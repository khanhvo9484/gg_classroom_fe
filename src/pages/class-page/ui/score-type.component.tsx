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
import { Control, UseFormRegister, UseFormGetValues } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import { Subject } from "rxjs";

interface Props {
  gradeItemComponent: IGradeItemComponent;
  index: number;
  onDeleteGradeItem: (index: number) => void;
  handleChange: () => void;
  register: UseFormRegister<Record<string, any>>; // UseFormRegister is the correct type
  control: Control;
  getValues: UseFormGetValues<{
    grades: IGradeItemComponent[];
  }>;
  addSubGrade: (index: number) => void;
  deleteSubGrade: (parentIndex: number, subIndex: number) => void;
}

const useStyles = makeStyles(() => ({
  inputNumberStyle: {
    width: "206px",
  },
  hoverEffect: {
    "&:hover .closeIcon": {
      visibility: "visible !important",
    },
  },
}));

const ScoreTypeComponent: React.FC<Props> = ({
  gradeItemComponent,
  index,
  onDeleteGradeItem,
  register,
  handleChange,
  getValues,
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
  };

  const handeOnChange = () => {
    console.log("dang change");
    handleChange();
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

    console.log("value form: ", getValues().grades);
  };

  const handleDeleteSubGradeItem = (parentIndex: number, subIndex: number) => {
    console.log(index);
    deleteSubGrade(parentIndex, subIndex);
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
          {gradeItemSub.length > 0 && (
            <IconButton size="large" onClick={handleExpandSubGrade}>
              {isExpand ? <ExpandMoreIcon /> : <ExpandLessIcon />}
            </IconButton>
          )}
          <IconButton size="large" onClick={() => handleAddSubGrade(index)}>
            <AddIcon />
          </IconButton>
          <IconButton size="large" onClick={() => handleDeleteGradeItem()}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Child loop*/}
        <Box sx={{ pl: 4, pt: 2 }}>
          {isExpand &&
            gradeItemSub &&
            gradeItemSub.map((item, idx) => (
              <Box
                key={idx}
                sx={{ display: "flex" }}
                className={classes.hoverEffect}
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
                    defaultValue={item.name}
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
                    defaultValue={item.percentage}
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
                  className="closeIcon"
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
