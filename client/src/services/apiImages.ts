import axios from "axios";
import { ImagesData } from "../types/images";
import { authToken } from "../utils/helpers";

const apiUrl = import.meta.env.VITE_BACKEND_API_URL;

export async function getImages(body: ImagesData) {
  const { data } = await axios.post(
    `${apiUrl}/image/getAll`,
    body,
    authToken(),
  );

  return data.resources;
}

export async function addImage(formData: FormData) {
  const { data } = await axios.post(`${apiUrl}/image/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { data };
}

export async function deleteImage(id: string) {
  const { data } = await axios.delete(`${apiUrl}/image/${id}`, authToken());

  return { status: data.status };
}
