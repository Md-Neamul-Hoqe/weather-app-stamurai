/* data type for table */
export interface Row {
  geoname_id: number | string;
  ascii_name: string;
  cou_name_en: string;
  timezone: string;
  lon: number | string;
  lat: number | string;
}

export interface searchCities {
  column: keyof Row | "";
  values: string[];
  search: string | number;
}

export interface defaultLocation {
  id: string | number;
  city: string;
  country: string;
  lon: number;
  lat: number;
}

/* data type for loaded cities and state */
export interface City {
  geoname_id: string | number;
  ascii_name: string;
  cou_name_en: string;
  timezone: string;
  coordinates: Coordinates;
}

export type Order = "asc" | "desc";

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Row;
  label: string;
  numeric: true | false;
}

export interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Row
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: any;
}

export interface Coordinates {
  lon: number | string;
  lat: number | string;
}
