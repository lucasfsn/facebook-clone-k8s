import axios from "axios";
import { authToken } from "../utils/helpers";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function search(user: string) {
  const { data } = await axios.post(
    `${apiUrl}/search/${user}`,
    {},
    authToken(),
  );

  return { data };
}

export async function searchAdd(user: string, id: string) {
  const { data } = await axios.put(
    `${apiUrl}/search/${user}/add`,
    {
      id,
    },
    authToken(),
  );

  return { data };
}

export async function searchGet(id: string) {
  const { data } = await axios.get(`${apiUrl}/search/${id}/get`, authToken());

  return { data };
}

export async function searchDelete(user: string, id: string) {
  const { data } = await axios.delete(`${apiUrl}/search/${user}`, {
    params: {
      id,
    },
    headers: authToken().headers,
  });

  return { data };
}
