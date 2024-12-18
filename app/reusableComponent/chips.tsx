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
              ? "#56CA00"
              : label === "Pending"
              ? "#FFB400"
              : label === "Rejected"
              ? "#FE4343"
              : "#000000", // Default color
          background:
            label === "Accepted" ||
            label === "Approved" ||
            label === "Submitted"
              ? "#E4F6D6"
              : label === "Pending"
              ? "#FFF3D6"
              : label === "Rejected"
              ? "#FFE2E3"
              : "#000000", // Default color
        }}
      />
    </Stack>
  );
}
