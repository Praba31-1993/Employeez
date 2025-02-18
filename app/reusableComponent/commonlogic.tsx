import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const SearchLogic = (arr: any[], search: string) => {
    if (!search.trim()) return arr;



    if (!search.trim()) return arr;
    const SearchedResult = arr.filter((sales: any) =>
        Object.values(sales).some(
            (value) =>
                typeof value === "string" &&
                value.toLowerCase().includes(search.toLowerCase())
        )
    );

    return SearchedResult;
};

export const handleCSVExport = (headers: string[], data: any[]) => {
    // Prepare CSV content
    const csvContent = [
        headers.join(","), // CSV Header Row
        ...data.map((item) =>
            headers
                .map((header) =>
                    item[header] !== undefined ? `"${item[header]}"` : `""`
                )
                .join(",")
        ),
    ].join("\n");

    // Create and trigger CSV download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const handleCSVExport1 = (
    headers: any,
    data: any[]
) => {
    // Extract CSV headers (Human-readable names)
    const csvHeaders = Object.keys(headers);

    // Extract corresponding data field names
    const csvKeys = Object.values(headers);

    // Prepare CSV content
    const csvContent = [
        csvHeaders.join(","), // CSV Header Row
        ...data.map((item) =>
            csvKeys
                .map((key: any) => (item[key] !== undefined ? `"${item[key]}"` : `""`))
                .join(",")
        ),
    ].join("\n");

    // Create and trigger CSV download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// Print Logic
export const handlePrint = () => {
    const printSection = document.querySelector("table"); // Select the table directly

    if (printSection) {
        const printWindow = window.open("", "", "height=500,width=800");

        if (printWindow) {
            printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              /* Add necessary styles to preserve layout */
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { border-collapse: collapse; width: 100%; }
              theade{background-color: rgb(246, 247, 251);}
              tbody{background-color: fff;}
              th, td { border: 1px solid black; padding: 8px; text-align: left; }
              th svg{display:none} 
              th {
  white-space: nowrap !important;
  font-weight: 600 !important;
}
            </style>
          </head>
          <body>
            ${printSection.outerHTML}  <!-- Use outerHTML to include the table element -->
          </body>
        </html>
      `);

            printWindow.document.close();

            printWindow.onload = () => {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            };
        }
    }
};


export const handleExcelExport = (
    headers: any,
    data: any[]
) => {
    if (!data || data?.length === 0) {
        alert("No data available for export!");
        return;
    }

    // Convert data to an array of objects with formatted keys
    const formattedData = data.map((item) => {
        const row: Record<string, any> = {};
        Object.entries(headers).forEach(([header, key]) => {
            row[header] = item[key as keyof typeof item]; // Map correct data fields
        });
        return row;
    });

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(formattedData);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Compensation History");

    // Write the file
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

    // Save the file
    const fileData = new Blob([excelBuffer], {
        type: "application/octet-stream",
    });
    saveAs(fileData, "Compensation_History.xlsx");
};
