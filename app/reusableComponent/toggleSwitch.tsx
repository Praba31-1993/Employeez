import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { Colors } from "../reusableComponent/styles";

// Extend the props to include 'colors'
interface AntSwitchProps extends SwitchProps {
  colors: {
    themeRed: string;
    buttonsFill: string;
    // Add any other required color properties
  };
}

// Use generic typing to include AntSwitchProps in the styled component
const AntSwitch = styled(Switch)<AntSwitchProps>(({ theme, colors }) => ({
  width: 30, // Updated width
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 14, // Slightly increase thumb size when active
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(14px)", // Adjusted for the smaller width
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(14px)", // Adjusted for smaller width
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: colors.themeRed, // Red background color for checked state
        ...(theme.palette.mode === "dark" && {
          backgroundColor: "#b00020", // Dark red for dark mode
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12, // Thumb size
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "#cfd1d3", // Light red for the track
    boxSizing: "border-box",
    ...(theme.palette.mode === "dark" && {
      backgroundColor: "#f4f4f4", // Slightly darker red for dark theme
    }),
  },
}));

interface ToggleSwitchProps {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
}

export default function ToggleSwitch({ isChecked, onToggle }: ToggleSwitchProps) {
  const colors = Colors(); // Call Colors inside the component

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(event.target.checked);
  };

  return (
    <FormGroup>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <AntSwitch
          checked={isChecked}
          onChange={handleChange}
          inputProps={{ "aria-label": "ant design" }}
          colors={colors} // Pass colors as a prop
        />
      </Stack>
    </FormGroup>
  );
}
