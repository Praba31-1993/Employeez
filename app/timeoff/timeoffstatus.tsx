import React, { useState } from "react";
import TableWithSort from "../reusableComponent/table/tablewithSort";

interface RowData {
  id: number;
  first: string;
  last: string;
  status: string;
}

const Timeoffstatus = ({ statusHistory }: any) => {
  const columns = [
    { id: 1, key: "date_from", label: "Date From", checked: true },
    { id: 2, key: "date_to", label: "Date To", checked: true },
    { id: 3, key: "time_off_type", label: "Time off Type", checked: true },
    { id: 4, key: "status", label: "Status", checked: true },
    { id: 5, key: "reason", label: "Reason", checked: true },
    { id: 6, key: "action", label: "Action", checked: true },
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
      <TableWithSort
        columns={columns}
        rows={rows}
        dataforicons={statusHistory}
      />
    </>
  );
};

export default Timeoffstatus;
