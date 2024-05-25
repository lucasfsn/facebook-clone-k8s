import { useEffect, useRef, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import {
  HiBuildingStorefront,
  HiOutlineBuildingStorefront,
  HiOutlineTv,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiTv,
  HiUserGroup,
  HiUsers,
} from "react-icons/hi2";
import { RiHome5Fill, RiHome5Line, RiNotification2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getLoading as getLoadingPosts } from "../features/post/postSlice";
import { getLoading as getLoadingProfile } from "../features/profile/profileSlice";
import { useGetAnyProfile } from "../features/profile/useGetAnyProfile";
import SearchBar from "../features/search/SearchBar";
import SearchModal from "../features/search/SearchModal";
import { getUser } from "../features/user/userSlice";
import { useOutsideClick } from "../hooks/useOutsideClick";
import HeaderLink from "./HeaderLink";
import Logo from "./Logo";
import MenuModal from "./MenuModal";
import Modal from "./Modal";
import UserModal from "./UserModal";

function Header() {
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const user = useSelector(getUser);
  const location = useLocation();
  const loadingProfile = useSelector(getLoadingProfile);
  const loadingPosts = useSelector(getLoadingPosts);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const { ref } = useOutsideClick(
    () => setShowNotifications(false),
    true,
    buttonRef,
  );

  const { profile, refreshProfile } = useGetAnyProfile(user?.username);

  useEffect(() => {
    if (!user) return;
    refreshProfile();
  }, [user, loadingProfile, loadingPosts, location.pathname, refreshProfile]);

  const friendRequests = profile?.friendRequests.length || 0;

  const currentPage =
    location.pathname === "/" ? "home" : location.pathname.split("/")[1];

  return (
    <header className="bg-primary fixed left-0 top-0 z-30 grid h-[55px] w-full grid-cols-3 px-3 py-[4px] shadow-md">
      <div className="flex flex-row items-center gap-5">
        <Link to="/">
          <Logo style="icon" />
        </Link>
        {showSearchPanel ? (
          <SearchModal setShowSearchPanel={setShowSearchPanel} />
        ) : (
          <SearchBar
            placeholder="Search Facebook"
            onClick={() => setShowSearchPanel(true)}
          />
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <HeaderLink to="/" active={currentPage === "home"} className="md:flex">
          {currentPage === "home" ? (
            <RiHome5Fill className="text-blue-600" />
          ) : (
            <RiHome5Line />
          )}
        </HeaderLink>
        <HeaderLink
          to="/friends"
          active={currentPage === "friends"}
          className="md:flex"
        >
          {currentPage === "friends" ? (
            <HiUsers className="text-blue-600" />
          ) : (
            <HiOutlineUsers />
          )}
        </HeaderLink>
        <HeaderLink
          to="/watch"
          active={currentPage === "watch"}
          className="md:flex"
        >
          {currentPage === "watch" ? (
            <HiTv className="text-blue-600" />
          ) : (
            <HiOutlineTv />
          )}
        </HeaderLink>
        <HeaderLink
          to="/marketplace"
          active={currentPage === "marketplace"}
          className="md:flex"
        >
          {currentPage === "marketplace" ? (
            <HiBuildingStorefront className="text-blue-600" />
          ) : (
            <HiOutlineBuildingStorefront />
          )}
        </HeaderLink>
        <HeaderLink
          to="/groups"
          active={currentPage === "groups"}
          className="lg:flex"
        >
          {currentPage === "groups" ? (
            <HiUserGroup className="text-blue-600" />
          ) : (
            <HiOutlineUserGroup />
          )}
        </HeaderLink>
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        <Modal>
          <Modal.Open opens="menu">
            <button className="bg-tertiary text-secondary bg-tertiary-hover relative hidden h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-full text-2xl active:h-[39px] active:min-w-[39px] sm:flex">
              <CgMenuGridO />
            </button>
          </Modal.Open>
          <Modal.Window name="menu" type="custom">
            <MenuModal />
          </Modal.Window>
          <div className="relative">
            <button
              className="bg-tertiary text-secondary bg-tertiary-hover relative flex h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-full text-2xl  active:h-[39px] active:min-w-[39px]"
              ref={buttonRef}
              onClick={() => setShowNotifications((show) => !show)}
            >
              <RiNotification2Fill />
              {friendRequests > 0 && (
                <div className="absolute -right-1 -top-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-600 text-center text-sm text-white">
                  {friendRequests}
                </div>
              )}
            </button>
            {showNotifications && (
              <div
                className="bg-primary text-secondary absolute right-0 w-max rounded-lg px-1 py-2 text-sm shadow-3xl sm:px-2 sm:py-3 sm:text-base"
                ref={ref}
              >
                {friendRequests > 0 ? (
                  <Link
                    to="/friends/requests"
                    onClick={() => setShowNotifications(false)}
                    className="bg-tertiary-hover flex flex-col rounded-md px-2.5 py-1 sm:flex-row"
                  >
                    <span>You have received </span>
                    <span>
                      <strong>{friendRequests}</strong> friend request
                      {friendRequests > 1 && "s"}
                    </span>
                  </Link>
                ) : (
                  <p>You're all caught up! No new notifications.</p>
                )}
              </div>
            )}
          </div>
          <Modal.Open opens="profile">
            <img
              src={user?.picture}
              alt="Profile image"
              className="relative flex h-[40px] w-[40px] min-w-[40px] cursor-pointer rounded-full transition-all  hover:brightness-95 active:h-[39px] active:min-w-[39px]"
            />
          </Modal.Open>
          <Modal.Window name="profile" type="custom">
            <UserModal />
          </Modal.Window>
        </Modal>
      </div>
    </header>
  );
}

export default Header;
