"use client";
import EnhancedTable from "@/components/cities/table";
import ErrorPage from "@/components/error";
import FilterCities from "@/components/filter/search";
import Loader from "@/components/loader";
import GetUserLocation from "@/components/user/modal";
import UserLocation from "@/components/user/userLocation";
import { useLoadCitiesQuery } from "@/redux/features/cities/citiesApiSlice";
import { Box, Paper, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";

export default function CitiesPage() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [setOpen]);

  /* Fetch data from the REST API */
  const { data, isLoading, isSuccess, isError, error } = useLoadCitiesQuery(
    100,
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
            <GetUserLocation
              fetchedCities={data}
              open={open}
              setOpen={setOpen}
            />
            <Box className="flex w-full mb-3 justify-between">
              <UserLocation />
              <FilterCities fetchedCities={data} />
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
