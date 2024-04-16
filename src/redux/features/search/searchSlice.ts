import { Row, searchCities } from "@/components/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const initialState: searchCities = {
  column: "",
  values: [],
  search: "",
};

export const searchSlice = createSlice({
  name: "searchOnCities",
  initialState,
  reducers: {
    updateColumn: (
      state,
      { payload }: PayloadAction<{ column: keyof Row | "" }>
    ) => {
      state.column = payload.column;
    },
    updateValues: (state, { payload }: PayloadAction<{ values: string[] }>) => {
      state.values = payload.values;
    },
    updateSearch: (
      state,
      { payload }: PayloadAction<{ search: string | number }>
    ) => {
      state.search = payload.search;
    },
  },
});

export const { updateColumn, updateSearch, updateValues } = searchSlice.actions;

export default searchSlice.reducer;
