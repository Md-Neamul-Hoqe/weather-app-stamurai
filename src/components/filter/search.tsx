"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Row, searchCities } from "../types";
import {
  updateColumn,
  updateSearch,
  updateValues,
} from "@/redux/features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getCityToRowData, getFilteredData } from "@/utils/formateFetchedData";
import { setCities } from "@/redux/features/cities/citiesSlice";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    opacity: 0.5,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
  "& .MuiTextField-root": {
    m: 1,
  },
}));

export default function FilterCities({
  fetchedCities,
}: {
  fetchedCities: any;
}) {
  const dispatch = useAppDispatch();
  const cities: Row[] = getCityToRowData(fetchedCities.results);

  // const cities = fetchedCities.result;
  /* get the column and values */
  const { column, values } = useAppSelector(
    (state: { searchOnCities: searchCities }) => state.searchOnCities
  );

  // const { cities } = useAppSelector((state: any) => state.citiesSlice);

  /**
   * select the column and the value from the column's values to filter the results
   * @param event handle selection via onchange event
   */
  const handleSelectColumn = (event: any) => {
    if (cities?.length) {
      const target: keyof Row = event.target?.value;

      const filteredValues: any[] = cities?.map((city: Row) => city?.[target]);

      /**
       * Issue: Type 'Set<any>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
       * ======
       * fixed: "target": "ES2015" added to tsconfig.json
       */

      const uniqueValues = [...new Set(filteredValues)];

      /* Update states */
      dispatch(updateColumn({ column: target }));
      dispatch(updateValues({ values: uniqueValues }));
    }
  };

  const handleSearchOnTheColumn = (event: any) => {
    const search: string | number = event.target.value;

    const filteredData = getFilteredData(cities, column, search);

    if (cities?.length !== filteredData?.length)
      dispatch(setCities(filteredData));
    dispatch(updateSearch({ search }));
  };

  return (
    <div className="flex items-center justify-end w-full">
      {/* Search on the selected column */}
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          className={column ? "" : "hidden"}
          freeSolo
          id="search-column"
          onInput={handleSearchOnTheColumn}
          // onInput={handleSearch}
          disableClearable
          options={values?.map((value) => value)}
          renderInput={(params) => (
            <TextField
              // onKeyUp={handleSearch}
              onBlur={handleSearchOnTheColumn}
              {...params}
              label="Search input"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>

      {/* Select a column to search on */}
      <FormControl sx={{ m: 1, minWidth: 150, maxWidth: 200 }}>
        <InputLabel id="column-selection-label">Column</InputLabel>
        <Select
          labelId="column-selection-label"
          id="column-selection"
          value={column}
          label="Search"
          onChange={handleSelectColumn}>
          <MenuItem value="ascii_name">City</MenuItem>
          <MenuItem value="cou_name_en">Country</MenuItem>
          <MenuItem value="timezone">Time Zone</MenuItem>
          <MenuItem value="lon">Lon</MenuItem>
          <MenuItem value="lat">Lat</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
