import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    eventTitle: "",
    startDate: "",
    endDate: "",
    selectedEvent: null,
    showEditModal: false,
    updatedEvent: {
      id: "",
      title: "",
      start: null,
      end: null,
    },
  },
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setEventTitle: (state, action) => {
      state.eventTitle = action.payload;
    },
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    setShowEditModal: (state, action) => {
      state.showEditModal = action.payload;
    },
    setUpdatedEvent: (state, action) => {
      state.updatedEvent = action.payload;
    },
  },
});
