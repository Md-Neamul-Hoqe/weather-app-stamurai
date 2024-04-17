import { userLocation } from "@/components/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
  userWeather: [],
};

export const weatherSlice = createSlice({
  name: "userWeatherSlice",
  initialState,
  reducers: {
    setWeather: (state, { payload }: PayloadAction) => {
      state.userWeather = payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
