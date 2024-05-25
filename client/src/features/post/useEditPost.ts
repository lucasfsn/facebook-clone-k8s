import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addImage } from "../../services/apiImages";
import { editPost as editPostApi } from "../../services/apiPosts";
import { AppDispatch } from "../../store";
import { EditSinglePost } from "../../types/posts";
import { SingleUser } from "../../types/user";
import { ResponseError, handleError, imageToBlob } from "../../utils/helpers";
import { getProfile } from "../profile/profileSlice";
import { error, loading, updatePost } from "./postSlice";

export function useEditPost() {
  const dispatch: AppDispatch = useDispatch();

  async function editImagesPost(images: string[], username: string) {
    dispatch(loading());

    try {
      const blobImages = images.map((image) => imageToBlob(image));
      const imagePath = `${username}/posts/images`;

      const formData = new FormData();
      formData.append("path", imagePath);

      blobImages.forEach((blobImage) => {
        formData.append("file", blobImage);
      });

      const { data } = await addImage(formData);

      return data.images;
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function editPost(post: EditSinglePost, user: SingleUser) {
    dispatch(loading());

    try {
      let postImages;

      const newImages = post.images.filter(
        (image) => !image.startsWith("https://"),
      );

      if (newImages.length !== 0) {
        postImages = await editImagesPost(newImages, user.username);
      }

      const { message, updatedPost } = await editPostApi(post._id, {
        content: post.content.trim(),
        images: [
          ...(postImages || []),
          ...post.images.filter((image) => image.startsWith("https://")),
        ],
        audience: post.audience,
      });

      dispatch(updatePost(updatedPost));
      dispatch(getProfile(user.username));

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { editPost };
}
