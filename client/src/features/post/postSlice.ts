import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPosts as getPostsApi } from "../../services/apiPosts";
import { RootState } from "../../store";
import {
  AddComment,
  EditSinglePost,
  SingleComment,
  SinglePost,
} from "../../types/posts";

interface PostsState {
  posts: SinglePost[];
  isLoading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: false,
};

export const getPosts = createAsyncThunk<SinglePost[], string>(
  "post/getPosts",
  async (userId: string) => {
    const { data } = await getPostsApi(userId);

    return data.posts;
  },
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<{ post: SinglePost }>) {
      state.posts = [action.payload.post, ...state.posts];
      state.isLoading = false;
      state.error = false;
    },
    deletePost(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      state.isLoading = false;
      state.error = false;
    },
    updatePost(state, action: PayloadAction<EditSinglePost>) {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload._id)
          return { ...post, ...action.payload };

        return post;
      });
      state.isLoading = false;
      state.error = false;
    },
    addComment(state, action: PayloadAction<AddComment>) {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.idPost) {
          return {
            ...post,
            comments: action.payload.comments,
          };
        }

        return post;
      });
      state.isLoading = false;
    },
    deleteComment(
      state,
      action: PayloadAction<{ postId: string; comments: SingleComment[] }>,
    ) {
      state.posts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return { ...post, comments: action.payload.comments };
        }

        return post;
      });
      state.isLoading = false;
      state.error = false;
    },
    addedReaction(state) {
      state.isLoading = false;
    },
    loading(state) {
      state.isLoading = true;
    },
    error(state) {
      state.error = true;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
      state.error = false;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(getPosts.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export const {
  addedReaction,
  deletePost,
  updatePost,
  addPost,
  loading,
  error,
  addComment,
  deleteComment,
} = postSlice.actions;

export default postSlice.reducer;

export const getAllPosts = (state: RootState) => state.post?.posts;

export const getLoading = (state: RootState) => state.post?.isLoading;

export const getError = (state: RootState) => state.post?.error;
