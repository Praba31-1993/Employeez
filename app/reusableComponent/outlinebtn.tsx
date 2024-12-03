import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import arrowIcon from "@/app/assets/img/arrowicon.svg";
export default function Outlinebutton({
  disabled,
  text,
  color,
  border,
  fontSize,
  background,
  onClick,
  isDashboardIcon
}: any) {
  return (
    <>
      {disabled ? (
        <Button
          variant="outlined"
          disabled={disabled}
          onClick={onClick}
          sx={{
            // color: { color },
            // border: { border },
            fontFamily: "Inter, sans-serif",
            fontSize: { fontSize },
            // textTransform: "unset",
            // backgroundColor: { background },
          }}
        >
          {text}
        </Button>
      ) : (
        <Button
          variant="outlined"
          disabled={disabled}
          onClick={onClick}
          sx={{
            color: { color },
            border: { border },
            fontFamily: "Inter, sans-serif",
            fontSize: { fontSize },
            textTransform: "unset",
            backgroundColor: { background },
          }}
          endIcon={isDashboardIcon ? <Image src={arrowIcon} alt="" /> : ""}
        >
          {text}
        </Button>
      )}
    </>
  );
}
