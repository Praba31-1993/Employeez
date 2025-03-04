import { columnForApprover } from "@/app/reusableComponent/JsonData";
import React, { useState, useRef, useEffect } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SearchIcon from "@mui/icons-material/Search";
import Paginationcomponent from "@/app/reusableComponent/paginationcomponent";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { SearchLogic } from "@/app/reusableComponent/commonlogic";
import { Colors } from "../../reusableComponent/styles";
import { employeeDetails } from "@/app/reusableComponent/JsonData";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClickableChips from "@/app/reusableComponent/chips";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

interface DocumentViewInterface {
  employeeId: string;
  documentname: string;
  filename: string;
  status: string;
  download: any;
  upload: any;
  attachment: any;
}

function ViewEmployeeDocument({ employeeId }: any) {
  const [search, setSearch] = useState<string>("");
  const [searchList, setSearchList] = useState<any>(columnForApprover);
  const [rowsList, setRows] =
    useState<DocumentViewInterface[]>(employeeDetails);
  const [pages, setPages] = useState([]);
  const [countPerPage, setCountForPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = rowsList.length;
  const totalPages = Math.ceil(totalCount / countPerPage);
  const [data, setData] = useState(searchList);
  const [open, setOpen] = useState(false);
  const [popupList, setPopupList] = useState<any>();

  const useColors = Colors();

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });

  // Filtering state
  const [filterKey, setFilterKey] = useState<
    keyof (typeof currentPageItems)[0] | ""
  >("");
  const [filterOperator, setFilterOperator] = useState<"equal" | "notEqual">(
    "equal"
  );
  const [filterValue, setFilterValue] = useState("");
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(
    null
  );

  useEffect(() => {
    const arr: any = [];
    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [totalPages]);

  const currentPageItems = rowsList.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  );

  const headers = Object.keys(employeeDetails?.[0] || {}).filter(
    (key) => key !== "id"
  );

  // Sorting function
  const handleSort = (key: keyof DocumentViewInterface) => {
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
    setRows(sortedData); // Set sorted rows in `rowsList`
  };

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

  const handleFilter = () => {
    if (!filterKey || employeeDetails?.length === 0) return;

    const filteredData = employeeDetails.filter((item) => {
      const itemValue = String(item[filterKey]).trim().toLowerCase();
      const searchValue = filterValue.trim().toLowerCase();

      return filterOperator === "equal"
        ? itemValue === searchValue
        : itemValue !== searchValue;
    });

    setRows(filteredData); // Set filtered data in `rowsList`
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    const res = SearchLogic(employeeDetails, query);
    setRows(res);
  };

  const handleOpen = (id: any) => {
    if (rowsList.length > 0) {
      const filteredList = rowsList?.filter(
        (list: any) => list?.projectId === id
      );
      setPopupList(filteredList);
      setOpen(true);
    } else {
      setPopupList([]);
      setOpen(false);
    }
  };

  return (
    <div>
      {/* column, filter */}

      <div className="d-flex gap-5 justify-content-end  mx-3 ">
        <div className="d-flex gap-3 mb-3">
          <div className="d-flex gap-1 w-100 searchbar ps-2 align-items-center">
            <div className="mt-1">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="p-2 w-100"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="" style={{ overflowX: "auto" }}>
        <table className="table mb-0 tabletype">
          <thead style={{ backgroundColor: "#F6F7FB" }}>
            <tr>
              {headers?.map((key) => (
                <th
                  key={key}
                  scope="col"
                  className="position-relative textheader para"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <span className="d-inline-flex align-items-center gap-2 ms-2">
                    <FontAwesomeIcon
                      icon={faSort}
                      style={{ cursor: "pointer", height: "10px" }}
                      onClick={() =>
                        handleSort(key as keyof (typeof currentPageItems)[0])
                      }
                    />
                    <div className="" style={{ position: "relative" }}>
                      <FontAwesomeIcon
                        icon={faFilter}
                        style={{ cursor: "pointer", height: "10px" }}
                        onClick={(event: any) =>
                          handleFilterToggle(
                            key as keyof (typeof currentPageItems)[0],
                            event
                          )
                        }
                      />
                      {activeFilterColumn === key && ( // Ensure only the clicked column shows filter box
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
                                <option value="notEqual">Not Equal To</option>
                              </select>
                              <input
                                type="text"
                                className="form-control"
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                placeholder={`Enter ${activeFilterColumn} value`}
                              />
                            </>
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
              ))}
            </tr>
          </thead>
          <tbody className={employeeDetails.length > 0 ? "dashboardcard" : ""}>
            {currentPageItems.length > 0 ? (
              currentPageItems?.map((item, index) => (
                <tr key={index}>
                  <td className="para textheader">{item?.employeeId}</td>

                  <td className="para textheader">{item?.documentname}</td>

                  <td className="para textheader">{item?.filename}</td>

                  <td className="para textheader">
                    <ClickableChips
                      label={
                        item?.status.charAt(0).toUpperCase() +
                        item?.status.slice(1)
                      }
                    />
                  </td>
                  <td>
                    <div className="para textheader d-flex gap-2 align-items-center mt-1">
                      <InsertDriveFileOutlinedIcon
                        className="mt-0"
                        style={{ width: "15px" }}
                      />
                      <p className="mb-0">{item?.download}</p>
                      <SaveAltIcon className="mt-0" style={{ width: "15px" }} />
                    </div>
                  </td>
                  <td className="para textheader">{item?.upload}</td>
                  <td className="para textheader">
                    <div className="d-flex gap-4">
                      <RemoveRedEyeIcon
                        sx={{ color: "#8A8D93" }}
                        onClick={() => handleOpen(item?.attachment)}
                      />
                      <EditOutlinedIcon sx={{ color: "#8A8D93" }} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <td className="text-center">No Record Found</td>
            )}
          </tbody>
        </table>
      </div>
      {/* table ends */}
      {/* <Paginationcomponent
        currentPage={currentPage}
        currentPageFunction={handlePageChange}
        totalPages={totalPages}
      /> */}
    </div>
  );
}

export default ViewEmployeeDocument;
