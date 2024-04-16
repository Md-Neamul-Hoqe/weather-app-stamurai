import { Row } from "@/components/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const cities: Row[] = [];

export const initialState = {
  cities,
};

export const citiesSlice = createSlice({
  name: "citiesSlice",
  initialState,
  reducers: {
    setCities: (state, { payload }: PayloadAction<Row[]>) => {
      state.cities = payload;
    },
  },
});

export const { setCities } = citiesSlice.actions;

export default citiesSlice.reducer;
