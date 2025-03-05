import React, { useState } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import Paginationcomponent from "@/app/reusableComponent/paginationcomponent";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {
  handleCSVExport,
  SearchLogic,
} from "@/app/reusableComponent/commonlogic";
import { Colors } from "../../reusableComponent/styles";
import { projectHistoryData } from "@/app/reusableComponent/JsonData";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClickableChips from "@/app/reusableComponent/chips";
import ProjectView from "./projectview";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

interface ProjectHistory {
  projectId: string;
  project_name: string;
  start_date: string;
  end_date: string;
  period: string;
  status: string;
  download: string[];
  action: string;
}

function ProjectHistory() {
  const [search, setSearch] = useState<string>("");
  const [rowsList, setRows] = useState<ProjectHistory[]>(projectHistoryData);
  const [countPerPage, setCountForPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = rowsList.length;
  const totalPages = Math.ceil(totalCount / countPerPage);
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

  const currentPageItems = rowsList.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const headers = Object.keys(projectHistoryData?.[0] || {}).filter(
    (key) => key !== "id"
  );

  // Sorting function
  const handleSort = (key: keyof ProjectHistory) => {
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    const res = SearchLogic(projectHistoryData, query);
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
        <ProjectView
          show={open}
          close={() => setOpen(false)}
          projectlist={popupList}
        />
        <div className="d-flex gap-3 mb-3">
          <div
            className="rounded-circle cursorpointer"
            style={{ border: `1px solid ${useColors.themeRed}` }}
          >
            <BookmarkAddOutlinedIcon
              className="m-1"
              sx={{ color: useColors.themeRed }}
            />
          </div>
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
          onClick={() => handleCSVExport(headers, projectHistoryData)}
        >
          Export <SaveAltIcon className="ml-2" />
        </button>
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
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={projectHistoryData.length > 0 ? "dashboardcard" : ""}
          >
            {projectHistoryData.length > 0 ? (
              currentPageItems?.map((item, index) => (
                <tr key={item?.projectId}>
                  <td className="para textheader">{item?.projectId}</td>
                  <td className="para textheader">{item?.project_name}</td>
                  <td
                    className="para textheader"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {item?.start_date}
                  </td>
                  <td
                    className="para textheader"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {item?.end_date}
                  </td>
                  <td
                    className="para textheader"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {item?.period}
                  </td>
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
                      <p className="mb-0">{item?.download?.[0]}</p>
                      <SaveAltIcon className="mt-0" style={{ width: "15px" }} />
                    </div>
                  </td>
                  <td className="para textheader">
                    <div className="d-flex gap-4">
                      <RemoveRedEyeIcon
                        sx={{ color: "#8A8D93" }}
                        onClick={() => handleOpen(item?.projectId)}
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

export default ProjectHistory;
