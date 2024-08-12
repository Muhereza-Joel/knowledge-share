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
    isEditingProfile: false,
    isEditingProfilePassword: false,
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
    setIsEditingProfile: (state, action) => {
      state.isEditingProfile = action.payload;
    },
    setIsEditingProfilePassword: (state, action) => {
      state.isEditingProfilePassword = action.payload;
    },
  },
});

export const {
  setShowSidebar,
  setShowMobileSidebar,
  setActiveLink,
  setSelectedSearchFilter,
  setIsEditingProfile,
  setIsEditingProfilePassword,
} = uiSlice.actions;
export default uiSlice.reducer;
