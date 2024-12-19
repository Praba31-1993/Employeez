"use client";
import * as React from "react";

interface DropdownComponentProps {
  dropdownlist: Array<{ id: string | number; label: string }>; // Strongly typed dropdownlist
  isYear?: boolean; // Optional boolean for isYear
}
const DropdownComponent: React.FC<DropdownComponentProps> = ({
  dropdownlist,
  isYear = false,
}) => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select
        className="textheader PARA"
        id="dynamic-dropdown"
        value={selectedOption}
        onChange={handleChange}
        style={{
          borderRadius: isYear ? "0" : "4px",
          backgroundColor: isYear ? "" : "#f4f4f4",
          border: "1px solid #ccc",
          padding: "10px",
          fontSize: "16px",
        }}
      >
        {dropdownlist && dropdownlist.length > 0 ? (
         dropdownlist.map((item:any, index: number) => (
          <option key={`${item.id}-${index}`} value={item.label}>
            {item.label}
          </option>
        ))
        
        ) : (
          <option value="" disabled>
            No options available
          </option>
        )}
      </select>
    </div>
  );
};

export default DropdownComponent;
