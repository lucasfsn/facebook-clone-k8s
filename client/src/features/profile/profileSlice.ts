import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProfile as getProfileApi } from "../../services/apiProfile";
import { AppDispatch, RootState } from "../../store";
import { SingleProfile } from "../../types/profile";
import { fetchImages } from "../pictures/imagesSlice";

interface ProfileState {
  profile: SingleProfile;
  isLoading: boolean;
  error: boolean;
}

const initialState: ProfileState = {
  profile: {
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    picture: "",
    gender: "",
    birdthDay: 0,
    birdthMonth: 0,
    birdthYear: 0,
    friends: [],
    friendRequests: [],
    sentFriendRequests: [],
    search: [],
    details: {
      bio: "",
      workplace: "",
      highschool: "",
      college: "",
      currentCity: "",
      hometown: "",
      relationship: undefined,
    },
    createdAt: "",
    updatedAt: "",
    userPosts: [],
    images: [],
  },
  isLoading: false,
  error: false,
};

export const getProfile = createAsyncThunk<
  SingleProfile,
  string,
  { dispatch: AppDispatch }
>("profile/getProfile", async (username: string, { dispatch }) => {
  const data = await getProfileApi(username);

  dispatch(
    fetchImages({
      paths: [
        `${username}/posts/images`,
        `${username}/profile/profilePicture`,
        `${username}/profile/profileCover`,
      ],
      sort: "desc",
    }),
  );

  return {
    ...data,
    details: { ...initialState.profile.details, ...data.details },
  };
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(state, action: PayloadAction<Partial<SingleProfile>>) {
      state.profile = { ...state.profile, ...action.payload };
      state.isLoading = false;
      state.error = false;
    },
    loading(state) {
      state.isLoading = true;
    },
    error(state) {
      state.error = true;
    },
    deleteCover(state) {
      state.profile.cover = "";
      state.isLoading = false;
    },
    updated(state) {
      state.isLoading = false;
    },
    fetched(state) {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(getProfile.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const { fetched, updated, updateProfile, error, loading, deleteCover } =
  profileSlice.actions;

export default profileSlice.reducer;

export const getUserProfile = (state: RootState) => state.profile.profile;

export const getProfilePicture = (state: RootState) =>
  state.profile.profile.picture;

export const getProfileDetails = (state: RootState) =>
  state.profile.profile.details;

export const getLoading = (state: RootState) => state.profile?.isLoading;

export const getError = (state: RootState) => state.profile?.error;
