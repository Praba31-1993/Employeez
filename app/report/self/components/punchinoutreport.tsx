import { columnForApprover } from "@/app/reusableComponent/JsonData";
import React, { useState, useRef, useEffect } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import favourite from "@/public/assets/img/favourite.svg";
import Paginationcomponent from "@/app/reusableComponent/paginationcomponent";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { handleCSVExport, SearchLogic } from "@/app/reusableComponent/commonlogic";

import { punchinandoutreports } from "@/app/reusableComponent/JsonData";
import ChipsForLeave from "@/app/reusableComponent/chipsforleave";
import { Colors } from "@/app/reusableComponent/styles";

interface ApproverRow {
  id: string;
  date: string;
  status: string;
  punchin: string;
  punchout: string;
  duration: string;
  reason: string;
}
function Punchinoutreport() {
  const [search, setSearch] = useState<string>("");
  const [searchList, setSearchList] = useState<any>(columnForApprover);
  const [rowsList, setRows] = useState<ApproverRow[]>(punchinandoutreports);
  const [pages, setPages] = useState([]);
  const [countPerPage, setCountForPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = rowsList.length;
  const totalPages = Math.ceil(totalCount / countPerPage);
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

  const [filterYear, setFilterYear] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterDay, setFilterDay] = useState("");

  const tableRef = useRef<HTMLTableElement>(null);

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

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const headers = Object.keys(punchinandoutreports[0]).filter(
    (key) => key !== "id"
  );


  // Sorting function
  const handleSort = (key: keyof ApproverRow) => {
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

  // Filtering function
  const handleFilter = () => {
    if (!filterKey) return;

    const filteredData = punchinandoutreports.filter((item) => {
      if (filterKey === "date") {
        const [year, month, day] = item.date.split("-");

        const matchesYear = filterYear ? year === filterYear : true;
        const matchesMonth = filterMonth ? month === filterMonth : true;
        const matchesDay = filterDay ? day === filterDay : true;

        return matchesYear && matchesMonth && matchesDay;
      } else {
        const itemValue = String(item[filterKey]).trim().toLowerCase();
        const searchValue = filterValue.trim().toLowerCase();

        return filterOperator === "equal"
          ? itemValue === searchValue
          : itemValue !== searchValue;
      }
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
      const res = SearchLogic(punchinandoutreports, query);
      setRows(res);
    };
  
  return (
    <div>
      {/* column, filter */}

      <div className="d-flex gap-5 justify-content-end  mx-3 ">
        <div className="d-flex gap-3 mb-3">
          <Image src={favourite} alt="" width={24} height={24} />
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

        <button
          className="outlinebtn rounded px-3 py-1"
          style={{
            color: useColors.themeRed,
            border: `1px solid ${useColors.themeRed}`,
            height: "fit-content",
          }}
          onClick={() => handleCSVExport(headers, punchinandoutreports)}
        >
          Export <SaveAltIcon className="ml-2" />
        </button>
      </div>

      {/* Table Section */}
      <div className="" style={{ overflowX: "auto" }}>
        <table className="table mb-0 tabletype">
          <thead style={{ backgroundColor: "#F6F7FB" }}>
            <tr>
              {headers.map((key) => (
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
                            {filterKey === "date" ? (
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
                                  onChange={(e) => setFilterDay(e.target.value)}
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
                                  <option value="notEqual">Not Equal To</option>
                                </select>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={filterValue}
                                  onChange={(e) =>
                                    setFilterValue(e.target.value)
                                  }
                                  placeholder={`Enter ${activeFilterColumn} value`}
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
              ))}
            </tr>
          </thead>
          <tbody className="dashboardcard">
            {currentPageItems?.map((item, index) => (
              <tr key={item.id}>
                <td className="para textheader">{item?.date}</td>
                <td className="para textheader">
                  <ChipsForLeave label={item?.status} />
                </td>
                <td
                  className="para textheader"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {item?.punchin}
                </td>
                <td className="para textheader">{item?.punchout}</td>
                <td className="para textheader">{item?.duration}</td>
                <td className="para textheader">{item?.reason}</td>
              </tr>
            ))}
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

export default Punchinoutreport;
