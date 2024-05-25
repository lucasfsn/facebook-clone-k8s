import axios from "axios";
import { Theme } from "emoji-picker-react";
import Cookies from "js-cookie";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { DarkModeOptions } from "../context/DarkModeContext";
import { RelationshipType } from "../types/profile";
import {
  MAX_FILE_SIZE,
  MIN_COVER_WIDTH,
  VALID_MIMETYPES,
  VALID_PROFILE_PHOTO_MIMETYPES,
} from "./constants";

export function authToken() {
  const token = Cookies.get("token");

  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}

export const relationshipOptions: RelationshipType[] = [
  "Single",
  "In a relationship",
  "Engaged",
  "Married",
  "In a civil union",
  "In a domestic partnership",
  "In an open relationship",
  "It's complicated",
  "Separated",
  "Divorced",
  "Widowed",
];

export const getMonths = () => {
  const months = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  };
  return months;
};

export const getYears = () =>
  Array.from(new Array(119), (_, i) => new Date().getFullYear() - i);

export const getDays = (year: number, month: number) => {
  return Array.from(
    new Array(new Date(year, month, 0).getDate()),
    (_, i) => i + 1,
  );
};

export const imageToBlob = (dataURI: string): Blob => {
  const [header, data] = dataURI.split(",");

  const byteString = header.includes("base64") ? atob(data) : unescape(data);

  const mimeString = header.split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length).map((_, i) =>
    byteString.charCodeAt(i),
  );

  return new Blob([ia], { type: mimeString });
};

export type ResponseError = {
  code: string;
  response?: { data: { message: string } };
};

export const handleError = (err: ResponseError | Yup.ValidationError) => {
  if (err instanceof Yup.ValidationError) {
    toast.error(err.message);
  } else if (axios.isAxiosError(err)) {
    switch (err.code) {
      case "ERR_NETWORK":
        toast.error("An unexpected error occurred");
        break;
      default:
        toast.error(err.response?.data.message);
    }
  } else {
    toast.error("An unexpected error occurred");
  }
};

export function getPublicIdFromUrl(url: string) {
  const urlParts = url.split("/");
  const postsIndex = urlParts.indexOf("posts");

  const username = urlParts[postsIndex - 1];
  const id = urlParts[urlParts.length - 1].split(".")[0];

  return `${username}/posts/images/${id}`.replace(/\//g, "%2F");
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function reactionColor(reaction: string | undefined) {
  switch (reaction) {
    case "like":
      return "text-blue-600";
    case "love":
      return "text-red-400";
    case "haha":
      return "text-yellow-400";
    case "care":
    case "wow":
    case "sad":
      return "text-orange-300";
    case "angry":
      return "text-orange-700";
    default:
      return "text-secondary";
  }
}

export function setEmojiPickerMode(
  darkMode: DarkModeOptions,
): Theme | undefined {
  switch (darkMode) {
    case "on":
      return Theme.DARK;
    case "off":
      return Theme.LIGHT;
    case "auto":
      return Theme.AUTO;
    default:
      return undefined;
  }
}

export function handleAddImage(
  e: ChangeEvent<HTMLInputElement>,
  setImage: Dispatch<SetStateAction<string>>,
) {
  if (!e.target.files) return;

  const image = e.target.files[0];

  if (!VALID_MIMETYPES.includes(image.type)) {
    toast.error("Selected file type is not supported");
    return;
  }

  if (image.size > MAX_FILE_SIZE) {
    toast.error("Selected file is too large");
    return;
  }

  if (image) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      if (e.target) {
        setImage(e.target.result as string);
      }
    };
  }
}

export function handleAddCover(
  e: ChangeEvent<HTMLInputElement>,
  setImage: (image: string) => void,
) {
  if (!e.target.files) return;

  const image = e.target.files[0];

  if (!VALID_PROFILE_PHOTO_MIMETYPES.includes(image.type)) {
    toast.error("Selected file type is not supported");
    return;
  }

  if (image.size > MAX_FILE_SIZE) {
    toast.error("Selected file is too large");
    return;
  }

  if (image) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        if (img.width < MIN_COVER_WIDTH) {
          toast.error("Selected cover photo is too small");
          return;
        }
        setImage(img.src);
      };
    };
  }
}

export function importProfileFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target === null) {
        reject(new Error("FileReader event target was null"));
      } else {
        resolve(event.target.result as string);
      }
    };

    reader.onerror = () => {
      reject(new Error("An error occurred while reading the file"));
    };

    reader.readAsText(file);
  });
}
