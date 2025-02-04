"use client";

import { useRef } from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

const About = () => {
  const textAreaRef = useRef<HTMLDivElement>(null);

  const handleBold = () => {
    document.execCommand("bold", false, "");
  };

  const handleItalic = () => {
    document.execCommand("italic", false, "");
  };

  const handleUnderline = () => {
    document.execCommand("underline", false, "");
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="d-flex gap-2">
        <div onClick={handleBold}>
          <FormatBoldIcon />
        </div>
        <div onClick={handleItalic}>
          <FormatItalicIcon />
        </div>
        <div onClick={handleUnderline}>
          <FormatUnderlinedIcon />
        </div>
      </div>

      <div
        ref={textAreaRef}
        contentEditable
        className="w-full h-40 p-2 border rounded-md text-lg focus:outline-none"
        style={{
          minHeight: "150px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      ></div>
    </div>
  );
};

export default About;
