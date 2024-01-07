/* eslint-disable @typescript-eslint/no-explicit-any */
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo, useCallback, useRef } from "react";
import { Box, TextField } from "@mui/material";
import { CellValueChangedEvent, ColDef, ColGroupDef } from "ag-grid-community";
import "./grade-table.css";

interface Props {
  colGrid: (ColDef | ColGroupDef)[];
  rowGrade: any[];
}

const GradeTableComponent: React.FC<Props> = ({ colGrid, rowGrade }) => {
  const [rowData] = useState(rowGrade);

  const [colDefs] = useState<(ColDef | ColGroupDef)[]>(colGrid);
  console.log(rowGrade);
  const gridRef = useRef<AgGridReact>(null);

  console.log("col : ", colDefs);
  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 150,
      wrapHeaderText: true,
      editable: true,
      filter: true,
    };
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    gridRef.current!.api.setGridOption(
      "quickFilterText",
      (document.getElementById("filter-text-box") as HTMLInputElement).value
    );
  }, []);

  const handleCellValueChange = (event: CellValueChangedEvent) => {
    console.log("event: ", event);
  };
  return (
    <Box>
      <Box sx={{ mb: 2 }} className="example-header">
        <TextField
          id="filter-text-box"
          label="Tìm kiếm"
          type="search"
          onInput={onFilterTextBoxChanged}
          sx={{ width: "400px" }}
        />
      </Box>
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
