import { userLocation } from "@/components/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface User {
  userLocation: userLocation;
}
export const initialState: userLocation = {
  id: "1185155",
  city: "Narayanganj",
  country: "Bangladesh",
  lon: 90.58333,
  lat: 23.75,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setDefaultLocation: (state, { payload }: PayloadAction<userLocation>) => {
      state.id = payload.id;
      state.city = payload.city;
      state.country = payload.country;
      state.lon = payload.lon;
      state.lat = payload.lat;
    },
  },
});

export const { setDefaultLocation } = userSlice.actions;

export default userSlice.reducer;
