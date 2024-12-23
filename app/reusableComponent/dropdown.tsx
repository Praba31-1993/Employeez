"use client";
import * as React from "react";

interface DropdownComponentProps {
  dropdownlist: Array<{ id: string | number; label: string }>; // Strongly typed dropdownlist
  isYear?: boolean; // Optional boolean for isYear
  removepadding?: boolean;
  selectedDatafunction: (data: any) => void;
  color?: string;
 
}
const DropdownComponent: React.FC<DropdownComponentProps> = ({
  dropdownlist,
  isYear = false,
  removepadding,
  selectedDatafunction,
  color
}) => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };
  console.log("slecOptions", selectedOption);

  React.useEffect(() => {
    // Call the function only if it is defined and is a function
    if (typeof selectedDatafunction === "function") {
      selectedDatafunction(selectedOption); // Pass selected value to parent function
    }
  }, [selectedOption, selectedDatafunction]);

  React.useEffect(() => {
    if (typeof selectedDatafunction === "function") {
      selectedDatafunction(selectedOption); // Pass selected value to parent function
    }
  }, []);

  return (
    <div>
      <select
        className="dropdowncolor para"
        id="dynamic-dropdown"
        value={selectedOption}
        onChange={handleChange}
        style={{
          borderRadius: isYear ? "0" : "4px",
          backgroundColor: isYear ? "" : "#f4f4f4",
          border: "1px solid #ccc",
          padding: removepadding ? "0 px" : "10px",
          fontSize: "16px",
          color:color
        }}
      >
        {dropdownlist && dropdownlist.length > 0 ? (
          dropdownlist.map((item: any, index: number) => (
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
