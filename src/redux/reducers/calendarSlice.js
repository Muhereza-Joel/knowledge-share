import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import API_BASE_URL from "./../../components/appConfig";

const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
const userId = cookieData.USERID_KEY;

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    eventTitle: "",
    endDate: "",
    startDate: "",
    selectedEvent: null,
    showEditModal: false,
    updatedEvent: {
      id: "",
      title: "",
      start: null,
      end: null,
    },
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    fetchEventsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
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
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setEvents,
  setEventTitle,
  setStartDate,
  setEndDate,
  setSelectedEvent,
  setShowEditModal,
  setUpdatedEvent,
  fetchEventsRequest,
  setSuccess,
  clearSuccess,
  setError,
  clearError,
} = calendarSlice.actions;

export const getEvents = createAsyncThunk(
  "calendar/getEvents",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { events } = state.calendar;
    if (events.length > 0) {
      return;
    }
    try {
      dispatch(fetchEventsRequest());
      fetch(`${API_BASE_URL}/api/v1/events/all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })
        .then((response) => response.json())
        .then((data) => {
          const transformedEvents = data.map((event) => ({
            id: event.id,
            title: event.title,
            start: event.start_date,
            end: event.end_date,
          }));
          dispatch(setEvents(transformedEvents));
        });
    } catch (error) {
      console.log("Error fetching events", error);
    }
  }
);

export const addEvent = createAsyncThunk(
  "calendar/addEvent",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { eventTitle, startDate, endDate, events } = state.calendar;

    const isValidDates =
      startDate && endDate && new Date(startDate) < new Date(endDate);

    if (!isValidDates) {
      dispatch(
        setError("Invalid date range. Please select valid start and end dates.")
      );
      return;
    }

    // Validate that the start date is not in the past
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format
    if (startDate < currentDate) {
      dispatch(
        setError("Invalid start date. Please select a date in the future.")
      );
      return;
    }

    const newEvent = {
      title: eventTitle,
      start: startDate,
      end: endDate,
      userId: userId,
    };

    try {
      fetch(`${API_BASE_URL}/api/v1/events/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      })
        .then((response) => response.json())
        .then((data) => {
          // Extract only the specific fields from eventData
          const { id, title, start_date, end_date } = data.eventData;
          const newData = {
            id: id,
            title: title,
            start: start_date,
            end: end_date,
          };

          // Use the extracted fields for updating the state
          dispatch(setEvents([...events, newData]));
          dispatch(setSuccess("Event added successfully!"));
        });

      dispatch(setEventTitle(""));
      dispatch(setStartDate(""));
      dispatch(setEndDate(""));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const updateEvent = createAsyncThunk(
  "calendar/updateEvent",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { updatedEvent, events } = state.calendar;

    // Validate that the start date is not in the past
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in "YYYY-MM-DD" format  
    if (updatedEvent.start < currentDate) {
      dispatch(
        setError("Invalid start date. Please select a date in the future.")
      );
      return;
    }

    //validate that the end date is not before the start date
    if (updatedEvent.end < updatedEvent.start) {
      dispatch(
        setError("Invalid end date. Please select a date after the start date.")
      );
      return;
    }

    try {
      fetch(`${API_BASE_URL}/api/v1/events/update/${updatedEvent.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      })
        .then((response) => response.json())
        .then((data) => {
          const updatedEvents = events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          );
          dispatch(setEvents(updatedEvents));
          dispatch(setSuccess("Event updated successfully!"));
        });

      dispatch(setShowEditModal(false));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "calendar/deleteEvent",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { selectedEvent, events } = state.calendar;

    try {
      fetch(`${API_BASE_URL}/api/v1/events/delete/${selectedEvent.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          // Update the local state by filtering out the deleted event
          const updatedEvents = events.filter(
            (event) => event.id !== selectedEvent.id
          );
          dispatch(setEvents(updatedEvents));
          dispatch(setSuccess("Event deleted successfully!"));
        })

        .catch((error) => {
          dispatch(setError("Error deleting event. Please try again."));
        });
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export default calendarSlice.reducer;
