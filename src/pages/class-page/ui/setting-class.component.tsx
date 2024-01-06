/* eslint-disable @typescript-eslint/no-explicit-any */
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { Box, CardActions, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/auth.slice";
import NotifyModalComponent from "@/components/ui/modals/notify-modal.component";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ScoreTypeComponent from "./score-type.component";
import { arrayMove } from "react-sortable-hoc";
import { IGradeItem, IGradeItemComponent } from "@/models/grade.model";
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useParams } from "react-router-dom";
import { ClassService } from "@/service/class.service";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}

interface SortableListProps {
  items: IGradeItemComponent[];
  control: Control<{ grades: any[] }, any>;
  register: UseFormRegister<{ grades: any[] }>;
  getValues: UseFormGetValues<{
    grades: IGradeItemComponent[];
  }>;
  handleChange: () => void;
  onDeleteGradeItem: (index: number) => void;
  addSubGrade: (index: number) => void;
  deleteSubGrade: (parentIndex: number, subIndex: number) => void;
}

interface ScoreTypeProps {
  value: IGradeItemComponent;
  idx: number;
  onDeleteGradeItem: (index: number) => void;
  addSubGrade: (index: number) => void;
  control: Control<{ grades: IGradeItemComponent[] }, IGradeItemComponent>;
  register: UseFormRegister<{ grades: IGradeItemComponent[] }>;
  getValues: UseFormGetValues<{
    grades: IGradeItemComponent[];
  }>;
  handleChange: () => void;
  deleteSubGrade: (parentIndex: number, subIndex: number) => void;
}

const SortableScoreTypeComponent = SortableElement<ScoreTypeProps>(
  ({
    value,
    idx,
    onDeleteGradeItem,
    register,
    control,
    handleChange,
    getValues,
    addSubGrade,
    deleteSubGrade,
  }) => (
    <ScoreTypeComponent
      gradeItemComponent={value}
      index={idx}
      register={register}
      onDeleteGradeItem={onDeleteGradeItem}
      control={control}
      handleChange={handleChange}
      getValues={getValues}
      addSubGrade={addSubGrade}
      deleteSubGrade={deleteSubGrade}
    />
  ),
  { withRef: true }
);

const SortableStack = SortableContainer<SortableListProps>(
  ({
    items,
    control,
    register,
    getValues,
    handleChange,
    onDeleteGradeItem,
    addSubGrade,
    deleteSubGrade,
  }) => (
    <Stack>
      {items.map((value, index) => (
        <SortableScoreTypeComponent
          key={value.name}
          index={index}
          value={value}
          idx={index}
          control={control}
          register={register}
          handleChange={handleChange}
          onDeleteGradeItem={onDeleteGradeItem}
          getValues={getValues}
          addSubGrade={addSubGrade}
          deleteSubGrade={deleteSubGrade}
        />
      ))}
    </Stack>
  )
);

