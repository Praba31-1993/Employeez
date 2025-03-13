import { getCompHistory } from "@/app/reusableComponent/JsonData";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { SearchLogic } from "@/app/reusableComponent/commonlogic";
import { Colors } from "@/app/reusableComponent/styles";
import {
  preHireReport,
  hiringReport,
  onboardingReport,
  supplieronboardingReport,
} from "@/app/reusableComponent/JsonData";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import Employees from "./employees";
import Hrdatas from "./hrdatas";
import Reportspoup from "./reportspoup";
import Employreportdetails from "./reportscomponent/emplyoyeesdetailreportpopup";
import ReportDetailsPopup from "./reportscomponent/reportdetailpopup";

type Row = {
  id: number | string;
  request_type: string;
  submitted_date: string;
  approved_by: string;
  status: string;
};

function PendingInvoiceTable({ gotochart }: any) {
  const [open, setOpen] = useState(false);
  const [openReportdetailpopup, setReportdetailpopup] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [rowsList, setRows] = useState<any>(getCompHistory);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [selectedTableList, setTableList] = useState<any>(1);
  const [prehireDetails, setPrehiredetails] = useState<any>(preHireReport);
  const [selectedEmployeeDetails, setselectedEmployeeDetails] = useState<any>();
  const [hiringDetails, sethiringdetails] = useState<any>(hiringReport);
  const [onboardingDetails, setOnboardingdetails] =
    useState<any>(onboardingReport);
  const [supplierboardingDetails, setsupplierOnboardingdetails] = useState<any>(
    supplieronboardingReport
  );
  const [isSupplierOnboardedclicked, setIsSupplierOnboardedClicked] =
    useState(false);

  const arrayList = [
    { id: 1, hractionlist: "Prehire", value: 55, fill: "#FFBA27" },
    { id: 2, hractionlist: "Hiring", value: 26, fill: "#41A4FF" },
    { id: 3, hractionlist: "Onboarding", value: 108, fill: "#00FF47" },
    { id: 4, hractionlist: "Supplier Onboarding", value: 22, fill: "#935AFF" },
  ];

  const [loading, setLoading] = useState(true);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    if (selectedTableList === 1) {
      const res = SearchLogic(preHireReport, query);

      setPrehiredetails(res);
    } else if (selectedTableList === 2) {
      const res = SearchLogic(hiringReport, query);
      sethiringdetails(res);
    } else if (selectedTableList === 3) {
      const res = SearchLogic(onboardingReport, query);
      setOnboardingdetails(res);
    } else {
      const res = SearchLogic(supplieronboardingReport, query);
      setsupplierOnboardingdetails(res);
    }
  };

  useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust timeout as necessary
    return () => clearTimeout(timer);
  }, []);

  const useColors = Colors();

  useEffect(() => {
  }, [selectedEmployeeDetails]);

  return (
    <div className="row">
      {open && (
        <Reportspoup
          show={open}
          close={() => setOpen(false)}
          selectedTableList={selectedTableList}
          selectedEmployee={(data: any) => setselectedEmployeeDetails(data)}
        />
      )}
      {openReportdetailpopup && (
        <ReportDetailsPopup
          show={openReportdetailpopup}
          close={() => setReportdetailpopup(false)}
          selectedEmployeeDetails={selectedEmployeeDetails?.[0]}
          isSuppliedOnboarded={isSupplierOnboardedclicked}
        />
      )}
      {/* Search and Tools Section */}
      <div className="col-12 px-0">
        <div className="d-flex justify-content-between align-items-center gap-3 mb-3 align-items-center">
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
            <button onClick={gotochart}>chart</button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="col-12 px-0" style={{ overflowX: "auto" }}>
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
              {prehireDetails?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      onClick={() => {
                        setReportdetailpopup((prev) => !prev),
                          setIsSupplierOnboardedClicked(true),
                          setselectedEmployeeDetails(() =>
                            prehireDetails?.filter(
                              (list: any) => list.empId === prehire?.empId
                            )
                          );
                      }}
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
              {hiringDetails?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      onClick={() => {
                        setReportdetailpopup((prev) => !prev),
                          setIsSupplierOnboardedClicked(true),
                          setselectedEmployeeDetails(() =>
                            hiringDetails?.filter(
                              (list: any) => list.empId === prehire?.empId
                            )
                          );
                      }}
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
              {onboardingDetails?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      onClick={() => {
                        setReportdetailpopup((prev) => !prev),
                          setIsSupplierOnboardedClicked(false),
                          setselectedEmployeeDetails(() =>
                            onboardingDetails?.filter(
                              (list: any) => list.empId === prehire?.empId
                            )
                          );
                      }}
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
                  Contractor name
                </th>
                <th scope="col" className="position-relative textheader para">
                  Supplier
                </th>
              </tr>
            </thead>
            <tbody className="dashboardcard">
              {supplierboardingDetails?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      onClick={() => {
                        setReportdetailpopup((prev) => !prev),
                          setIsSupplierOnboardedClicked(true),
                          setselectedEmployeeDetails(() =>
                            supplierboardingDetails?.filter(
                              (list: any) => list?.id === prehire?.id
                            )
                          );
                      }}
                    >
                      {prehire?.contractorname}
                    </td>
                    <td className="para cursorpointer textheader">
                      {prehire?.supplier}
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

export default PendingInvoiceTable;
