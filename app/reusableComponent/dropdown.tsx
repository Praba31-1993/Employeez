import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
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

export default function DropdownComponent({ dropdownlist }: any) {
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
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
          {dropdownlist?.map((item: any) => (
            <MenuItem key={item.id} value={item.label}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
