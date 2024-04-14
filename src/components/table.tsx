import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import weatherBg from "@/assets/weather-bg.jpg";
import InfiniteScroll from "react-infinite-scroller";
import { City, setCities } from "@/redux/features/cities/citiesSlice";
import { useSelector } from "react-redux";
import { useLoadCitiesQuery } from "@/redux/features/cities/citiesApiSlice";
import { StateFromReducersMapObject } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/redux/hooks";
import { Skeleton } from "@mui/material";

/* load data */

interface Data {
  id: number;
  ascii_name: string;
  cou_name_en: string;
  timezone: string;
  lon: number;
  lat: number;
}

export function createData(
  id: number | string,
  ascii_name: string,
  cou_name_en: string,
  timezone: string,
  lon: number,
  lat: number
) {
  return {
    id,
    ascii_name,
    cou_name_en,
    timezone,
    lon,
    lat,
  };
}

export const loadMoreFunc = () => {
  const dispatch = useAppDispatch();
  const { data, refetch, isLoading, isError, error } = useLoadCitiesQuery(10, {
    skipPollingIfUnfocused: true,
  });

  console.log("on load more func: ", data);

  if (!isError && !isLoading) {
    const { results: loadedCities, total_count: total } = data;

    dispatch(setCities(loadedCities));
  } else if (isLoading) {
    return <Skeleton variant="rectangular" width={"100%"} height={"100%"} />;
  } else {
    return console.log(isError, error);
  }
};

/* Sorting functionality */
export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export type Order = "asc" | "desc";

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/* Make table header cells */
interface HeadCell {
  disablePadding: boolean;
  id: keyof City;
  label: string;
  numeric: true | false;
}

const headCells: readonly HeadCell[] = [
  {
    id: "ascii_name",
    numeric: false,
    disablePadding: true,
    label: "City",
  },
  {
    id: "cou_name_en",
    numeric: false,
    disablePadding: false,
    label: "Country",
  },
  {
    id: "timezone",
    numeric: false,
    disablePadding: false,
    label: "timezone",
  },
  {
    id: "lon",
    numeric: true,
    disablePadding: false,
    label: "Lon",
  },
  {
    id: "lat",
    numeric: true,
    disablePadding: false,
    label: "Lat",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof City
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: any;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof City) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sx={{ px: "10px" }}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}>
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}>
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}