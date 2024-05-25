import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "../../store";
import { SettingsChangePayload, SingleUser } from "../../types/user";

interface UserState {
  user: SingleUser | null;
  isLoading: boolean;
  error: boolean;
}

const initialState: UserState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null,
  isLoading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<SingleUser>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout() {
      return initialState;
    },
    deleteUser(state) {
      state.user = null;
      state.isLoading = false;
      state.error = false;
    },
    loading(state) {
      state.isLoading = true;
    },
    changedPassword(state) {
      state.isLoading = false;
    },
    changedSetting(state, action: PayloadAction<SettingsChangePayload>) {
      if (state.user) {
        if (
          action.payload.field === "birthDate" &&
          typeof action.payload.value === "object"
        ) {
          state.user.birthDate = action.payload.value;
        } else if (
          action.payload.field !== "birthDate" &&
          typeof action.payload.value === "string"
        ) {
          state.user[action.payload.field] = action.payload.value;
        }
        state.isLoading = false;
        Cookies.set("user", JSON.stringify(state.user));
      }
    },
    importUserProfile(
      state,
      action: PayloadAction<{ firstName: string; lastName: string }>,
    ) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        state.isLoading = false;
        Cookies.set("user", JSON.stringify(state.user));
      }
    },
    changedProfilePicture(state, action: PayloadAction<string>) {
      if (state.user) state.user.picture = action.payload;
    },
    error(state) {
      state.error = true;
      state.isLoading = false;
    },
  },
});

export const {
  login,
  logout,
  deleteUser,
  loading,
  changedPassword,
  importUserProfile,
  changedSetting,
  changedProfilePicture,
  error,
} = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: RootState) => state.user?.user;

export const getUserId = (state: RootState) => state.user?.user?.id;

export const getLoading = (state: RootState) => state.user?.isLoading;
