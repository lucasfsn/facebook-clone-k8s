import { useEffect, useRef, useState } from "react";
import { FaCamera, FaPencilAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Modal from "../../ui/Modal";
import ChoosePicture from "../pictures/ChoosePicture";
import { getUser } from "../user/userSlice";
import EditProfile from "./EditProfile";
import ProfileCover from "./ProfileCover";
import ProfileHeaderFriend from "./ProfileHeaderFriend";
import ProfilePictureModal from "./ProfilePictureModal";
import { getUserProfile } from "./profileSlice";

function ProfileHeader() {
  const location = useLocation();

  const profile = useSelector(getUserProfile);
  const user = useSelector(getUser);

  const [activePage, setActivePage] = useState<"home" | "friends" | "photos">(
    "home",
  );
  const [showProfilePictureModal, setShowProfilePictureModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (location.pathname.includes("/photos")) {
      setActivePage("photos");
    } else if (location.pathname.includes("/friends")) {
      setActivePage("friends");
    } else {
      setActivePage("home");
    }
  }, [location.pathname]);

  const profilePictureRef = useRef<HTMLImageElement>(null);

  const isProfileOwner = profile?.username === user?.username ? true : false;

  function handleShowProfilePictureModal() {
    setShowProfilePictureModal((show) => !show);
  }

  return (
    <div className="text-secondary flex w-full flex-col shadow-md">
      <div className="flex flex-row">
        <div className="bg-primary flex w-full flex-col gap-2">
          <ProfileCover isProfileOwner={isProfileOwner} />
          <div className="flex flex-col items-center px-3 sm:flex-row xl:mx-auto xl:w-4/6">
            <div className="relative h-[110px]">
              <div className="bg-primary relative -translate-y-1/2 cursor-pointer rounded-full p-1">
                {showProfilePictureModal && (
                  <ProfilePictureModal
                    button={profilePictureRef}
                    isProfileOwner={isProfileOwner}
                    close={() => setShowProfilePictureModal(false)}
                  />
                )}
                <img
                  className="h-[160px] min-w-[160px] rounded-full hover:brightness-105"
                  src={profile?.picture}
                  alt="profile"
                  ref={profilePictureRef}
                  onClick={handleShowProfilePictureModal}
                />
                {isProfileOwner && (
                  <Modal>
                    <Modal.Open opens="picture">
                      <div className="bg-tertiary bg-tertiary-hover absolute bottom-3 right-3 cursor-pointer rounded-full p-2 text-xl">
                        <FaCamera />
                      </div>
                    </Modal.Open>
                    <Modal.Window name="picture" type="center">
                      <ChoosePicture />
                    </Modal.Window>
                  </Modal>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="whitespace-nowrap text-xl font-bold md:text-3xl">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-tertiary mx-auto text-sm font-semibold sm:mx-0">
                {profile.friends.length}{" "}
                {profile.friends.length === 1 ? "friend" : "friends"}
              </p>
            </div>
            <div className="p-2 sm:ml-auto">
              {isProfileOwner ? (
                <Modal>
                  <Modal.Open opens="edit-profile">
                    <button className="bg-tertiary text-secondary bg-tertiary-hover flex flex-row items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1 text-sm font-semibold md:px-3 md:py-1.5 md:text-base">
                      <FaPencilAlt />
                      <span>Edit profile</span>
                    </button>
                  </Modal.Open>
                  <Modal.Window
                    name="edit-profile"
                    type="center"
                    alwaysClose={false}
                  >
                    <EditProfile profile={profile} />
                  </Modal.Window>
                </Modal>
              ) : (
                <ProfileHeaderFriend />
              )}
            </div>
          </div>
          <div className="px-3 xl:mx-auto xl:w-4/6">
            <div className="separator flex flex-col gap-3 border-t pt-1 sm:flex-row">
              <div
                className={`flex justify-center border-b-4 ${
                  activePage === "home"
                    ? "border-blue-600 text-blue-600"
                    : "text-secondary border-transparent"
                }`}
              >
                <Link
                  to={`/profile/${profile.username}`}
                  className={`${
                    activePage === "home" ? "" : "bg-tertiary-hover"
                  } cursor-pointer rounded-md p-3 font-semibold`}
                >
                  Posts
                </Link>
              </div>
              <div
                className={`flex justify-center border-b-4 ${
                  activePage === "friends"
                    ? "border-blue-600 text-blue-600"
                    : "text-secondary border-transparent"
                }`}
              >
                <Link
                  to={`/profile/${profile.username}/friends`}
                  className={`${
                    activePage === "friends" ? "" : "bg-tertiary-hover"
                  } cursor-pointer rounded-md p-3 font-semibold`}
                >
                  Friends
                </Link>
              </div>
              <div
                className={`flex justify-center border-b-4 ${
                  activePage === "photos"
                    ? "border-blue-600 text-blue-600"
                    : "text-secondary border-transparent"
                }`}
              >
                <Link
                  to={`/profile/${profile.username}/photos`}
                  className={`${
                    activePage === "photos" ? "" : "bg-tertiary-hover"
                  } cursor-pointer rounded-md p-3 font-semibold`}
                >
                  Photos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
