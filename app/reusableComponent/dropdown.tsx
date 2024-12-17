import * as React from "react";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";

const BootstrapInput = styled(InputBase)(({ theme, isYear }: { theme: any; isYear: boolean }) => ({
  "label + &": {
    marginTop: 0,
  },
  "& .MuiInputBase-input": {
    borderRadius: 0, // Remove border radius
    position: "relative",
    backgroundColor: isYear ? "white" : "#f4f4f4", // Conditional background color based on isYear prop
    border: "none", // Remove border
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      boxShadow: "none", // Remove focus shadow
    },
  },
}));

interface DropdownComponentProps {
  dropdownlist: any;
  isYear?: boolean; // Optional boolean for isYear
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ dropdownlist, isYear = false }) => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1 }} variant="standard">
        <Select
          labelId="dynamic-dropdown-label"
          id="dynamic-dropdown"
          value={selectedOption}
          onChange={handleChange}
          // input={<BootstrapInput isYear={isYear} />} s
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dropdownlist?.map((item: any) => (
            <MenuItem key={item.id} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DropdownComponent;
