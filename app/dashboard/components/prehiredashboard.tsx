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
import { getEmployeeHiringDetailsByBunit } from "@/app/api/Listingapis";
import { AppDispatch, RootState } from "../../redux/store";
import { useSelector } from "react-redux";


type Row = {
    id: number | string;
    request_type: string;
    submitted_date: string;
    approved_by: string;
    status: string;
};

function Prehiredashboard() {
    const [open, setOpen] = useState(false);
    const [openReportdetailpopup, setReportdetailpopup] = useState(false);
    const [search, setSearch] = useState<string>("");
    const [rowsList, setRows] = useState<any>(getCompHistory);
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const [selectedTableList, setTableList] = useState<any>(1);
    const [prehireDetails, setPrehiredetails] = useState<any[]>([]);
    const [filteringprehireDetails, setFilteringPrehiredetails] = useState<any[]>(
        []
    );

    const [originalDetails, setoriginalDetails] = useState<any[]>([]); // Store the original data
    const [selectedEmployeeDetails, setselectedEmployeeDetails] = useState<any>();
    const [hiringDetails, sethiringdetails] = useState<any>();
    const [filteringhiringDetails, setfilteringhiringdetails] = useState<any>();

    const [onboardingDetails, setOnboardingdetails] = useState<any>();
    const [filteringonboardingDetails, setfilteringOnboardingdetails] =
        useState<any>();

    const [supplierboardingDetails, setsupplierOnboardingdetails] =
        useState<any>();

    const [
        filteringsupplierboardingDetails,
        setfilteringsupplierOnboardingdetails,
    ] = useState<any>();

    const [isSupplierOnboardedclicked, setIsSupplierOnboardedClicked] =
        useState(false);
    const [lengthofprehirereport, setlengthofprehirereport] = useState(null);
    const [lengthofhiringreport, setlengthofhiringreport] = useState(null);
    const [lengthofonboardingreport, setlengthofonboardingreport] =
        useState(null);
    const [lengthofSupplierOnboadingreport, setlengthofSupplierOnboardingreport] =
        useState(null);

    const bunit = localStorage.getItem("bunit");

    const selectedBunites: any = useSelector(
        (state: RootState) => state.bussinessunit.bunit
    );

    useEffect(() => {
        // Store original data only once (when it's empty)
        if (originalDetails.length === 0 && prehireDetails.length > 0) {
            setoriginalDetails(prehireDetails);
        }
    }, [prehireDetails]); // Runs when prehireDetails updates

    // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const query = event.target.value;

    //   setSearch(query);

    //   let res: any[] = [];

    //   if (selectedTableList === 1) {
    //     // Filter the first 5 items from prehireDetails

    //     const resizedData = originalDetails?.slice(0, 5);

    //     res = SearchLogic(resizedData, query);

    //     setPrehiredetails(res);
    //   } else if (selectedTableList === 2) {
    //     if (hiringDetails.length > 0 && originalDetails.length === 0) {
    //       // Only set originalDetails once for hiringDetails

    //       setoriginalDetails([...hiringDetails]);
    //     }

    //     res = SearchLogic(originalDetails, query);

    //     sethiringdetails(res);
    //   } else if (selectedTableList === 3) {
    //     if (onboardingDetails.length > 0 && originalDetails.length === 0) {
    //       // Only set originalDetails once for onboardingDetails

    //       setoriginalDetails([...onboardingDetails]);
    //     }

    //     res = SearchLogic(originalDetails, query);

    //     setOnboardingdetails(res);
    //   } else {
    //     if (supplieronboardingReport.length > 0 && originalDetails.length === 0) {
    //       // Only set originalDetails once for supplieronboardingReport

    //       setoriginalDetails([...supplieronboardingReport]);
    //     }

    //     res = SearchLogic(originalDetails, query);

    //     setsupplierOnboardingdetails(res);
    //   }

    // };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearch(query);
        if (selectedTableList === 1) {
            const filteredResults = filteringprehireDetails.filter((emp: any) =>
                Object.values(emp).some(
                    (value) =>
                        typeof value === "string" &&
                        value.toLowerCase().includes(query.toLowerCase())
                )
            );

            const resw2s =
                filteredResults.length > 0
                    ? filteredResults?.slice(0, 5)
                    : prehireDetails?.slice(0, 5);


            setPrehiredetails(resw2s);
        } else if (selectedTableList === 2) {
            const filteredResults = filteringhiringDetails.filter((emp: any) =>
                Object.values(emp).some(
                    (value) =>
                        typeof value === "string" &&
                        value.toLowerCase().includes(query.toLowerCase())
                )
            );

            const resw2s =
                filteredResults.length > 0
                    ? filteredResults?.slice(0, 5)
                    : hiringDetails?.slice(0, 5);

            sethiringdetails(resw2s);
        }

        else if (selectedTableList === 3) {
            const filteredResults = filteringonboardingDetails.filter((emp: any) =>
                Object.values(emp).some(
                    (value) =>
                        typeof value === "string" &&
                        value.toLowerCase().includes(query.toLowerCase())
                )
            );

            const resw2s =
                filteredResults.length > 0
                    ? filteredResults?.slice(0, 5)
                    : onboardingDetails?.slice(0, 5);


            setOnboardingdetails(resw2s);
        } else if (selectedTableList === 4) {
            const filteredResults = filteringsupplierboardingDetails.filter(
                (emp: any) =>
                    Object.values(emp).some(
                        (value) =>
                            typeof value === "string" &&
                            value.toLowerCase().includes(query.toLowerCase())
                    )
            );

            const resw2s =
                filteredResults.length > 0
                    ? filteredResults?.slice(0, 5)
                    : supplierboardingDetails?.slice(0, 5);


            setsupplierOnboardingdetails(resw2s);
        }
    };


    useEffect(() => {
        // Simulate data fetching delay
        const timer = setTimeout(() => setLoading(false), 2000); // Adjust timeout as necessary
        return () => clearTimeout(timer);
    }, []);

    const useColors = Colors();



    const fetchPrehireData = async () => {
        try {
            const prehireData = await getEmployeeHiringDetailsByBunit(selectedBunites.bunit, "ph");

            if (prehireData.status === 200) {
                if (prehireData?.data?.PreHireInfo) {
                    setPrehiredetails(prehireData?.data?.PreHireInfo);
                    setFilteringPrehiredetails(prehireData?.data?.PreHireInfo);
                    setlengthofprehirereport(prehireData?.data?.PreHireInfo?.length);
                } else {
                    console.warn("PreHireInfo key not found in response data.");
                    setPrehiredetails([]); // Set an empty array or default value to avoid errors
                }
            } else if (prehireData.status === 400) {
                console.error("Bad Request: Invalid input parameters.");
            } else if (prehireData.status === 500) {
                console.error("Server Error: Something went wrong on the backend.");
            } else {
                console.error(`Unexpected Error: Status Code ${prehireData.status}`);
            }

        } catch (error) {
            console.error("Failed to fetch prehire data:", error);
        }
    };

    const fetchhiringData = async () => {
        try {
            const hiringData = await getEmployeeHiringDetailsByBunit(selectedBunites.bunit, "Active");

            if (hiringData.status === 200) {
                if (hiringData?.data?.EmpInfo) {
                    sethiringdetails(hiringData?.data?.EmpInfo);
                    setfilteringhiringdetails(hiringData?.data?.EmpInfo);
                    setlengthofhiringreport(hiringData?.data?.EmpInfo?.length);
                } else {
                    console.warn("PreHireInfo key not found in response data.");
                    sethiringdetails([]);
                }
            } else if (hiringData.status === 400) {
                console.error("Bad Request: Invalid input parameters.");
            } else if (hiringData.status === 500) {
                console.error("Server Error: Something went wrong on the backend.");
            } else {
                console.error(`Unexpected Error: Status Code ${hiringData.status}`);
            }

        } catch (error) {
            console.error("Failed to fetch prehire data:", error);
        }
    };

    const fetchOnboardingData = async () => {
        try {
            const onboardingData = await getEmployeeHiringDetailsByBunit(selectedBunites.bunit, "to");

            if (onboardingData.status === 200) {
                if (onboardingData?.data?.TempOnboardInfo) {
                    setOnboardingdetails(onboardingData?.data?.TempOnboardInfo);
                    setfilteringOnboardingdetails(onboardingData?.data?.TempOnboardInfo);
                    setlengthofonboardingreport(
                        onboardingData?.data?.TempOnboardInfo?.length
                    );
                } else {
                    console.warn("PreHireInfo key not found in response data.");
                    setOnboardingdetails([]); // Set an empty array or default value to avoid errors
                }
            } else if (onboardingData.status === 400) {
                console.error("Bad Request: Invalid input parameters.");
            } else if (onboardingData.status === 500) {
                console.error("Server Error: Something went wrong on the backend.");
            } else {
                console.error(`Unexpected Error: Status Code ${onboardingData.status}`);
            }
        } catch (error) {
            console.error("Failed to fetch prehire data:", error);
        }
    };

    const fetchSupplierOnboardingData = async () => {
        try {
            const supplieronboardingData = await getEmployeeHiringDetailsByBunit(
                selectedBunites.bunit,
                "so"
            );

            if (supplieronboardingData.status === 200) {
                if (supplieronboardingData?.data?.SuppInfo) {
                    setsupplierOnboardingdetails(supplieronboardingData?.data?.SuppInfo);
                    setfilteringsupplierOnboardingdetails(
                        supplieronboardingData?.data?.SuppInfo
                    );
                    setlengthofSupplierOnboardingreport(
                        supplieronboardingData?.data?.SuppInfo?.length
                    );
                } else {
                    console.warn("PreHireInfo key not found in response data.");
                    setsupplierOnboardingdetails([]);
                }
            } else if (supplieronboardingData.status === 400) {
                console.error("Bad Request: Invalid input parameters.");
            } else if (supplieronboardingData.status === 500) {
                console.error("Server Error: Something went wrong on the backend.");
            } else {
                console.error(
                    `Unexpected Error: Status Code ${supplieronboardingData.status}`
                );
            }
        } catch (error) {
            console.error("Failed to fetch prehire data:", error);
        }
    };

    useEffect(() => {
        if (selectedBunites?.bunit !== undefined) {
            fetchPrehireData();
            fetchhiringData();
            fetchOnboardingData();
            fetchSupplierOnboardingData();
        }
    }, [selectedBunites?.bunit]);


    const arrayList = [
        {
            id: 1,
            hractionlist: "Prehire",
            value: lengthofprehirereport ? lengthofprehirereport : "--",
            fill: "#FFBA27",
        },
        {
            id: 2,
            hractionlist: "Hiring",
            value: lengthofhiringreport ? lengthofhiringreport : "--",
            fill: "#41A4FF",
        },
        {
            id: 3,
            hractionlist: "Onboarding",
            value: lengthofonboardingreport ? lengthofonboardingreport : "--",
            fill: "#00FF47",
        },
        {
            id: 4,
            hractionlist: "Supplier Onboarding",
            value: lengthofSupplierOnboadingreport
                ? lengthofSupplierOnboadingreport
                : "--",
            fill: "#935AFF",
        },
    ];

    return (
        <div className="row">
            {open && (
                <Reportspoup
                    show={open}
                    close={() => setOpen(false)}
                    selectedTableList={selectedTableList}
                    selectedEmployee={(data: any) => setselectedEmployeeDetails(data)}
                    prehiringdatas={prehireDetails}
                    hiringdatas={hiringDetails}
                    onboardingdatas={onboardingDetails}
                    supplieronboardingDatas={supplierboardingDetails}
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
                    <h4 className="textheader heading2 fw-bold">Recruitment Report</h4>
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
                <div className="d-flex employreports align-items-center flex-lg-column gap-3 gap-md-0" style={{ overflowY: "auto" }}>
                <Hrdatas
                    hrlist={arrayList}
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
                            {prehireDetails?.map((prehire: any, index: number) =>
                                index <= 4 ? (
                                    <tr key={index}>
                                        <td
                                            className="para cursorpointer textheader"
                                        // onClick={() => {
                                        //   setReportdetailpopup((prev) => !prev),
                                        //     setIsSupplierOnboardedClicked(true),
                                        //     setselectedEmployeeDetails(() =>
                                        //       prehireDetails?.filter(
                                        //         (list: any) => list.empId === prehire?.empId
                                        //       )
                                        //     );
                                        // }}
                                        >
                                            {prehire?.firstName?.charAt(0).toUpperCase() +
                                                prehire?.firstName?.slice(1).toLowerCase() +
                                                " " +
                                                prehire?.lastName?.charAt(0).toUpperCase() +
                                                prehire?.lastName?.slice(1).toLowerCase()}
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
                            {hiringDetails?.map((hiring: any, index: number) =>
                                index <= 4 ? (
                                    <tr key={index}>
                                        <td
                                            className="para cursorpointer textheader"
                                        // onClick={() => {
                                        //   setReportdetailpopup((prev) => !prev),
                                        //     setIsSupplierOnboardedClicked(true),
                                        //     setselectedEmployeeDetails(() =>
                                        //       hiringDetails?.filter(
                                        //         (list: any) => list.empId === hiring?.empId
                                        //       )
                                        //     );
                                        // }}
                                        >
                                            {hiring?.name?.charAt(0).toUpperCase() +
                                                hiring?.name?.slice(0)}
                                        </td>
                                        <td className="para cursorpointer textheader">
                                            {hiring?.department !== undefined
                                                ? hiring?.department
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
                            {onboardingDetails?.map((prehire: any, index: number) =>
                                index <= 4 ? (
                                    <tr key={index}>
                                        <td
                                            className="para cursorpointer textheader"
                                        // onClick={() => {
                                        //   setReportdetailpopup((prev) => !prev),
                                        //     setIsSupplierOnboardedClicked(false),
                                        //     setselectedEmployeeDetails(() =>
                                        //       onboardingDetails?.filter(
                                        //         (list: any) => list.empId === prehire?.empId
                                        //       )
                                        //     );
                                        // }}
                                        >
                                            {prehire?.name?.charAt(0).toUpperCase() +
                                                prehire?.name?.slice(0)}
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
                                        // onClick={() => {
                                        //   setReportdetailpopup((prev) => !prev),
                                        //     setIsSupplierOnboardedClicked(true),
                                        //     setselectedEmployeeDetails(() =>
                                        //       supplierboardingDetails?.filter(
                                        //         (list: any) => list?.id === prehire?.id
                                        //       )
                                        //     );
                                        // }}
                                        >
                                            {prehire?.contractorname?.charAt(0).toUpperCase() +
                                                prehire?.contractorname?.slice(0)}
                                        </td>
                                        <td className="para cursorpointer textheader">
                                            {prehire?.supplierName?.charAt(0).toUpperCase() +
                                                prehire?.supplierName?.slice(0)}
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

export default Prehiredashboard;
function setLoading(arg0: boolean): void {
    throw new Error("Function not implemented.");
}

