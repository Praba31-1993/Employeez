import Image from "next/image";
import * as React from "react";
import Button from "@mui/material/Button";
import ImageComponent from "./image";
interface OutlinebuttonProps {
  iscontactus?: Boolean;
  disabled?: any;
  text?: any;
  color?: any;
  border?: any;
  fontSize?: any;
  background?: any;
  onClick?: any;
  icon?: any;
  variant?: any;
}
export default function Outlinebutton({
  disabled,
  text,
  color,
  border,
  fontSize,
  background,
  onClick,
  icon,
  variant,
  iscontactus,
}: OutlinebuttonProps) {
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
        >
          {text}
        </Button>
      )}
    </>
  );
}
export function IconOutlinebutton({
  disabled,
  text,
  color,
  border,
  fontSize,
  background,
  onClick,
  icon,
  variant,
  iscontactus,
}: OutlinebuttonProps) {
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
          endIcon={
            iscontactus ? (
              ""
            ) : (
              <ImageComponent user={icon} width={20} height={20} />
            )
          }
        >
          {text}
        </Button>
      )}
    </>
  );
}
