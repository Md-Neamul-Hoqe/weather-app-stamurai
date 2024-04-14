"use client";
import { useLoadCitiesQuery } from "@/redux/features/cities/citiesApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Skeleton,
  Button,
} from "@mui/material";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { City, Order, Row } from "../types";
import { useSelector } from "react-redux";
import { EnhancedTableHead, getComparator, stableSort } from "./tableUtils";
import { setCities } from "@/redux/features/cities/citiesSlice";
import useLoadCities from "@/hooks/useLoadCities";
import Loader from "../loader";
import Link from "next/link";
import ErrorPage from "../error";
import NoDataFound from "../noDataFound";

export default function EnhancedTable() {
  /* Declare states */
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Row>("ascii_name");
  const [rows, setRows] = useState<Row[]>([]);

  /* load data from API */
  const { cities, refetch, isLoading, isError, error } = useLoadCities();

  isError && console.log("The error is: ", error);

  /* Form the table rows by the stated data on the store */
  useEffect(() => {
    if (!isLoading && cities?.length) {
      const newRows: Row[] = cities.map((city) => {
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

      setRows(newRows);
    }
  }, [cities, isLoading]);

  /* Store formed rows in a memo */
  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),
    [order, orderBy, rows]
  );

  /* set new loaded data to the cities-slice-store */
  // if (isLoading) {
  //   return <Skeleton variant="rectangular" width={"100%"} height={"100%"} />;
  // }

  /* sorting as the column */
  const handleRequestSort = (
    event: MouseEvent<unknown>,
    property: keyof Row
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      {isError ? (
        <ErrorPage error={error} />
      ) : isLoading ? (
        <Loader loaderOpen={isLoading} />
      ) : visibleRows?.length ? (
        <Table
          sx={{ minWidth: 750, bgcolor: "rgba(250, 250, 250, 0.5)" }}
          aria-labelledby="tableTitle">
          {/* Header of the table */}
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={rows?.length}
          />

          {/* Body of the table */}
          <TableBody>
            {visibleRows.map((row, index) => {
              const labelId = `cities-${index}`;
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row?.geoname_id}
                  sx={{ cursor: "pointer" }}>
                  <TableCell
                    sx={{ px: "10px" }}
                    id={labelId}
                    component="th"
                    scope="row"
                    padding="none">
                    {row?.ascii_name}
                  </TableCell>
                  <TableCell align="left">{row?.cou_name_en}</TableCell>
                  <TableCell align="left">{row?.timezone}</TableCell>
                  <TableCell align="right">{row?.lon}</TableCell>
                  <TableCell align="right">{row?.lat}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <NoDataFound />
      )}
    </>
  );
}
