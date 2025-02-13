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

  // Filtering state
  const [filterKey, setFilterKey] = useState<keyof (typeof salesData)[0] | "">(
    ""
  );
  const [filterOperator, setFilterOperator] = useState<"equal" | "notEqual">(
    "equal"
  );
  const [filterValue, setFilterValue] = useState("");
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(
    null
  );
  const [pages, setPages] = useState([]);

  const [filterYear, setFilterYear] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterDay, setFilterDay] = useState("");
  const [countPerPage, setCountForPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = salesData?.length;
  const totalPages = Math.ceil(totalCount / countPerPage);
  const [open, setOpen] = useState(false);
  const [empdetail, setEmpdetail] = useState(null);

  const tableRef = useRef<HTMLTableElement>(null);

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

  // Function to toggle the filter box and set its position
  const handleFilterToggle = (key: any, event: React.MouseEvent) => {
    if (activeFilterColumn === key) {
      setActiveFilterColumn(null); // Close the filter box if the same column is clicked again
    } else {
      setFilterKey(key); // Set current filter column

      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect(); // Get position of the clicked filter icon
      const thElement = target.closest("th"); // Get the header cell
      const tableElement = thElement?.closest("table"); // Find the table

      if (thElement && tableElement) {
        const thRect = thElement.getBoundingClientRect();
        const tableRect = tableElement.getBoundingClientRect();

        // Get the first letter position
        const textNode = thElement.firstChild;
        let leftPosition = thRect.left;

        if (textNode) {
          const range = document.createRange();
          range.setStart(textNode, 0);
          range.setEnd(textNode, 1); // Select first letter
          const textRect = range.getBoundingClientRect();
          leftPosition = textRect.left;
        }

        // Ensure the filter box stays inside the table
        const filterBoxWidth = 200; // Adjust based on your filter box width
        if (leftPosition + filterBoxWidth > tableRect.right) {
          leftPosition = tableRect.right - filterBoxWidth - 10; // Adjust to fit inside
        }
      }
      setActiveFilterColumn(key);
    }
  };

  // Filtering function
  const handleFilter = () => {
    if (!filterKey) return;

    const keyMappings = {
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

    const filteredData = salesData.filter((item: any) => {
      const itemValue = item[filterKey]; // Get the field value

      // Skip null or undefined values
      if (itemValue == null) return false;

      if (filterKey === "startDate" || filterKey === "endDate") {
        const dateStr = itemValue?.toString(); // Convert to string
        if (!dateStr || !dateStr.includes("-")) return false; // Ensure valid date format

        const [year, month, day] = dateStr.split("-");

        const matchesYear = filterYear ? year === filterYear : true;
        const matchesMonth = filterMonth ? month === filterMonth : true;
        const matchesDay = filterDay ? day === filterDay : true;

        return matchesYear && matchesMonth && matchesDay;
      } else {
        const itemValueStr = String(itemValue).trim().toLowerCase();
        const searchValue = filterValue.trim().toLowerCase();

        if (!searchValue) return true; // If search is empty, match all

        return filterOperator === "equal"
          ? itemValueStr === searchValue
          : itemValueStr !== searchValue;
      }
    });

    setRows(filteredData); // Update the filtered rows
    setActiveFilterColumn(null);
  };

  // Clear filter
  const handleClear = () => {
    setFilterKey("");
    setFilterOperator("equal");
    setFilterValue("");
    setActiveFilterColumn(null);
  };

  const currentPageItems = rowsList?.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setRows(salesData);
  }, [salesData]);

  const handleOpen = (detail: any) => {
    setOpen((prev) => !prev);
    setEmpdetail(detail);
  };
  console.log("empdetails", empdetail);

  return (
    <div>
      <div className="" style={{ overflowX: "auto" }}>
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
                      <div style={{ position: "relative" }}>
                        <FontAwesomeIcon
                          icon={faFilter}
                          style={{ cursor: "pointer", height: "10px" }}
                          onClick={(event) => handleFilterToggle(key, event)}
                        />
                        {activeFilterColumn === key && (
                          <div
                            className="card card-body"
                            style={{
                              width: "18em",
                              position: "absolute",
                              top: "0%",
                              zIndex: 1000,
                              backgroundColor: "white",
                              border: "1px solid #ddd",
                              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            <div className="d-flex flex-column p-2 gap-2">
                              {filterKey === "startDate" ? (
                                <>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={filterYear}
                                    onChange={(e) =>
                                      setFilterYear(e.target.value)
                                    }
                                    placeholder="Enter Year (YYYY)"
                                  />
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={filterMonth}
                                    onChange={(e) =>
                                      setFilterMonth(e.target.value)
                                    }
                                    placeholder="Enter Month (MM)"
                                  />
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={filterDay}
                                    onChange={(e) =>
                                      setFilterDay(e.target.value)
                                    }
                                    placeholder="Enter Day (DD)"
                                  />
                                </>
                              ) : (
                                <>
                                  <select
                                    className="form-control selectborder"
                                    value={filterOperator}
                                    onChange={(e) =>
                                      setFilterOperator(
                                        e.target.value as "equal" | "notEqual"
                                      )
                                    }
                                  >
                                    <option value="equal">Equal</option>
                                    <option value="notEqual">
                                      Not Equal To
                                    </option>
                                  </select>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={filterValue}
                                    onChange={(e) =>
                                      setFilterValue(e.target.value)
                                    }
                                    placeholder={`Enter ${header} value`}
                                  />
                                </>
                              )}
                            </div>

                            <div className="d-flex gap-2 justify-content-end mt-2">
                              <button
                                className="btn btn-primary"
                                onClick={handleFilter}
                              >
                                Filter
                              </button>
                              <button
                                className="btn btn-secondary"
                                onClick={handleClear}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
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
                <td className="para textheader">{item?.skillset}</td>
                <td className="para textheader">{item?.projName}</td>
                <td className="para textheader">{item?.clientName}</td>

                <td className="para textheader py-3">{item?.startDate}</td>
                <td className="para textheader py-3">{item?.endDate}</td>
                <td className="para textheader py-3">{item?.fpo_Rate}</td>
                <td className="para textheader py-3">{item?.poType}</td>
                <td className="para textheader">
                  <RemoveRedEyeOutlinedIcon
                    onClick={() => handleOpen(item)}
                    className="cursorpointer"
                    titleAccess="View History"
                    sx={{ color: "#8c57ff" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationComponent
          currentPage={currentPage}
          currentPageFunction={handlePageChange}
          totalPages={totalPages}
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
