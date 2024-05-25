import axios from "axios";
import {
  ChangePassword,
  ChangeUserSettings,
  ProfileImport,
} from "../types/settings";
import { authToken } from "../utils/helpers";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function changePassword(user: ChangePassword) {
  const { data } = await axios.patch(
    `${apiUrl}/change-password`,
    user,
    authToken(),
  );

  const { message } = data;

  return { message };
}

export async function changeSettings(user: ChangeUserSettings) {
  const { data } = await axios.put(
    `${apiUrl}/change/${user.field}`,
    user,
    authToken(),
  );

  const { message } = data;
  const newValue = data[user.field];

  return { message, newValue };
}

export async function deleteAccount(id: string) {
  const { data } = await axios.delete(`${apiUrl}/${id}`, authToken());

  const { message } = data;

  return { message };
}

export async function exportProfile(userId: string) {
  const { data } = await axios.get(`${apiUrl}/export/${userId}`, authToken());

  return { data };
}

export async function importProfile(userId: string, profile: ProfileImport) {
  const { data } = await axios.post(
    `${apiUrl}/import/${userId}`,
    profile,
    authToken(),
  );

  return { data };
}
