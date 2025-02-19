"use client";
import React, { useState, useEffect } from "react";
import { faSort, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Colors } from "@/app/reusableComponent/styles";
import PaginationComponent from "@/app/reusableComponent/paginationcomponent";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EmployeePreviousProjects from "./employeepreviousprojects";
import SearchIcon from "@mui/icons-material/Search";
import PrintExportColumnCustomize from "@/app/reusableComponent/printexportcolumncustomize";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BasicDatePicker from "@/app/reusableComponent/DatePicker/basicDatePicker";

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
  const [search, setSearch] = useState<string>("");
  const [rowsList, setRows] =
    useState<employeeinformationinterface[]>(salesData);
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
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
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

  console.log("currendtPage", currentPageItems);

  useEffect(() => {
    setRows(salesData);
  }, [salesData]);

  const handleOpen = (detail: any) => {
    setOpen((prev) => !prev);
    setEmpdetail(detail);
  };

  const handleSearch = (query: string) => {
    setSearch(query);

    if (currentPage > 1) {
      setCurrentPage(1);
    }

    if (!query.trim()) {
      setRows(salesData); // Return full list if query is empty
      return;
    }

    const SearchedResult = rowsList.filter((sales: any) =>
      Object.values(sales).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
      )
    );

    setRows(SearchedResult);
  };

  const handleDateFilter = () => {
    const filteredData = rowsList?.filter((list: any) => {
      if (!list.startDate || !list.endDate) return false; // Skip invalid data

      const listStartDate = new Date(list.startDate);
      const listEndDate = new Date(list.endDate);
      const filterStartDate = startDate ? new Date(startDate) : null;
      const filterEndDate = endDate ? new Date(endDate) : null;

      // Normalize dates to remove time component
      listStartDate.setHours(0, 0, 0, 0);
      listEndDate.setHours(0, 0, 0, 0);
      if (filterStartDate) filterStartDate.setHours(0, 0, 0, 0);
      if (filterEndDate) filterEndDate.setHours(23, 59, 59, 999); // Include full day for end date

      console.log("List Start:", listStartDate, "List End:", listEndDate);
      console.log(
        "Filter Start:",
        filterStartDate,
        "Filter End:",
        filterEndDate
      );

      if (filterStartDate && filterEndDate) {
        return listStartDate >= filterStartDate && listEndDate <= filterEndDate;
      } else if (filterStartDate) {
        return listStartDate.getTime() === filterStartDate.getTime(); // Exact match for startDate
      } else if (filterEndDate) {
        return listEndDate.getTime() === filterEndDate.getTime(); // Exact match for endDate
      }

      return true; // If both are null, return all data
    });

    console.log("Filtered266:", filteredData);
    setRows(filteredData);
  };

  useEffect(() => {
    if (endDate !== null) {
      handleDateFilter();
    }
  }, [endDate]);

  console.log('rowslistsfds++',rowsList);
  
  return (
    <div>
      <div className="col-12 px-0 mb-3">
        <div className="d-flex justify-content-between align-items-center gap-3 mb-0 align-items-center">
          <div className="d-flex gap-2 align-items-center">
            <div className="d-flex gap-2 searchbar ps-2  align-items-center">
              <div className="mt-1">
                <SearchIcon />
              </div>

              <input
                type="text"
                placeholder="Search..."
                className="p-2 "
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div
              className="rounded-circle cursorpointer"
              style={{ border: `1px solid ${useColors.themeRed}` }}
            >
              <BookmarkAddOutlinedIcon
                className="m-1"
                sx={{ color: useColors.themeRed }}
              />
            </div>
          </div>

          <div
            className="d-flex gap-3 justify-content-between"
            style={{ width: "20%" }}
          >
            <div className="d-flex gap-5">
              <BasicDatePicker
                startDate={(data: any) => setStartDate(data)}
                endDate={(data: any) => setEndDate(data)}
              />
            </div>

            <PrintExportColumnCustomize
              headers={headers}
              rowList={rowsList}
              hiddenDatas={(data: any) => setHiddenColumns(data)}
            />
          </div>
        </div>
      </div>
      <div className="stickyheader" style={{ overflowX: "auto" }}>
        <table className="table mb-0 tabletype">
          <thead style={{ backgroundColor: "#F6F7FB" }}>
            <tr>
              {Object.keys(headers).map((header) => {
                console.log("header", header);

                const key: any = headers[header as keyof typeof headers]; // Get the actual column key
                if (hiddenColumns.includes(key)) return null; // Hide column
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
                {!hiddenColumns.includes("empId") && (
                  <td className="para textheader py-3">{item?.empId}</td>
                )}
                {!hiddenColumns.includes("empName") && (
                  <td className="para textheader py-3">{item?.empName}</td>
                )}
                {!hiddenColumns.includes("mobile") && (
                  <td className="para textheader py-3">
                    {item?.mobile + " " + item?.emailId}
                  </td>
                )}
                {!hiddenColumns.includes("skillset") && (
                  <td className="para textheader py-3">{item?.skillset}</td>
                )}
                {!hiddenColumns.includes("projName") && (
                  <td className="para textheader py-3">{item?.projName}</td>
                )}
                {!hiddenColumns.includes("clientName") && (
                  <td className="para textheader py-3">{item?.clientName}</td>
                )}

                {!hiddenColumns.includes("startDate") && (
                  <td className="para textheader py-3">{item?.startDate}</td>
                )}
                {!hiddenColumns.includes("endDate") && (
                  <td className="para textheader py-3">{item?.endDate}</td>
                )}
                {!hiddenColumns.includes("fpo_Rate") && (
                  <td className="para textheader py-3">{item?.fpo_Rate}</td>
                )}
                {!hiddenColumns.includes("poType") && (
                  <td className="para textheader py-3">{item?.poType}</td>
                )}
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
