"use client";
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PaginationComponent from "@/app/reusableComponent/paginationcomponent";
import { Colors } from "@/app/reusableComponent/styles";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BasicBars from "./barChart";
import NorthOutlinedIcon from "@mui/icons-material/NorthOutlined";
import PrintExportColumnCustomize from "@/app/reusableComponent/printexportcolumncustomize";

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
  const [rowsList, setRows] = useState<ContractDetails[]>(salesData);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setStatusTab] = useState<string>("Both");
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [hideChart, setHideChart] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const totalCount = rowsList?.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);

  const useColors = Colors();
  const ActiveEmployees = salesData?.filter(
    (list: any) => list?.status === "InProgress"
  );
  const InactiveEmployees = salesData?.filter(
    (list: any) => list?.status === "Closed"
  );

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
  const currentPageItems = rowsList?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

    const SearchedResult = rowsList.filter((sales: any) =>
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

  return (
    <div>
      <div className="col-12 px-0 mb-3">
        <div className="d-flex justify-content-between align-items-center gap-3 mb-0 align-items-center">
          <div className="d-flex gap-2 align-items-center">
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
    </div>
  );
}

export default FixedProject;
