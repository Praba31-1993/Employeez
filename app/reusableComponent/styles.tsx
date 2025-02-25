import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type TextStylesType = {
  headerTextSize: string;
  normalTextSize: string;
  textFontFamily: string;
  textFontWeight: number;
  textTransform: "capitalize" | "uppercase" | "lowercase" | "none";
};

export const Colors = () => {
  const selectedColor = useSelector((state: RootState) => state.color.color);
  const selectedborder = useSelector((state: RootState) => state.color.border);
  const selectedshadow = useSelector((state: RootState) => state.color.shadow);


  return {
    themeRed: selectedColor,
    buttonsFill: "#FF6363",
    headerText: "#6D6777",
    normalText: "#A8A8A8",
    darkThemeMode: "#282C34",
    white: "#FFFFFF",
    grey: "#F4F4F4",
    iconGray: "#E4E4E4",
    border: selectedborder ,
    boxshadow: selectedshadow,
  };
};

export const TextStyles: TextStylesType = {
  headerTextSize: "14px",
  normalTextSize: "12px",
  textFontFamily: "Inter",
  textFontWeight: 500,
  textTransform: "capitalize", // Valid TextTransform value
};
