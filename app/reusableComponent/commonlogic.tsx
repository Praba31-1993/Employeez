export const SearchLogic = (arr: any[], search: string) => {
  const filteredRows = arr.filter((row: any) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );
  return filteredRows;
};

// Export CSV files
export const handleCSVExport = (headers:any, data:any) => {
  const csvContent = [
    headers.join(","),
    ...data.map((item:any) => headers.map((header:any)=> item[header] || "").join(","))
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
