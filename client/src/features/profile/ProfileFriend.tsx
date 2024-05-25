import { useEffect, useState } from "react";
import { BsFillPersonXFill, BsPersonCheckFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { getProfile } from "../../services/apiProfile";
import { Friend, SingleProfile } from "../../types/profile";
import Loading from "../../ui/Loading";
import { useFriends } from "../friends/useFriends";
import { getUser } from "../user/userSlice";
import { getUserProfile } from "./profileSlice";

interface ProfileFriendProps {
  friend: Friend;
  onFriendRequestChange?: () => void;
}

function ProfileFriend({ friend, onFriendRequestChange }: ProfileFriendProps) {
  const [currentUser, setCurrentUser] = useState<SingleProfile | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const user = useSelector(getUser);
  const profile = useSelector(getUserProfile);

  const { ref } = useOutsideClick(() => setShowMenu(false));

  const {
    addFriend,
    cancelFriendRequest,
    removeFriend,
    denyFriendRequest,
    acceptFriendRequest,
  } = useFriends(user?.id !== profile._id);

  useEffect(() => {
    async function fetchData() {
      if (user && !currentUser) {
        const data = await getProfile(user.username);
        setCurrentUser(data);
      }
    }

    fetchData();
  }, [user, currentUser]);

  if (!currentUser) return <Loading />;

  const status = {
    friends: currentUser.friends.some((f) => f._id === friend._id),
    receiver: currentUser.sentFriendRequests.includes(friend._id),
    sender: currentUser.friendRequests.includes(friend._id),
  };

  if (user?.id === profile._id && !status.sender && !status.receiver)
    return (
      <div className="separator flex flex-col items-center gap-1 rounded-md border p-2 sm:flex-row sm:p-4">
        <Link
          to={`/profile/${friend.username}`}
          className="flex w-full items-center justify-between rounded-md"
        >
          <div className="mx-auto flex flex-col items-center gap-1 sm:mx-0 sm:flex-row sm:gap-3">
            <img
              src={friend.picture}
              alt={friend.firstName}
              className="aspect-square h-[80px] rounded-md"
            />
            <span className="text-secondary text-sm font-semibold sm:text-lg">
              {friend.firstName} {friend.lastName}
            </span>
          </div>
        </Link>
        <div
          className="bg-tertiary bg-tertiar-hover text-secondary relative flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1 text-sm font-semibold md:px-3 md:py-1.5 md:text-base"
          onClick={async () => await removeFriend(friend._id, currentUser._id)}
        >
          <BsFillPersonXFill className="text-xl" />
          <span>Unfriend</span>
        </div>
      </div>
    );

  let buttonContent: JSX.Element;

  if (status.friends) {
    buttonContent = (
      <>
        <BsPersonCheckFill className="text-xl" />
        <span>Friends</span>
      </>
    );
  } else if (status.receiver) {
    buttonContent = (
      <>
        <BsFillPersonXFill className="text-base sm:text-xl" />
        <span className="text-xs sm:text-sm">Cancel request</span>
      </>
    );
  } else if (status.sender) {
    buttonContent = (
      <>
        <BsPersonCheckFill className="text-xl" />
        <span>Respond</span>
      </>
    );
  } else {
    buttonContent = (
      <>
        <IoPersonAdd className="text-xl" />
        <span>Add friend</span>
      </>
    );
  }

  async function handleClick() {
    setShowMenu((show) => !show);

    if (status.friends || status.sender || !currentUser) return;

    if (!status.friends && !status.receiver && !status.sender) {
      await addFriend(currentUser._id, friend._id);
    } else if (status.receiver) {
      await cancelFriendRequest(currentUser._id, friend._id);
    }
  }

  return (
    <div className="separator flex flex-col items-center gap-1 rounded-md border p-2 sm:flex-row sm:p-4">
      <Link
        to={`/profile/${friend.username}`}
        className="flex w-full items-center justify-between rounded-md"
      >
        <div className="mx-auto flex flex-col items-center gap-1 sm:mx-0 sm:flex-row sm:gap-3">
          <img
            src={friend.picture}
            alt={friend.firstName}
            className="aspect-square h-[80px] rounded-md"
          />
          <span className="text-secondary text-sm font-semibold sm:text-lg">
            {friend.firstName} {friend.lastName}
          </span>
        </div>
      </Link>
      {friend._id !== user?.id && (
        <div
          className={`relative flex cursor-pointer items-center justify-center gap-0.5 whitespace-nowrap rounded-lg px-1 py-1 text-sm font-semibold sm:gap-1.5 sm:px-2 md:px-3 md:py-1.5 md:text-base ${
            status.friends
              ? "bg-tertiary bg-tertiar-hover text-secondary"
              : "bg-blue-600 text-white hover:bg-blue-500"
          }`}
          onClick={handleClick}
          ref={ref}
        >
          {buttonContent}
          {!status.friends && status.sender && showMenu && (
            <div
              className="bg-primary text-secondary absolute right-1/2 top-full flex translate-x-1/2 flex-col rounded-md p-1.5 text-start shadow-3xl sm:right-0 sm:w-[250px] sm:-translate-x-0"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="bg-tertiary-hover rounded-md p-1.5"
                onClick={async () => {
                  await acceptFriendRequest(currentUser._id, friend);
                  onFriendRequestChange?.();
                }}
              >
                Confirm
              </div>
              <div
                className="bg-tertiary-hover rounded-md p-1.5"
                onClick={async () => {
                  await denyFriendRequest(currentUser._id, friend._id);
                  onFriendRequestChange?.();
                }}
              >
                Remove request
              </div>
            </div>
          )}
          {status.friends && showMenu && (
            <div
              className="bg-primary absolute right-0 top-full flex w-[250px] flex-col rounded-md p-1.5 text-start shadow-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="bg-tertiary-hover flex items-center gap-2 rounded-md p-1.5"
                onClick={async () =>
                  await removeFriend(currentUser._id, friend._id)
                }
              >
                <BsFillPersonXFill className="text-xl" />
                <span>Unfriend</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileFriend;
