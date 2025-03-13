"use Client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SearchIcon from "@mui/icons-material/Search";
import {
  onboardingReport,
  supplieronboardingReport,
} from "@/app/reusableComponent/JsonData";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import NorthSharpIcon from "@mui/icons-material/NorthSharp";
import { Chip } from "@mui/material";
import { SearchLogic } from "@/app/reusableComponent/commonlogic";
import ClickableChips from "@/app/reusableComponent/chips";
import PrintExportColumnCustomize from "@/app/reusableComponent/printexportcolumncustomize";
import ReportDetailsPopup from "./reportscomponent/reportdetailpopup";

export default function Reportspoup({
  show,
  close,
  selectedTableList,
  prehiringdatas,
  hiringdatas,
  onboardingdatas,
  supplieronboardingDatas,
}: any) {
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [prehireheaders, setprehireheaders] = useState<any>({});
  const [hiringheaders, sethiringheaders] = useState<any>({});
  const [onboardingheaders, setonboardingheaders] = useState<any>({});
  const [supplieronboardingheaders, setsupplieronboardingheaders] =
    useState<any>({});

  const [prehireDetails, setPrehiredetails] = useState<any>(prehiringdatas);
  const [hiringDetails, sethiringdetails] = useState<any>(hiringdatas);
  const [onboardingDetails, setOnboardingdetails] =
    useState<any>(onboardingdatas);
  const [supplierboardingDetails, setsupplierOnboardingdetails] = useState<any>(
    supplieronboardingDatas
  );
  const [open, setOpen] = useState(false);
  const [selectedEmployeeDetails, setEmployeeDetails] = useState<any>();
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
      const res = SearchLogic(prehiringdatas, query);

      setPrehiredetails(res);
    } else if (value === 1) {
      const res = SearchLogic(hiringdatas, query);
      sethiringdetails(res);
    } else if (value === 2) {
      const res = SearchLogic(onboardingdatas, query);
      setOnboardingdetails(res);
    } else if (value === 3) {
      const res = SearchLogic(supplieronboardingDatas, query);
      setOnboardingdetails(res);
    }
  };

  useEffect(() => {
    if (!selectedTableList) {
      setValue(0);
    } else {
      setValue(selectedTableList - 1);
    }
  }, [selectedTableList]);

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
      const sortedRows = [...prehireDetails].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setPrehiredetails(sortedRows);
    } else if (value === 1) {
      const sortedRows = [...hiringDetails].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      sethiringdetails(sortedRows);
    } else if (value === 2) {
      const sortedRows = [...onboardingDetails].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setOnboardingdetails(sortedRows);
    } else {
      const sortedRows = [...supplierboardingDetails].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      setsupplierOnboardingdetails(sortedRows);
    }
  };

  useEffect(() => {
    let newHeaders: Record<string, string> = {}; // Start with an empty object

    if (value === 0) {
      newHeaders = {
        "Employee Id": "empId",
        "Employee Name": "firstname",
        Mobile: "mobile",
        "Email Address": "email",
        Status: "status",
        "Hiring Date": "hiringDate",
        Salary: "salary",
      };
      setprehireheaders(newHeaders);
    } else if (value === 1) {
      newHeaders = {
        "Employee Id": "empId",
        "Employee Name": "name",
        Mobile: "mobile",
        "Email Address": "email",
        "Employer Type": "empType",
        "Approver Name": "approverName",
        "Cost Center": "costCenter",
      };
      sethiringheaders(newHeaders);
    } else if (value === 2) {
      newHeaders = {
        "Employee Id": "empId",
        "Employee Name": "name",
        Mobile: "mobile",
        "Email Address": "email",
        "Employer Type": "empType",
        "Approver Name": "approverName",
        "Cost Center": "costCenter",
      };
      setonboardingheaders(newHeaders);
    } else if (value === 3) {
      newHeaders = {
        "Contractor Name": "contractorname",
        "Supplier Name": "supplierContactPerson",
        Mobile: "supplierContactNum",
        "Email Address": "supplierContactEmail",
        Supplier: "supplierName",
      };
      setsupplieronboardingheaders(newHeaders);
    }
  }, [value]);

  return (
    <section
      className={`showpopup ${show ? "showpopupactive" : ""}`}
      onClick={close}
    >
      {open && (
        <ReportDetailsPopup
          show={open}
          close={() => setOpen(false)}
          selectedEmployeeDetails={selectedEmployeeDetails?.[0]}
        />
      )}
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
            <div className="col-12 col-md-8 col-lg-8 col-xxl-8 ">
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
            <div className="col-12 col-md-4 col-lg-4 col-xxl-4 ">
              <div className="d-flex align-items-center justify-content-end gap-3">
                {value === 0 && (
                  <PrintExportColumnCustomize
                    headers={prehireheaders}
                    rowList={prehireDetails}
                    hiddenDatas={(data: any) => setHiddenColumns(data)}
                  />
                )}
                {value === 1 && (
                  <PrintExportColumnCustomize
                    headers={hiringheaders}
                    rowList={hiringDetails}
                    hiddenDatas={(data: any) => setHiddenColumns(data)}
                  />
                )}
                {value === 2 && (
                  <PrintExportColumnCustomize
                    headers={onboardingheaders}
                    rowList={onboardingDetails}
                    hiddenDatas={(data: any) => setHiddenColumns(data)}
                  />
                )}
                {value === 3 && (
                  <PrintExportColumnCustomize
                    headers={supplieronboardingheaders}
                    rowList={supplierboardingDetails}
                    hiddenDatas={(data: any) => setHiddenColumns(data)}
                  />
                )}
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
            </div>

            {/* Table Section */}
            {value === 0 && (
              <div className="" style={{ height: "80vh", overflow: "auto" }}>
                <table className="table mb-0 tabletype">
                  <thead style={{ backgroundColor: "#F6F7FB" }}>
                    <tr>
                      {Object?.keys(prehireheaders)?.map((header) => {
                        const key: any =
                          prehireheaders[header as keyof typeof prehireheaders];

                        if (hiddenColumns.includes(key)) return null; // Hide column

                        return (
                          <th
                            key={key}
                            scope="col"
                            className="position-relative textheader para"
                          >
                            {header}
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
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {prehireDetails?.map((item: any, index: number) => (
                      <tr key={index}>
                        {!hiddenColumns.includes("empId") && (
                          <td className="para textheader py-3">
                            {item?.empId}
                          </td>
                        )}

                        {!hiddenColumns.includes("firstname") && (
                          <td className="para textheader py-3">
                            {item?.firstName.charAt(0).toUpperCase() +
                              item?.firstName.slice(1).toLowerCase() +
                              " " +
                              item?.lastName.charAt(0).toUpperCase() +
                              item?.lastName.slice(1).toLowerCase()}
                          </td>
                        )}

                        {!hiddenColumns.includes("mobile") && (
                          <td className="para textheader py-3">
                            {item?.mobile}
                          </td>
                        )}
                        {!hiddenColumns.includes("email") && (
                          <td className="para textheader py-3">
                            {item?.email}
                          </td>
                        )}

                        {!hiddenColumns.includes("status") && (
                          <td className="para textheader">
                            <Chip
                              label={item?.status}
                              sx={{
                                color:
                                  item?.status === "Active"
                                    ? "#14E002"
                                    : "#FF4C51",
                                background:
                                  item?.status === "Active"
                                    ? "rgba(86, 202, 0, 0.16)"
                                    : "#F7DADB",
                              }}
                            />
                          </td>
                        )}

                        {!hiddenColumns.includes("hiringDate") && (
                          <td className="para textheader">
                            {item?.hiringDate !== null
                              ? item?.hiringDate
                              : "--"}
                          </td>
                        )}
                        {!hiddenColumns.includes("salary") && (
                          <td className="para textheader">
                            {item?.salary !== null ? item?.salary : "--"}
                          </td>
                        )}
                        {/* <td className="para textheader">
                          <div className="flex cursorpointer gap-3">
                            <RemoveRedEyeIcon
                              sx={{ color: "#8A8D93" }}
                              onClick={() => {
                                setOpen((prev) => !prev),
                                  setEmployeeDetails(() =>
                                    prehireDetails?.filter(
                                      (list: any) => list.empId === item?.empId
                                    )
                                  );
                              }}
                            />
                          </div>
                        </td> */}
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
                      {Object?.keys(hiringheaders)?.map((header) => {
                        const key: any =
                          hiringheaders[header as keyof typeof hiringheaders];

                        if (hiddenColumns.includes(key)) return null; // Hide column

                        return (
                          <th
                            key={key}
                            scope="col"
                            className="position-relative textheader para"
                          >
                            {header}
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
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {hiringDetails?.map((item: any, index: number) => (
                      <tr key={index}>
                        {!hiddenColumns.includes("empId") && (
                          <td className="para textheader py-3">
                            {item?.empId}
                          </td>
                        )}

                        {!hiddenColumns.includes("name") && (
                          <td className="para textheader py-3">{item?.name}</td>
                        )}

                        {!hiddenColumns.includes("mobile") && (
                          <td className="para textheader py-3">
                            {item?.mobile}
                          </td>
                        )}
                        {!hiddenColumns.includes("email") && (
                          <td className="para textheader py-3">
                            {item?.email}
                          </td>
                        )}

                        {!hiddenColumns.includes("empType") && (
                          <td className="para textheader">
                            {item?.empType === "CONS"
                              ? "Contractor"
                              : item?.empType === "EMPS"
                              ? "Salary"
                              : item?.empType === "EMPv"
                              ? "Variable"
                              : item?.empType === "EMBH"
                              ? "Hourly"
                              : ""}
                          </td>
                        )}

                        {!hiddenColumns.includes("approverName") && (
                          <td className="para textheader">
                            {item?.approverName}
                          </td>
                        )}
                        {!hiddenColumns.includes("costCenter") && (
                          <td className="para textheader">
                            {item?.costCenter}
                          </td>
                        )}
                        {/* <td className="para textheader">
                          <div className="flex cursorpointer gap-3">
                            <RemoveRedEyeIcon
                              sx={{ color: "#8A8D93" }}
                              onClick={() => {
                                setOpen((prev) => !prev),
                                  setEmployeeDetails(() =>
                                    prehireDetails?.filter(
                                      (list: any) => list.empId === item?.empId
                                    )
                                  );
                              }}
                            />
                          </div>
                        </td> */}
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
                      {Object?.keys(onboardingheaders)?.map((header) => {
                        const key: any =
                          onboardingheaders[
                            header as keyof typeof onboardingheaders
                          ];

                        if (hiddenColumns.includes(key)) return null; // Hide column

                        return (
                          <th
                            key={key}
                            scope="col"
                            className="position-relative textheader para"
                          >
                            {header}
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
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {onboardingDetails?.map((item: any, index: number) => (
                      <tr key={index}>
                        {!hiddenColumns.includes("empId") && (
                          <td className="para textheader py-3">
                            {item?.empId}
                          </td>
                        )}

                        {!hiddenColumns.includes("name") && (
                          <td className="para textheader py-3">{item?.name}</td>
                        )}

                        {!hiddenColumns.includes("mobile") && (
                          <td className="para textheader py-3">
                            {item?.mobile}
                          </td>
                        )}
                        {!hiddenColumns.includes("email") && (
                          <td className="para textheader py-3">
                            {item?.email}
                          </td>
                        )}

                        {!hiddenColumns.includes("empType") && (
                          <td className="para textheader">{item?.empType}</td>
                        )}

                        {!hiddenColumns.includes("approverName") && (
                          <td className="para textheader">
                            {item?.approverName}
                          </td>
                        )}
                        {!hiddenColumns.includes("costCenter") && (
                          <td className="para textheader">
                            {item?.costCenter}
                          </td>
                        )}
                        {/* <td className="para textheader">
                          <div className="flex cursorpointer gap-3">
                            <RemoveRedEyeIcon
                              sx={{ color: "#8A8D93" }}
                              onClick={() => {
                                setOpen((prev) => !prev),
                                  setEmployeeDetails(() =>
                                    prehireDetails?.filter(
                                      (list: any) => list.empId === item?.empId
                                    )
                                  );
                              }}
                            />
                          </div>
                        </td> */}
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
                      {Object?.keys(supplieronboardingheaders)?.map(
                        (header) => {
                          const key: any =
                            supplieronboardingheaders[
                              header as keyof typeof supplieronboardingheaders
                            ];

                          if (hiddenColumns.includes(key)) return null; // Hide column

                          return (
                            <th
                              key={key}
                              scope="col"
                              className="position-relative textheader para"
                            >
                              {header}
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
                          );
                        }
                      )}
                    </tr>
                  </thead>
                  <tbody className="dashboardcard">
                    {supplierboardingDetails?.map(
                      (item: any, index: number) => (
                        <tr key={index}>
                          {!hiddenColumns.includes("contractorname") && (
                            <td className="para textheader py-3">
                              {item?.contractorname.charAt(0).toUpperCase() +
                                item?.contractorname.slice(1)}
                            </td>
                          )}

                          {!hiddenColumns.includes("supplierContactPerson") && (
                            <td className="para textheader py-3">
                              {item?.supplierContactPerson
                                .charAt(0)
                                .toUpperCase() +
                                item?.supplierContactPerson.slice(1)}
                            </td>
                          )}

                          {!hiddenColumns.includes("supplierContactNum") && (
                            <td className="para textheader py-3">
                              {item?.supplierContactNum}
                            </td>
                          )}
                          {!hiddenColumns.includes("supplierContactEmail") && (
                            <td className="para textheader py-3">
                              {item?.supplierContactEmail}
                            </td>
                          )}

                          {!hiddenColumns.includes("supplierName") && (
                            <td className="para textheader">
                              {item?.supplierName.charAt(0).toUpperCase() +
                                item?.supplierName.slice(1)}
                            </td>
                          )}

                          {/* <td className="para textheader">
                          <div className="flex cursorpointer gap-3">
                            <RemoveRedEyeIcon
                              sx={{ color: "#8A8D93" }}
                              onClick={() => {
                                setOpen((prev) => !prev),
                                  setEmployeeDetails(() =>
                                    prehireDetails?.filter(
                                      (list: any) => list.empId === item?.empId
                                    )
                                  );
                              }}
                            />
                          </div>
                        </td> */}
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
