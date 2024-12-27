import React, { useEffect, useState } from "react";
import NorthSharpIcon from "@mui/icons-material/NorthSharp";
import SouthSharpIcon from "@mui/icons-material/SouthSharp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ClickableChips from "../chips";
import PaginationComponent from "../paginationcomponent";
import { CenterPopup } from "../popup/centerPopup";
import Deleteconfirmationpopup from "../popup/deleteconfirmationpopup";

interface Column {
  key: string;
  label: string;
  checked: boolean; // Added checked property to the Column interface
}

interface TableProps {
  columns: Column[];
  rows: Record<string, any>[]; // Ensures that rows is always an array of objects
  dataforicons: any;
}

const TableWithSort: React.FC<TableProps> = ({
  columns,
  rows,
  dataforicons,
}) => {
  const [showdetails, setDetails] = useState(false);
  const [confirmDelete, setDelete] = useState(false);

  const [openpopups, openPopUp] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: "",
    direction: "asc",
  });

  const [data, setData] = useState<any[]>(rows || []);

  const visibleColumns = columns?.filter((column) => column.checked);


  useEffect(() => {
    if (!Array.isArray(rows)) return;
    const sortedData = [...rows]?.sort((a, b) => {
      const aValue = a[sortConfig.key] ?? "";
      const bValue = b[sortConfig.key] ?? "";

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  }, [sortConfig, rows]);

  const handleSort = (key: string) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction: newDirection });
  };

  return (
    <div className="w-100" style={{ overflowX: "auto" }}>
      <table className="w-100">
        <thead className="" style={{ backgroundColor: "#F6F7FB" }}>
          <tr>
            {visibleColumns?.map((column) => (
              <th
                key={column?.key}
                className="cursor-pointer para textheader py-3 "
                onClick={() => handleSort(column.key)}
              >
                <div className="d-flex">
                  {column.label === "Action" ? "" : column.label}

                  {column.label !== "Action" && (
                    <span>
                      {sortConfig.key === column.key ? (
                        sortConfig.direction === "asc" ? (
                          <NorthSharpIcon
                            fontSize="small"
                            className="inline-block"
                            sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          />
                        ) : (
                          <SouthSharpIcon
                            fontSize="small"
                            className="inline-block"
                            sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                          />
                        )
                      ) : (
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px", width: "15px" }}
                        />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="">
          {data?.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-gray-200 dashboardcard  "
            >
              {visibleColumns?.map((column) => (
                <td key={column.key} className="py-3 pe-1">
                  <div className="flex">
                    {column.key === "status" ? (
                      <ClickableChips label={row[column.key]} />
                    ) : (
                      <p className="mb-0 textheader para">
                        {row[column.key] !== null ? row[column.key] : ""}
                      </p>
                    )}

                    {column.key === "action" && (
                      <div className="flex gap-3">
                        <RemoveRedEyeIcon
                          sx={{ color: "#8A8D93" }}
                          onClick={() => setDetails(true)}
                        />
                        {dataforicons === "Status" && (
                          <HighlightOffIcon
                            sx={{ color: "#FF4C51" }}
                            onClick={() => setDelete(true)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showdetails && (
        <CenterPopup show={showdetails} close={() => setDetails(false)} />
      )}
      {confirmDelete && (
        <Deleteconfirmationpopup
          show={confirmDelete}
          close={() => setDelete(false)}
        />
      )}
    </div>
  );
};

export default TableWithSort;
