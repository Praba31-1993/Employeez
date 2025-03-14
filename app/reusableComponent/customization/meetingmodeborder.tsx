"use client";

import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setMeetingModeBorderColor } from "@/app/redux/slices/meetingmodeSlice";
import { RootState } from "../../redux/store";
import { useEffect, useMemo } from "react";

export function BorderColorPicker() {
    const dispatch = useDispatch();

    // Read from Redux store
    const selectedBorder = useSelector(
        (state: RootState) => state.meetingmode.background
    );

    // Preset colors (memoized for performance)
    const colors = useMemo(
        () => ["#f4433626", "#2196f31c", "#ffc10745", "#3f51b53d"],
        []
    );

    // On mount, read from localStorage if available (only on client-side)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedColor = localStorage.getItem("meetingModeborder") || "transparent";
            dispatch(setMeetingModeBorderColor({ background: storedColor }));
        }
    }, [dispatch]);

    // Update localStorage when selectedBorder changes
    useEffect(() => {
        if (typeof window !== "undefined" && selectedBorder) {
            localStorage.setItem("meetingModeborder", selectedBorder);
        }
    }, [selectedBorder]);

    // Handle color selection
    const handlePresetClick = (color: string) => {
        dispatch(setMeetingModeBorderColor({ background: color }));
    };

    return (
        <div className="col-12 mt-3">
            <h5 className="para mb-0">Meeting Mode Border Color</h5>
            <div className="d-flex ps-1 mt-2 align-items-center" style={{ gap: "10px" }}>
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
                {/* Transparent color option */}
                <div
                    className="colortheme text-center"
                    style={{
                        border: "1px solid rgb(244, 244, 244)",
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