const SettingClassComponent: React.FC<SimpleDialogProps> = ({
  open,
  onClose,
}) => {
  const classService = new ClassService();
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const user = useSelector(selectUser);
  const [optionScore, setOptionScore] = useState("");
  const [listScoreType, setListScoreType] = useState<IGradeItemComponent[]>();
  const [remainingPercent, setRemaninPercent] = useState(100);
  const { courseId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
    control,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      grades: listScoreType,
    },
    mode: "onSubmit",
  });

  const { append, remove } = useFieldArray({
    control,
    name: "grades",
  });

  useEffect(() => {
    const getGradeStructure = async () => {
      try {
        const response = await classService.getGradeStructureCourse(courseId);
        setListScoreType(response.data.gradeComponent);
        setValue("grades", response.data.gradeComponent);
        calculatePercent();
      } catch (error) {
        console.log(error);
      }
    };

    if (courseId) {
      getGradeStructure();
    }
  }, [courseId, setValue]);

  const handleClose = () => {
    onClose();
  };

  const onDeleteGradeItem = (index: number) => {
    const temp = listScoreType.filter((item, idx) => index !== idx);

    console.log(temp);
    remove(index);
    setListScoreType(temp);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log("old index: ", oldIndex);
    console.log("new index: ", newIndex);

    setListScoreType(arrayMove(listScoreType, oldIndex, newIndex));
  };

  const addNewScoreType = () => {
    const test: IGradeItemComponent = {
      index: listScoreType.length,
      name: "",
      percentage: "",
      order: "kahkahka",
    };

    append({
      index: listScoreType.length,
      name: "",
      percentage: "",
      order: "kahkahka",
      gradeSubComponent: [],
    });

    console.log("hien tai: ", listScoreType);
    console.log("value form: ", getValues().grades);
    console.log([...listScoreType, test]);

    setListScoreType(getValues().grades);
    // setListScoreType([...listScoreType, test]);
  };

  const handleSave = () => {
    console.log("value: ", getValues());
    console.log("List: ", listScoreType);

    console.log("is valid: ", isValid);
    console.log("is thay doi: ", isDirty);
    handleSubmit(submitForm);
    // setListScoreType()
  };

  const submitForm = (data) => {
    console.log(data);
  };

  const handleChange = () => {
    console.log("value: ", getValues());
    calculatePercent();
  };

  const calculatePercent = () => {
    const formValue = getValues().grades;
    const ahah = getValues();

    console.log(ahah);
    console.log(formValue);

    let sum = 0;

    formValue.forEach((item) => {
      sum += +item.percentage;
    });

    const newRemainingPercent = 100 - sum;
    setRemaninPercent(newRemainingPercent);
  };

  const addSubGrade = (index: number) => {
    setListScoreType((prevList) => {
      const newList = [...prevList];
      const gradeItem = newList[index];
      const newSubGrade: IGradeItem = {
        index: gradeItem.gradeSubComponent.length.toString(),
        name: "",
        percentage: "",
        status: "",
      };

      gradeItem.gradeSubComponent.push(newSubGrade);
      return newList;
    });
    setValue("grades", listScoreType, { shouldValidate: true });

    console.log("list state: ", listScoreType);
  };

  const deleteSubGrade = (parentIndex: number, subIndex: number) => {
    console.log("da vao dayL ", parentIndex, subIndex);

    setListScoreType((prevList) => {
      const newList = [...prevList];
      const gradeItem = newList[parentIndex];

      console.log(gradeItem);

      gradeItem.gradeSubComponent.splice(subIndex, 1);
      return newList;
    });

    console.log(listScoreType);
    setValue("grades", listScoreType, { shouldValidate: true });
    // replace(listScoreType);
    console.log("value form: ", getValues().grades);
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", bgcolor: "white" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ color: "#5f6368" }}
            >
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 3, flex: 1, color: "#5f6368" }}
              variant="subtitle1"
              component="div"
            >
              Cài đặt lớp học
            </Typography>
            <Button autoFocus variant="contained" onClick={() => handleSave()}>
              {!isLoading ? "Lưu" : "Đang lưu..."}
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            // height: "100vh",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              my: "8rem",
              width: "45rem",
              border: "0.0625rem solid #dadce0",
              borderRadius: "0.5rem",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                component="div"
                sx={{ color: "rgb(25,103,210)", mb: 2 }}
              >
                Chấm điểm
              </Typography>
            </CardContent>
            <Box
              sx={{
                borderBottom: "0.0625rem solid #dbdbdb",
                margin: "0rem -1rem 1rem",
              }}
            />
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1.5 }}>
                Loại điểm
              </Typography>

              <SortableStack
                distance={1}
                items={listScoreType}
                onSortEnd={onSortEnd}
                control={control}
                register={register}
                getValues={getValues}
                onDeleteGradeItem={(e) => onDeleteGradeItem(e)}
                handleChange={() => handleChange()}
                addSubGrade={(e) => addSubGrade(e)}
                deleteSubGrade={(parendIdx, subIdx) =>
                  deleteSubGrade(parendIdx, subIdx)
                }
              />
            </CardContent>
            <CardActions>
              <Box>
                <Box>
                  {listScoreType && listScoreType.length > 0 && (
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "rgb(179,20,18)", pl: 1 }}
                    >
                      Phần trăm còn lại: {remainingPercent}
                    </Typography>
                  )}
                </Box>
                <Button
                  size="small"
                  sx={{ color: "rgb(25,103,210)" }}
                  onClick={() => addNewScoreType()}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Thêm loại điểm
                  </Typography>
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      </Dialog>
      <NotifyModalComponent
        isOpen={isError}
        title="Đã xảy ra lỗi"
        content="Không thể tham gia lớp học. Hãy kiểm tra mã và tài khoản rồi thử lại."
        onClose={() => {
          setIsError(false);
        }}
      />
    </>
  );
};

export default SettingClassComponent;
