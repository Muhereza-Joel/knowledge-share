import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import API_BASE_URL, {FLASK_BASE_URL} from "./../../components/appConfig";

const cookieData = JSON.parse(Cookies.get("knowledgeshare") || "{}");
const userId = cookieData.USERID_KEY;

const askQuestionSlice = createSlice({
  name: "askQuestion",
  initialState: {
    isQuestionSubmitted: false,
    questionTitle: "",
    description: "",
    searchInput: "",
    suggestedTags: [],
    selectedTags: [],
    selectedTagsData: [],
    images: [],
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    setQuestionTitle: (state, action) => {
      state.questionTitle = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setSuggestedTags: (state, action) => {
      state.suggestedTags = action.payload;
    },
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload;
    },
    setSelectedTagsData: (state, action) => {
      state.selectedTagsData = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setIsQuestionSubmitted: (state, action) => {
      state.isQuestionSubmitted = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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
  setQuestionTitle,
  setDescription,
  setSearchInput,
  setSuggestedTags,
  setSelectedTags,
  setSelectedTagsData,
  setImages,
  setIsQuestionSubmitted,
  setLoading,
  setSuccess,
  clearSuccess,
  setError,
  clearError,
} = askQuestionSlice.actions;

export const fetchSuggestedTags = createAsyncThunk(
  "askQuestion/fetchSuggestedTags",
  async (searchInput, { getState, dispatch }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/tags/all?query=${searchInput}`
      );
      const data = await response.json();
      const tagsWithIds = data.map((tag) => ({ id: tag.id, name: tag.name }));
      dispatch(setSuggestedTags(tagsWithIds));
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export const sendQuestionToSpacy = createAsyncThunk(
  "askQuestion/sendQuestionToSpacy",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { questionTitle, description, selectedTags, selectedTagsData } =
      state.askQuestion;

    const text = `${questionTitle}\n\n${description}`;

    try {
      dispatch(setLoading(true));
      const response = await fetch(`${FLASK_BASE_URL}/api/v1/auto_tagging`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });
      const data = await response.json();
      // Create a Set to ensure unique tag IDs
      const updatedSelectedTags = Array.from(
        new Set([...data.map((item) => item.id)])
      );
      
      const updatedSelectedTagsData = Array.from(
        new Set([
           ...data
        ])
      );

      dispatch(setSelectedTags(updatedSelectedTags));
      dispatch(setSelectedTagsData(updatedSelectedTagsData));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError('Failed to get tag suggestions, Please try again later.'));
    }
  }
);

export const submitQuestion = createAsyncThunk(
  "askQuestion/submitQuestion",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { questionTitle, description, selectedTags, images } =
      state.askQuestion;

    const formData = new FormData();
    formData.append("questionTitle", questionTitle);
    formData.append("description", description);
    formData.append("tags", JSON.stringify(selectedTags));
    formData.append("userId", userId);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      dispatch(setLoading(true));
      const response = await fetch(`${API_BASE_URL}/api/v1/questions/add`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setSuccess("Question added successfully!"));
        dispatch(setIsQuestionSubmitted(true));

        //reset form
        dispatch(setQuestionTitle(""));
        dispatch(setDescription(""));
        dispatch(setSearchInput(""));
        dispatch(setSelectedTags([]));
        dispatch(setSuggestedTags([]));
        dispatch(setSelectedTagsData([]));
        dispatch(setImages([]));
        dispatch(setLoading(false));
      } else {
        dispatch(setError("Failed to submit question. Please try again."));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  }
);

export default askQuestionSlice.reducer;
