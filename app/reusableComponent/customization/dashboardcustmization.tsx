import { Colors } from "../styles";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import ToggleSwitch from "../toggleSwitch";

export function Dashboardcustomization() {
    
    const useColors = Colors();
    return (
        <div className="col-12 mt-2">
            <h5 className="para  mb-0">Dashboard customization</h5>
            <div className="d-flex align-items-center justify-content-between  mt-3">
                <div className="d-flex align-items-center">
                    <div className="" style={{ width:"fit-content", background:useColors.themeRed,borderRadius:"50%"}}>
                        <SpaceDashboardOutlinedIcon className="text-white m-1" />
                    </div>
                    <p className="mb-0 ps-2 para shade">Employee board</p>
                </div>
                <ToggleSwitch isChecked={false} onToggle={function (checked: boolean): void {
                    throw new Error("Function not implemented.");
                } } />
            </div>
        </div>
    );
}