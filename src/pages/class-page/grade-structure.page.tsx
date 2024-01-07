/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import ScoreTypeComponent from "./ui/score-type.component";
import {
  IGradeItem,
  IGradeItemComponent,
  IGradeStructure,
} from "@/models/grade.model";
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useParams } from "react-router-dom";
import { ClassService } from "@/service/class.service";
import LoadingContext from "@/context/loading.contenxt";
import toast from "react-hot-toast";
import RoleContext from "@/context/role.context";

interface SortableListProps {
  items: IGradeItemComponent[];
  control: Control<{ grades: any[] }, any>;
  register: UseFormRegister<{ grades: any[] }>;
  getValues: UseFormGetValues<{
    grades: IGradeItemComponent[];
  }>;
  setValue: UseFormSetValue<{
    grades: IGradeItemComponent[];
  }>;
  updateRemainPercent: () => void;
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
  setValue: UseFormSetValue<{
    grades: IGradeItemComponent[];
  }>;
  updateRemainPercent: () => void;
  deleteSubGrade: (parentIndex: number, subIndex: number) => void;
}

const SortableScoreTypeComponent = SortableElement<ScoreTypeProps>(
  ({
    value,
    idx,
    onDeleteGradeItem,
    register,
    control,
    updateRemainPercent,
    getValues,
    setValue,
    addSubGrade,
    deleteSubGrade,
  }) => (
    <ScoreTypeComponent
      gradeItemComponent={value}
      index={idx}
      register={register}
      onDeleteGradeItem={onDeleteGradeItem}
      control={control}
      updateRemainPercent={updateRemainPercent}
      getValues={getValues}
      addSubGrade={addSubGrade}
      deleteSubGrade={deleteSubGrade}
      setValue={setValue}
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
    setValue,
    updateRemainPercent,
    onDeleteGradeItem,
    addSubGrade,
    deleteSubGrade,
  }) => (
    <Stack>
      {items.map((value, index) => (
        <SortableScoreTypeComponent
          key={`item-${index}`}
          index={index}
          value={value}
          idx={index}
          control={control}
          register={register}
          updateRemainPercent={updateRemainPercent}
          onDeleteGradeItem={onDeleteGradeItem}
          getValues={getValues}
          setValue={setValue}
          addSubGrade={addSubGrade}
          deleteSubGrade={deleteSubGrade}
        />
      ))}
    </Stack>
  )
);
const GradeStructurePage = () => {
  const classService = new ClassService();
  const [listScoreType, setListScoreType] = useState<IGradeItemComponent[]>();
  const [remainingPercent, setRemaninPercent] = useState(100);
  const { courseId } = useParams();
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [isValidPercent, setIsValidPercent] = useState<boolean>(false);
  const { isLoading, stopLoading, startLoading } = useContext(LoadingContext);
  const { isTeacher } = useContext(RoleContext);

  const {
    register,
    formState: { isValid, isDirty },
    control,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      grades: listScoreType,
    },
    mode: "onChange",
  });
  console.log("ren der lai");
  const { append, remove } = useFieldArray({
    control,
    name: "grades",
  });

  console.log("List score: ", listScoreType);
  console.log("value form: ", getValues().grades);
  useEffect(() => {
    console.log("Call api");
    startLoading();
    const getGradeStructure = async () => {
      try {
        const response = await classService.getGradeStructureCourse(courseId);
        setListScoreType(response.data.gradeComponent);

        console.log("Call api");
        setValue("grades", response.data.gradeComponent);
        calculatePercent();
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    };

    if (courseId) {
      console.log("Call api");

      getGradeStructure();
    }
  }, []);

  const onDeleteGradeItem = (index: number) => {
    console.log("value form: ", getValues().grades);
    remove(index);

    console.log("Index: ", index);
    const temp = listScoreType.filter((item, idx) => index !== idx);
    console.log("Delete item2: ", listScoreType);

    console.log("Delete item: ", temp);
    setListScoreType(temp);

    console.log("value form: ", getValues().grades);

    updateRemainPercent();
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log("old index: ", oldIndex);
    console.log("new index: ", newIndex);

    const temp = [...getValues().grades];

    const temp1 = arrayMoveImmutable(temp, oldIndex, newIndex);
    console.log("========", temp1);
    setListScoreType(temp1);
    setValue("grades", temp1, { shouldValidate: true });

    console.log("List score: ", listScoreType);
    console.log("value form: ", getValues().grades);
  };

  const validatePercent = () => {
    const valueForm = getValues().grades;

    for (const gradeItem of valueForm) {
      const percentParent = +gradeItem.percentage;
      const gradeSub = gradeItem.gradeSubComponent;

      if (gradeSub.length > 0 && gradeSub) {
        let sum = 0;

        for (const item of gradeSub) {
          sum += +item.percentage;
        }

        console.log("Sum: ", sum);
        console.log("paren: ", percentParent);

        if (sum !== percentParent) {
          console.log("khac paren");
          return false;
        }
      }
    }

    console.log("Da xuong day");
    return true;
  };

  useEffect(() => {
    const isValidPercent = validatePercent();

    if (remainingPercent === 0 && isValid && isValidPercent && isDirty) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    }
  }, [isValidPercent, remainingPercent]);

  const addNewScoreType = () => {
    const test: IGradeItemComponent = {
      index: listScoreType.length,
      name: "",
      percentage: "",
      order: listScoreType.length.toString(),
    };

    append({
      index: listScoreType.length,
      name: "",
      percentage: "",
      order: listScoreType.length.toString(),
      gradeSubComponent: [],
    });

    console.log("hien tai: ", listScoreType);
    console.log("value form: ", getValues().grades);
    console.log([...listScoreType, test]);

    setListScoreType(getValues().grades);
  };

  const mapDataToDesiredStructure = (data: any[]): IGradeStructure => {
    const mappedGradeComponent: IGradeItemComponent[] = data.map(
      (item: any) => {
        const { id, name, percentage, order, gradeSubComponent } = item;

        const mappedGradeSubComponent: IGradeItem[] = (
          gradeSubComponent || []
        ).map((subItem: any) => ({
          _id: subItem.id,
          name: subItem.name,
          percentage: subItem.percentage.toString(),
        }));

        return {
          _id: id,
          name,
          percentage: percentage.toString(),
          order: order && order.toString(),
          gradeSubComponent: mappedGradeSubComponent,
        };
      }
    );

    return {
      courseId: courseId, // Replace with the actual courseId
      gradeComponent: mappedGradeComponent,
    };
  };

  const handleSave = async () => {
    if (isValidForm) {
      startLoading();

      console.log("value: ", getValues());
      console.log("List: ", listScoreType);

      const valueForm = [...getValues().grades];

      const objRequest = mapDataToDesiredStructure(valueForm);

      console.log("object after mapping: ", objRequest);

      try {
        const { data: response } =
          await classService.updateGradeStructureCourse(objRequest);
        toast.success("Lưu cấu trúc điểm thành công");

        console.log("Response: ", response);
        stopLoading();
        setIsValidForm(false);
      } catch (error) {
        console.log("Error");
        toast.error("Đã có lỗi xảy ra.");
      }
    }
  };

  const updateRemainPercent = () => {
    console.log("value: ", getValues());
    calculatePercent();
    setIsValidPercent(validatePercent());
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
    // setValue("grades", listScoreType, { shouldValidate: true });

    console.log("list state: ", listScoreType);
  };

  const deleteSubGrade = (parentIndex: number, subIndex: number) => {
    console.log("da vao dayL ", parentIndex, subIndex);

    setListScoreType((prevList) => {
      const newList = [...prevList];
      const gradeItem = newList[parentIndex];

      console.log(gradeItem);
      const sub = gradeItem.gradeSubComponent.at(subIndex);
      console.log(sub);
      gradeItem.gradeSubComponent.splice(subIndex, 1);
      return newList;
    });

    console.log(listScoreType);
    setValue("grades", listScoreType, { shouldValidate: true });
    console.log("value form: ", getValues().grades);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            mt: "3rem",
            mb: "8rem",
            width: "48rem",
            border: "3px solid #dadce0",
            borderRadius: "0.5rem",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "rgb(25,103,210)", mb: 0 }}
            >
              Loại điểm
            </Typography>
          </CardContent>
          <Box
            sx={{
              borderBottom: "0.0625rem solid #dbdbdb",
              margin: "0rem -1rem 1rem",
            }}
          />
          <CardContent>
            {listScoreType && (
              <SortableStack
                distance={1}
                items={listScoreType}
                onSortEnd={onSortEnd}
                control={control}
                register={register}
                getValues={getValues}
                onDeleteGradeItem={(e) => onDeleteGradeItem(e)}
                updateRemainPercent={() => updateRemainPercent()}
                addSubGrade={(e) => addSubGrade(e)}
                deleteSubGrade={(parendIdx, subIdx) =>
                  deleteSubGrade(parendIdx, subIdx)
                }
                setValue={setValue}
              />
            )}
          </CardContent>
          <Box sx={{ display: "flex", p: 4, justifyContent: "space-between" }}>
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
            </Box>
            {isTeacher && (
              <Box>
                <Button
                  size="small"
                  sx={{ color: "rgb(25,103,210)", mr: 3 }}
                  onClick={() => addNewScoreType()}
                >
                  <Typography variant="subtitle2" gutterBottom>
                    Thêm loại điểm
                  </Typography>
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  disabled={!isValidForm}
                  onClick={() => handleSave()}
                >
                  {!isLoading ? "Lưu" : "Đang lưu..."}
                </Button>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default GradeStructurePage;
