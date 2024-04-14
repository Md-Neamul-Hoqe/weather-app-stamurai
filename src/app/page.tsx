"use client";

import {
  EnhancedTableHead,
  Order,
  getComparator,
  loadMoreFunc,
  stableSort,
} from "@/components/table";
import { useLoadCitiesQuery } from "@/redux/features/cities/citiesApiSlice";
import { City, setCities } from "@/redux/features/cities/citiesSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  FormControlLabel,
  Switch,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Skeleton,
} from "@mui/material";
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useSelector } from "react-redux";

export default function EnhancedTable() {
  const dispatch = useAppDispatch();
  const { data, refetch, isLoading, isError, error } = useLoadCitiesQuery(10, {
    skipPollingIfUnfocused: true,
  });

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof City>("ascii_name");
  const [dense, setDense] = useState<Boolean>(false);
  const [rows, setRows] = useState<City[] | null>(null);

  const { cities } = useSelector(
    (state: { cities: { cities: City[] } }) => state.cities
  );

  if (!isError && !isLoading) {
    const { results: loadedCities, total_count: total } = data;

    dispatch(setCities(loadedCities));
  } else if (isLoading) {
    return <Skeleton variant="rectangular" width={"100%"} height={"100%"} />;
  } else {
    return console.log(isError, error);
  }

  console.log(cities);

  useEffect(() => {
    if (cities?.length) {
      const newRows = cities.map((city) => {
        console.log(city);
        const { geoname_id, ascii_name, cou_name_en, lat, lon, timezone } =
          city;
        return {
          geoname_id,
          ascii_name,
          cou_name_en,
          lat,
          lon,
          timezone,
        };
      });

      console.log(newRows);
      setRows(cities);
    }
  }, [setRows, cities]);

  /* sorting */
  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof City
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const visibleRows = useMemo(
    () => stableSort(cities, getComparator(order, orderBy)),
    [order, orderBy, cities]
  );

  return (
    <Box
      sx={{
        width: "100%",
      }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const labelId = `cities-${index}`;
                console.log("City: ", row);
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row?.geoname_id}
                    sx={{ cursor: "pointer" }}>
                    <TableCell
                      id={labelId}
                      component="th"
                      scope="row"
                      padding="none">
                      {row?.ascii_name}
                    </TableCell>
                    <TableCell align="left">{row?.cou_name_en}</TableCell>
                    <TableCell align="left">{row?.timezone}</TableCell>
                    <TableCell align="left">{row?.coordinates?.lon}</TableCell>
                    <TableCell align="left">{row?.coordinates?.lat}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
