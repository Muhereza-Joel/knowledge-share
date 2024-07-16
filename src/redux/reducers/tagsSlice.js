// tagsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_BASE_URL from "./../../components/appConfig";

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/tags/all`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
});

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tagsData: [],
    filteredTags: [],
    error: null,
    successMessage: "",
    validationError: null,
    searchTerm: "",
    showModal: false,
    newTag: { name: "", description: "" },
    loading: false,
  },
  reducers: {
    setFilteredTags: (state, action) => {
      state.filteredTags = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setNewTag: (state, action) => {
      state.newTag = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setValidationError: (state, action) => {
      state.validationError = action.payload;
    },
    setTagsData: (state, action) => {
      state.tagsData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tagsData = action.payload;
        state.filteredTags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setFilteredTags,
  setSearchTerm,
  setNewTag,
  setShowModal,
  setValidationError,
  setTagsData,
  setError,
  setSuccessMessage,
} = tagsSlice.actions;

export default tagsSlice.reducer;
