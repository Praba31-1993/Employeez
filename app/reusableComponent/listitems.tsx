import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import ClickableChips from "./chips";
import Menulistitem from "./menulist";

export default function ListCard() {
  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper", p: 0 }}>
      <div className="pb-2 textheader heading2" >My Request</div>

      {[0, 1].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <div className="d-flex justify-content-between align-items-center pb-2">
            <div className="d-flex align-items-center">
              <Avatar src="" alt="Remy Sharp" />
              <h5 className="para ps-2 mb-0 ">Your request for leave</h5>
            </div>
            <ClickableChips label={"Pending"} />
          </div>
        );
      })}
    </List>
  );
}
