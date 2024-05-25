import axios from "axios";
import { Details } from "../types/profile";
import { authToken } from "../utils/helpers";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function getProfile(username: string) {
  const { data } = await axios.get(
    `${apiUrl}/profile/${username}`,
    authToken(),
  );

  return data;
}

export async function updateProfilePicture(userId: string, image: string) {
  const { data } = await axios.patch(
    `${apiUrl}/profile/updatePicture`,
    {
      userId,
      image,
    },
    authToken(),
  );

  return { res: data };
}

export async function updateCover(userId: string, image: string) {
  const { data } = await axios.patch(
    `${apiUrl}/profile/updateCover`,
    {
      userId,
      image,
    },
    authToken(),
  );

  return { res: data };
}

export async function removeCoverPhoto(userId: string) {
  const { data } = await axios.delete(
    `${apiUrl}/profile/${userId}/removeCover`,
    authToken(),
  );

  return { message: data.message };
}

export async function removeProfilePicture(userId: string) {
  const { data } = await axios.delete(
    `${apiUrl}/profile/${userId}/removePicture`,
    authToken(),
  );

  return { updatedUser: data.user, message: data.message };
}

export async function updateUserDetails(details: Details, userId: string) {
  const { data } = await axios.patch(
    `${apiUrl}/profile/updateDetails`,
    {
      details,
      userId,
    },
    authToken(),
  );

  return { updatedUser: data.user, message: data.message };
}
