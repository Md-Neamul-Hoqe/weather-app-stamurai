import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface City {
  geoname_id: string | number;
  ascii_name: string;
  cou_name_en: string;
  timezone: string;
  lon: number;
  lat: number;
}

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
