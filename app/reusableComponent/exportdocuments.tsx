import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Checkbox } from "@mui/material";
import { handleCSVExport } from "./commonlogic";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

export default function ExportDocuments({ exportDatas }: any) {
  console.log("columnList++", exportDatas);

  const headers = Array.from(
    new Set(exportDatas.flatMap((column: any) => Object.keys(column)))
  );
  console.log("headers", headers);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        <SaveAltIcon />
        Export
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
        <div className="d-flex px-3">
          <MenuItem onClick={() => handleCSVExport(headers, exportDatas)}>
            CSV File
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}
