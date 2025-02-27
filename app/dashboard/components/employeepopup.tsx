"use Client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchIcon from "@mui/icons-material/Search";
import {
  workforceReports,
  w2sReports,
  w2hReports,
  c2cReports,
} from "@/app/reusableComponent/JsonData";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import NorthSharpIcon from "@mui/icons-material/NorthSharp";
import { Chip } from "@mui/material";
import Employreportdetails from "./reportscomponent/emplyoyeesdetailreportpopup";
import { SearchLogic } from "@/app/reusableComponent/commonlogic";
import ClickableChips from "@/app/reusableComponent/chips";

export default function EmployeePopup({ show, close }: any) {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [workforceDetails, setWorkforceDetails] =
    useState<any>(workforceReports);
  const [w2SDetails, setW2SDetails] = useState<any>(w2sReports);
  const [w2HDetails, setw2hDetails] = useState<any>(w2hReports);
  const [c2cDetails, setc2cDetails] = useState<any>(c2cReports);
  const [open, setOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof any;
    direction: "asc" | "desc";
  } | null>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    if (value === 0) {
      const res = SearchLogic(workforceReports, query);

      setWorkforceDetails(res);
    } else if (value === 1) {
      const res = SearchLogic(w2sReports, query);
      setW2SDetails(res);
    } else if (value === 2) {
      const res = SearchLogic(w2hReports, query);
      setw2hDetails(res);
    } else {
      const res = SearchLogic(c2cReports, query);
      setc2cDetails(res);
    }
  };

  const handleSort = (key: keyof any) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    if (value === 0) {
      const sortedRows = [...workforceDetails].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setWorkforceDetails(sortedRows);
    } else if (value === 1) {
      const sortedRows = [...w2SDetails].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setW2SDetails(sortedRows);
    } else if (value === 2) {
      const sortedRows = [...w2HDetails].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setw2hDetails(sortedRows);
    } else if (value === 3) {
      const sortedRows = [...c2cDetails].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setc2cDetails(sortedRows);
    }
  };

  return (
    <section
      className={`showpopup ${show ? "showpopupactive" : ""}`}
      onClick={close}
    >
      {open && <Employreportdetails show={open} close={() => setOpen(false)} />}
      <div
        className="summarysection rounded m-auto"
        style={{ width: "90%", height: "95%", background: "#F5F5F5" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-end">
              <FontAwesomeIcon
                className="my-2 textheader"
                style={{ cursor: "pointer" }}
                icon={faXmark}
                onClick={close}
              />
            </div>
          </div>

          <div className="row mt-3 px-sm-5 ">
            {/* Tab Section */}
            <div className="col-12 col-md-8 col-lg-8 col-xxl-10 ">
              <Tabs
                onChange={handleChange}
                value={value}
                aria-label="Tabs where each tab needs to be selected manually"
              >
                <Tab label="Total Employee" className="text-capitalize" />
                <Tab label="W2S" className="text-capitalize" />
                <Tab label="W2H" className="text-capitalize" />
                <Tab label="C2C" className="text-capitalize" />
              </Tabs>
            </div>
            {/* Search Section */}
            <div className="col-12 col-md-4 col-lg-4 col-xxl-2 ">
              <div className="d-flex gap-2 searchbar ps-2  align-items-center">
                <div className="mt-1">
                  <SearchIcon />
                </div>

                <input
                  type="text"
                  placeholder="Search..."
                  className="p-2 "
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </div>
            {/* Table Section */}
            {value === 0 && (
              <div className="" style={{ height: "80vh", overflow: "auto" }}>
                <table className="table mb-0 tabletype">
                  <thead style={{ backgroundColor: "#F6F7FB" }}>
                    <tr>
                      <th className="textheader para" scope="col">
                        Employee Id
                        <span>
                          <NorthSharpIcon
                            fontSize="small"
                            className="inline-block"
                            sx={{
                              fill: "#CCC",
                              height: "15px",
                              width: "15px",
                              transform:
                                sortConfig?.direction === "asc"
                                  ? "rotate(0deg)"
                                  : sortConfig?.direction === "desc"
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",

                              transition: "transform 0.3s ease",
                            }}
                            onClick={() => handleSort("employeeId")}
                          />
                        </span>
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Employee Name
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("employeename")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Department
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("department")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Mobile
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("mobile")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Email Address
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("emailaddress")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Hiring Type
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("hiringtype")}
                        />
                      </th>

                      <th className="textheader para" scope="col">
                        Status
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("status")}
                        />
                      </th>
                      <th className="textheader para" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {workforceDetails?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="para textheader ">{item?.employeeId}</td>
                        <td
                          className="para textheader"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item?.employeename}
                        </td>
                        <td className="para textheader">{item?.department}</td>

                        <td className="para textheader">{item?.mobile}</td>
                        <td className="para textheader">
                          {item?.emailaddress}
                        </td>

                        <td className="para textheader">{item?.hiringtype}</td>

                        <td className="para textheader">
                          <Chip
                            label={
                              item?.status === "available"
                                ? "Active"
                                : "Inactive"
                            }
                            sx={{
                              color:
                                item?.status === "available"
                                  ? "#14E002"
                                  : "#FF4C51",
                              background:
                                item?.status === "available"
                                  ? "rgba(86, 202, 0, 0.16)"
                                  : "#F7DADB",
                            }}
                          />
                        </td>

                        <td className="para textheader">
                          <div className="flex cursorpointer gap-3">
                            <RemoveRedEyeIcon
                              sx={{ color: "#8A8D93" }}
                              onClick={() => setOpen((prev) => !prev)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Hiring Table Section */}
            {value === 1 && (
              <div className="" style={{ height: "80vh", overflow: "auto" }}>
                <table className="table mb-0 tabletype">
                  <thead style={{ backgroundColor: "#F6F7FB" }}>
                    <tr>
                      <th className="textheader para" scope="col">
                        Employee Id
                        <span>
                          <NorthSharpIcon
                            fontSize="small"
                            className="inline-block"
                            sx={{
                              fill: "#CCC",
                              height: "15px",
                              width: "15px",
                              transform:
                                sortConfig?.direction === "asc"
                                  ? "rotate(0deg)"
                                  : sortConfig?.direction === "desc"
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",

                              transition: "transform 0.3s ease",
                            }}
                            onClick={() => handleSort("employeeId")}
                          />
                        </span>
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Employee Name
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("employeename")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Department
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("department")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Mobile
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("mobile")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Email Address
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("emailaddress")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Hiring Type
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("hiringtype")}
                        />
                      </th>

                      <th className="textheader para" scope="col">
                        Status
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("status")}
                        />
                      </th>
                      <th className="textheader para" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {w2SDetails?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="para textheader ">{item?.employeeId}</td>
                        <td
                          className="para textheader"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item?.employeename}
                        </td>
                        <td className="para textheader">{item?.department}</td>

                        <td className="para textheader">{item?.mobile}</td>
                        <td className="para textheader">
                          {item?.emailaddress}
                        </td>

                        <td className="para textheader">{item?.hiringtype}</td>

                        <td className="para textheader">
                          <Chip
                            label={
                              item?.status === "available"
                                ? "Active"
                                : "Inactive"
                            }
                            sx={{
                              color:
                                item?.status === "available"
                                  ? "#14E002"
                                  : "#FF4C51",
                              background:
                                item?.status === "available"
                                  ? "rgba(86, 202, 0, 0.16)"
                                  : "#F7DADB",
                            }}
                          />
                        </td>

                        <td className="para textheader">
                          <div className="flex cursorpointer gap-3">
                            <RemoveRedEyeIcon
                              sx={{ color: "#8A8D93" }}
                              onClick={() => setOpen((prev) => !prev)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Onboarding Table Section */}
            {value === 2 && (
              <div className="" style={{ height: "80vh", overflow: "auto" }}>
                <table className="table mb-0 tabletype">
                  <thead style={{ backgroundColor: "#F6F7FB" }}>
                    <tr>
                      <th className="textheader para" scope="col">
                        Employee Id
                        <span>
                          <NorthSharpIcon
                            fontSize="small"
                            className="inline-block"
                            sx={{
                              fill: "#CCC",
                              height: "15px",
                              width: "15px",
                              transform:
                                sortConfig?.direction === "asc"
                                  ? "rotate(0deg)"
                                  : sortConfig?.direction === "desc"
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",

                              transition: "transform 0.3s ease",
                            }}
                            onClick={() => handleSort("employeeId")}
                          />
                        </span>
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Employee Name
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("employeename")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Department
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("department")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Mobile
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("mobile")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Email Address
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("emailaddress")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Hiring Type
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("hiringtype")}
                        />
                      </th>

                      <th className="textheader para" scope="col">
                        Status
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("status")}
                        />
                      </th>
                      <th className="textheader para" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {w2HDetails?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="para textheader ">{item?.employeeId}</td>
                        <td
                          className="para textheader"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item?.employeename}
                        </td>
                        <td className="para textheader">{item?.department}</td>

                        <td className="para textheader">{item?.mobile}</td>
                        <td className="para textheader">
                          {item?.emailaddress}
                        </td>

                        <td className="para textheader">{item?.hiringtype}</td>

                        <td className="para textheader">
                          <Chip
                            label={
                              item?.status === "available"
                                ? "Active"
                                : "Inactive"
                            }
                            sx={{
                              color:
                                item?.status === "available"
                                  ? "#14E002"
                                  : "#FF4C51",
                              background:
                                item?.status === "available"
                                  ? "rgba(86, 202, 0, 0.16)"
                                  : "#F7DADB",
                            }}
                          />
                        </td>

                        <td className="para textheader">
                          <div className="flex cursorpointer gap-3">
                            <RemoveRedEyeIcon
                              sx={{ color: "#8A8D93" }}
                              onClick={() => setOpen((prev) => !prev)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Supplier Onboarding Table Section */}
            {value === 3 && (
              <div className="" style={{ height: "80vh", overflow: "auto" }}>
                <table className="table mb-0 tabletype">
                  <thead style={{ backgroundColor: "#F6F7FB" }}>
                    <tr>
                      <th className="textheader para" scope="col">
                        Employee Id
                        <span>
                          <NorthSharpIcon
                            fontSize="small"
                            className="inline-block"
                            sx={{
                              fill: "#CCC",
                              height: "15px",
                              width: "15px",
                              transform:
                                sortConfig?.direction === "asc"
                                  ? "rotate(0deg)"
                                  : sortConfig?.direction === "desc"
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",

                              transition: "transform 0.3s ease",
                            }}
                            onClick={() => handleSort("employeeId")}
                          />
                        </span>
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Employee Name
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("employeename")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Department
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("department")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Mobile
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("mobile")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Email Address
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("emailaddress")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Hiring Type
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("hiringtype")}
                        />
                      </th>

                      <th className="textheader para" scope="col">
                        Status
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{
                            fill: "#CCC",
                            height: "15px",
                            width: "15px",
                            transform:
                              sortConfig?.direction === "asc"
                                ? "rotate(0deg)"
                                : sortConfig?.direction === "desc"
                                ? "rotate(180deg)"
                                : "rotate(0deg)",

                            transition: "transform 0.3s ease",
                          }}
                          onClick={() => handleSort("status")}
                        />
                      </th>
                      <th className="textheader para" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {c2cDetails?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="para textheader ">{item?.employeeId}</td>
                        <td
                          className="para textheader"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item?.employeename}
                        </td>
                        <td className="para textheader">{item?.department}</td>

                        <td className="para textheader">{item?.mobile}</td>
                        <td className="para textheader">
                          {item?.emailaddress}
                        </td>

                        <td className="para textheader">{item?.hiringtype}</td>

                        <td className="para textheader">
                          <Chip
                            label={
                              item?.status === "available"
                                ? "Active"
                                : "Inactive"
                            }
                            sx={{
                              color:
                                item?.status === "available"
                                  ? "#14E002"
                                  : "#FF4C51",
                              background:
                                item?.status === "available"
                                  ? "rgba(86, 202, 0, 0.16)"
                                  : "#F7DADB",
                            }}
                          />
                        </td>

                        <td className="para textheader">
                          <div className="flex cursorpointer gap-3">
                            <RemoveRedEyeIcon
                              sx={{ color: "#8A8D93" }}
                              onClick={() => setOpen((prev) => !prev)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
