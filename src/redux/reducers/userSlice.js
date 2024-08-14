import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_BASE_URL from "./../../components/appConfig";
import Cookies from "js-cookie";
const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    username: "",
    email: "",
    role: "",
    fullname: "",
    dateOfBirth: "",
    gender: "",
    homeCountry: "",
    city: "",
    avator: "",
    phoneNumber: "",
    password: "",
    createdAt: "",
    updatedAt: "",
    loading: false,
    error: null,
  },
  reducers: {
    fetchDataRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.fullname = action.payload.fullname;
      state.dateOfBirth = action.payload.dob;
      state.gender = action.payload.gender;
      state.homeCountry = action.payload.country;
      state.city = action.payload.city;
      state.avator = action.payload.url;
      state.phoneNumber = action.payload.phone_number;
      state.password = "";
      state.createdAt = action.payload.created_at;
      state.updatedAt = action.payload.updated_at;
      state.loading = false;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    updateUserData(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.fullname = action.payload.fullname;
      state.dateOfBirth = action.payload;
      state.gender = action.payload.gender;
      state.homeCountry = action.payload.country;
      state.city = action.payload.city;
      state.avator = action.payload.url;
      state.phoneNumber = action.payload.phone_number;
      state.password = action.payload.password;
      state.createdAt = action.payload.created_at;
      state.updatedAt = action.payload.updated_at;
      state.loading = false;
    },
  },
});

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (userId, { dispatch, getState }) => {
    const state = getState();
    const user = state.user;

    // Check if user data is already present in the store
    if (user.id === userId) {
      return;
    }

    if (!userId) {
      return;
    }

    dispatch(fetchDataRequest());
    try {
      // Fetch avatar URL
      const avatarResponse = await fetch(
        `${API_BASE_URL}/api/v1/auth/get-avator/${userId}`
      );

      let avatarUrl = null;
      if (avatarResponse.ok) {
        const avatarData = await avatarResponse.json();
        if (Array.isArray(avatarData) && avatarData.length > 0) {
          avatarUrl = avatarData[0].url;
        } else {
          console.error("Invalid avatar data structure");
        }
      } else {
        console.error("Failed to fetch avatarUrl");
      }

      // Fetch user data
      const userResponse = await fetch(
        `${API_BASE_URL}/api/v1/auth/profile/${userId}`
      );

      if (userResponse.ok) {
        const profileDataArray = await userResponse.json();
        if (Array.isArray(profileDataArray) && profileDataArray.length > 0) {
          const profileData = profileDataArray[0];

          // Extract only the date part from the dob property
          const dateOnly = profileData.dob
            ? profileData.dob.substring(0, 10)
            : null;
          const user = {
            id: profileData.id,
            role: profileData.role,
            username: profileData.username,
            fullname: profileData.fullname,
            url: avatarUrl,
            email: profileData.email,
            gender: profileData.gender,
            dob: dateOnly,
            country: profileData.country,
            city: profileData.city,
            phone_number: profileData.phone_number,
            password: profileData.password,
            created_at: profileData.created_at,
            updated_at: profileData.updated_at,
          };

          dispatch(fetchDataSuccess(user));
        }
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  }
);

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
  updateUserData,
} = userSlice.actions;

export default userSlice.reducer;
