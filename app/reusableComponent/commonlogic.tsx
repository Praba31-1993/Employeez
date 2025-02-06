export const SearchLogic = (arr: any[], search: string) => {
  if (!search.trim()) return arr; // Return all if search is empty

  let filteredRows;

  if (search.toLowerCase() === "active" || search.toLowerCase() === "inactive") {
    // Exact match for status field
    filteredRows = arr.filter((employee: any) =>
      employee.status.toLowerCase() === search.toLowerCase()
    );
  } else {
    // Partial match for any field
    filteredRows = arr.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.trim().toLowerCase())
      )
    );
  }

  return filteredRows.length > 0 ? filteredRows : arr; // Return all if no match found
};


// Export CSV files
export const handleCSVExport = (headers: any, data: any) => {
  const csvContent = [
    headers.join(","),
    ...data.map((item: any) =>
      headers.map((header: any) => item[header] || "").join(",")
    ),
  ].join("\n");

  // Create a Blob and trigger a download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Print Logic
export const handlePrint = () => {
  const printSection = document.getElementById("printSection");

  if (printSection) {
    // Open a new window for printing
    const printWindow = window.open("", "", "height=500,width=800");

    if (printWindow) {
      // Write content to the new window
      printWindow.document.write(
        "<html><head><title>Print</title></head><body>"
      );
      printWindow.document.write(printSection.innerHTML); // Use the content inside the div
      printWindow.document.write("</body></html>");

      // Close the document and trigger the print dialog
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  }
};
