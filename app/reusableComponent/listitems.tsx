"use client";
import * as React from "react";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ClickableChips from "./chips";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Colors } from "./styles";

export default function ListCard() {
  const useColors = Colors();
  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper", p: 0 }}>
      <h4 className="textheader heading2 pb-2">My Request</h4>
      {[0, 1, 2].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <div className="d-flex justify-content-between mt-2 align-items-center pb-2">
            <div className="d-flex align-items-center">
              <div className="rounded-circle text-white" style={{background:useColors.themeRed}}>
                <EditNoteIcon className="m-1" />
              </div>
              <h5 className="para px-2 mb-0 textheader ellipsis-applied">Your request for leave on 12 Oct 2024
                has been pending </h5>
            </div>
            <ClickableChips label={"Pending"} />
          </div>
        );
      })}
    </List>
  );
}
