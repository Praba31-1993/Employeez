import { Checkbox, FormControlLabel } from "@mui/material";
import { Colors } from "./styles";

export function Commoncheckbox({ selectdata, onChange }: any) {
  const useColors = Colors();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            "&.Mui-checked": {
              color: useColors.themeRed, // Changes the checkmark color
            },
          }}
          onChange={handleChange}
        />
      }
      label={selectdata?.projectname}
    />
  );
}
