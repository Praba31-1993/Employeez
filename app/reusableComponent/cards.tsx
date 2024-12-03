import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

function Cards() {
  return (
    <div className="card" style={{width:'50%'}}>
      <div className="card-body">
        <h5 className="card-title">Project Extensions</h5>
        {[1, 2, 3, 4].map((list: any) => (
          <div key={list}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
              {/* <ListItemText>21-08-2029</ListItemText> */}
            </ListItem>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
