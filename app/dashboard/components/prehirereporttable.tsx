import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import NorthSharpIcon from "@mui/icons-material/NorthSharp";
import { Chip } from "@mui/material";

interface RowData {
  id: number;
  first: string;
  last: string;
  status: string;
}

const PrehireReportTable = ({ preHireList, setShowDetails }: any) => {
  const [showdetails, setDetails] = useState(false);
  const [confirmDelete, setDelete] = useState(false);

  // Define the initial state of rows
  const [rows, setRows] = useState<any>(preHireList);

  const [sortConfig, setSortConfig] = useState<{
    key: keyof any;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof any) => {
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
              Employee Id
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
                  onClick={() => handleSort("empId")}
                />
              </span>
            </th>
            <th className="textheader para" scope="col">
              {" "}
              Employee Name
              <NorthSharpIcon
                fontSize="small"
                className="inline-block"
                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                onClick={() => handleSort("employeename")}
              />
            </th>
            <th className="textheader para" scope="col">
              Mobile
              <NorthSharpIcon
                fontSize="small"
                className="inline-block"
                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                onClick={() => handleSort("mobile")}
              />
            </th>
            <th className="textheader para" scope="col">
              Email Address
              <NorthSharpIcon
                fontSize="small"
                className="inline-block"
                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                onClick={() => handleSort("emailaddress")}
              />
            </th>
            <th className="textheader para" scope="col">
              Agreement Status
              <NorthSharpIcon
                fontSize="small"
                className="inline-block"
                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                onClick={() => handleSort("agreementstatus")}
              />
            </th>
            <th className="textheader para" scope="col">
              Onboarding Status
              <NorthSharpIcon
                fontSize="small"
                className="inline-block"
                sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                onClick={() => handleSort("onboardingstatus")}
              />
            </th>
            <th className="textheader para" scope="col"></th>
          </tr>
        </thead>
        <tbody className="dashboardcard">
          {rows?.map((item: any, index: number) => (
            <tr key={index}>
              <td className="para textheader ">{item?.empId}</td>
              <td className="para textheader" style={{ whiteSpace: "nowrap" }}>
                {item?.employeename}
              </td>
              <td className="para textheader">{item?.mobile}</td>
              <td className="para textheader">{item?.emailaddress}</td>

              <td className="para textheader">
                <Chip
                  label={
                    item?.agreementstatus
                      ? item?.agreementstatus.charAt(0).toUpperCase() +
                        item?.agreementstatus.slice(1)
                      : ""
                  }
                  sx={{
                    color:
                      item?.agreementstatus === "active"
                        ? "#14E002"
                        : "#FF4C51",
                    background:
                      item?.agreementstatus === "active"
                        ? "rgba(86, 202, 0, 0.16)"
                        : "#F7DADB",
                  }}
                />
              </td>
              <td className="para textheader">
                <Chip
                  label={
                    item?.onboardingstatus
                      ? item?.onboardingstatus.charAt(0).toUpperCase() +
                        item?.onboardingstatus.slice(1)
                      : ""
                  }
                  sx={{
                    color:
                      item?.onboardingstatus === "active"
                        ? "#14E002"
                        : "#FF4C51",
                    background:
                      item?.onboardingstatus === "active"
                        ? "rgba(86, 202, 0, 0.16)"
                        : "#F7DADB",
                  }}
                />
              </td>

              <td className="para textheader">
                <div className="flex gap-3">
                  <RemoveRedEyeIcon
                    sx={{ color: "#8A8D93" }}
                    onClick={setShowDetails()}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {showdetails && (
        <CenterPopup show={showdetails} close={() => setDetails(false)} />
      )}
      {confirmDelete && (
        <Deleteconfirmationpopup
          show={confirmDelete}
          close={() => setDelete(false)}
        />
      )} */}
    </>
  );
};

export default PrehireReportTable;
