"use client";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setMeetingModeBorderColor } from "@/app/redux/slices/meetingmodeSlice";
import { RootState } from "../../redux/store";
import { useEffect } from "react";

export function BorderColorPicker() {
  const selectedBorder = useSelector((state: RootState) => state.meetingmode.border);
  const dispatch = useDispatch();

  // Extracting only the color part from the stored border style
  const selectedColor = selectedBorder.split(" ")[2] || "#FF7074";

  // Check localStorage for saved border color and initialize state
  useEffect(() => {
    const savedColor = localStorage.getItem("meetingModeborder");
    if (savedColor) {
      dispatch(setMeetingModeBorderColor({ border: `1px solid ${savedColor}` }));
    }
  }, [dispatch]);

  // Update localStorage whenever the border color changes
  useEffect(() => {
    localStorage.setItem("meetingModeborder", selectedColor);
  }, [selectedColor]);

  // Handle color selection
  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    dispatch(setMeetingModeBorderColor({ border: `1px solid ${color}` }));
  };

  // Handle preset color selection
  const handlePresetClick = (color: string) => {
    dispatch(setMeetingModeBorderColor({ border: `1px solid ${color}` }));
  };

  const colors = [
    { hex: "#FF4C51", border: "#FF4C51" },
    { hex: "#16B1FF", border: "#16B1FF" },
    { hex: "#FFB300", border: "#FFB300" },
    { hex: "#6C63FF", border: "#6C63FF" },
  ];

  return (
    <div className="col-12 mt-3">
      <h5 className="para mb-0">Meeting Mode Border Color</h5>
      <div className="d-flex ps-1 mt-2 align-items-center" style={{ gap: "10px" }}>
        {colors.map(({ hex, border }, index) => (
          <div
            key={index}
            className="colortheme text-center"
            style={{
              border: `1px solid ${border}`,
              borderRadius: "5px",
            }}
          >
            <div
              className="m-1"
              style={{
                height: "30px",
                width: "30px",
                background: hex,
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => handlePresetClick(hex)}
            ></div>
          </div>
        ))}

        <div
          className="colortheme text-center"
          style={{
            border: "1px solid #A8A8A8",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          <ColorLensOutlinedIcon
            style={{
              height: "30px",
              width: "30px",
              background: "#A8A8A8",
              borderRadius: "5px",
            }}
            className="m-1"
          />
          <input
            type="color"
            className="w-100 h-100"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              opacity: "0",
              cursor: "pointer",
            }}
            onChange={handleColorChange}
            value={selectedColor} // Binding to Redux state
          />
        </div>
      </div>
    </div>
  );
}
