"use client";
import * as React from "react";
import List from "@mui/material/List";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ClickableChips from "./chips";
import { Colors } from "./styles";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ListCard() {
    const useColors = Colors();
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Simulate a fetch delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Loader will disappear after 2 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <List dense sx={{ width: "100%", bgcolor: "background.paper", p: 0 }}>
            <h4 className="textheader heading2 pb-2 fw-bold">My Request</h4>
            {loading
                ? // Skeleton loader for the list items
                Array(3)
                    .fill(null)
                    .map((_, index) => (
                        <div
                            key={index}
                            className="d-flex justify-content-between mt-2 align-items-center pb-2"
                        >
                            <div className="d-flex align-items-center">
                                <Skeleton
                                    circle={true}
                                    height={40}
                                    width={40}
                                    className="me-2"
                                />
                                <Skeleton height={20} width={250} />
                            </div>
                            <Skeleton
                                height={30}
                                width={80}
                                style={{ borderRadius: "16px" }}
                            />
                        </div>
                    ))
                : // Render actual content once loading is complete
                [0, 1, 2]?.map((value, index) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                        <div
                            key={index}
                            className="d-flex justify-content-between mt-2 align-items-center pb-2"
                        >
                            <div className="d-flex align-items-center">
                                <div
                                    className="rounded-circle text-white"
                                    style={{ background: useColors.themeRed }}
                                >
                                    <EditNoteIcon className="m-1" />
                                </div>
                                <h5 className="para px-2 mb-0 textheader ellipsis-applied">
                                    Your request for leave on 12 Oct 2024 has been pending
                                </h5>
                            </div>
                            <ClickableChips label={"Pending"} />
                        </div>
                    );
                })}
        </List>
    );
}
