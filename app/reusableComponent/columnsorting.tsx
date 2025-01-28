import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Checkbox } from "@mui/material";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";


export default function ColumnSorting({ columnList }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [checked, setChecked] = React.useState([0]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="d-flex gap-2 text-capitalize text-dark" 
      >
         <CalendarViewWeekIcon />
        Column
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {columnList?.map((column: any) => (
          <div key={column?.id} className="d-flex px-3">
            <Checkbox
              edge="start"
              checked={checked.includes(column?.id)}
              tabIndex={-1}
              disableRipple
              onClick={handleToggle(column?.id)}
            />
            <MenuItem onClick={handleClose}>{column?.key}</MenuItem>
          </div>
        ))}
      </Menu>
    </div>
  );
}
