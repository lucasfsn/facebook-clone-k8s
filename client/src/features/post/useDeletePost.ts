import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteImage as deleteImageApi } from "../../services/apiImages";
import { deletePost as deletePostApi } from "../../services/apiPosts";
import { AppDispatch } from "../../store";
import { SinglePost } from "../../types/posts";
import {
  ResponseError,
  getPublicIdFromUrl,
  handleError,
} from "../../utils/helpers";
import { getProfile } from "../profile/profileSlice";
import { error, loading, deletePost as postDelete } from "./postSlice";

export function useDeletePost() {
  const dispatch: AppDispatch = useDispatch();

  async function deletePost(post: SinglePost, username: string) {
    dispatch(loading());

    try {
      if (
        post.images.length > 0 &&
        post.type !== "cover" &&
        post.type !== "profile"
      ) {
        const imageDeletionPromises = post.images.map(async (image) => {
          await deleteImageApi(getPublicIdFromUrl(image));
        });

        await Promise.all(imageDeletionPromises);
      }

      const { deletedPostId, message } = await deletePostApi(post._id);

      dispatch(postDelete(deletedPostId));
      dispatch(getProfile(username));

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { deletePost };
}
