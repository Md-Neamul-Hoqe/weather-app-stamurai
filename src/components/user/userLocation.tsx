"use client";
import { useGetWeatherQuery } from "@/redux/features/weather/weatherApiSlice";
import { setWeather } from "@/redux/features/weather/weatherSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

const UserLocation = () => {
  const { city, country, lon, lat } = useAppSelector(
    (state) => state.userSlice
  );
  const dispatch = useAppDispatch();

  const { data, isLoading, isSuccess, isError, error } = useGetWeatherQuery(
    lat as any,
    lon as any
  );

  useEffect(() => {
    console.log(data);
    if (data) {
      dispatch(setWeather(data as any));
    }
  }, [data, dispatch]);

  return (
    <div className="py-6 min-w-min text-nowrap">
      {city}, {country}
    </div>
  );
};

export default UserLocation;
