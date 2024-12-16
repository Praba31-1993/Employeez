"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ClickableChips from "./chips"; // Ensure this is the correct import
import VisibilityIcon from "@mui/icons-material/Visibility";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface DataGridDemoProps {
  rows: any[];
  columns: any[];
}

const statusRenderer = (status: string) => {
  return <ClickableChips label={status} />;
};

export default function DataGridDemo({ rows, columns }: DataGridDemoProps) {
  // Modify columns to include custom render function for the status field
  const updatedColumns: GridColDef[] = columns.map((col) => {
    if (col.field === "status") {
      return {
        ...col,
        renderCell: (params: any) => statusRenderer(params.value), // Use the custom renderer for the status column
        width: 180, // Adjust width for status column as needed
        headerAlign: "center", // Align header text to center
        align: "center", // Align cell content to center
      };
    }
    if (col.field === "action") {
      return {
        ...col,
        renderCell: (params: any) => (
          <div style={{ display: "flex", gap: "1em" }}>
            <VisibilityIcon />
            <HighlightOffIcon />
          </div>
        ), // Use the custom renderer for the status column
        width: 180, // Adjust width for status column as needed
        headerAlign: "center", // Align header text to center
        align: "center", // Align cell content to center
      };
    }
    return {
      ...col,
      headerAlign: "center", // Align header text to center
      align: "center", // Align cell content to center
    };
  });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={updatedColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[101]}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#F6F7FB !important",
            color: "#6D6777",
            textAlign: "center", // Ensure column headers are centered
          },
          "& .MuiDataGrid-cell": {
            color: "#707070",
            textAlign: "center", // Ensure cell contents are centered
            display: "flex",
            alignItems: "center",
          },
        }}
      />
    </Box>
  );
}
