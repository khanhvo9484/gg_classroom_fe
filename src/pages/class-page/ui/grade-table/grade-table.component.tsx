import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import HeaderItemTableComponent from "../header-item-table.component";
import { ColDef } from "ag-grid-community";
import "./grade-table.css";

const GradeTableComponent = () => {
  const [rowData, setRowData] = useState([
    {
      name: "Bell Walklate",
      btvn3: 7,
      btvn2: 7,
      btvn1: 9,
      giuaki: 3,
      cuoiki: 9,
      seminar: 1,
      oral: 10,
    },
    {
      name: "Barbey Ablett",
      btvn3: 3,
      btvn2: 5,
      btvn1: 6,
      giuaki: 9,
      cuoiki: 1,
      seminar: 6,
      oral: 8,
    },
    {
      name: "Manya Arnald",
      btvn3: 2,
      btvn2: 5,
      btvn1: 10,
      giuaki: 9,
      cuoiki: 10,
      seminar: 6,
      oral: 5,
    },
    {
      name: "Chane Feldhammer",
      btvn3: 8,
      btvn2: 7,
      btvn1: 6,
      giuaki: 4,
      cuoiki: 6,
      seminar: 9,
      oral: 5,
    },
    {
      name: "Thorndike Caulwell",
      btvn3: 2,
      btvn2: 4,
      btvn1: 6,
      giuaki: 1,
      cuoiki: 1,
      seminar: 5,
      oral: 10,
    },
    {
      name: "Erskine O'Gorman",
      btvn3: 8,
      btvn2: 6,
      btvn1: 10,
      giuaki: 10,
      cuoiki: 8,
      seminar: 7,
      oral: 3,
    },
    {
      name: "Willi Scrivner",
      btvn3: 2,
      btvn2: 8,
      btvn1: 1,
      giuaki: 4,
      cuoiki: 4,
      seminar: 5,
      oral: 7,
    },
    {
      name: "Tilly Lyosik",
      btvn3: 2,
      btvn2: 10,
      btvn1: 2,
      giuaki: 8,
      cuoiki: 8,
      seminar: 4,
      oral: 7,
    },
    {
      name: "Gan Pawlata",
      btvn3: 5,
      btvn2: 8,
      btvn1: 7,
      giuaki: 10,
      cuoiki: 10,
      seminar: 7,
      oral: 8,
    },
    {
      name: "Colas Fairchild",
      btvn3: 7,
      btvn2: 10,
      btvn1: 5,
      giuaki: 4,
      cuoiki: 4,
      seminar: 2,
      oral: 7,
    },
  ]);

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      headerName: "Họ và tên",
      field: "name",
      pinned: "left",
      width: 280,
      lockPosition: "left",
      editable: false,
    },
    {
      field: "btvn3",
      headerComponent: HeaderItemTableComponent,
      headerComponentParams: { name: "BTVN 3" },
      cellEditor: "agNumberCellEditor",
    },
    {
      field: "btvn2",
      headerComponent: HeaderItemTableComponent,
      headerComponentParams: { name: "BTVN 2" },
    },
    {
      field: "btvn1",
      headerComponent: HeaderItemTableComponent,
      headerComponentParams: { name: "BTVN 1" },
    },
    {
      field: "giuaki",
      headerComponent: HeaderItemTableComponent,
      headerComponentParams: { name: "Giữa kì" },
    },
    {
      field: "cuoiki",
      headerComponent: HeaderItemTableComponent,
      headerComponentParams: { name: "Cuối kì" },
    },
    {
      field: "cuoiki",
      headerComponent: HeaderItemTableComponent,
      headerComponentParams: { name: "Cuối kì" },
    },
    {
      field: "seminar",
      headerComponent: HeaderItemTableComponent,
      headerComponentParams: { name: "Seminar" },
    },
    {
      field: "oral",
      headerComponent: HeaderItemTableComponent,
      headerComponentParams: { name: "Kiểm tra miệng" },
    },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      initialWidth: 150,
      wrapHeaderText: true,
      autoHeaderHeight: true,
      editable: true,
      filter: true,
    };
  }, []);

  return (
    <>
      <Box sx={{ height: 500 }} className="ag-theme-quartz">
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          suppressRowHoverHighlight={true}
        />
      </Box>
    </>
  );
};

export default GradeTableComponent;
