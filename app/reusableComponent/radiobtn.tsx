import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { typeOfDaysProps } from "./interfacetypes";

interface RowRadioButtonsProps {
  list: typeOfDaysProps[];
  selectedValue: string; // Receive the selected value from the parent
  newDayTypevalue: (data: string) => void;
}

export default function RowRadioButtons({
  list,
  selectedValue,
  newDayTypevalue,
}: RowRadioButtonsProps) {
  // Set the first item as the default value if none is provided
  const defaultSelectedValue = selectedValue || (list[0] && list[0].name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    newDayTypevalue(value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Duration Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={defaultSelectedValue} // Set the default value
        onChange={handleChange} // Handle the change event
      >
        {list?.map((item) => (
          <div key={item.id}>
            <FormControlLabel
              value={item.name} // The value for the radio button
              control={<Radio />}
              label={item.name} // The label displayed next to the radio button
            />
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
