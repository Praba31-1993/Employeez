"use client";

import { useRef } from "react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

const TextAreaEditor = () => {
  const textAreaRef = useRef<HTMLDivElement>(null);

  const formatText = (command: string) => {
    document.execCommand(command, false, "");
  };

  return (
    <div className="" style={{background:'white'}}>
      {/* Toolbar */}
      <div className="flex gap-2 border">
        <button onClick={() => formatText("bold")} className="p-2 ">
          <FormatBoldIcon />
        </button>
        <button onClick={() => formatText("italic")} className="p-2 ">
          <FormatItalicIcon />
        </button>
        <button onClick={() => formatText("underline")} className="p-2">
          <FormatUnderlinedIcon />
        </button>
      </div>

      {/* Editable Text Area */}
      <div
        ref={textAreaRef}
        contentEditable
        className="w-full min-h-[150px] p-3 border"
        style={{ border: "1px solid #ccc",  outline:"0px" }}
      ></div>
    </div>
  );
};

export default TextAreaEditor;
