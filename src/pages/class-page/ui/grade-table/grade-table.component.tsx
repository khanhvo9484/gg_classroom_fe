/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import { CellValueChangedEvent, ColDef, ColGroupDef } from "ag-grid-community";
import "./grade-table.css";
import { ClassService } from "@/service/class.service";
import { IUpdateStudentGradeRequest } from "@/models/grade.model";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

interface Props {
  colGrid: (ColDef | ColGroupDef)[];
  rowGrade: any[];
  gridRef: any;
  onFilterTextBoxChanged: () => void;
}

const GradeTableComponent: React.FC<Props> = ({
  colGrid,
  rowGrade,
  gridRef,
}) => {
  const classService = new ClassService();
  const [rowData, setRowData] = useState(rowGrade);
  const { courseId } = useParams();
  const [colDefs] = useState<(ColDef | ColGroupDef)[]>(colGrid);

  useEffect(() => {
    setRowData(rowGrade);
  }, [rowGrade]);

  console.log("col : ", colDefs);
  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 160,
      wrapHeaderText: true,
      editable: true,
      filter: true,
    };
  }, []);

  const handleCellValueChange = async (event: CellValueChangedEvent) => {
    const idParent = event.colDef.headerComponentParams.idParent;
    const idChild = event.colDef.headerComponentParams.idChild;

    const request: IUpdateStudentGradeRequest = {
      courseId: courseId,
      gradeId: idParent && idChild ? idChild : idParent,
      grade: event.newValue,
      studentOfficialId: event.data.studentOfficialId,
    };

    try {
      await classService.updateStudentGrade(request);

      toast.success("Cập nhật điểm thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra, cập nhật thất bại");
    }
  };
  return (
    <Box>
      <Box className="ag-theme-quartz" sx={{ height: "90vh" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          suppressRowHoverHighlight={true}
          headerHeight={48}
          groupHeaderHeight={48}
          onCellValueChanged={(event) => handleCellValueChange(event)}
        />
      </Box>
    </Box>
  );
};

export default GradeTableComponent;
