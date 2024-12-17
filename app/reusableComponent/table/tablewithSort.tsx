import React, { useEffect, useState } from "react";
import NorthSharpIcon from "@mui/icons-material/NorthSharp";
import SouthSharpIcon from "@mui/icons-material/SouthSharp";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface Column {
  key: string;
  label: string;
}

interface RowData {
  [key: string]: string | number | null; // Support for any key-value pairs in the row data
}

interface TableProps {
  columns: Column[];
  rows: RowData[];
  dataforicons: any;
}

const TableWithSort: React.FC<TableProps> = ({
  columns,
  rows,
  dataforicons,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  }>({
    key: columns[0]?.key || "", // Set default sorting by the first column
    direction: "asc",
  });

  const [data, setData] = useState<RowData[]>(rows);

  // Effect to handle sorting based on sortConfig
  useEffect(() => {
    const sortedData = [...rows].sort((a, b) => {
      const aValue = a[sortConfig.key] ?? "";
      const bValue = b[sortConfig.key] ?? "";

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // For numbers or other types, simple comparison
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  }, [sortConfig, rows]);

  // Handle sorting when a column header is clicked
  const handleSort = (key: string) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction: newDirection });
  };

  return (
    <table className="table-auto w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="p-2 text-center align-middle cursor-pointer heading2 textheader"
              onClick={() => handleSort(column.key)}
            >
              <div className="flex items-center justify-center gap-1">
                <span>{column.label === "Action" ? "" : column.label}</span>

                {column.label !== "Action" && (
                  <div>
                    {sortConfig.key === column.key ? (
                      sortConfig.direction === "asc" ? (
                        <NorthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px" }}
                        />
                      ) : (
                        <SouthSharpIcon
                          fontSize="small"
                          className="inline-block"
                          sx={{ fill: "#CCC", height: "15px" }}
                        />
                      )
                    ) : (
                      <NorthSharpIcon
                        fontSize="small"
                        className="inline-block"
                        sx={{ fill: "#CCC", height: "15px" }}
                      />
                    )}
                  </div>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="border-b border-gray-200">
            {columns.map((column) => (
              <td
                key={`${rowIndex}-${column.key}`}
                className="p-3 text-center align-middle" // Ensure consistent padding and vertical alignment for cells
              >
                <div className="flex justify-center items-center gap-3">
                  <p className="mb-0">
                    {row[column.key] !== null ? row[column.key] : ""}
                  </p>

                  {/* Check if the current column is the 'action' column */}
                  {column.key === "action" && (
                    <div className="flex gap-3">
                      <RemoveRedEyeIcon sx={{ color: "#8A8D93" }} />

                      {dataforicons === "Status" && (
                        <HighlightOffIcon sx={{ color: "#FF4C51" }} />
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
  );
};

export default TableWithSort;
