"use client";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useGetWeatherQuery } from "@/redux/features/weather/weatherApiSlice";
import ErrorPage from "@/components/error";
import Loader from "@/components/loader";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setWeather } from "@/redux/features/weather/weatherSlice";

const DetailsWeatherOfTheCountry = () => {
  const params = useParams();
  const city: string = removeSpaceSymbols(params.city as string);
  const searchParams = useSearchParams();
  const lat: any = searchParams.get("lat");
  const lon: any = searchParams.get("lon");

  const { data, isLoading, isSuccess, isError, error } = useGetWeatherQuery(
    lat,
    lon
  );

  return (
    <div className="w-full h-screen">
      {isError ? (
        <ErrorPage error={error} />
      ) : isLoading || !isSuccess ? (
        <Loader loaderOpen={isLoading} />
      ) : (
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h1">
              {city}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

const removeSpaceSymbols = (text: string) => {
  return text.replaceAll(/%20/g, " ");
};

export default DetailsWeatherOfTheCountry;
