import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import { Colors } from "@/app/reusableComponent/styles";

interface hrprops {
  hrlist?: any;
  selectedListId?: (data: any) => void;
}
function Hrdatas({ hrlist, selectedListId }: hrprops) {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(1);

  const useColors = Colors();
  const borderAndBoxShadowStyles = {
    border: useColors.border,
    boxShadow: useColors.boxshadow,
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Adjust timeout as necessary
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (selectedItem !== null && selectedListId) {
      selectedListId(selectedItem);
    }
  }, [selectedItem, selectedListId]);

  return (
    <>
      {loading
        ? // Render Skeleton Loaders
          Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="dashboardcard p-3 d-flex align-items-center mb-3"
                style={borderAndBoxShadowStyles}
              >
                <Skeleton
                  circle={true}
                  height={40}
                  width={40}
                  className="me-2"
                />
                <div>
                  <Skeleton height={20} width={50} className="mb-1" />
                  <Skeleton height={16} width={120} />
                </div>
              </div>
            ))
        : // Render Actual Data
          hrlist?.map((item: any) => (
            <div
              key={item.id}
              className="dashboardcard h-100 w-100 timesheetdetails p-3 d-flex align-items-center mb-3"
              style={{
                border:
                  item.id === selectedItem
                    ? `1px solid ${useColors.themeRed}`
                    : "",
              }}
              onClick={() => setSelectedItem(item?.id)}
            >
              <div
                className="headingicons rounded"
                style={{
                  background: item?.fill + "33", // Light background color
                  height: "fit-content",
                  width: "fit-content",
                }}
              >
                {item.id === 1 && (
                  <BadgeOutlinedIcon
                    className="m-1"
                    sx={{ color: item.fill }}
                  />
                )}
                {item.id === 2 && (
                  <GroupAddOutlinedIcon
                    className="m-1"
                    sx={{ color: item.fill }}
                  />
                )}
                {item.id === 3 && (
                  <PermContactCalendarOutlinedIcon
                    className="m-1"
                    sx={{ color: item.fill }}
                  />
                )}
                {item.id === 4 && (
                  <InventoryOutlinedIcon
                    className="m-1"
                    sx={{ color: item.fill }}
                  />
                )}
              </div>
              <div>
                <h5 className="heading2 ps-2 mb-0 ">{item.value}</h5>
                <p className="shade para2 ps-2 mb-0 " style={{whiteSpace:"nowrap"}} >{item.hractionlist}</p>
              </div>
            </div>
          ))}
    </>
  );
}

export default Hrdatas;
