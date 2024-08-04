import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    showSidebar: false,
    showMobileSidebar: false,
    activeLink: "ask-question",
    selectedSearchFilter: { value: "questions", label: "Search Questions" },
    searchFilterOptions: [
      { value: "questions", label: "Search Questions" },
      { value: "products", label: "Search Products" },
      { value: "tags", label: "Search Tags" },
    ],
  },
  reducers: {
    setShowSidebar: (state, action) => {
      state.showSidebar = action.payload;
    },
    setShowMobileSidebar: (state, action) => {
      state.showMobileSidebar = action.payload;
    },
    setActiveLink: (state, action) => {
      state.activeLink = action.payload;
    },
    setSelectedSearchFilter: (state, action) => {
      state.selectedSearchFilter = action.payload;
    },
  },
});

export const {
  setShowSidebar,
  setShowMobileSidebar,
  setActiveLink,
  setSelectedSearchFilter,
} = uiSlice.actions;
export default uiSlice.reducer;
