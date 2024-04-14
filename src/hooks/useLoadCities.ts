import { City } from "@/components/types";
import { useLoadCitiesQuery } from "@/redux/features/cities/citiesApiSlice";
import { setCities } from "@/redux/features/cities/citiesSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";

const useLoadCities = () => {
  const dispatch = useAppDispatch();
  /* load data from API */
  const { data, refetch, isLoading, isError, error } = useLoadCitiesQuery(10, {
    skipPollingIfUnfocused: true,
    pollingInterval: 100000,
  });

  console.log(error);

  /* get state from redux-api-store [May be not latest state need to be fixed next time] */
  const { cities } = useSelector(
    (state: { cities: { cities: City[] } }) => state.cities
  );

  /* Store to the state */
  if (!isError && !isLoading) {
    const { results: loadedCities, total_count: total } = data;

    dispatch(setCities(loadedCities));
  }

  return { refetch, isLoading, isError, error, cities };
};

export default useLoadCities;
