// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const citiesApiSlice = createApi({
  reducerPath: "citiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records",
  }),
  tagTypes: ["Cities"],
  endpoints: (build) => ({
    loadCities: build.query({
      query: (limit = 10) => `?limit=${limit}`,
      providesTags: ["Cities"],
    }),
  }),
});

export const { useLoadCitiesQuery } = citiesApiSlice;
