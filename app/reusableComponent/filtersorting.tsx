import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, TextField } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import FilterListIcon from "@mui/icons-material/FilterList";

function FilterSorting() {
  const [age, setAge] = React.useState<string>("");
  const [rows, setRows] = React.useState<number[]>([0]); // Initialize with one row
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleAdd = () => {
    const newRow = rows.length; // Determine the next row index
    setRows([...rows, newRow]); // Add a new row
  };

  const handleMinus = () => {
    if (rows.length > 1) {
      const updatedRows = rows.slice(0, -1); // Remove the last element
      setRows(updatedRows);
    }
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
        Filters{" "}
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
          <MenuItem>
            <div
              className="d-flex flex-column gap-3 px-4"
              style={{ background: "white" }}
            >
              <div className="d-flex gap-2 align-items-center">
                <table>
                  <tr>
                    <th>Column</th>
                    <th>Operator</th>
                    <th>Value</th>
                  </tr>
                  {rows.map((_, index) => (
                    <tr>
                      <td>
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, minWidth: 120 }}
                        >
                          <InputLabel id={`select-label-${index}`}>
                            Age
                          </InputLabel>
                          <Select
                            labelId={`select-label-${index}`}
                            id={`select-${index}`}
                            value={age}
                            onChange={handleChange}
                            label="Age"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </td>

                      <td>
                        <FormControl
                          variant="standard"
                          sx={{ m: 1, minWidth: 120 }}
                        >
                          <InputLabel id={`select-label-${index}`}>
                            Age
                          </InputLabel>
                          <Select
                            labelId={`select-label-${index}`}
                            id={`select-${index}`}
                            value={age}
                            onChange={handleChange}
                            label="Age"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      </td>
                      <td>
                        <TextField
                          id={`text-field-${index}`}
                          label="Standard"
                          variant="standard"
                          className="mt-1"
                        />
                      </td>
                    </tr>
                  ))}
                </table>
              </div>

              <div className="d-flex gap-2 justify-content-between">
                <div className="d-flex gap-3">
                  <button onClick={handleAdd}>Add Row</button>
                  <button onClick={handleMinus}>Remove Row</button>
                </div>

                <button onClick={handleMinus}>Filter</button>
              </div>
            </div>
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}

export default FilterSorting;
