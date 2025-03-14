import {
  rowsForApprover,
  columnForApprover,
} from "@/app/reusableComponent/JsonData";
import React, { useState, useRef, useEffect } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import favourite from "@/public/assets/img/favourite.svg";
import Paginationcomponent from "@/app/reusableComponent/paginationcomponent";
import { faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  handleCSVExport,
  SearchLogic,
} from "@/app/reusableComponent/commonlogic";
import { Colors } from "@/app/reusableComponent/styles";
import { downloadreportdata } from "@/app/reusableComponent/JsonData";

type Row = {
  id: string;
  projectname: string;
  date: string;
  type: string;
  totaltime: string;
};

function Downloadreport() {
  const [search, setSearch] = useState<string>("");
  const [rowsList, setRows] = useState<any>(downloadreportdata);
  const [currentPage, setCurrentPage] = useState(1);
  const countPerPage = 5;
  const totalPages = Math.ceil(rowsList.length / countPerPage);
  const useColors = Colors();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" | null }>({ key: "", direction: null });
  const [filterKey, setFilterKey] = useState<string>("");
  const [filterOperator, setFilterOperator] = useState<"equal" | "notEqual">("equal");
  const [filterValue, setFilterValue] = useState("");
  const [activeFilterColumn, setActiveFilterColumn] = useState<string | null>(null);
  const currentPageItems = rowsList.slice((currentPage - 1) * countPerPage, currentPage * countPerPage);

  useEffect(() => {}, [totalPages]);

  const handleSort = (key: keyof Row) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    const sortedData = [...rowsList].sort((a, b) => (a[key] < b[key] ? (direction === "asc" ? -1 : 1) : a[key] > b[key] ? (direction === "asc" ? 1 : -1) : 0));
    setSortConfig({ key, direction });
    setRows(sortedData);
  };

  const handleFilterToggle = (key: string, event: React.MouseEvent) => {
    setFilterKey(activeFilterColumn === key ? "" : key);
    setActiveFilterColumn(activeFilterColumn === key ? null : key);
  };

  const handleFilter = () => {
    if (!filterKey) return;
    const filteredData = downloadreportdata.filter((item: any) => {
      const itemValue = String(item[filterKey]).trim().toLowerCase();
      const searchValue = filterValue.trim().toLowerCase();
      return filterOperator === "equal" ? itemValue === searchValue : itemValue !== searchValue;
    });
    setRows(filteredData);
    setActiveFilterColumn(null);
  };

  const handleClear = () => {
    setFilterKey("");
    setFilterOperator("equal");
    setFilterValue("");
    setRows(downloadreportdata);
    setActiveFilterColumn(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setRows(SearchLogic(downloadreportdata, event.target.value));
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="d-flex gap-2 mx-2 align-items-center">
          <div className="card p-2">
            <p className="mb-0">Total hours : <span>08</span></p>
          </div>
          <div className="card p-2">
            <p className="mb-0" style={{ color: "red" }}>Overtime hours : <span>08</span></p>
          </div>
        </div>
        <div className="d-flex gap-5 justify-content-end mx-3">
          <div className="d-flex gap-3 mb-3">
            <Image src={favourite} alt="" width={24} height={24} />
            <div className="d-flex gap-1 w-100 searchbar ps-2 align-items-center">
              <SearchIcon />
              <input type="text" placeholder="Search..." className="p-2 w-100" value={search} onChange={handleSearch} />
            </div>
          </div>
          <button className="outlinebtn rounded px-3 py-1" style={{ color: useColors.themeRed, border: `1px solid ${useColors.themeRed}` }} onClick={() => handleCSVExport(Object.keys(downloadreportdata[0]), downloadreportdata)}>
            Export <SaveAltIcon className="ml-2" />
          </button>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="table mb-0 tabletype">
          <thead style={{ backgroundColor: "#F6F7FB" }}>
            <tr>
              {Object.keys(downloadreportdata[0]).filter((key) => key !== "id").map((key) => (
                <th key={key} className="position-relative textheader para">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                  <FontAwesomeIcon icon={faSort} style={{ cursor: "pointer", height: "10px" }} onClick={() => handleSort(key as keyof Row)} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageItems.map((item: { id: React.Key | null | undefined; projectname: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; date: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; type: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; totaltime: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
              <tr key={item.id}>
                <td>{item.projectname}</td>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>{item.totaltime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Downloadreport;
