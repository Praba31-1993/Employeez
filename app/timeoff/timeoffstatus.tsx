import React, { useState } from "react";
import DataGridTable from "../reusableComponent/table/gridtable";
import { Idetails } from "../timesheet/idetail";
import { tableData } from "../reusableComponent/JsonData";
import { GridColDef } from "@mui/x-data-grid";
import DataGridDemo from "../reusableComponent/table";

function Timeoffstatus() {
 const [openidealpopups, openidealPopUp] = useState(false);
 const columns: GridColDef[] = [
        
        {
            field: 'datefrom',
            headerName: 'Date From',
            width: 200,
            editable: true,
        },
        {
            field: 'dateto',
            headerName: 'Date to',
            width: 200,
            editable: true,
        },
        {
            field: 'timeOfftype',
            headerName: 'Time Off type',
            type: 'number',
            width: 200,
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            type: 'number',
            width: 200,
            editable: true,
        },

        {
          field: 'action',
          headerName: 'Action',
          type: 'number',
          width: 200,
          editable: true,
      },
    
      
    ];
  return (
    <div>
      <button onClick={()=>openidealPopUp(true)}>show</button>
      <DataGridDemo rows={tableData} columns={columns} />
      {/* <DataGridTable/> */}
    </div>
  );
}

export default Timeoffstatus;
