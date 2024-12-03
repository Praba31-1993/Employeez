"use client"
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetter } from "@mui/x-data-grid";

interface DataGridDemoProps {
  rows: any[]; 
  columns: any[];
}

export default function DataGridDemo({ rows, columns }: DataGridDemoProps) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#F6F7FB !important",
            color: "#6D6777",
          },
          "& .MuiDataGrid-cell": {
            color: "#707070", 
          },
        }}
      />
    </Box>
  );
}
