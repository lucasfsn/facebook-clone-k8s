import axios from "axios";
import { authToken } from "../utils/helpers";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function addFriend(userId: string, friendId: string) {
  const { data } = await axios.post(
    `${apiUrl}/profile/${friendId}/add`,
    {
      userId,
    },
    authToken(),
  );

  return { message: data.message };
}

export async function removeFriend(userId: string, friendId: string) {
  const { data } = await axios.delete(`${apiUrl}/profile/${friendId}/remove`, {
    params: {
      userId,
    },
    headers: authToken().headers,
  });

  return { message: data.message };
}

export async function removeFriendRequest(userId: string, friendId: string) {
  const { data } = await axios.delete(
    `${apiUrl}/profile/${friendId}/removeRequest`,
    {
      params: {
        userId,
      },
      headers: authToken().headers,
    },
  );

  return { message: data.message };
}

export async function acceptFriendRequest(userId: string, friendId: string) {
  const { data } = await axios.put(
    `${apiUrl}/profile/${friendId}/accept`,
    {
      userId,
    },
    authToken(),
  );

  return { message: data.message };
}

export async function cancelFriendRequest(userId: string, friendId: string) {
  const { data } = await axios.put(
    `${apiUrl}/profile/${friendId}/cancel`,
    {
      userId,
    },
    authToken(),
  );

  return { message: data.message };
}

export async function getUserById(id: string) {
  const { data } = await axios.get(`${apiUrl}/user/${id}`, authToken());

  return data;
}
