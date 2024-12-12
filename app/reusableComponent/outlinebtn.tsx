import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import ImageComponent from "./image";
export default function Outlinebutton({
  disabled,
  text,
  color,
  border,
  fontSize,
  background,
  onClick,
  icon,
  variant
}: any) {
  return (
    <>
      {disabled ? (
        <Button
          variant={variant}
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
          variant={variant}
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
          endIcon={<ImageComponent user={icon}  width={20} height={20}/>}
        >
          {text}
        </Button>
      )}
    </>
  );
}
