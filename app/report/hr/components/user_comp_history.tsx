import { getCompHistory } from "@/app/reusableComponent/JsonData";
import React, { useState } from "react";
import Image from "next/image";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { handleCSVExport1 } from "@/app/reusableComponent/commonlogic";
import { Colors } from "@/app/reusableComponent/styles";

import user from "@/public/assets/img/Ellipse 14.svg";
import PaginationComponent from "@/app/reusableComponent/paginationcomponent";
import Outlinebutton from "@/app/reusableComponent/outlinebtn";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";

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
    console.log("key,", key);

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
          <div className="">
            <Outlinebutton
              color={useColors.themeRed}
              border={`1px solid ${useColors.themeRed}`}
              text="Export "
              fontSize="12px"
              background={"transparent"}
              icon={<SaveAltOutlinedIcon sx={{ fontSize: "20px" }} />}
              onClick={() => handleCSVExport1(headers, getCompHistory)}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="" style={{ overflowX: "auto" }}>
        <table className="table mb-0 tabletype">
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
                    <span className="d-inline-flex align-items-center gap-2 ms-2">
                      <FontAwesomeIcon
                        icon={faSort}
                        style={{ cursor: "pointer", height: "10px" }}
                        onClick={() => handleSort(key as keyof Row)}
                      />
                    </span>
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
