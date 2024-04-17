import { City, Row } from "@/components/types";

export const getCityToRowData = (data: City[]) => {
  if (!data) return data;
  const newCitiesAsRow: Row[] = data?.map((city: City) => {
    const { ascii_name, geoname_id, cou_name_en, timezone, coordinates } = city;
    return { geoname_id, ascii_name, cou_name_en, timezone, ...coordinates };
  });

  return newCitiesAsRow;
};

export const getFilteredData = (
  data: Row[],
  column: keyof Row | "",
  search: string | number
) => {
  /* filter the data as search params */
  if (!column) return data;

  const updatedCities = data?.filter((city: Row) => {
    const regex = new RegExp(search.toString() || "", "i");

    const newString: string = city[column].toString() as string;

    return newString.search(regex) !== -1;
  });

  return updatedCities;
};
