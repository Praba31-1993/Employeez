import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setMode } from "@/app/redux/slices/modeSlice";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import { Colors } from "../styles";
import { useEffect } from "react";

export function Modecustomization() {
    const useColors = Colors(); // Fetch theme colors
    const dispatch = useDispatch();
    const currentMode = useSelector((state: RootState) => state.mode.mode); // Access mode state

    const handleModeChange = (mode: string) => {
        dispatch(setMode(mode)); // Update mode
        localStorage.setItem("themeMode", mode); // Optional: Save mode to localStorage
    };
    
       
    // Apply background color based on mode
    useEffect(() => {
        // Update background color
        if (currentMode === "light") {
            document.body.style.backgroundColor = "#f5f5f5"; // Light background color
        } else if (currentMode === "dark") {
            document.body.style.backgroundColor = "#000000"; // Dark background color
        } else if (currentMode === "system") {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            document.body.style.backgroundColor = prefersDark ? "#000000" : "#f5f5f5"; // System mode
        }
    
        // Update body class
        const updateBodyClass = () => {
            document.body.classList.remove("light", "dark"); // Remove previous classes
            if (currentMode === "light") {
                document.body.classList.add("light");
            } else if (currentMode === "dark") {
                document.body.classList.add("dark");
            } else if (currentMode === "system") {
                const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                document.body.classList.add(prefersDark ? "dark" : "light");
            }
        };
    
        // Call the function to apply classes
        updateBodyClass();
    
        // Add listener for system mode
        if (currentMode === "system") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const listener = (e: MediaQueryListEvent) => {
                document.body.classList.remove("light", "dark");
                document.body.classList.add(e.matches ? "dark" : "light");
            };
            mediaQuery.addEventListener("change", listener);
    
            // Cleanup listener on unmount or mode change
            return () => mediaQuery.removeEventListener("change", listener);
        }
    }, [currentMode]);
    

    return (
        <div className="col-12 mt-2">
            <h5 className="para mb-0">Mode</h5>
            <div className="row mt-2">
                {/* Light Mode */}
                <div className="col-4">
                    <div
                        className={`w-100 d-flex align-items-center justify-content-center ${currentMode === "light" ? "active" : ""}`}
                        onClick={() => handleModeChange("light")}
                        style={{ border: "1px solid #E8E7EB", borderRadius: "5px", cursor: "pointer" }}
                    >
                        <LightModeOutlinedIcon
                            className="m-4"
                            sx={{ color: currentMode === "light" ? useColors.themeRed : "#888" }} // Change color when active
                        />
                    </div>
                    <p className="mb-0 py-1 shade" style={{ fontSize: "10px" }}>Light</p>
                </div>
                {/* Dark Mode */}
                <div className="col-4">
                    <div
                        className={`w-100 d-flex align-items-center justify-content-center ${currentMode === "dark" ? "active" : ""}`}
                        onClick={() => handleModeChange("dark")}
                        style={{ border: "1px solid #E8E7EB", borderRadius: "5px", cursor: "pointer" }}
                    >
                        <NightsStayOutlinedIcon
                            className="m-4"
                            sx={{ color: currentMode === "dark" ? useColors.themeRed : "#888" }} // Change color when active
                        />
                    </div>
                    <p className="mb-0 py-1 shade" style={{ fontSize: "10px" }}>Dark</p>
                </div>
                {/* System Mode */}
                <div className="col-4">
                    <div
                        className={`w-100 d-flex align-items-center justify-content-center ${currentMode === "system" ? "active" : ""}`}
                        onClick={() => handleModeChange("system")}
                        style={{ border: "1px solid #E8E7EB", borderRadius: "5px", cursor: "pointer" }}
                    >
                        <ComputerOutlinedIcon
                            className="m-4"
                            sx={{ color: currentMode === "system" ? useColors.themeRed : "#888" }} // Change color when active
                        />
                    </div>
                    <p className="mb-0 py-1 shade" style={{ fontSize: "10px" }}>System</p>
                </div>
            </div>
        </div>
    );
}
