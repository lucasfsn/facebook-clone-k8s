import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getImages as getImagesApi } from "../../services/apiImages";
import { RootState } from "../../store";
import { ImagesData, SingleImage } from "../../types/images";

interface ImagesState {
  images: SingleImage[];
  isLoading: boolean;
  error: boolean;
}

const initialState: ImagesState = {
  images: [],
  isLoading: false,
  error: false,
};

export const fetchImages = createAsyncThunk<SingleImage[], ImagesData>(
  "images/fetchImages",
  async (body: ImagesData) => {
    const data = await getImagesApi(body);

    const images = data.map((image: { url: string; folder: string }) => {
      let type = "post";

      if (image.folder.includes("profilePicture")) {
        type = "profile";
      } else if (image.folder.includes("profileCover")) {
        type = "cover";
      }

      const owner = image.folder.split("/")[0];
      return { url: image.url, type, owner };
    });

    return images;
  },
);

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchImages.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.images = action.payload;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(fetchImages.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default imagesSlice.reducer;

export const getImages = (state: RootState) => state.images?.images;

export const getLoading = (state: RootState) => state.images?.isLoading;

export const getError = (state: RootState) => state.images?.error;
