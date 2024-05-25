import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptFriendRequest as acceptFriendRequestApi,
  addFriend as addFriendApi,
  cancelFriendRequest as cancelFriendRequestApi,
  removeFriend as removeFriendApi,
  removeFriendRequest as removeFriendRequestApi,
} from "../../services/apiFriends";
import { Friend } from "../../types/profile";
import { ResponseError, handleError } from "../../utils/helpers";
import {
  error,
  getUserProfile,
  loading,
  updateProfile,
  updated,
} from "../profile/profileSlice";
import { getUser } from "../user/userSlice";

export function useFriends(isProfileFriendsPage: boolean = false) {
  const dispatch = useDispatch();
  const profile = useSelector(getUserProfile);
  const user = useSelector(getUser);

  async function addFriend(userId: string, friendId: string) {
    dispatch(loading());

    try {
      const { message } = await addFriendApi(userId, friendId);

      isProfileFriendsPage
        ? dispatch(updated())
        : dispatch(
            updateProfile({
              friendRequests: [...profile.friendRequests, userId],
            }),
          );

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function removeFriend(userId: string, friendId: string) {
    dispatch(loading());

    try {
      const { message } = await removeFriendApi(userId, friendId);

      isProfileFriendsPage
        ? dispatch(updated())
        : dispatch(
            updateProfile({
              friends: profile.friends.filter(
                (friend) =>
                  friend._id !== (userId === profile._id ? friendId : userId),
              ),
            }),
          );

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function denyFriendRequest(userId: string, friendId: string) {
    dispatch(loading());

    try {
      const { message } = await removeFriendRequestApi(userId, friendId);

      isProfileFriendsPage
        ? dispatch(updated())
        : dispatch(
            updateProfile({
              sentFriendRequests: profile.sentFriendRequests.filter(
                (friend) => friend !== userId,
              ),
            }),
          );

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function acceptFriendRequest(userId: string, friend: Friend) {
    dispatch(loading());
    try {
      const { message } = await acceptFriendRequestApi(userId, friend._id);

      isProfileFriendsPage
        ? dispatch(updated())
        : dispatch(
            updateProfile({
              friends: [
                ...profile.friends,
                user?.id === profile._id
                  ? friend
                  : {
                      ...user,
                      _id: user?.id || "",
                      firstName: user?.firstName || "",
                      lastName: user?.lastName || "",
                      picture: user?.picture || "",
                      username: user?.username || "",
                    },
              ],
              sentFriendRequests: profile.sentFriendRequests.filter(
                (f) => f !== userId,
              ),
            }),
          );

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  async function cancelFriendRequest(userId: string, friendId: string) {
    dispatch(loading());

    try {
      const { message } = await cancelFriendRequestApi(userId, friendId);

      isProfileFriendsPage
        ? dispatch(updated())
        : dispatch(
            updateProfile({
              friendRequests: profile.friendRequests.filter(
                (friend) => friend !== userId,
              ),
            }),
          );

      toast.success(message);
    } catch (err) {
      handleError(err as ResponseError);

      dispatch(error());
    }
  }

  return {
    addFriend,
    removeFriend,
    denyFriendRequest,
    acceptFriendRequest,
    cancelFriendRequest,
  };
}
