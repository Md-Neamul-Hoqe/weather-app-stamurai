"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import { Order, Row, searchCities } from "../types";
import { EnhancedTableHead, getComparator, stableSort } from "./tableUtils";
import { setCities } from "@/redux/features/cities/citiesSlice";
import NoDataFound from "../noDataFound";
import { getCityToRowData } from "@/utils/formateFetchedData";
import Link from "next/link";

export default function EnhancedTable({
  fetchedCities,
}: {
  fetchedCities: any;
}) {
  /* Declare states */
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Row>("ascii_name");
  const dispatch = useAppDispatch();
  const [rows, setRows] = useState<Row[]>([]);

  /* reformat data and types */

  const { cities } = useAppSelector((state: any) => state.citiesSlice);

  const { search } = useAppSelector(
    (state: { searchOnCities: searchCities }) => state.searchOnCities
  );

  /* store the fetched data in desired formate */
  useEffect(() => {
    const results: Row[] = getCityToRowData(fetchedCities.results);
    const CL = cities?.length;
    const RL = results?.length;

    if (!search) {
      console.log("Original Data: ", results);
      CL !== RL && dispatch(setCities(results));
      setRows(results);
    } else {
      console.log("Searched Data: ", cities);
      setRows(cities);
    }
  }, [dispatch, fetchedCities, search, cities]);

  /* Store table rows in a memo */
  const visibleRows = useMemo(
    () => stableSort(rows, getComparator(order, orderBy)),

    [order, orderBy, rows]
  );

  /* handle sorting as the column */
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
      {visibleRows?.length ? (
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
                <TableRow hover tabIndex={-1} key={row?.geoname_id}>
                  <TableCell
                    sx={{ px: "10px", cursor: "pointer" }}
                    id={labelId}
                    component="th"
                    scope="row"
                    padding="none">
                    <Link href={`/weather/${row?.ascii_name.toLowerCase()}`}>
                      {row?.ascii_name}
                    </Link>
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
