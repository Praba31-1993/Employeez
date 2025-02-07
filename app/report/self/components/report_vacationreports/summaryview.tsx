import DropdownComponent from '@/app/reusableComponent/dropdown';
import React, { useState } from 'react';

import TableWithoutSort from '@/app/reusableComponent/table/tablewithoutsort';
import { year } from '@/app/reusableComponent/JsonData';

export const TimeOffRequestList = [
    { id: "1876", name: "Eligible PTO/EL", count: "20", hrs: "4" },
    { id: "1877", name: "Sick Leave", count: "15", hrs: "2" },
    { id: "1878", name: "Casual Leave", count: "12", hrs: "3" },
    { id: "1879", name: "Maternity Leave", count: "30", hrs: "8" },
    { id: "1880", name: "Paternity Leave", count: "7", hrs: "8" },
    { id: "1881", name: "Bereavement Leave", count: "5", hrs: "8" },
    { id: "1882", name: "Personal Leave", count: "10", hrs: "4" },
    { id: "1883", name: "Unpaid Leave", count: "0", hrs: "0" },
    { id: "1884", name: "Work from Home", count: "25", hrs: "8" },
    { id: "1885", name: "Medical Leave", count: "20", hrs: "6" },
    { id: "1886", name: "Half-Day Leave", count: "10", hrs: "4" },
    { id: "1887", name: "Floating Holiday", count: "2", hrs: "8" },
    { id: "1888", name: "Compensatory Off", count: "5", hrs: "8" },
    { id: "1889", name: "Study Leave", count: "14", hrs: "8" },
    { id: "1890", name: "Emergency Leave", count: "3", hrs: "8" },
];

function SummaryView() {
    // Define columns: Using names of the TimeOffRequestList as column headers
    const columns = TimeOffRequestList.map((leave) => ({
        key: leave.id,
        label: leave.name, // Display the name of the leave type as the column label
        // Replace any slashes (/) with underscores (_) in the accessor
        accessor: leave.name.toLowerCase().replace(/ /g, "_").replace(/\//g, "_"), // Fix slashes in the accessor
        checked: true,
    }));
    const [selectedTimeOff, setSelectedTimeOff] = useState("");

    // Define the type for the row object
    type Row = Record<string, string>;

    // Define rows: Creating a single row containing the count for each leave type
    // Define rows: Creating a single row containing the count for each leave type
    const row: Row = TimeOffRequestList.reduce((acc, { name, count }) => {
        // Use name as key (lowercase and with underscores) and count as value
        acc[name.toLowerCase().replace(/ /g, "_").replace(/\//g, "_")] = count;
        return acc;
    }, {} as Row);

    // Wrap row in an array to pass to TableWithSort
    const rows = [row];  // This creates an array with the `row` object



    return (
        <>
            <div className="row">
                <div className="col-6">
                    <p className="textheader para my-2">Summary View</p>
                </div>
                <div className="col-6 text-end">
                    <DropdownComponent dropdownlist={year} selectedDatafunction={(data: any) => setSelectedTimeOff(data)} />
                </div>
            </div>
            {/* table */}
            <TableWithoutSort
                columns={columns}
                rows={rows} // Passing the rows containing count for each leave type
                dataforicons={TimeOffRequestList}
            />
        </>
    );
}

export default SummaryView;
