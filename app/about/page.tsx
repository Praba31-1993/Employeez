'use client';
import React, { useRef } from "react";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";

function About() {
  const tableRef = useRef<HTMLDivElement>(null);

  // Dummy sales data
  const salesData = [
    {
      conName: "John Doe",
      vndName: "ABC Corp",
      cust_PO_Number: "PO12345",
      startDate: "2024-02-01",
      endDate: "2024-02-15",
      rate: "$50/hr",
      margin: "20%",
      dealCloser: "Alice Smith",
      recruiter: "Bob Johnson",
    },
    {
      conName: "Jane Smith",
      vndName: "XYZ Ltd",
      cust_PO_Number: "PO67890",
      startDate: "2024-03-01",
      endDate: "2024-03-15",
      rate: "$60/hr",
      margin: "25%",
      dealCloser: "Charlie Brown",
      recruiter: "David Lee",
    },
  ];

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

  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        {/* Print Button */}
        <LocalPrintshopOutlinedIcon
          className="textheader cursorpointer"
          onClick={handlePrint}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Table to Print */}
      <div ref={tableRef}>
        <table className="table mb-0 tabletype">
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Company</th>
              <th>Customer PO Number</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Rate</th>
              <th>Margin</th>
              <th>Closer</th>
              <th>Recruiter</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((item, index) => (
              <tr key={index}>
                <td>{item.conName}</td>
                <td>{item.vndName}</td>
                <td>{item.cust_PO_Number}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.rate}</td>
                <td>{item.margin}</td>
                <td>{item.dealCloser}</td>
                <td>{item.recruiter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default About;
