/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import GradeTableComponent from "./ui/grade-table/grade-table.component";
import { useCallback, useEffect, useRef, useState } from "react";
import { ClassService } from "@/service/class.service";
import { useParams, Link } from "react-router-dom";
import { ColDef, ColGroupDef } from "ag-grid-community";
import HeaderItemTableComponent from "./ui/grade-table/header-item-table.component";
import SheetMenu from "@/components/sheet.menu.component";
import { AgGridReact } from "ag-grid-react";
import HeaderGroupTableComponent from "./ui/grade-table/header-group-table.component";
import NoDocumentImg from "@/assets/images/NoDocuments.png";
import AddIcon from "@mui/icons-material/Add";
import { IGradeStructureResponse, IStudentGrade } from "@/models/grade.model";

function createGridHeaderConfig(
  data: any,
  updateBoard: (data: any) => void,
  handleMakeFinallize: (gradeStruct: IGradeStructureResponse) => void
): (ColDef | ColGroupDef)[] {
  return data.map((item) => {
    const headerName = item.name;
    const children = item.gradeSubComponent.map((child) => ({
      field: child.name.replace(/\s+/g, "").toLowerCase(),
      headerComponent: HeaderItemTableComponent,
      headerComponentParams: {
        percentage: child.percentage,
        name: child.name,
        idParent: item.id,
        idChild: child.id,
        updateBoard: updateBoard,
        handleMakeFinallize: handleMakeFinallize,
      },
      cellEditor: "agNumberCellEditor",
      cellEditorParams: {
        min: 0,
        max: 10,
      },
    }));

    if (item.gradeSubComponent.length === 0) {
      return {
        field: headerName.replace(/\s+/g, "").toLowerCase(),
        headerComponent: HeaderItemTableComponent,
        headerClass: item.status === "is_graded" ? "my-css-class" : "",
        headerComponentParams: {
          percentage: item.percentage,
          name: headerName,
          idParent: item.id,
          idChild: "",
          updateBoard: updateBoard,
          handleMakeFinallize: handleMakeFinallize,
        },
        cellEditor: "agNumberCellEditor",
        cellEditorParams: {
          min: 0,
          max: 10,
        },
      };
    }

    return {
      headerName,
      headerClass: item.status === "is_graded" ? "my-css-class" : "",
      marryChildren: true,
      children,
      headerGroupComponent: HeaderGroupTableComponent,
      headerGroupComponentParams: {
        percentage: item.percentage,
        name: headerName,
        idParent: item.id,
        idChild: "",
        updateBoard: updateBoard,
        handleMakeFinallize: handleMakeFinallize,
      },
    };
  });
}

function convertToRowDataWithStudentInfo(student) {
  const rowValues = {
    studentOfficialId: student.studentOfficialId,
    fullName: student.fullName,
  };

  console.log("row value temp: ", rowValues);

  function processComponent(component) {
    if (component.gradeSubComponent && component.gradeSubComponent.length > 0) {
      component.gradeSubComponent.forEach((subComponent) => {
        const subComponentName = subComponent.name
          .replace(/\s+/g, "")
          .toLowerCase();
        rowValues[subComponentName] = subComponent.grade;
      });
    } else {
      const componentName = component.name.replace(/\s+/g, "").toLowerCase();
      rowValues[componentName] =
        component.totalGrade !== null ? component.totalGrade : null;
    }
  }

  student.grade.gradeComponent.forEach((component) =>
    processComponent(component)
  );
  console.log("Row value: ", rowValues);
  return rowValues;
}

const defaultHeader: (ColDef | ColGroupDef)[] = [
  {
    headerName: "ID",
    field: "studentOfficialId",
    pinned: "left",
    width: 160,
    lockPosition: "left",
    editable: false,
    cellStyle: { fontWeight: "600" },
  },
  {
    headerName: "Họ và tên",
    field: "fullName",
    pinned: "left",
    width: 245,
    lockPosition: "left",
    editable: false,
    cellStyle: { fontWeight: "600" },
  },
];

