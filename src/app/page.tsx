"use client";
import {
  EnhancedTableHead,
  getComparator,
  stableSort,
} from "@/components/table";
import { City, Order, Row } from "@/components/types";
import { useLoadCitiesQuery } from "@/redux/features/cities/citiesApiSlice";
import { setCities } from "@/redux/features/cities/citiesSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
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
  const [orderBy, setOrderBy] = useState<keyof Row>("ascii_name");
  const [dense, setDense] = useState<Boolean>(false);
  const [rows, setRows] = useState<Row[]>([]);

  const { cities } = useSelector(
    (state: { cities: { cities: City[] } }) => state.cities
  );

  useEffect(() => {
    if (cities?.length) {
      const newRows: Row[] = cities.map((city) => {
        // console.log(city);

        const { geoname_id, ascii_name, cou_name_en, coordinates, timezone } =
          city;

        return {
          geoname_id,
          ascii_name,
          cou_name_en,
          lon: coordinates.lon,
          lat: coordinates.lat,
          timezone,
        };
      });

      // console.log(newRows);
      setRows(newRows);
    }
  }, [setRows, cities]);

  /* TODO: need to be solved the typeScript error */
  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  /* use all hooks before using conditionals */
  if (!isError && !isLoading) {
    const { results: loadedCities, total_count: total } = data;

    dispatch(setCities(loadedCities));
  } else if (isLoading) {
    return <Skeleton variant="rectangular" width={"100%"} height={"100%"} />;
  } else {
    return console.log(isError, error);
  }

  console.log(cities);

  /* sorting */
  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Row
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeDense = (event: ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

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
                // console.log("City: ", row);
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
                    <TableCell align="left">{row?.lon}</TableCell>
                    <TableCell align="left">{row?.lat}</TableCell>
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
