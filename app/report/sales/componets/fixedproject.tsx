"use client";
import { columnForApprover } from "@/app/reusableComponent/JsonData";
import React, { useState, useRef, useEffect } from "react";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Colors } from "@/app/reusableComponent/styles";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PaginationComponent from "@/app/reusableComponent/paginationcomponent";

interface ContractDetails {
  conName: string;
  conId: string;
  vndName: string;
  finder: string;
  startDate: string;
  endDate: string;
  rate: string;
  margin: string;
  status: string;
  poNumber: string;
  dealCloser: string;
  recruiter: string;
  allowEdit: string;
  cust_PO_Number: string;
  recuId: string;
  inc_Flag: string | null;
  supplierName: string;
}

function FixedProject({ salesData }: any) {
  const [searchList, setSearchList] = useState<any>(columnForApprover);
  const [rowsList, setRows] = useState<ContractDetails[]>(salesData);
  const [data, setData] = useState(searchList);
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

  const tableRef = useRef<HTMLTableElement>(null);

  console.log("sortData+++", salesData);

  useEffect(() => {
    setRows(salesData);
  }, [salesData]);

  const headers: Record<string, keyof (typeof salesData)[0]> = {
    "Employee Name": "conName",
    Company: "vndName",
    "Customer PO Number": "cust_PO_Number",
    "Start Date": "startDate",
    "End Date": "endDate",
    Rate: "rate",
    Margin: "margin",
    Closer: "dealCloser",
    Recruiter: "recruiter",
  };

  const headersQuery: any = {
    "Employee Name": "conName",
    Company: "vndName",
    "Customer PO Number": "cust_PO_Number",
    "Start Date": "startDate",
    "End Date": "endDate",
    Rate: "rate",
    Margin: "margin",
    Closer: "dealCloser",
    Recruiter: "recruiter",
  };

  // Sorting function
  const handleSort = <K extends keyof ContractDetails>(key: K) => {
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

  useEffect(() => {
    const arr: any = [];
    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [totalPages]);

  useEffect(() => {
    setCountForPerPage(5);
  }, []);

  // Function to toggle the filter box and set its position
  const handleFilterToggle = (
    key: keyof (typeof searchList)[0] | any,
    event: React.MouseEvent
  ) => {
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
      "Employee Name": "conName",
      Company: "vndName",
      "Customer PO Number": "cust_PO_Number",
      "Start Date": "startDate",
      "End Date": "endDate",
      Rate: "rate",
      Margin: "margin",
      Closer: "dealCloser",
      Recruiter: "recruiter",
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
    setData(searchList);
    setActiveFilterColumn(null);
  };

  const currentPageItems = salesData?.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setRows(currentPageItems);
  }, []);

  return (
    <div>
      <div className="" style={{ overflowX: "auto" }}>
        <table className="table mb-0 tabletype">
          <thead style={{ backgroundColor: "#F6F7FB" }}>
            <tr>
              <th></th>
              {Object.keys(headers).map((header) => {
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
                        onClick={() => handleSort(key as keyof ContractDetails)}
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
            </tr>
          </thead>

          <tbody className="dashboardcard">
            {rowsList?.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  <ShoppingCartRoundedIcon sx={{ color: "#8A94FF" }} />
                </td>
                <td className="para textheader py-3">{item?.conName}</td>
                <td className="para textheader py-3">{item?.vndName}</td>
                <td
                  className="para textheader"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item?.cust_PO_Number}
                </td>
                <td className="para textheader py-3">
                  {/* <ChipsForLeave label={item?.status} /> */}
                  {item?.startDate}
                </td>
                <td className="para textheader py-3">{item?.endDate}</td>
                <td className="para textheader py-3">{item?.rate}</td>
                <td className="para textheader py-3">{item?.margin}</td>
                <td className="para textheader py-3">{item?.dealCloser}</td>
                <td className="para textheader py-3">{item?.recruiter}</td>
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
    </div>
  );
}

export default FixedProject;
