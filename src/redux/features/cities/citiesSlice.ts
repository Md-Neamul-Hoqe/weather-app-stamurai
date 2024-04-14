import { City } from "@/components/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const cities: City[] = [];

export const initialState = {
  cities,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCities: (state, { payload }: PayloadAction<City[]>) => {
      state.cities = payload;
    },
  },
});

export const { setCities } = citiesSlice.actions;

export default citiesSlice.reducer;
