"use client";
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PaginationComponent from "@/app/reusableComponent/paginationcomponent";
import { Colors } from "@/app/reusableComponent/styles";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BarChartIcon from "@mui/icons-material/BarChart";
import BasicBars from "./barChart";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import PrintExportColumnCustomize from "@/app/reusableComponent/printexportcolumncustomize";
import BasicDatePicker from "@/app/reusableComponent/DatePicker/basicDatePicker";
import moment from "moment";
import OrgChartTree from "@/app/reusableComponent/hierachyTree";

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

function SalesReportTable({ salesData }: any) {
  const [rowsList, setRows] = useState<ContractDetails[]>(salesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setStatusTab] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [hideChart, setHideChart] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const totalCount = rowsList?.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [isFilteredDate, setisFilteredDate] = useState<boolean>(false);
  const [currentPageItems, setcurrentPageItems] = useState<any>([]);
  const useColors = Colors();
  const ActiveEmployees = salesData?.filter(
    (list: any) => list?.status === "InProgress"
  );
  const InactiveEmployees = salesData?.filter(
    (list: any) => list?.status === "Closed"
  );

  const statusList = [
    { id: 20, label: "Active" },
    { id: 21, label: "Inactive" },
    { id: 22, label: "Both" },
  ];

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

  useEffect(() => {
    const res = rowsList?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setcurrentPageItems(res);
  }, [salesData, rowsList]);

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });

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

  const handleSearch = (query: string) => {
    setSearch(query);

    if (currentPage > 1) {
      setCurrentPage(1);
    }

    if (!query.trim()) {
      setRows(salesData);
      return;
    }

    const SearchedResult = rowsList?.filter((sales: any) =>
      Object.values(sales).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(query.toLowerCase())
      )
    );

    setRows(SearchedResult);
  };

  useEffect(() => {
    setRows(currentPageItems);
    setStatusTab("Active");
  }, []);

  useEffect(() => {
    if (selectedStatus === "Active") {
      setRows(ActiveEmployees);
    } else if (selectedStatus === "Inactive") {
      setRows(InactiveEmployees);
    } else {
      setRows(salesData);
    }
  }, [selectedStatus]);

  const handleDateFilter = () => {
    const startDates: string | null = startDate;
    const endDates: string | null = endDate; // Can be null

    const filteredData = rowsList?.filter((list: any) => {
      if (!list.startDate || !list.endDate) return false; // Skip if dates are missing

      const startDate = new Date(list.startDate).getTime();
      const endDate = new Date(list.endDate).getTime();

      const filterStart = startDates ? new Date(startDates).getTime() : null;
      const filterEnd = endDates ? new Date(endDates).getTime() : null;

      if (filterStart !== null && filterEnd === null) {
        return startDate === filterStart; // Only filter by start date
      }
      if (filterStart === null && filterEnd !== null) {
        return endDate === filterEnd; // Only filter by end date
      }
      if (filterStart !== null && filterEnd !== null) {
        return startDate >= filterStart && endDate <= filterEnd; // Filter by both
      }

      return true; // Default case (if no filter is applied)
    });

    setRows(filteredData);
  };

  useEffect(() => {
    handleDateFilter();
  }, [isFilteredDate]);

  return (
    <div>
      <div className="row px-0 mb-3">
        <div className="col-8 px-0">
          <div className="d-flex gap-2 heading2 textheader">
            <p
              className="mb-0 dashboardcard fw-bold p-2 rounded"
              style={{ color: "#f99f2feb" }}
            >
              Total Employee :{" "}
              <span style={{ color: "#8C57FF", fontWeight: 600 }}>
                {salesData?.length.toString().padStart(2, "0")}
              </span>
            </p>
            <p
              className="mb-0 dashboardcard fw-bold p-2 rounded"
              style={{ color: "#23c323" }}
            >
              Active Employee :{" "}
              <span style={{ color: "#8C57FF", fontWeight: 600 }}>
                {ActiveEmployees?.length.toString().padStart(2, "0")}
              </span>
            </p>
            <p
              className="mb-0 dashboardcard fw-bold p-2 rounded"
              style={{ color: "#f92e2eba" }}
            >
              Inactive Employee :{" "}
              <span style={{ color: "#8C57FF", fontWeight: 600 }}>
                {InactiveEmployees?.length.toString().padStart(2, "0")}
              </span>
            </p>
          </div>
        </div>
        <div className="col-4">
          <div className="d-flex gap-4 align-items-center justify-content-end">
            <div
              className="px-2 rounded"
              style={{ border: `1px solid ${useColors.themeRed}` }}
            >
              <select
                name=""
                id=""
                className="para py-2 rounded"
                style={{
                  color: useColors.themeRed,
                  background: "transparent",
                }}
                onChange={(e) => setStatusTab(e.target.value)}
                value={selectedStatus}
              >
                {statusList && statusList?.length > 0 ? (
                  statusList?.map((item: any, index: number) => (
                    <option
                      key={`${item.id}-${index}`}
                      value={item.label}
                      className="cursorPointer textheader"
                    >
                      {item.label}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No options available
                  </option>
                )}
              </select>
            </div>
            {selectedStatus === "Inactive" && (
              <div>
                <BarChartIcon
                  sx={{
                    color: useColors.themeRed,
                    background: "transparent",
                  }}
                  className="cursor-pointer"
                  onClick={() => setHideChart((p) => !p)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="col-12 px-0 mb-3">
        <div className="d-flex justify-content-between align-items-center gap-3 mb-0 align-items-center">
          <div className="d-flex gap-3 align-items-center">
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
            <BasicDatePicker
              startDate={(data: any) => setStartDate(data)}
              endDate={(data: any) => setEndDate(data)}
              clickFilterDate={() => setisFilteredDate(true)}
            />
          </div>

          <PrintExportColumnCustomize
            headers={headers}
            rowList={rowsList}
            hiddenDatas={(data: any) => setHiddenColumns(data)}
          />
        </div>
      </div>
      <div
        className="stickyheader mb-2"
        style={{ overflowX: "auto" }}
        ref={tableRef}
      >
        <table id="printSection" className="table mb-0 tabletype">
          <thead style={{ backgroundColor: "#F6F7FB" }}>
            <tr>
              <th></th>

              {Object.keys(headers).map((header) => {
                const key: any = headers[header as keyof typeof headers];

                if (hiddenColumns.includes(key)) return null; // Hide column

                return (
                  <th
                    key={key}
                    scope="col"
                    className="position-relative textheader para"
                  >
                    {header}
                    <NorthOutlinedIcon
                      className={`textheader cursorpointer ms-1 mb-1 ${
                        sortConfig.key === key && sortConfig.direction === "asc"
                          ? "rotatearrow"
                          : ""
                      }`}
                      sx={{ fontSize: "20px" }}
                      onClick={() => handleSort(key as keyof ContractDetails)}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="dashboardcard">
            {currentPageItems?.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  <ShoppingCartRoundedIcon
                    className="cursorpointer"
                    sx={{ color: useColors.themeRed }}
                  />
                </td>
                {!hiddenColumns.includes("conName") && (
                  <td className="para textheader py-3">{item?.conName}</td>
                )}
                {!hiddenColumns.includes("vndName") && (
                  <td className="para textheader py-3">{item?.vndName}</td>
                )}
                {!hiddenColumns.includes("cust_PO_Number") && (
                  <td
                    className="para textheader py-3"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {item?.cust_PO_Number}
                  </td>
                )}
                {!hiddenColumns.includes("startDate") && (
                  <td className="para textheader py-3">
                    {/* <ChipsForLeave label={item?.status} /> */}
                    {item?.startDate}
                  </td>
                )}
                {!hiddenColumns.includes("endDate") && (
                  <td className="para textheader py-3">{item?.endDate}</td>
                )}
                {!hiddenColumns.includes("rate") && (
                  <td className="para textheader py-3">{item?.rate}</td>
                )}
                {!hiddenColumns.includes("margin") && (
                  <td className="para textheader py-3">{item?.margin}</td>
                )}
                {!hiddenColumns.includes("dealCloser") && (
                  <td className="para textheader py-3">{item?.dealCloser}</td>
                )}
                {!hiddenColumns.includes("recruiter") && (
                  <td className="para textheader py-3">{item?.recruiter}</td>
                )}
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

      {/* Popup Open barchart */}
      {hideChart && (
        <section
          className={`showpopup ${hideChart ? "showpopupactive" : ""}`}
          onClick={() => setHideChart(false)}
        >
          <div
            className="summarysection  mx-auto px-2 py-2"
            style={{
              height: "fit-content",
              alignSelf: "center",
              width: "1000px",
              overflowY: "auto",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="container-fluid">
              <div className="row px-2">
                <div className="col-12">
                  <BasicBars close={() => setHideChart(false)} />
                </div>
              </div>
              <div className="row mt-3 px-2"></div>
            </div>
          </div>
        </section>
      )}
      {/* <OrgChartTree/> */}
    </div>
  );
}

export default SalesReportTable;
