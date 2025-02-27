"use client";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setMeetingModeBorderColor } from "@/app/redux/slices/meetingmodeSlice";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

export function BorderColorPicker() {
    const dispatch = useDispatch();

    // Read from Redux store
    const selectedBorder = useSelector(
        (state: RootState) => state.meetingmode.background
    );

    // Default color
    const defaultColor = "transparent";

    // On component mount, set default color if nothing is stored
    useEffect(() => {
        const storedColor = localStorage.getItem("meetingModeborder");
        if (storedColor) {
            dispatch(setMeetingModeBorderColor({ background: storedColor }));
        } else {
            dispatch(setMeetingModeBorderColor({ background: defaultColor }));
        }
    }, [dispatch]);

    // Update localStorage when selectedBorder changes
    useEffect(() => {
        if (selectedBorder) {
            localStorage.setItem("meetingModeborder", selectedBorder);
        }
    }, [selectedBorder]);

    // Handle color selection from preset
    const handlePresetClick = (color: string) => {
        dispatch(setMeetingModeBorderColor({ background: color }));
    };

    // Preset colors
    const colors = ["#f4433626", "#2196f31c", "#ffc10745", "#3f51b53d",];

    return (
        <div className="col-12 mt-3">
            <h5 className="para mb-0">Meeting Mode Border Color</h5>
            <div
                className="d-flex ps-1 mt-2 align-items-center"
                style={{ gap: "10px" }}
            >
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="colortheme text-center"
                        style={{
                            border: `1px solid ${color}`,
                            borderRadius: "5px",
                        }}
                    >
                        <div
                            className="m-1"
                            style={{
                                height: "30px",
                                width: "30px",
                                background: color,
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                            onClick={() => handlePresetClick(color)}
                        />
                    </div>
                ))}
                <div

                    className="colortheme text-center"
                    style={{
                        border: `1px solid rgb(244, 244, 244)`,
                        borderRadius: "5px",
                    }}
                >
                    <div
                        className="m-1"
                        style={{
                            height: "30px",
                            width: "30px",
                            background: "rgb(244, 244, 244)",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => handlePresetClick("transparent")}
                    />
                </div>

            </div>
        </div>
    );
}
