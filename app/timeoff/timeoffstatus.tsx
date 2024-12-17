import React, { useState } from "react";
import TableWithSort from "../reusableComponent/table/tablewithSort";

interface RowData {
  id: number;
  first: string;
  last: string;
  status: string;
}

const Timeoffstatus = ({statusHistory}:any) => {
  const columns = [
    { key: "date_from", label: "Date From" },
    { key: "date_to", label: "Date To" },
    { key: "time_off_type", label: "Time off Type" },
    { key: "status", label: "Status" },
    { key: "reason", label: "Reason" },
    { key: "action", label: "Action" },
  ];

  const rows = [
    {
      date_from: "2024-12-01",
      date_to: "2024-12-02",
      time_off_type: "Sick Leave",
      status: "Approved",
      reason: "Medical",
      action: "",
    },
    {
      date_from: "2024-12-03",
      date_to: "2024-12-04",
      time_off_type: "Vacation",
      status: "Submitted",
      reason: "Personal",
      action: "",
    },
    {
      date_from: "2024-12-05",
      date_to: "2024-12-06",
      time_off_type: "Maternity",
      status: "Approved",
      reason: "Family",
      action: "",
    },
    {
      date_from: "2024-12-07",
      date_to: "2024-12-08",
      time_off_type: "Holiday",
      status: "Rejected",
      reason: "Festival",
      action: "",
    },
    {
      date_from: "2024-12-09",
      date_to: "2024-12-10",
      time_off_type: "Emergency",
      status: "Approved",
      reason: "Unplanned",
      action: "",
    },
  ];

  return (
    <>
      <TableWithSort columns={columns} rows={rows} dataforicons={statusHistory}/>
    </>
  );
};

export default Timeoffstatus;
