import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFriends } from "../features/friends/useFriends";
import { getLoading, getUserProfile } from "../features/profile/profileSlice";
import Spinner from "../ui/Spinner";

function Friends() {
  const profile = useSelector(getUserProfile);
  const loading = useSelector(getLoading);

  const { removeFriend } = useFriends();

  if (loading) return <Spinner />;

  return (
    <div className="text-secondary grid w-full grid-cols-2 gap-2 p-6 font-semibold sm:w-2/3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {profile.friends.map((friend) => (
        <div
          key={friend._id}
          className="bg-primary h-fit overflow-hidden rounded-md"
        >
          <Link to={`/profile/${friend.username}`}>
            <img
              src={friend.picture}
              alt={friend.firstName}
              className="aspect-square w-full"
            />
          </Link>
          <div className="flex flex-col gap-2 p-2">
            <Link
              to={`/profile/${friend.username}`}
              className="w-fit hover:underline"
            >
              {friend.firstName} {friend.lastName}
            </Link>
            <div
              className="bg-tertiary bg-tertiary-hover cursor-pointer rounded-md p-1.5 text-center"
              onClick={async (e) => {
                e.stopPropagation();
                await removeFriend(profile._id, friend._id);
              }}
            >
              Remove
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Friends;
