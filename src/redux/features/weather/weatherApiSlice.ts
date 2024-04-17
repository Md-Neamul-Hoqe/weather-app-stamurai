// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface WeatherState {
  city: string;
  lat: string;
  lon: string;
  setCity: (city: string) => void;
  setLatAndLon: (lat: string, lon: string) => void;
}

interface WeatherApiResponse {
  weather: WeatherState;
}

// Define a service using a base URL and expected endpoints
export const weatherApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/3.0/onecall",
  }),
  reducerPath: "weatherApi",
  tagTypes: ["Weather"],
  endpoints: (build) => ({
    getWeather: build.query<WeatherApiResponse, any>({
      query: ({ lat = 23.75, lon = 90.58333 }: { lat: any; lon: any }): any => {
        if (!lat || !lon || !process.env.NEXT_APPID) return [];
        return `?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_APPID}`;
      },
      providesTags: (_result, _error, id) => [{ type: "Weather", id }],
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApiSlice;

export default weatherApiSlice.reducer;
