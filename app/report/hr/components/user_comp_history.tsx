import { getCompHistory } from "@/app/reusableComponent/JsonData";
import React, { useState } from "react";
import Image from "next/image";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { handleCSVExport1, handleExcelExport, handlePrint } from "@/app/reusableComponent/commonlogic";
import { Colors } from "@/app/reusableComponent/styles";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import user from "@/public/assets/img/Ellipse 14.svg";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

type Row = {
  id: number | string;
  request_type: string;
  submitted_date: string;
  approved_by: string;
  status: string;
};
function User_comphistory() {
  const [rowsList, setRows] = useState<any>(getCompHistory);
  const [countPerPage, setCountForPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = rowsList.length;
  const totalPages = Math.ceil(totalCount / countPerPage);
  const useColors = Colors();

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });

  const currentPageItems = rowsList?.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const headers: Record<string, keyof (typeof getCompHistory)[0]> = {
    Component: "component",
    "From Date": "fromDate",
    "End Date": "endDate",
    Amount: "amount",
  };

  // Sorting function
  const handleSort = <K extends keyof Row>(key: K) => {

    let direction: "asc" | "desc" = "asc";

    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...rowsList].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setRows(sortedData);
  };

  return (
    <div>
      {/* column, filter */}

      <div className="col-12">
        <div className="d-flex my-2 pb-2 align-tems-center justify-content-between borderbottom">
          <div className="d-flex align-tems-center">
            <div style={{ width: "40px", height: "40px" }}>
              <Image
                className="w-100 h-100 rounded-circle"
                src={user}
                style={{ objectFit: "cover" }}
                alt={""}
              />
            </div>
            <div className="ms-2">
              <h4 className="heading2 mb-0 textheader">Simi Rajan (SR3894)</h4>
              <h5 className="para mb-0 textheader">Employee</h5>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3 ">
          <LocalPrintshopOutlinedIcon
              className=" textheader cursorpointer "
              onClick={() => handlePrint()}
            />
            <SaveAltIcon
              style={{}}
              className=" textheader cursorpointer "
              onClick={() => handleCSVExport1(headers, getCompHistory)}
            />
            <SettingsOutlinedIcon className=" textheader cursorpointer " />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="" style={{ overflowX: "auto" }}>
        <table id="printSection" className="table mb-0 tabletype">
          <thead style={{ backgroundColor: "#F6F7FB" }}>
            <tr>
              {Object.keys(headers).map((header) => {
                const key = headers[header as keyof typeof headers]; // Get the actual column key

                return (
                  <th
                    key={key}
                    scope="col"
                    className="position-relative textheader para"
                  >
                    {header} {/* Display formatted column name */}
                    <NorthOutlinedIcon
                      className={`textheader cursorpointer ms-1 mb-1 ${
                        sortConfig.key === key && sortConfig.direction === "asc"
                          ? "rotatearrow"
                          : ""
                      }`}
                      sx={{ fontSize: "20px" }}
                      onClick={() => handleSort(key as keyof Row)}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="dashboardcard">
            {currentPageItems?.map((item: any, index: any) => (
              <tr key={index}>
                <td className="para textheader"> {item?.component} </td>
                <td
                  className="para textheader"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item?.fromDate}
                </td>
                <td
                  className="para textheader"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item?.endDate}
                </td>

                <td className="para textheader">$ {item?.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* table ends */}
      {/* <PaginationComponent
        currentPage={currentPage}
        currentPageFunction={handlePageChange}
        totalPages={totalPages}
      /> */}
    </div>
  );
}

export default User_comphistory;
