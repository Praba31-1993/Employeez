"use client";
import React, { useState, useRef, useEffect } from "react";
import { faFilter, faSort, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Colors } from "@/app/reusableComponent/styles";
import PaginationComponent from "@/app/reusableComponent/paginationcomponent";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EmployeePreviousProjects from "./employeepreviousprojects";

interface employeeinformationinterface {
  empId: string;
  empName: string;
  mobile: string;
  emailId: string;
  skillset: string;
  empType: string;
  salary: number | null;
  poType: string;
  projName: string;
  clientName: string;
  startDate: string;
  endDate: string;
  tnmPORate: number | null;
  tnmPORateType: string | null;
  customerName: string | null;
  hiringModel: string | null;
  hiringDate: string | null;
  fpo_Rate: number | null;
  fpo_RateType: string | null;
}

function EmployeeInformation({ salesData }: any) {
  console.log("salesData", salesData);

  const [rowsList, setRows] = useState<employeeinformationinterface[]>();
  const useColors = Colors();
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = salesData?.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const [open, setOpen] = useState(false);
  const [empdetail, setEmpdetail] = useState(null);

  const headers: Record<string, keyof (typeof salesData)[0]> = {
    "Emp ID": "empId",
    Name: "empName",
    "Contact info": "mobile",
    "Skill set": "skillset",
    "Project name": "projName",
    "Client Name": "clientName",
    "Start date": "startDate",
    "End Date": "endDate",
    "Rate per hrs": "fpo_Rate",
    "PO type": "poType",
  };

  const headersQuery: any = {
    "Emp ID": "empId",
    Name: "empName",
    "Contact info": "mobile",
    "Skill set": "skillset",
    "Project name": "projName",
    "Client Name": "clientName",
    "Start date": "startDate",
    "End Date": "endDate",
    "Rate per hrs": "fpo_Rate",
    "PO type": "poType",
  };

  // Sorting function
  const handleSort = <K extends keyof employeeinformationinterface>(key: K) => {
    let direction: "asc" | "desc" = "asc";

    if (sortConfig?.key === key && sortConfig?.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...salesData].sort((a, b) => {
      const valueA = a[key] ?? ""; // Handle null/undefined values
      const valueB = b[key] ?? "";

      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setRows(sortedData);
  };

  const currentPageItems = rowsList?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  console.log('currendtPage', currentPageItems);
  

  useEffect(() => {
    setRows(salesData);
  }, [salesData]);

  const handleOpen = (detail: any) => {
    setOpen((prev) => !prev);
    setEmpdetail(detail);
  };

  return (
    <div>
      <div className="stickyheader" style={{ overflowX: "auto" }}>
        <table className="table mb-0 tabletype">
          <thead style={{ backgroundColor: "#F6F7FB" }}>
            <tr>
              {Object.keys(headers).map((header) => {
                console.log("header", header);

                const key: any = headers[header as keyof typeof headers]; // Get the actual column key

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
                        onClick={() =>
                          handleSort(key as keyof employeeinformationinterface)
                        }
                      />
                    </span>
                  </th>
                );
              })}
              <th></th>
            </tr>
          </thead>

          <tbody className="dashboardcard">
            {currentPageItems?.map((item: any, index: number) => (
              <tr key={index}>
                <td className="para textheader py-3">{item?.empId}</td>
                <td className="para textheader py-3">{item?.empName}</td>
                <td className="para textheader py-3">
                  {item?.mobile + " " + item?.emailId}
                </td>
                <td className="para textheader py-3">{item?.skillset}</td>
                <td className="para textheader py-3">{item?.projName}</td>
                <td className="para textheader py-3">{item?.clientName}</td>

                <td className="para textheader py-3">{item?.startDate}</td>
                <td className="para textheader py-3">{item?.endDate}</td>
                <td className="para textheader py-3">{item?.fpo_Rate}</td>
                <td className="para textheader py-3">{item?.poType}</td>
                <td className="para textheader">
                  <RemoveRedEyeOutlinedIcon
                    onClick={() => handleOpen(item)}
                    className="cursorpointer"
                    titleAccess="View History"
                    sx={{ color: useColors.themeRed }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    
      </div>
      <div className="">
        <PaginationComponent
          currentPage={currentPage}
          currentPageFunction={setCurrentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
      {open && (
        <section
          className={`showpopup ${open ? "showpopupactive" : ""}`}
          onClick={() => setOpen(false)}
        >
          <div className="summarysection" onClick={(e) => e.stopPropagation()}>
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 text-end">
                  <FontAwesomeIcon
                    className="my-2 textheader"
                    style={{ cursor: "pointer" }}
                    icon={faXmark}
                    onClick={() => setOpen(false)}
                  />
                </div>
              </div>
              <div className="mt-3 px-sm-5 ">
                <EmployeePreviousProjects detail={empdetail} />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default EmployeeInformation;
