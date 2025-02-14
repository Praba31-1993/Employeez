"use client";
import React, { useState, useRef, useEffect } from "react";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PaginationComponent from "@/app/reusableComponent/paginationcomponent";

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

function SalesReportTable({ salesData}: any) {
  const [rowsList, setRows] = useState<ContractDetails[]>(salesData);

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "",
    direction: null,
  });

  const [pages, setPages] = useState([]);

  const [countPerPage, setCountForPerPage] = useState(5);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = salesData?.length;
  const totalPages = Math.ceil(totalCount / countPerPage);

  useEffect(() => {
    setRows(salesData);
  }, [salesData]);

 

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

  useEffect(() => {
    const arr: any = [];
    for (let i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    setPages(arr);
  }, [totalPages]);

  useEffect(() => {
    setCountForPerPage(5);
  }, []);

  const currentPageItems = rowsList?.slice(
    (currentPage - 1) * countPerPage,
    currentPage * countPerPage
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rowsList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setRows(currentPageItems);
  }, []);

  console.log("currentItems", currentItems);

  return (
    <div>
      <div className="stickyheader mb-4" style={{ overflowX: "auto" }}>
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
            {currentItems?.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  <ShoppingCartRoundedIcon sx={{ color: "#8A94FF" }} />
                </td>
                <td className="para textheader py-3">{item?.conName}</td>
                <td className="para textheader py-3">{item?.vndName}</td>
                <td
                  className="para textheader"
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
    </div>
  );
}

export default SalesReportTable;
