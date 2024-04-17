import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { citiesApiSlice } from "./features/cities/citiesApiSlice";
import { citiesSlice } from "./features/cities/citiesSlice";
import { weatherApiSlice } from "./features/weather/weatherApiSlice";
import { weatherSlice } from "./features/weather/weatherSlice";
import { searchSlice } from "./features/search/searchSlice";
import { userSlice } from "./features/users/userSlice";
import logger from "redux-logger";

const rootReducer = combineSlices(
  citiesSlice,
  weatherSlice,
  userSlice,
  searchSlice,
  weatherApiSlice,
  citiesApiSlice
);
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(citiesApiSlice.middleware)
        .concat(weatherApiSlice.middleware),
    // .concat(logger),
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
