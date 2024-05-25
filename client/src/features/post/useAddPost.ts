import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addImage } from "../../services/apiImages";
import { addPost as addPostApi } from "../../services/apiPosts";
import { AppDispatch } from "../../store";
import { AddPostData } from "../../types/posts";
import { ResponseError, handleError, imageToBlob } from "../../utils/helpers";
import { getProfile } from "../profile/profileSlice";
import { addPost, error, loading } from "./postSlice";

export function useAddPost() {
  const dispatch: AppDispatch = useDispatch();

  async function createImagesPost(images: string[], username: string) {
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

  async function createPost(
    post: AddPostData,
    username: string,
    addedImage: boolean = false,
  ) {
    dispatch(loading());

    try {
      let postImages;
      if (
        post.images.length !== 0 &&
        post.type !== "cover" &&
        post.type !== "profile"
      )
        postImages = await createImagesPost(post.images, username);

      const { message, postData } = await addPostApi({
        ...post,
        images: postImages || post.images,
        content: post.content.trim(),
      });

      dispatch(addPost(postData));
      dispatch(getProfile(username));

      if (!addedImage) toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function createDetailsPost(post: AddPostData, username: string) {
    dispatch(loading());

    try {
      const { postData } = await addPostApi({
        ...post,
        content: post.content.trim(),
      });

      dispatch(addPost(postData));
      dispatch(getProfile(username));
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { createPost, createDetailsPost };
}
