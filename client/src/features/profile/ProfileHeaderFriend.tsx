import { useState } from "react";
import { BsFillPersonXFill, BsPersonCheckFill } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import Spinner from "../../ui/Spinner";
import { useFriends } from "../friends/useFriends";
import { getUserId } from "../user/userSlice";
import { getUserProfile } from "./profileSlice";

function ProfileHeaderFriend() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const userId = useSelector(getUserId);
  const profile = useSelector(getUserProfile);

  const {
    addFriend,
    cancelFriendRequest,
    removeFriend,
    denyFriendRequest,
    acceptFriendRequest,
  } = useFriends();

  const { ref } = useOutsideClick(() => setShowMenu(false));

  if (!userId) return <Spinner />;

  const status = {
    friends: profile.friends.some((friend) => friend._id === userId),
    sender:
      profile.sentFriendRequests.includes(userId) && profile._id !== userId,
    receiver: profile.friendRequests.includes(userId) && profile._id !== userId,
  };

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
        <BsFillPersonXFill className="text-xl" />
        <span>Cancel request</span>
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

    if (status.friends || status.sender || !userId) return;

    if (!status.friends && !status.receiver && !status.sender) {
      await addFriend(userId, profile._id);
    } else if (!status.friends && status.receiver && !status.sender) {
      await cancelFriendRequest(userId, profile._id);
    }
  }

  return (
    <div
      ref={ref}
      className={`relative flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1 text-sm font-semibold md:px-3 md:py-1.5 md:text-base ${
        status.friends
          ? "bg-tertiary bg-tertiar-hover text-secondary"
          : "bg-blue-600 text-white hover:bg-blue-500"
      }`}
      onClick={handleClick}
    >
      {buttonContent}
      {!status.friends && status.sender && showMenu && (
        <div
          className="bg-primary text-secondary absolute right-0 top-full flex flex-col rounded-md p-1.5 text-start shadow-3xl sm:w-[250px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-tertiary-hover rounded-md p-1.5"
            onClick={async () => {
              await acceptFriendRequest(userId, {
                _id: profile._id,
                firstName: profile.firstName,
                lastName: profile.lastName,
                picture: profile.picture,
                username: profile.username,
              });
            }}
          >
            Confirm
          </div>
          <div
            className="bg-tertiary-hover rounded-md p-1.5"
            onClick={async () => {
              await denyFriendRequest(userId, profile._id);
            }}
          >
            Remove request
          </div>
        </div>
      )}
      {status.friends && showMenu && (
        <div
          className="bg-primary absolute right-0 top-full flex flex-col rounded-md p-1.5 text-start shadow-3xl sm:w-[250px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-tertiary-hover flex items-center gap-2 rounded-md p-1.5"
            onClick={async () => {
              await removeFriend(userId, profile._id);
            }}
          >
            <BsFillPersonXFill className="text-xl" />
            <span>Unfriend</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileHeaderFriend;
