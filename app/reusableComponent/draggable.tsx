"use client";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "@/app/redux/slices/colorSlice";
import { RootState } from "../redux/store";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { Colors } from "../reusableComponent/styles";
import { Themecustomization } from "./customization/themecustomization";

const DraggableComponent = () => {
    const useColors = Colors();
    const ref = useRef<HTMLDivElement | null>(null);
    const selectedColor = useSelector((state: RootState) => state.color.color);
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState<{ x: number; y: number }>({
        x: 50,
        y: 50,
    });
    const [isDragging, setIsDragging] = useState(false);

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
            const rect = ref.current.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;

            const newX = Math.max(0, Math.min(((e.clientX - rect.width / 2) / screenWidth) * 100, 100));
            const newY = Math.max(0, Math.min(((e.clientY - rect.height / 2) / screenHeight) * 100, 100));

            setPosition({ x: newX, y: newY });
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true); // Start dragging

        const handleMouseMove = (e: MouseEvent) => onDrag(e);

        const handleMouseUp = () => {
            setIsDragging(false); // Stop dragging
            setPosition((prevPosition) => {
                const newPosition = { ...prevPosition };
                if (prevPosition.x > 50) {
                    newPosition.x = 100; // Snap to the right
                } else {
                    newPosition.x = 0; // Snap to the left
                }
                return newPosition;
            });

            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <>
            {open && <Themecustomization show={open} close={() => setOpen(false)} />}
            <div
                className="p-3"
                ref={ref}
               
                onMouseDown={handleMouseDown}
                
                style={{
                    background: useColors.themeRed,
                    position: "fixed",
                    top: `${position.y}%`,
                    left: position.x > 50 ? undefined : `${position.x}%`,
                    right: position.x > 50 ? `${100 - position.x}%` : undefined,
                    transform: "translateY(-50%)",
                    zIndex: 111111111,
                    borderTopLeftRadius: isDragging ? "50%" : position.x > 50 ? "30px" : "0px",
                    borderBottomLeftRadius: isDragging ? "50%" : position.x > 50 ? "30px" : "0px",
                    borderTopRightRadius: isDragging ? "50%" : position.x <= 50 ? "30px" : "0px",
                    borderBottomRightRadius: isDragging ? "50%" : position.x <= 50 ? "30px" : "0px",
                }}
            >
                <DashboardCustomizeIcon className="text-white"  onClick={() => setOpen((prev) => !prev)} />
            </div>
        </>
    );
};

export default DraggableComponent;
