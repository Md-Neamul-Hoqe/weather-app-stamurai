"use client";
import EnhancedTable from "@/components/cities/table";
import ErrorPage from "@/components/error";
import FilterCities from "@/components/filter/search";
import SelectColumn from "@/components/filter/selectColumn";
import Loader from "@/components/loader";
import { searchCities } from "@/components/types";
import { useLoadCitiesQuery } from "@/redux/features/cities/citiesApiSlice";
import { useAppSelector } from "@/redux/hooks";
import { Box, Paper, TableContainer } from "@mui/material";

export default function CitiesPage() {
  /* Fetch data from the REST API */
  const { data, isLoading, isSuccess, isError, error } = useLoadCitiesQuery(
    20,
    {
      skipPollingIfUnfocused: true,
      pollingInterval: 100000,
      refetchOnFocus: false,
    }
  );

  return (
    <>
      <Box
        sx={{
          width: "100%",
        }}>
        {isError ? (
          <ErrorPage error={error} />
        ) : isLoading || !isSuccess ? (
          <Loader loaderOpen={isLoading} />
        ) : (
          <Box className="max-w-7xl mx-auto">
            <Box className="w-full my-3">
              <FilterCities  fetchedCities={data} />
            </Box>
            <Paper
              sx={{
                width: "100%",
                bgcolor: "rgba(0, 0, 0, 0.5)",
                color: "white",
              }}>
              <TableContainer>
                <EnhancedTable fetchedCities={data} />
              </TableContainer>
            </Paper>
          </Box>
        )}
      </Box>
    </>
  );
}
