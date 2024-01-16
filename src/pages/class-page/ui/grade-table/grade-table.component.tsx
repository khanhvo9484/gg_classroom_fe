/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import {
  CellEditingStoppedEvent,
  ColDef,
  ColGroupDef,
} from "ag-grid-community";
import "./grade-table.css";
import { ClassService } from "@/service/class.service";
import { IUpdateStudentGradeRequest } from "@/models/grade.model";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { calculateAllGrade } from "@/utils/common.util";

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
  const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>(colGrid);

  useEffect(() => {
    setRowData(rowGrade);
  }, [rowGrade, colGrid]);

  useEffect(() => {
    setColDefs(colGrid);
  }, [colGrid]);

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 160,
      wrapHeaderText: true,
      editable: true,
      filter: true,
    };
  }, []);

  const handleCellValueChange = async (event: CellEditingStoppedEvent) => {
    const idParent = event.colDef.headerComponentParams.idParent;
    const idChild = event.colDef.headerComponentParams.idChild;
    const oldValue = event.oldValue;
    const request: IUpdateStudentGradeRequest = {
      courseId: courseId,
      gradeId: idParent && idChild ? idChild : idParent,
      grade: event.newValue,
      studentOfficialId: event.data.studentOfficialId,
    };

    const rowNode = gridRef.current!.api.getRowNode(event.node.id)!;

    try {
      if (event.newValue) {
        const res = await classService.updateStudentGrade(request);
        const summaryGrade = calculateAllGrade(res.data.grade);

        rowNode.setDataValue("summary", summaryGrade);
        toast.success("Cập nhật điểm thành công");
      } else {
        toast.error("Cập nhật không thành công. Số điểm vượt quá giới hạn!");
        rowNode.setDataValue(event.column.getColId(), oldValue);
      }
    } catch (error) {
      rowNode.setDataValue(event.column.getColId(), oldValue);
      toast.error("Có lỗi xảy ra, cập nhật thất bại");
    }
  };
  return (
    <Box>
      <Box className="ag-theme-quartz" sx={{ height: "80vh" }}>
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          suppressRowHoverHighlight={true}
          headerHeight={48}
          groupHeaderHeight={48}
          onCellEditingStopped={(event) => handleCellValueChange(event)}
        />
      </Box>
    </Box>
  );
};

export default GradeTableComponent;
