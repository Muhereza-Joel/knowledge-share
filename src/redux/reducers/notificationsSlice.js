import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import API_BASE_URL from "./../../components/appConfig";

const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    newQuestionNotifications: [],
    showNotifications: false,
    loading: false,
    error: null,
  },
  reducers: {
    fetchNotificationsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    setNewQuestionNotifications: (state, action) => {
      state.newQuestionNotifications = action.payload;
    },
    setShowNotifications: (state, action) => {
      state.showNotifications = action.payload;
    },
    clearNotifications: (state) => {
      state.newQuestionNotifications = [];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setNewQuestionNotificationSeen: (state, action) => {
      state.newQuestionNotifications = state.newQuestionNotifications.filter(
        (notification) => notification.notificationId !== action.payload
      );
    },
  },
});

export const fetchNewQuestionNotifications = createAsyncThunk(
  "notifications/fetchNewQuestionNotifications",
  async (userId, { getState, dispatch }) => {
    const state = getState();
    const { newQuestionNotifications } = state.notifications;

    // Check if notifications have already been fetched
    if (newQuestionNotifications.length > 0) {
      return; // No need to fetch data
    }
    
    try {
      dispatch(fetchNotificationsRequest());
      const response = await fetch(
        `${API_BASE_URL}/api/v1/questions/notifications/${userId}`
      );
      const data = await response.json();
      dispatch(
        setNewQuestionNotifications(
          data.filter((notification) => notification.isSeen === 0)
        )
      );
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      throw new Error("Error fetching notifications: " + error);
    }
  }
);

export const markNewQuestionNotificationSeen = createAsyncThunk(
  "notifications/markNewQuestionNotificationSeen",
  async (validNotificationId, { dispatch }) => {
    try {
      await fetch(`${API_BASE_URL}/api/v1/questions/notifications/mark-seen/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationId: validNotificationId,
          userId: cookieData.USERID_KEY,
        }),
      });
      dispatch(setNewQuestionNotificationSeen(validNotificationId));
    } catch (error) {
      throw new Error("Error marking notification as seen: " + error);
    }
  }
);

export const {
  fetchNotificationsRequest,
  setNewQuestionNotifications,
  setShowNotifications,
  clearNotifications,
  setError,
  setLoading,
  setNewQuestionNotificationSeen,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
