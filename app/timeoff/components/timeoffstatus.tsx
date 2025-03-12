import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import NorthSharpIcon from "@mui/icons-material/NorthSharp";
import Deleteconfirmationpopup from "@/app/reusableComponent/popup/deleteconfirmationpopup";
import { CenterPopup } from "@/app/reusableComponent/popup/centerPopup";
import ClickableChips from "@/app/reusableComponent/chips";

interface RowData {
  id: number;
  first: string;
  last: string;
  status: string;
}

const Timeoffstatus = ({ statusHistory }: any) => {
  const [showdetails, setDetails] = useState(false);
  const [confirmDelete, setDelete] = useState(false);

  // Define the type for a row
  type Row = {
    date_from: string;
    date_to: string;
    time_off_type: string;
    status: string;
    reason: string;
    action: string;
  };

  // Define the initial state of rows
  const [rows, setRows] = useState<Row[]>([
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
  ]);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Row;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof Row) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedRows = [...rows].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setRows(sortedRows);
  };

  return (
    <>
      <table className="table mb-0 tabletype">
        <thead style={{ backgroundColor: "#F6F7FB" }}>
          <tr>
            <th className="textheader para" scope="col">
              Date From{" "}
              <span>
                <NorthSharpIcon
                  fontSize="small"
                  className="inline-block"
                  sx={{
                    fill: "#CCC",
                    height: "15px",
                    width: "15px",
                    transform:
                      sortConfig?.direction === "asc"
                        ? "rotate(0deg)"
                        : sortConfig?.direction === "desc"
                        ? "rotate(180deg)"
                        : "rotate(0deg)",

                    transition: "transform 0.3s ease",
                  }}
                  onClick={() => handleSort("date_from")}
                />
              </span>
            </th>
            <th className="textheader para" scope="col">
              {" "}
              Date To
              <NorthSharpIcon
                fontSize="small"
                className="inline-block"
                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                onClick={() => handleSort("date_to")}
              />
            </th>
            <th className="textheader para" scope="col">
              Time off Type
              <NorthSharpIcon
                fontSize="small"
                className="inline-block"
                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                onClick={() => handleSort("time_off_type")}
              />
            </th>
            <th className="textheader para" scope="col">
              Status
              <NorthSharpIcon
                fontSize="small"
                className="inline-block"
                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                onClick={() => handleSort("status")}
              />
            </th>
            <th className="textheader para" scope="col">
              Reason
              <NorthSharpIcon
                fontSize="small"
                className="inline-block"
                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                onClick={() => handleSort("reason")}
              />
            </th>
            <th className="textheader para" scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="dashboardcard">
          {rows.map((item, index) => (
            <tr key={index}>
              <td className="para textheader ">{item.date_from}</td>
              <td className="para textheader" style={{ whiteSpace: "nowrap" }}>
                {item.date_to}
              </td>
              <td className="para textheader">{item.time_off_type}</td>
              <td className="para textheader">
                <ClickableChips label={item.status} />
              </td>
              <td className="para textheader">{item.reason}</td>
              <td className="para textheader">
                {statusHistory === "Status" ? (
                  <div className="flex gap-3">
                    <RemoveRedEyeIcon
                      sx={{ color: "#8A8D93" }}
                      onClick={() => setDetails(true)}
                    />
                     <HighlightOffIcon
                      sx={{ color: "#FF4C51" }}
                      onClick={() => setDelete(true)}
                    />
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <RemoveRedEyeIcon
                      sx={{ color: "#8A8D93" }}
                      onClick={() => setDetails(true)}
                    />
                   
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showdetails && (
        <CenterPopup show={showdetails} close={() => setDetails(false)} />
      )}
      {confirmDelete && (
        <Deleteconfirmationpopup
          show={confirmDelete}
          close={() => setDelete(false)}
        />
      )}
    </>
  );
};

export default Timeoffstatus;
