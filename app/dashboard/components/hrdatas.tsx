import React from "react";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PermContactCalendarOutlinedIcon from '@mui/icons-material/PermContactCalendarOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { Colors } from "@/app/reusableComponent/styles";
interface HrdatasProps {
    hrList: any;
    isPendingHrData: boolean;
}
function Hrdatas() {
    const arrayList = [
        { id: 1, hractionlist: "Prehire", value: 55, fill: "#FFBA27" },
        { id: 2, hractionlist: "Hiring", value: 26, fill: "#41A4FF" },
        { id: 3, hractionlist: "Onboarding", value: 108, fill: "#00FF47" },
        { id: 4, hractionlist: "Supplier Onboarding", value: 22, fill: "#935AFF" },
      ];
      const useColors = Colors();
      const borderAndBoxShadowStyles = {
        border: useColors.border,
        boxShadow: useColors.boxshadow,
      };
    return (
        <>
        <div className="dashboardcard p-3 d-flex align-items-center mb-3" style={borderAndBoxShadowStyles}>
            <div
                className="headingicons rounded"
                style={{
                    background: "#FFEFCD",
                    height: "fit-content",
                    width: "fit-content",
                }}
            >
                <BadgeOutlinedIcon className="m-1" sx={{ color: "#FFBA27" }} />
            </div>

            <div>
                <h5 className="heading2 ps-2 mb-0 ">{arrayList[0]?.value}</h5>
                <p className="shade para2 ps-2 mb-0 ">{arrayList[0]?.hractionlist}</p>
            </div>
        </div><div className="dashboardcard p-3 d-flex align-items-center mb-3" style={borderAndBoxShadowStyles}>
                <div
                    className="headingicons rounded"
                    style={{
                        background: "#CFE8FF",
                        height: "fit-content",
                        width: "fit-content",
                    }}
                >
                    <GroupAddOutlinedIcon className="m-1" sx={{ color: "#41A4FF" }} />
                </div>

                <div>
                    <h5 className="heading2 ps-2 mb-0 ">{arrayList[1]?.value}</h5>
                    <p className="shade para2 ps-2 mb-0 ">{arrayList[1]?.hractionlist}</p>
                </div>
            </div><div className="dashboardcard p-3 d-flex align-items-center mb-3" style={borderAndBoxShadowStyles}>
                <div
                    className="headingicons rounded"
                    style={{
                        background: "#DBFFE5",
                        height: "fit-content",
                        width: "fit-content",
                    }}
                >
                    <PermContactCalendarOutlinedIcon className="m-1" sx={{ color: "#00FF47" }} />
                </div>

                <div>
                    <h5 className="heading2 ps-2 mb-0 ">{arrayList[2]?.value}</h5>
                    <p className="shade para2 ps-2 mb-0 ">{arrayList[2]?.hractionlist}</p>
                </div>
            </div><div className="dashboardcard p-3 d-flex align-items-center" style={borderAndBoxShadowStyles}>
                <div
                    className="headingicons rounded"
                    style={{
                        background: "#DEDCFF",
                        height: "fit-content",
                        width: "fit-content",
                    }}
                >
                    <InventoryOutlinedIcon className="m-1" sx={{ color: "#935AFF" }} />
                </div>

                <div>
                    <h5 className="heading2 ps-2 mb-0 ">{arrayList[3]?.value}</h5>
                    <p className="shade para2 ps-2 mb-0 ">{arrayList[3]?.hractionlist}</p>
                </div>
            </div></>

    );
}

export default Hrdatas;
