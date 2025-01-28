import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import {
  TextField,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./stylessheetforreusablecomponent.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function Filtersorting({ columnList }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [columnValue, setColumnValue] = useState<string>(""); // State expects a string value
  const [operatorValue, setOperatorValue] = useState<string>(""); // State expects a string value
  const [rows, setRows] = useState<
    { column: string; operator: string; value: string }[]
  >([
    { column: "", operator: "", value: "" }, // Set the initial row
  ]); // State to store rows

  // Handle change for 'Columns' select
  const handleColumnChange = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    const newRows = [...rows];
    newRows[index].column = event.target.value;
    setRows(newRows); // Update specific row
  };

  // Handle change for 'Operator' select
  const handleOperatorChange = (
    event: SelectChangeEvent<string>,
    index: number
  ) => {
    const newRows = [...rows];
    newRows[index].operator = event.target.value;
    setRows(newRows); // Update specific row
  };

  // Handle change for 'Value' input
  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, // Updated type
    index: number
  ) => {
    const newRows = [...rows];
    newRows[index].value = event.target.value;
    setRows(newRows); // Update specific row
  };
  // Add a new row
  const handleAddRow = () => {
    setRows([...rows, { column: "", operator: "", value: "" }]);
  };

  // Remove a row
  const handleRemoveRow = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
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
        <FilterListIcon />
        Filters
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
          <table className="table-custom">
            <thead>
              <tr>
                <th className="ml-2">Columns</th>
                <th className="ml-2">Operator</th>
                <th className="ml-2">Value</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="ml-2">
                    <FormControl
                      variant="standard"
                      sx={{ mt: 0, minWidth: 120 }}
                    >
                      <Select
                        labelId={`demo-simple-select-columns-${index}`}
                        id={`demo-select-columns-${index}`}
                        value={row.column}
                        onChange={(e) => handleColumnChange(e, index)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select Column
                        </MenuItem>
                        {columnList?.map((column: any) => (
                          <MenuItem key={column?.id} value={column?.key}>
                            {column?.key}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </td>
                  <td className="ml-2">
                    <FormControl
                      variant="standard"
                      sx={{ mt: 0, minWidth: 120 }}
                    >
                      <Select
                        labelId={`demo-simple-select-operator-${index}`}
                        id={`demo-select-operator-${index}`}
                        value={row.operator}
                        onChange={(e) => handleOperatorChange(e, index)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>
                          Select Operator
                        </MenuItem>
                        <MenuItem value="equals">Equals</MenuItem>
                        <MenuItem value="not_equals">Not Equals</MenuItem>
                        <MenuItem value="greater_than">Greater Than</MenuItem>
                        <MenuItem value="less_than">Less Than</MenuItem>
                      </Select>
                    </FormControl>
                  </td>
                  <td>
                    <TextField
                      id={`standard-basic-${index}`}
                      variant="standard"
                      className="m-0"
                      sx={{ width: "100px" }}
                      placeholder="Enter Value"
                      value={row.value}
                      onChange={(e) => handleValueChange(e, index)}
                    />
                  </td>
                  <td>
                    {rows.length > 1 && (
                      <RemoveCircleOutlineIcon
                        onClick={() => handleRemoveRow(index)} // Remove row by index
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between px-4">
          <AddCircleOutlineIcon onClick={handleAddRow} />{" "}
          <Button>Filter</Button>
        </div>
      </Menu>
    </div>
  );
}

export default Filtersorting;
