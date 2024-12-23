import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { useDispatch, useSelector } from "react-redux";
import { setColor } from '@/app/redux/slices/colorSlice';
import { RootState } from "../../redux/store";
import { useEffect } from "react";

export function Colorcustomization() {
    const selectedColor = useSelector((state: RootState) => state.color.color);
    const dispatch = useDispatch();

    // Check localStorage for saved color and initialize state
    useEffect(() => {
        const savedColor = localStorage.getItem("themeColor");
        if (savedColor) {
            dispatch(setColor({ color: savedColor })); // Load saved color from localStorage
        }
    }, [dispatch]);

    // Update localStorage whenever the color changes
    useEffect(() => {
        localStorage.setItem("themeColor", selectedColor);
    }, [selectedColor]);

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;
        dispatch(setColor({ color })); // Dispatching only the color
    };

    const handlePresetClick = (color: string) => {
        dispatch(setColor({ color })); // Dispatching only the color
    };

    const colors = [
        { hex: "#FF4C51", border: "#FF4C51" },
        { hex: "#16B1FF", border: "#16B1FF" },
        { hex: "#FFB300", border: "#FFB300" },
        { hex: "#6C63FF", border: "#6C63FF" },
    ];

    return (
        <div className="col-12 mt-2">
            <h5 className="para mb-0">Choose theme</h5>
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
