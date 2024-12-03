"use client"
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from '@/app/redux/slices/colorSlice';
import { RootState } from "../redux/store";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { Colors } from '../reusableComponent/styles';
import { Themecustomization } from "./customization/themecustomization";

const DraggableComponent = () => {
    const useColors = Colors();
    const ref = useRef<HTMLDivElement | null>(null);
    const selectedColor = useSelector((state: RootState) => state.color.color);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 50, // Start at 50% horizontally
        y: 50, // Start at 50% vertically
    });
    const dispatch = useDispatch();

    useEffect(() => {
        const savedPosition = localStorage.getItem("draggablePosition");
        if (savedPosition) {
            setPosition(JSON.parse(savedPosition));
        }
    }, []);

    useEffect(() => {
        if (position.x >= 0 && position.x <= 100 && position.y >= 0 && position.y <= 100) {
            localStorage.setItem("draggablePosition", JSON.stringify(position));
        }
    }, [position]);

    const onDrag = (e: MouseEvent) => {
        if (ref.current) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const newX = Math.max(
                0,
                Math.min((e.clientX / screenWidth) * 100, 100) // Clamp between 0 and 100
            );
            const newY = Math.max(
                0,
                Math.min((e.clientY / screenHeight) * 100, 100) // Clamp between 0 and 100
            );

            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        document.addEventListener("mousemove", onDrag);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onDrag);
        });
    };

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedColor = event.target.value;
        dispatch(setColor(selectedColor));
    };

    return (
        <>
            {open && <Themecustomization show={open} close={() => setOpen(false)} />}
            <div
                className="p-3"
                ref={ref}
                onMouseDown={handleMouseDown}
                onClick={() => setOpen((prev) => !prev)}
                style={{
                    background: useColors.themeRed,
                    position: "absolute",
                    top: `${position.y}%`, // Use percentage for position
                    left: `${position.x}%`, // Use percentage for position
                    transform: "translate(-50%, -50%)", // Center the component
                    zIndex: 111111111,
                    borderTopLeftRadius: position.x > 50 ? "30px" : "0px", // Apply based on horizontal position
                    borderBottomLeftRadius: position.x > 50 ? "30px" : "0px", // Apply based on horizontal position
                    borderTopRightRadius: position.x <= 50 ? "30px" : "0px", // Apply based on horizontal position
                    borderBottomRightRadius: position.x <= 50 ? "30px" : "0px", // Apply based on horizontal position
                }}
            >
                <DashboardCustomizeIcon className="text-white" />
            </div>
        </>
    );
};

export default DraggableComponent;
