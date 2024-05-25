import { useMemo } from "react";
import { useSelector } from "react-redux";
import { PostAudience } from "../../types/posts";
import Post from "../post/Post";
import { getUserId } from "../user/userSlice";
import { getUserProfile } from "./profileSlice";

function ProfilePosts() {
  const profile = useSelector(getUserProfile);
  const userId = useSelector(getUserId);

  const isFriend = profile.friends.find((friend) => friend._id === userId);

  const profilePosts = useMemo(
    () =>
      profile.userPosts.filter((post) => {
        if (post.user._id === userId) {
          return true;
        } else if (isFriend && post.audience === PostAudience.Friends) {
          return true;
        } else if (post.audience === PostAudience.Public) {
          return true;
        }
        return false;
      }),
    [profile.userPosts, userId, isFriend],
  );

  return (
    <div className="flex w-full flex-col gap-4">
      {profilePosts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
}

export default ProfilePosts;