const GradesPage = () => {
  const classService = new ClassService();
  const { courseId } = useParams();
  const gridRef = useRef<AgGridReact>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [rowData, setRowData] = useState<any[]>([]);
  const [colDefs, setColDefs] =
    useState<(ColDef | ColGroupDef)[]>(defaultHeader);
  const [, setHaveGradeStructure] = useState<boolean>(true);

  const updateRowBoard = (data: any) => {
    const rowValuesList = data.map((student) =>
      convertToRowDataWithStudentInfo(student)
    );

    setRowData(rowValuesList);
  };

  const updateHeaderBoard = (gradeComponent: any) => {
    const columnMap = createGridHeaderConfig(
      gradeComponent,
      updateRowBoard,
      handleMakeFinallize
    );

    const column = [...defaultHeader, ...columnMap];

    setColDefs(column);
    gridRef.current!.api.refreshHeader();
  };

  const handleMakeFinallize = (gradeStruct: IGradeStructureResponse) => {
    updateHeaderBoard(gradeStruct.data.gradeComponent);
  };

  useEffect(() => {
    setIsLoading(true);
    const getStudentGradeBoardByCourse = async () => {
      try {
        const responseStudentGrade =
          await classService.getStudentGradeBoardByCourseId(courseId);

        const responseGradeStruc = await classService.getGradeStructureCourse(
          courseId
        );

        if (responseGradeStruc.data.gradeComponent.length) {
          setHaveGradeStructure(true);
          const columnMap = createGridHeaderConfig(
            responseGradeStruc.data.gradeComponent,
            updateRowBoard,
            handleMakeFinallize
          );

          console.log("column Map: ", columnMap);

          console.log("response : ", responseStudentGrade.data);
          const rowValuesList = responseStudentGrade.data.map((student) =>
            convertToRowDataWithStudentInfo(student)
          );

          setRowData(rowValuesList);
          setColDefs((prevColDefs) => [...prevColDefs, ...columnMap]);
        } else {
          setHaveGradeStructure(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (courseId) {
      getStudentGradeBoardByCourse();
    }
  }, [courseId]);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, []);

  const onExportCSV = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv({
      fileName: `student_grades_${courseId}`,
    });
  }, []);

  const onUploadStudentList = (studentGrade: IStudentGrade[]) => {
    updateRowBoard(studentGrade);
  };

  return (
    <>
      {isLoading && <LinearProgress sx={{ top: -5 }} />}

      <Box sx={{ mt: 2, mb: 2 }}>
        {colDefs.length > 2 && rowData && !isLoading && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Box
                className="example-header"
                sx={{ display: "flex", alignItems: "center", gap: 3 }}
              >
                <TextField
                  id="filter-text-box"
                  label="Tìm kiếm"
                  type="search"
                  onInput={onFilterTextBoxChanged}
                  sx={{ width: "400px" }}
                />
              </Box>
              <SheetMenu
                onExportCSV={onExportCSV}
                onUploadStudentList={onUploadStudentList}
              />
            </Box>
            <GradeTableComponent
              rowGrade={rowData}
              colGrid={colDefs}
              gridRef={gridRef}
              onFilterTextBoxChanged={onFilterTextBoxChanged}
            ></GradeTableComponent>
          </>
        )}

        {colDefs.length === 2 && rowData.length === 0 && !isLoading && (
          <Box
            sx={{
              height: "60vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              component="img"
              src={NoDocumentImg}
              sx={{ width: 300, height: 250 }}
            />
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Không có dữ liệu bảng điểm. Khởi tạo cấu trúc điểm của bạn ngay
              bây giờ.
            </Typography>

            <Button
              variant="contained"
              startIcon={<AddIcon fontSize="large" />}
              sx={{ mt: 2 }}
              to={`/course/${courseId}/grade-structure`}
              component={Link}
            >
              <Typography variant="body1">Tạo cấu trúc điểm</Typography>
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default GradesPage;
