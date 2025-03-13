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
import Employreportdetails from "./reportscomponent/emplyoyeesdetailreportpopup";
import { getWorkForceReportByBunit } from "@/app/api/Listingapis";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

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
  const [selectedEmployeeDetails, setselectedEmployeeDetails] = useState<any>();
  const [employeeList, setEmployeeList] = useState<any>();
  const [w2sapidata, setw2sapidata] = useState<any>();
  const [w2hapidata, setw2hapidata] = useState<any>();
  const [c2capidata, setc2capidata] = useState<any>();
  const [seventythirtyapidata, setseventythirtyapidata] = useState<any>();
  const [originalDetails, setoriginalDetails] = useState<any[]>([]); // Store the original data

  const [eightytwentyapidata, seteightytwentyapidata] = useState<any>();
  const [independentcontractorapidata, setndependentcontractorapidata] =
    useState<any>();

  const useColors = Colors();
  const selectedBunites: any = useSelector(
    (state: RootState) => state?.bussinessunit?.bunit
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust timeout as necessary
    return () => clearTimeout(timer);
  }, []);


  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = event.target.value;
  //   setSearch(query);

  // };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearch(query);
    if (selectedTableList === 1) {
      const filteredResults = employeeList?.empListInfo
        ?.filter((emp: any) => emp.hiringModelCode === "W2S")
        .filter((emp: any) =>
          Object.values(emp).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(query.toLowerCase())
          )
        );

      const resw2s =
        filteredResults.length > 0
          ? filteredResults.slice(0, 5)
          : w2sapidata.slice(0, 5);


      setw2sapidata(resw2s);
    } else if (selectedTableList === 2) {
      const filteredResults = employeeList?.empListInfo
        ?.filter((emp: any) => emp.hiringModelCode === "W2H")
        .filter((emp: any) =>
          Object.values(emp).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(query.toLowerCase())
          )
        );

      const resw2s =
        filteredResults.length > 0
          ? filteredResults.slice(0, 5)
          : w2sapidata.slice(0, 5);


      setw2hapidata(resw2s);
    } else if (selectedTableList === 3) {
      const filteredResults = employeeList?.empListInfo
        ?.filter((emp: any) => emp.hiringModelCode === "C2C")
        .filter((emp: any) =>
          Object.values(emp).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(query.toLowerCase())
          )
        );

      const resw2s =
        filteredResults.length > 0
          ? filteredResults.slice(0, 5)
          : w2sapidata.slice(0, 5);


      setc2capidata(resw2s);
    } else if (selectedTableList === 4) {
      const filteredResults = employeeList?.empListInfo
        ?.filter((emp: any) => emp.hiringModelCode === "80_20")
        .filter((emp: any) =>
          Object.values(emp).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(query.toLowerCase())
          )
        );

      const resw2s =
        filteredResults.length > 0
          ? filteredResults.slice(0, 5)
          : w2sapidata.slice(0, 5);


      seteightytwentyapidata(resw2s);
    } else if (selectedTableList === 5) {
      const filteredResults = employeeList?.empListInfo
        ?.filter((emp: any) => emp.hiringModelCode === "70_30")
        .filter((emp: any) =>
          Object.values(emp).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(query.toLowerCase())
          )
        );

      const resw2s =
        filteredResults.length > 0
          ? filteredResults.slice(0, 5)
          : w2sapidata.slice(0, 5);


      setseventythirtyapidata(resw2s);
    } else if (selectedTableList === 6) {
      const filteredResults = employeeList?.empListInfo
        ?.filter((emp: any) => emp.hiringModelCode === "1099")
        .filter((emp: any) =>
          Object.values(emp).some(
            (value) =>
              typeof value === "string" &&
              value.toLowerCase().includes(query.toLowerCase())
          )
        );

      const resw2s =
        filteredResults.length > 0
          ? filteredResults.slice(0, 5)
          : w2sapidata.slice(0, 5);


      setndependentcontractorapidata(resw2s);
    }
  };

  // Toggle column visibility
  const [open, setOpen] = useState(false);
  const [workforcedetailpopup, setWorkForcedetailpopup] = useState(false);

  // cons ListedData =

  const arrayList = [
    {
      id: 1,
      hractionlist: employeeList?.hiringModelInfo?.[5]?.hiringModel,
      value: employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "W2S"
      )?.length,
      fill: "#FFBA27",
    },
    {
      id: 2,
      hractionlist: employeeList?.hiringModelInfo?.[4]?.hiringModel,
      value: employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "W2H"
      )?.length,
      fill: "#FFBA27",
    },
    {
      id: 3,
      hractionlist: employeeList?.hiringModelInfo?.[3]?.hiringModel,
      value: employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "C2C"
      )?.length,
      fill: "#FFBA27",
    },
    {
      id: 4,
      hractionlist: employeeList?.hiringModelInfo?.[2]?.hiringModel,
      value: employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "80_20"
      )?.length,
      fill: "#FFBA27",
    },
    {
      id: 5,
      hractionlist: employeeList?.hiringModelInfo?.[1]?.hiringModel,
      value: employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "70_30"
      )?.length,
      fill: "#FFBA27",
    },
    {
      id: 6,
      hractionlist: employeeList?.hiringModelInfo?.[0]?.hiringModel,
      value: employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "1099"
      )?.length,
      fill: "#FFBA27",
    },
  ];

  useEffect(() => {
    setw2sapidata(
      employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "W2S"
      )
    );
    setw2sapidata(
      employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "W2S"
      )
    );
    setw2hapidata(
      employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "W2H"
      )
    );

    setc2capidata(
      employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "C2C"
      )
    );
    seteightytwentyapidata(
      employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "80_20"
      )
    );

    setseventythirtyapidata(
      employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "70_30"
      )
    );

    setndependentcontractorapidata(
      employeeList?.empListInfo?.filter(
        (emp: any) => emp.hiringModelCode === "1099"
      )
    );
  }, [employeeList]);

  const fetchPrehireData = async () => {
    try {
      const workforceData = await getWorkForceReportByBunit(
        selectedBunites?.bunit
      );

      if (workforceData.status === 200) {
        if (workforceData?.data) {
          setEmployeeList(workforceData?.data);
        } else {
        }
      } else if (workforceData.status === 400) {
      } else if (workforceData.status === 500) {
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (selectedBunites?.bunit !== undefined) {
      fetchPrehireData();
    }
  }, [selectedBunites?.bunit]);


  return (
    <div className="row">
      {open && (
        <EmployeePopup
          show={open}
          close={() => setOpen(false)}
          selectedTableList={selectedTableList}
          selectedEmployee={(data: any) => setselectedEmployeeDetails(data)}
          w2semployeeeList={w2sapidata}
          w2hemployeeeList={w2hapidata}
          c2cemployeeeList={c2capidata}
          seventythirtyemployeeeList={seventythirtyapidata}
          eightytwentyemployeeList={eightytwentyapidata}
          independentcontractoremployeeList={independentcontractorapidata}
        />
      )}
      {workforcedetailpopup && (
        <Employreportdetails
          show={workforcedetailpopup}
          close={() => setWorkForcedetailpopup(false)}
          selectedEmployeeDetails={selectedEmployeeDetails?.[0]}
        />
      )}
      <div className="col-12 px-0">
        <div className="d-flex justify-content-between align-items-center gap-3 mb-3 align-items-center">
          <h4 className="textheader heading2 fw-bold">Workforce Details</h4>
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
      <div className="col-md-4">
        <div className="d-flex employreports align-items-center flex-lg-column gap-3 gap-md-1" style={{ overflowY: "auto" }}>
          <Employees
            employeelist={arrayList}
            selectedListId={(data: any) => setTableList(data)}
          />
        </div>
      </div>
      {/* Table Section */}
      <div className="col-md-8 px-0" style={{ overflowX: "auto" }}>
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
              {w2sapidata?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      // onClick={() => {
                      //   setWorkForcedetailpopup((prev) => !prev),
                      //     setselectedEmployeeDetails(() =>
                      //       w2sapidata?.filter(
                      //         (list: any) => list?.empId === prehire?.empId
                      //       )
                      //     );
                      // }}
                    >
                      {prehire?.firstName}
                    </td>
                    <td className="para cursorpointer textheader">
                      {prehire?.department !== undefined
                        ? prehire?.department
                        : "--"}
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
              {w2hapidata?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      // onClick={() => {
                      //   setWorkForcedetailpopup((prev) => !prev),
                      //     setselectedEmployeeDetails(() =>
                      //       w2hapidata?.filter(
                      //         (list: any) => list?.empId === prehire?.empId
                      //       )
                      //     );
                      // }}
                    >
                      {prehire?.firstName}
                    </td>
                    <td className="para cursorpointer textheader">
                      {prehire?.department !== undefined
                        ? prehire?.department
                        : "--"}
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
              {c2capidata?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      // onClick={() => {
                      //   setWorkForcedetailpopup((prev) => !prev),
                      //     setselectedEmployeeDetails(() =>
                      //       c2capidata?.filter(
                      //         (list: any) => list?.empId === prehire?.empId
                      //       )
                      //     );
                      // }}
                    >
                      {prehire?.firstName}
                    </td>
                    <td className="para cursorpointer textheader">
                      {prehire?.department !== undefined
                        ? prehire?.department
                        : "--"}
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
              {eightytwentyapidata?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      // onClick={() => {
                      //   setWorkForcedetailpopup((prev) => !prev),
                      //     setselectedEmployeeDetails(() =>
                      //       eightytwentyapidata?.filter(
                      //         (list: any) => list?.empId === prehire?.empId
                      //       )
                      //     );
                      // }}
                    >
                      {prehire?.firstName}
                    </td>
                    <td className="para cursorpointer textheader">
                      {prehire?.department !== undefined
                        ? prehire?.department
                        : "--"}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        )}

        {selectedTableList === 5 && (
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
              {seventythirtyapidata?.map((prehire: any, index: number) =>
                index <= 4 ? (
                  <tr key={index}>
                    <td
                      className="para cursorpointer textheader"
                      // onClick={() => {
                      //   setWorkForcedetailpopup((prev) => !prev),
                      //     setselectedEmployeeDetails(() =>
                      //       seventythirtyapidata?.filter(
                      //         (list: any) => list?.empId === prehire?.empId
                      //       )
                      //     );
                      // }}
                    >
                      {prehire?.firstName}
                    </td>
                    <td className="para cursorpointer textheader">
                      {prehire?.department !== undefined
                        ? prehire?.department
                        : "--"}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        )}

        {selectedTableList === 6 && (
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
              {independentcontractorapidata?.map(
                (prehire: any, index: number) =>
                  index <= 4 ? (
                    <tr key={index}>
                      <td
                        className="para cursorpointer textheader"
                        // onClick={() => {
                        //   setWorkForcedetailpopup((prev) => !prev),
                        //     setselectedEmployeeDetails(() =>
                        //       independentcontractorapidata?.filter(
                        //         (list: any) => list?.empId === prehire?.empId
                        //       )
                        //     );
                        // }}
                      >
                        {prehire?.firstName}
                      </td>
                      <td className="para cursorpointer textheader">
                        {prehire?.department !== undefined
                          ? prehire?.department
                          : "--"}
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
