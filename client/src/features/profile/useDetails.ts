import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateUserDetails as updateUserDetailsApi } from "../../services/apiProfile";
import { PostAudience } from "../../types/posts";
import { Details } from "../../types/profile";
import { ResponseError, handleError } from "../../utils/helpers";
import { useAddPost } from "../post/useAddPost";
import { error, loading, updateProfile } from "./profileSlice";

export function useDetails() {
  const { createDetailsPost } = useAddPost();
  const dispatch = useDispatch();

  async function updateDetails(
    updatedDetails: (keyof Details)[],
    details: Details,
    userId: string,
  ) {
    dispatch(loading());

    try {
      const { updatedUser, message } = await updateUserDetailsApi(
        details,
        userId,
      );

      dispatch(updateProfile({ details: updatedUser.details }));

      const promises = updatedDetails.map(
        (updatedDetail) =>
          details[updatedDetail] &&
          createDetailsPost(
            {
              type: "details",
              content: `${details[updatedDetail]}`,
              images: [],
              userId: updatedUser._id,
              audience: PostAudience.Public,
              key:
                updatedDetail === "currentCity"
                  ? "current city"
                  : updatedDetail,
            },
            updatedUser.username,
          ),
      );

      await Promise.all(promises);

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return { updateDetails };
}
