import {
  getCompHistory,
  workforceReports,
  w2sReports,
  w2hReports,
  c2cReports,
} from "@/app/reusableComponent/JsonData";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { SearchLogic } from "@/app/reusableComponent/commonlogic";

import { Colors } from "@/app/reusableComponent/styles";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import Hrdatas from "./hrdatas";
import Employees from "./employees";
import Reportspoup from "./reportspoup";
import EmployeePopup from "./employeepopup";

type Row = {
  id: number | string;
  request_type: string;
  submitted_date: string;
  approved_by: string;
  status: string;
};

function Workforce() {
  const [search, setSearch] = useState<string>("");
  const [rowsList, setRows] = useState<any>(getCompHistory);
  const [loading, setLoading] = useState(true);
  const [selectedTableList, setTableList] = useState<any>(1);
  const [workforceDetails, setWorkforceDetails] =
    useState<any>(workforceReports);
  const [w2SDetails, setW2SDetails] = useState<any>(w2sReports);
  const [w2HDetails, setw2hDetails] = useState<any>(w2hReports);
  const [c2cDetails, setc2cDetails] = useState<any>(c2cReports);

  useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust timeout as necessary
    return () => clearTimeout(timer);
  }, []);

  const useColors = Colors();


  

  // Search function
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    if (selectedTableList === 1) {
      const res = SearchLogic(workforceReports, query);

      setWorkforceDetails(res);
    } else if (selectedTableList === 2) {
      const res = SearchLogic(w2sReports, query);
      setW2SDetails(res);
    } else if (selectedTableList === 3) {
      const res = SearchLogic(w2hReports, query);
      setw2hDetails(res);
    } else {
      const res = SearchLogic(c2cReports, query);
      setc2cDetails(res);
    }
  };

  // Toggle column visibility
  const [open, setOpen] = useState(false);

  const arrayList = [
    { id: 1, hractionlist: "Total Employee", value: 55, fill: "#FFBA27" },
    { id: 2, hractionlist: "W2S", value: 26, fill: "#41A4FF" },
    { id: 3, hractionlist: "W2H", value: 108, fill: "#00FF47" },
    { id: 4, hractionlist: "C2C", value: 22, fill: "#935AFF" },
  ];

  return (
    <div className="row">
      {open && <EmployeePopup show={open} close={() => setOpen(false)} selectedTableList={selectedTableList}/>}
      <div className="col-12 px-0">
        <div className="d-flex justify-content-between align-items-center gap-3 mb-3 align-items-center">
          <h4 className="textheader heading2">Workforce Details</h4>
          <div className="d-flex gap-2 align-items-center">
            <div className="d-flex gap-2 selectborder searchbar ps-2 align-items-center">
              <div className="mt-1">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="px-2 py-1"
                value={search}
                onChange={handleSearch}
              />
            </div>
            <UnfoldMoreOutlinedIcon
              className="cursorpointer"
              onClick={() => setOpen((prev) => !prev)}
              sx={{ color: useColors.themeRed, rotate: "36deg" }}
            />
          </div>
        </div>
      </div>
      <div className="col-4">
        <Employees
          employeelist={arrayList}
          selectedListId={(data: any) => setTableList(data)}
        />
      </div>
      {/* Table Section */}
      <div className="col-8 px-0" style={{ overflowX: "auto" }}>
        {selectedTableList === 1 && (
          <table id="printSection" className="table mb-0 tabletype">
            <thead style={{ backgroundColor: "#F6F7FB" }}>
              <tr>
                <th scope="col" className="position-relative textheader para">
                  Employee name
                </th>
                <th scope="col" className="position-relative textheader para">
                  Department
                </th>
              </tr>
            </thead>
            <tbody className="dashboardcard">
              {workforceDetails?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      onClick={() => setOpen((prev) => !prev)}
                    >
                      {prehire?.employeename}
                    </td>
                    <td className="para cursorpointer textheader">
                      {prehire?.department}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        )}

        {selectedTableList === 2 && (
          <table id="printSection" className="table mb-0 tabletype">
            <thead style={{ backgroundColor: "#F6F7FB" }}>
              <tr>
                <th scope="col" className="position-relative textheader para">
                  Employee name
                </th>
                <th scope="col" className="position-relative textheader para">
                  Department
                </th>
              </tr>
            </thead>
            <tbody className="dashboardcard">
              {w2SDetails?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      onClick={() => setOpen((prev) => !prev)}
                    >
                      {prehire?.employeename}
                    </td>
                    <td className="para cursorpointer textheader">
                      {prehire?.department}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        )}

        {selectedTableList === 3 && (
          <table id="printSection" className="table mb-0 tabletype">
            <thead style={{ backgroundColor: "#F6F7FB" }}>
              <tr>
                <th scope="col" className="position-relative textheader para">
                  Employee name
                </th>
                <th scope="col" className="position-relative textheader para">
                  Department
                </th>
              </tr>
            </thead>
            <tbody className="dashboardcard">
              {w2HDetails?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      onClick={() => setOpen((prev) => !prev)}
                    >
                      {prehire?.employeename}
                    </td>
                    <td className="para cursorpointer textheader">
                      {prehire?.department}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        )}

        {selectedTableList === 4 && (
          <table id="printSection" className="table mb-0 tabletype">
            <thead style={{ backgroundColor: "#F6F7FB" }}>
              <tr>
                <th scope="col" className="position-relative textheader para">
                  Employee name
                </th>
                <th scope="col" className="position-relative textheader para">
                  Department
                </th>
              </tr>
            </thead>
            <tbody className="dashboardcard">
              {c2cDetails?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      onClick={() => setOpen((prev) => !prev)}
                    >
                      {prehire?.employeename}
                    </td>
                    <td className="para cursorpointer textheader">
                      {prehire?.department}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Workforce;
