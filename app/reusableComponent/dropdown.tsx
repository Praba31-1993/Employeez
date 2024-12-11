import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: 0,
  },
  "& .MuiInputBase-input": {
    borderRadius: 0, // Remove border radius
    position: "relative",
    backgroundColor: "#f4f4f4",
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

// Dummy JSON data
const dropdownData = [
  { id: 1, label: "INDIA" },
  { id: 2, label: "USA" },
  { id: 3, label: "KOREA" },
];

export default function DropdownComponent() {
  const [selectedOption, setSelectedOption] = React.useState("");

  const handleChange = (event: { target: { value: string } }) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel id="dynamic-dropdown-label">Select an Option</InputLabel>
        <Select
          labelId="dynamic-dropdown-label"
          id="dynamic-dropdown"
          value={selectedOption}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {dropdownData.map((item:any, index:number) => (
            <div key={index}>
              <MenuItem key={item.id} value={item.label}>
                {item.label}
              </MenuItem>
            </div>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
