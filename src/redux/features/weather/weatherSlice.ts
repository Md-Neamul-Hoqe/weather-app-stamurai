import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface defaultLocation {
  id: string | number;
  city: string;
  country: string;
  lon: number;
  lat: number;
}

export const initialState: defaultLocation = {
  id: "1185155",
  city: "Narayanganj",
  country: "Bangladesh",
  lon: 90.58333,
  lat: 23.75,
};

export const weatherSlice = createSlice({
  name: "defaultLocation",
  initialState,
  reducers: {
    setDefaultLocation: (
      state,
      { payload }: PayloadAction<defaultLocation>
    ) => {
      state.id = payload.id;
      state.city = payload.city;
      state.country = payload.country;
      state.lon = payload.lon;
      state.lat = payload.lat;
    },
  },
});

export const { setDefaultLocation } = weatherSlice.actions;

export default weatherSlice.reducer;
