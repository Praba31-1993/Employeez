import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

interface chipsProps {
  label: string;
}
export default function ClickableChips({ label }: chipsProps) {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label={label}
        color="success"
        onClick={handleClick}
        sx={{
          color:
            label === "Accepted" ||
            label === "Approved" ||
            label === "Submitted"
              ? "#56CA00 !important"
              : label === "Pending"
              ? "#FFB400 !important"
              : label === "Rejected"
              ? "#FE4343 !important"
              : "#000000", // Default color
          background:
            label === "Accepted" ||
            label === "Approved" ||
            label === "Submitted"
              ? "#E4F6D6 !important"
              : label === "Pending"
              ? "#FFF3D6 !important"
              : label === "Rejected"
              ? "#FFE2E3 !important"
              : "#000000", // Default color
        }}
      />
    </Stack>
  );
}
