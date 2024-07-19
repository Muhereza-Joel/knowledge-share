import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        showSidebar: false,
        showMobileSidebar: false,
        activeLink: "ask-question",
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
    },
});

export const { setShowSidebar, setShowMobileSidebar, activeLink, setActiveLink } = uiSlice.actions;
export default uiSlice.reducer;