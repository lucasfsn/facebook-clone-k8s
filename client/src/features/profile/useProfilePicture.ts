import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addImage } from "../../services/apiImages";
import {
  removeProfilePicture as removeProfilePictureApi,
  updateProfilePicture as updateProfilePictureApi,
} from "../../services/apiProfile";
import { PostAudience } from "../../types/posts";
import { SingleUser } from "../../types/user";
import { ResponseError, handleError, imageToBlob } from "../../utils/helpers";
import { useAddPost } from "../post/useAddPost";
import { changedProfilePicture } from "../user/userSlice";
import { error, loading, updateProfile } from "./profileSlice";

export function useProfilePicture() {
  const { createPost } = useAddPost();
  const dispatch = useDispatch();

  async function updateProfilePicture(
    image: string,
    user: SingleUser,
    description: string,
  ) {
    dispatch(loading());

    try {
      const blobImage = imageToBlob(image);
      const imagePath = `${user.username}/profile/profilePicture`;

      const formData = new FormData();

      formData.append("path", imagePath);
      formData.append("file", blobImage);

      const { data } = await addImage(formData);

      const { res } = await updateProfilePictureApi(user.id, data.images[0]);

      await createPost(
        {
          type: "profile",
          content: description,
          images: data.images,
          userId: user.id,
          audience: PostAudience.Public,
        },
        user.username,
        true,
      );

      Cookies.set(
        "user",
        JSON.stringify({
          ...user,
          picture: res.picture,
        }),
      );

      dispatch(updateProfile({ picture: res.picture }));
      dispatch(changedProfilePicture(res.picture));

      toast.success("Profile picture updated successfully");
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function removeProfilePicture(user: SingleUser) {
    dispatch(loading());

    try {
      const { updatedUser, message } = await removeProfilePictureApi(user.id);

      Cookies.set(
        "user",
        JSON.stringify({
          ...user,
          picture: updatedUser.picture,
        }),
      );

      dispatch(updateProfile({ picture: updatedUser.picture }));
      dispatch(changedProfilePicture(updatedUser.picture));

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { updateProfilePicture, removeProfilePicture };
}
