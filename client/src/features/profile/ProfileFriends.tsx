import { useSelector } from "react-redux";
import ProfileFriend from "./ProfileFriend";
import { getUserProfile } from "./profileSlice";

function ProfileFriends() {
  const profile = useSelector(getUserProfile);

  return (
    <div className="text-secondary flex w-full flex-col justify-between gap-4 p-4 xl:mx-auto xl:w-4/6">
      <div className="bg-primary flex flex-col gap-4 rounded-md p-4">
        <div className="text-xl font-bold">Friends</div>
        <div className="grid grid-cols-2 gap-2">
          {profile.friends.map((friend) => (
            <ProfileFriend friend={friend} key={friend._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileFriends;
