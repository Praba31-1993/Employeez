import { Colors } from "../styles";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import ToggleSwitch from "../toggleSwitch";

interface DashboardcustomizationProps {
  dashboardLayout: any;
  toggleChange:(id:any)=>void;
}
export function Dashboardcustomization({
  dashboardLayout,
  toggleChange,
}: DashboardcustomizationProps) {
  const useColors = Colors();
  return (
    <div className="col-12 mt-2">
      <div className="d-flex align-items-center justify-content-between  mt-3">
        <div className="d-flex align-items-center">
          <div
            className=""
            style={{
              width: "fit-content",
              background: useColors.themeRed,
              borderRadius: "50%",
            }}
          >
            <SpaceDashboardOutlinedIcon className="text-white m-1" />
          </div>
          <p className="mb-0 ps-2 para shade">{dashboardLayout?.label}</p>
        </div>
        <ToggleSwitch
          isChecked={dashboardLayout?.checked}
          onToggle={()=>toggleChange(dashboardLayout?.id)}
        />
      </div>
    </div>
  );
}
