"use client";
import React, { useState, useRef, useEffect } from "react";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PaginationComponent from "@/app/reusableComponent/paginationcomponent";
import { Colors } from "@/app/reusableComponent/styles";
import SearchIcon from "@mui/icons-material/Search";
import favourite from "@/public/assets/img/favourite.svg";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Image from "next/image";
import BarChartIcon from "@mui/icons-material/BarChart";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BasicBars from "./barChart";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Checkbox } from "@mui/material";
import {
  handleCSVExport,
  handleCSVExport1,
  handleExcelExport,
} from "@/app/reusableComponent/commonlogic";

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
  const [selectedStatus, setStatusTab] = useState<string>("Both");
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [hideChart, setHideChart] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const totalCount = rowsList?.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [setting, setSetting] = React.useState<null | HTMLElement>(null);
  const [header, setHeader] = React.useState<any>([]);

  const open = Boolean(anchorEl);
  const openSetting = Boolean(setting);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettingClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSetting(event.currentTarget);
  };
  const handleSetingClose = () => {
    setSetting(null);
  };
  const useColors = Colors();
  // We use only SalesData, if you use rowList it will change for every api iteration
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

  const downlistList = [
    { id: "csv", label: "CSV" },
    { id: "excel", label: "Excel" },
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

  console.log("rowlist", rowsList);

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
      setRows(salesData); // Return full list if query is empty
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
    const arr: any = Object.entries(headers).map(([key, value]) => ({
      [key]: value,
      checked: true,
    }));

    console.log("arr123", arr);
    setHeader(arr);
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

  const handlePrint = () => {
    if (tableRef.current) {
      const printWindow = window.open("", "_blank");
      printWindow?.document.write(`
        <html>
          <head>
            <title>Print Table</title>
            <style>
              table { width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; }
              th, td { border: 1px solid black; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              body { padding: 20px; }
            </style>
          </head>
          <body>
            ${tableRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow?.document.close();
      printWindow?.print();
    }
  };

  const handleDownload = (id: any) => {
    if (id === "csv") {
      handleCSVExport1(headers, salesData);
    } else {
      handleExcelExport(headers, salesData);
    }
  };

  // useEffect(() => {
  //   if (salesData?.length > 0) {
  //     const addCheckedValueinSalesData = salesData.map((list: any) => ({
  //       ...list,
  //       checked: true,
  //     }));
  //     console.log("add+++", addCheckedValueinSalesData);

  //     setRows(addCheckedValueinSalesData);
  //   }
  // }, []);

  const handleResizeHeader = (data: any) => {
    const newArr = [];

    console.log("data", data, headers, newArr.push(data));
  };

  console.log("header++", header);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleCheckboxClick = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );

    const updatedData = header.map((item: any) => {
      const key = Object.keys(item)[0]; // Get the key (column name)
      const value = item[key]; // Get the corresponding value

      return {
        ...item,
        checked: selectedIds.includes(value) ? false : item.checked, // Set checked to false if value is in arr
      };
    });

    setHeader(updatedData);
  };

  console.log("selected", selectedIds, "header", header);

  return (
    <div>
      <div className="row px-0 mb-3">
        <div className="col-8 px-0">
          <div className="d-flex gap-2 heading2 textheader">
            <p className="mb-0 dashboardcard p-2 rounded">
              Total Employee{" "}
              <span style={{ color: "#8C57FF", fontWeight: 600 }}>
                {salesData?.length.toString().padStart(2, "0")}
              </span>
            </p>
            <p className="mb-0 dashboardcard p-2 rounded">
              Active Employee{" "}
              <span style={{ color: "#8C57FF", fontWeight: 600 }}>
                {ActiveEmployees?.length.toString().padStart(2, "0")}
              </span>
            </p>
            <p className="mb-0 dashboardcard p-2 rounded">
              Inactive Employee{" "}
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
            <Image src={favourite} alt="" width={24} height={24} />
          </div>
          <div className="d-flex align-items-center gap-3">
            <LocalPrintshopOutlinedIcon
              className=" textheader cursorpointer "
              onClick={() => handlePrint()}
            />
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <SaveAltIcon
                  style={{}}
                  className=" textheader cursorpointer "
                />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {downlistList.map((download: any, index: number) => (
                  <div key={index}>
                    <MenuItem onClick={() => handleDownload(download?.id)}>
                      {download?.label}
                    </MenuItem>
                  </div>
                ))}
              </Menu>
            </div>

            <div>
              <Button
                id="basic-button"
                aria-controls={openSetting ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openSetting ? "true" : undefined}
                onClick={handleSettingClick}
              >
                <SettingsOutlinedIcon className=" textheader cursorpointer " />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={setting}
                open={openSetting}
                onClose={handleSetingClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div>
                  {header.length > 0 &&
                    header.map((list: any, index: number) => {
                      const key = Object.keys(list)[0]; // Assuming the key represents the unique identifier
                      const id = list[key]; // Assuming id is stored in list[key]

                      return (
                        <div key={index}>
                          <MenuItem onClick={() => handleCheckboxClick(id)}>
                            <Checkbox checked={selectedIds.includes(id)} />
                            {key}
                          </MenuItem>
                        </div>
                      );
                    })}
                </div>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div
        className="stickyheader mb-2"
        style={{ overflowX: "auto" }}
        ref={tableRef}
      >
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
                    </span>
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
                <td className="para textheader py-3">{item?.conName}</td>
                <td className="para textheader py-3">{item?.vndName}</td>
                <td
                  className="para textheader py-3"
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

export default SalesReportTable;
