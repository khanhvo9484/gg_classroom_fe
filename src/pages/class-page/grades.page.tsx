/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import GradeTableComponent from "./ui/grade-table/grade-table.component";
import { useContext, useEffect, useState } from "react";
import { ClassService } from "@/service/class.service";
import { useParams } from "react-router-dom";
import LoadingContext from "@/context/loading.contenxt";
import { ColDef, ColGroupDef } from "ag-grid-community";
import HeaderItemTableComponent from "./ui/header-item-table.component";

function createGridHeaderConfig(data: any): (ColDef | ColGroupDef)[] {
  return data.map((item) => {
    const headerName = item.name;
    const children = item.gradeSubComponent.map((child) => ({
      field: child.name,
      headerComponent: HeaderItemTableComponent,
      headerComponentParams: { name: child.name },
      cellEditor: "agNumberCellEditor",
    }));

    // Check if gradeSubComponent is empty
    if (item.gradeSubComponent.length === 0) {
      return {
        field: headerName.toLowerCase(),
        headerComponent: HeaderItemTableComponent,
        headerComponentParams: { name: headerName },
      };
    }

    return {
      headerName,
      headerClass: "my-css-class",
      marryChildren: true,
      children,
    };
  });
}

function convertToRowDataWithStudentInfo(student) {
  const rowValues = {
    studentOfficialId: student.studentOfficialId,
    fullName: student.fullName,
  };

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
        component.totalGrade !== null ? component.totalGrade : "";
    }
  }

  student.grade.gradeComponent.forEach((component) =>
    processComponent(component)
  );

  return rowValues;
}

const GradesPage = () => {
  const classService = new ClassService();
  const { courseId } = useParams();
  const { stopLoading, startLoading } = useContext(LoadingContext);
  const [rowData, setRowData] = useState<any[]>([]);
  const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([
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
  ]);

  useEffect(() => {
    startLoading();
    const getStudentGradeBoardByCourse = async () => {
      try {
        const response = await classService.getStudentGradeBoardByCourseId(
          courseId
        );
        const columnMap = createGridHeaderConfig(
          response.data[0].grade.gradeComponent
        );

        console.log("column Map: ", columnMap);

        setColDefs((prevColDefs) => [...prevColDefs, ...columnMap]);

        console.log("response : ", response.data);
        const rowValuesList = response.data.map((student) =>
          convertToRowDataWithStudentInfo(student)
        );

        setRowData(rowValuesList);

        console.log("row value: ", rowValuesList);

        console.log("column Map: ", colDefs);
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
      }
    };

    if (courseId) {
      getStudentGradeBoardByCourse();
    }
  }, [courseId]);

  return (
    <>
      <Box sx={{ mt: 2, mb: 2 }}>
        {colDefs.length > 2 && rowData && (
          <GradeTableComponent
            rowGrade={rowData}
            colGrid={colDefs}
          ></GradeTableComponent>
        )}
      </Box>
    </>
  );
};

export default GradesPage;
