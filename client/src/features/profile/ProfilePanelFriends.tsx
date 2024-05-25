import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserProfile } from "./profileSlice";

function ProfilePanelFriends() {
  const profile = useSelector(getUserProfile);

  return (
    <div className="grid grid-cols-5 gap-1.5 md:grid-cols-3">
      {profile.friends.map((friend) => (
        <Link to={`/profile/${friend.username}`} key={friend._id}>
          <img
            src={friend.picture}
            alt={friend.firstName}
            className="aspect-square rounded-md"
          />
          <span className="text-secondary text-sm">
            {friend.firstName} {friend.lastName}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default ProfilePanelFriends;
