"use client";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { useState } from "react";

const SelectColumn = () => {
  const [column, setColumn] = useState("ascii_name");

  /* update selection */
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setColumn(event.target.value as string);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="column-selection-label">Column</InputLabel>
      <Select
        labelId="column-selection-label"
        id="column-selection"
        value={column}
        label="Column"
        onChange={handleChange}>
        <MenuItem value="ascii_name">City</MenuItem>
        <MenuItem value="cou_name_en">Country</MenuItem>
        <MenuItem value="timezone">Time Zone</MenuItem>
        <MenuItem value="lon">Lon</MenuItem>
        <MenuItem value="lat">Lat</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectColumn;
