"use Client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchIcon from "@mui/icons-material/Search";
import {
  preHireReport,
  hiringReport,
  onboardingReport,
  supplieronboardingReport,
} from "@/app/reusableComponent/JsonData";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import NorthSharpIcon from "@mui/icons-material/NorthSharp";
import { Chip } from "@mui/material";
import Employreportdetails from "./emplyoyeesdetailreportpopup";
import { SearchLogic } from "@/app/reusableComponent/commonlogic";
import ClickableChips from "@/app/reusableComponent/chips";

export default function Reportspoup({ show, close }: any) {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [prehireDetails, setPrehiredetails] = useState<any>(preHireReport);
  const [hiringDetails, sethiringdetails] = useState<any>(hiringReport);
  const [onboardingDetails, setOnboardingdetails] =
    useState<any>(onboardingReport);
  const [supplierboardingDetails, setsupplierOnboardingdetails] = useState<any>(
    supplieronboardingReport
  );
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
      const res = SearchLogic(preHireReport, query);

      setPrehiredetails(res);
    } else if (value === 1) {
      const res = SearchLogic(hiringReport, query);
      sethiringdetails(res);
    } else if (value === 2) {
      const res = SearchLogic(onboardingReport, query);
      setOnboardingdetails(res);
    } else {
      const res = SearchLogic(supplieronboardingReport, query);
      setsupplierOnboardingdetails(res);
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

    const sortedRows = [...prehireDetails].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setPrehiredetails(sortedRows);
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
                <Tab label="Prehire" className="text-capitalize" />
                <Tab label="Hiring" className="text-capitalize" />
                <Tab label="Onboarding" className="text-capitalize" />
                <Tab label="Supplier onboarding" className="text-capitalize" />
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
                        Prehire Employee Id
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
                            onClick={() => handleSort("empId")}
                          />
                        </span>
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Employee Name
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("employeename")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Mobile
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("mobile")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Email Address
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("emailaddress")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Agreement Status
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("agreementstatus")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Onboarding Status
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("onboardingstatus")}
                        />
                      </th>
                      <th className="textheader para" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {prehireDetails?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="para textheader ">{item?.empId}</td>
                        <td
                          className="para textheader"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item?.employeename}
                        </td>
                        <td className="para textheader">{item?.mobile}</td>
                        <td className="para textheader">
                          {item?.emailaddress}
                        </td>

                        <td className="para textheader">
                          <Chip
                            label={
                              item?.agreementstatus
                                ? item?.agreementstatus
                                    .charAt(0)
                                    .toUpperCase() +
                                  item?.agreementstatus.slice(1)
                                : ""
                            }
                            sx={{
                              color:
                                item?.agreementstatus === "active"
                                  ? "#14E002"
                                  : "#FF4C51",
                              background:
                                item?.agreementstatus === "active"
                                  ? "rgba(86, 202, 0, 0.16)"
                                  : "#F7DADB",
                            }}
                          />
                        </td>
                        <td className="para textheader">
                          <Chip
                            label={
                              item?.onboardingstatus
                                ? item?.onboardingstatus
                                    .charAt(0)
                                    .toUpperCase() +
                                  item?.onboardingstatus.slice(1)
                                : ""
                            }
                            sx={{
                              color:
                                item?.onboardingstatus === "active"
                                  ? "#14E002"
                                  : "#FF4C51",
                              background:
                                item?.onboardingstatus === "active"
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
                            onClick={() => handleSort("empId")}
                          />
                        </span>
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Employee Name
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("employeename")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Mobile
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("mobile")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Email Address
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("emailaddress")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Employee Type
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("agreementstatus")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Hiring Date
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("onboardingstatus")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Status
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("onboardingstatus")}
                        />
                      </th>
                      <th className="textheader para" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {hiringDetails?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="para textheader ">{item?.empId}</td>
                        <td
                          className="para textheader"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item?.employeename}
                        </td>
                        <td className="para textheader">{item?.mobile}</td>
                        <td className="para textheader">
                          {item?.emailaddress}
                        </td>
                        <td className="para textheader">
                          {item?.employeetype}
                        </td>
                        <td className="para textheader">{item?.hiringdate}</td>

                        <td className="para textheader">
                          <Chip
                            label={
                              item?.status
                                ? item?.status.charAt(0).toUpperCase() +
                                  item?.status.slice(1)
                                : ""
                            }
                            sx={{
                              color:
                                item?.status === "active"
                                  ? "#14E002"
                                  : "#FF4C51",
                              background:
                                item?.status === "active"
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
                            onClick={() => handleSort("empId")}
                          />
                        </span>
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Employee Name
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("employeename")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Mobile
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("mobile")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Email Address
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("emailaddress")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Employee Type
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("agreementstatus")}
                        />
                      </th>

                      <th className="textheader para" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {onboardingDetails?.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="para textheader ">{item?.empId}</td>
                        <td
                          className="para textheader"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          {item?.employeename}
                        </td>
                        <td className="para textheader">{item?.mobile}</td>
                        <td className="para textheader">
                          {item?.emailaddress}
                        </td>

                        <td className="para textheader">
                          {item?.employeetype}
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
                        Contarctor Name
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
                            onClick={() => handleSort("empId")}
                          />
                        </span>
                      </th>
                      <th className="textheader para" scope="col">
                        {" "}
                        Supplier Name
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("employeename")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Mobile
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("mobile")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Email Address
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("emailaddress")}
                        />
                      </th>
                      <th className="textheader para" scope="col">
                        Status
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          onClick={() => handleSort("emailaddress")}
                        />
                      </th>

                      <th className="textheader para" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {supplierboardingDetails?.map(
                      (item: any, index: number) => (
                        <tr key={index}>
                          <td
                            className="para textheader"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {item?.contractorname}
                          </td>
                          <td className="para textheader ">
                            {item?.suppliername}
                          </td>

                          <td className="para textheader">{item?.mobile}</td>
                          <td className="para textheader">
                            {item?.emailaddress}
                          </td>

                          <td className="para textheader">
                            <ClickableChips
                              label={
                                item?.status.charAt(0).toUpperCase() +
                                item?.status.slice(1)
                              }
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
                      )
                    )}
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
