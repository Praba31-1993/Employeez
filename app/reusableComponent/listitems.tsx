import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import ClickableChips from "./chips";

export default function ListCard() {
  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper", p: 0 }}>
      <div style={{ padding: "4px 34px" }}>My Request</div>

      {[0, 1].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem>
            <ListItemButton sx={{ p: 0 }}>
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${value + 1}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText>
                Your request for leave on 1 Oct 2024 has been approved
              </ListItemText>
            </ListItemButton>
            <ClickableChips label={"Pending"} />
          </ListItem>
        );
      })}
    </List>
  );
}
