import { createSlice } from "@reduxjs/toolkit";

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tagsData: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchDataRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.tagsData = action.payload.tagsData;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } =
  tagsSlice.actions;

export default tagsSlice.reducer;  
