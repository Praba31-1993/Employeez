import React, { useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface chipsProps {
  label: string;
}

const chipsColor = [
  { name: "Present", color: "#56CA00", background: "#E1F3D3" },
  { name: "Half Day", color: "#FFBA27", background: "rgba(255, 180, 0, 0.20)" },
  { name: "Late", color: "#FF4C51", background: "rgba(255, 178, 181, 0.70)" },
  
  {
    name: "Casual Leave",
    color: "#FFBA27",
    background: "rgba(255, 180, 0, 0.20)",
  },
  {
    name: "Sick Leave",
    color: "#FFBA27",
    background: "rgba(255, 180, 0, 0.20)",
  },
];

export default function ChipsForLeave({ label }: chipsProps) {
  const [chipStyle, setChipStyle] = useState<{
    color: string;
    background: string;
  } | null>(null);

  useEffect(() => {
    if (label !== "") {
      const style = chipsColor.find((chip) => chip.name === label);
      setChipStyle(
        style ? { color: style.color, background: style.background } : null
      );
    }
  }, [label]);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label={label}
        onClick={handleClick}
        sx={{
          color: chipStyle ? chipStyle.color : "",
          backgroundColor: chipStyle ? chipStyle.background : "",
          "&:hover": {
            backgroundColor: chipStyle ? chipStyle.background : "",
          },
        }}
      />
    </Stack>
  );
}
