import TableWithSort from "@/app/reusableComponent/table/tablewithSort";
import React, { useState } from "react";


interface RowData {
    id: number;
    first: string;
    last: string;
    status: string;
}

const Requesttable = ({ statusHistory }: any) => {
    const columns = [
        { id: 1, key: "time_off_type", label: "Request type", checked: true },
        { id: 2, key: "date_from", label: "Submitted Date", checked: true },
        { id: 3, key: "date_to", label: "Approved by", checked: true },
        { id: 4, key: "status", label: "Status", checked: true },
        { id: 6, key: "action", label: "Action", checked: true },
    ];

    const rows = [
        {
            date_from: "2024-12-01",
            date_to: "Christopher",
            time_off_type: "Personal  Contact",
            status: "Approved",
            reason: "Medical",
            action: "",
        },
        {
            date_from: "2024-12-03",
            date_to: "Venkat",
            time_off_type: "Worksite address",
            status: "Submitted",
            reason: "Personal",
            action: "",
        },
        {
            date_from: "2024-12-05",
            date_to: "Melissia",
            time_off_type: "Emergency address",
            status: "Approved",
            reason: "Family",
            action: "",
        },
        {
            date_from: "2024-12-07",
            date_to: "Danny mechson",
            time_off_type: "Personal address",
            status: "Rejected",
            reason: "Festival",
            action: "",
        },
    ];

    return (
        <>
            <TableWithSort
                columns={columns}
                rows={rows}
                dataforicons={statusHistory}
            />
        </>
    );
};

export default Requesttable;
