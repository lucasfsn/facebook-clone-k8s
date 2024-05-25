import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImagesProfile from "../features/pictures/ImagesProfile";
import AddPost from "../features/post/AddPost";
import ProfilePanelFriends from "../features/profile/ProfilePanelFriends";
import ProfilePanelIntro from "../features/profile/ProfilePanelIntro";
import ProfilePosts from "../features/profile/ProfilePosts";
import { getUserProfile } from "../features/profile/profileSlice";
import { getUser } from "../features/user/userSlice";

function Profile() {
  const user = useSelector(getUser);
  const profile = useSelector(getUserProfile);

  const isProfileOwner = profile?.username === user?.username ? true : false;

  return (
    <div className="text-secondary flex w-full flex-col justify-between gap-4 p-4 md:flex-row lg:mx-auto xl:w-4/6">
      <div className="flex flex-col gap-4 md:w-[42.5%]">
        <ProfilePanelIntro isProfileOwner={isProfileOwner} />
        <div className="bg-primary flex flex-col gap-3 rounded-md px-4 py-2">
          <div className="flex flex-row items-center justify-between gap-2">
            <Link
              to={`/profile/${profile.username}/photos`}
              className="cursor-pointer text-base font-bold hover:underline sm:text-xl"
            >
              Photos
            </Link>
            <Link
              to={`/profile/${profile.username}/photos`}
              className="bg-tertiary-hover cursor-pointer rounded-md px-2 py-1"
            >
              <span className="text-sm text-blue-400 sm:text-lg">
                See all photos
              </span>
            </Link>
          </div>
          <div className="h-fit">
            <ImagesProfile location="profile" space={1.5} />
          </div>
        </div>
        <div className="bg-primary flex flex-col gap-3 rounded-md px-4 py-2">
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between gap-2">
              <Link
                to={`/profile/${profile.username}/friends`}
                className="cursor-pointer text-base font-bold hover:underline sm:text-xl"
              >
                Friends
              </Link>
              <Link
                to={`/profile/${profile.username}/friends`}
                className="bg-tertiary-hover cursor-pointer rounded-md px-2 py-1"
              >
                <span className="text-sm text-blue-400 sm:text-lg">
                  See all friends
                </span>
              </Link>
            </div>
            <span className="text-tertiary">
              {profile.friends.length}{" "}
              {profile.friends.length === 1 ? "friend" : "friends"}
            </span>
          </div>
          <ProfilePanelFriends />
        </div>
      </div>
      <div className="flex flex-col gap-4 overflow-x-hidden md:w-[57.5%]">
        <AddPost username={profile.username}>
          {isProfileOwner
            ? "What's on your mind?"
            : `Write something to ${profile.firstName}...`}
        </AddPost>
        <ProfilePosts />
      </div>
    </div>
  );
}

export default Profile;
