import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchGet } from "../../services/apiSearch";
import { RootState } from "../../store";
import { SearchGet, SearchUser } from "../../types/search";

interface SearchState {
  search: {
    results: SearchUser[];
    history: SearchGet[];
  };
  loading: "fulfilled" | "pending" | "rejected" | "idle";
  error: boolean;
}

const initialState: SearchState = {
  search: {
    results: [],
    history: [],
  },
  loading: "idle",
  error: false,
};

export const getSearchHistory = createAsyncThunk<SearchGet[], string>(
  "search/getSearchHistory",
  async (id: string) => {
    const { data } = await searchGet(id);

    return data;
  },
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    fetching(state) {
      state.loading = "pending";
    },
    updateHistory(state, action: PayloadAction<SearchGet[]>) {
      state.search = {
        ...state.search,
        history: action.payload,
      };
      state.loading = "fulfilled";
      state.error = false;
    },
    updateResults(state, action: PayloadAction<SearchUser[]>) {
      state.search = {
        ...state.search,
        results: action.payload,
      };
      state.loading = "fulfilled";
      state.error = false;
    },
    arrived(state) {
      state.loading = "fulfilled";
      state.error = false;
    },
    error(state) {
      state.error = true;
      state.loading = "rejected";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchHistory.pending, (state) => {
      state.loading = "pending";
      state.error = false;
    });
    builder.addCase(getSearchHistory.fulfilled, (state, action) => {
      state.search = { ...state.search, history: action.payload };
      state.loading = "fulfilled";
      state.error = false;
    });
    builder.addCase(getSearchHistory.rejected, (state) => {
      state.loading = "rejected";
      state.error = true;
    });
  },
});

export const { fetching, updateHistory, updateResults, arrived, error } =
  searchSlice.actions;

export default searchSlice.reducer;

export const getLoading = (state: RootState) => state.search.loading;
export const getSearch = (state: RootState) => state.search.search;
