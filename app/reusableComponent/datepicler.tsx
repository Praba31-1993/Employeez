import * as React from "react";
import { Colors } from "./styles";

export default function DatePickerComponent() {
    const useColors = Colors();
  return (
    <div>
      <input
        type="date"
        className="form-control p-3 textheader"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
    </div>
  );
}
