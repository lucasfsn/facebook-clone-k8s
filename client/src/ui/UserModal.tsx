import { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";
import { IoMdMoon, IoMdSettings } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../features/user/useLogout";
import { getUser } from "../features/user/userSlice";
import UserModalDisplay from "./UserModalDisplay";

function UserModal() {
  const { logoutUser } = useLogout();
  const [showDisplau, setShowDisplau] = useState(false);

  const user = useSelector(getUser);
  const navigate = useNavigate();

  if (showDisplau)
    return <UserModalDisplay handleGoBack={() => setShowDisplau(false)} />;

  return (
    <div className="bg-primary absolute right-[10px] top-[50px] z-50 flex max-h-[90vh] w-[95%] flex-col gap-3 rounded-lg p-3 shadow-md sm:w-[300px]">
      <div className="bg-tertiary rounded-lg p-1 shadow-3xl">
        <Link
          to="/profile"
          className="bg-tertiary-hover bg-tertiary flex cursor-pointer items-center gap-2 rounded-lg p-2.5"
        >
          <img
            src={user?.picture}
            alt="Profile picture"
            className="w-[40px] rounded-full"
          />
          <span className="text-secondary text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
        </Link>
      </div>
      <div className="flex flex-col">
        <div
          className="bg-tertiary-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base"
          onClick={() => navigate("/settings")}
        >
          <div className="bg-tertiary text-secondary rounded-full p-2 text-xl">
            <IoMdSettings />
          </div>
          <span className="text-secondary">Settings</span>
        </div>
        <div
          className="bg-tertiary-hover flex cursor-pointer items-center justify-between rounded-lg p-2 text-base"
          onClick={() => setShowDisplau(true)}
        >
          <div className="flex items-center gap-2">
            <div className="bg-tertiary text-secondary rounded-full p-2 text-xl">
              <IoMdMoon />
            </div>
            <span className="text-secondary">Display & accessibility</span>
          </div>
          <HiChevronRight className="text-secondary text-2xl" />
        </div>
        <div
          className="bg-tertiary-hover flex cursor-pointer items-center gap-2  rounded-lg p-2 text-base"
          onClick={logoutUser}
        >
          <div className="bg-tertiary text-secondary rounded-full p-2 text-xl">
            <IoLogOut />
          </div>
          <span className="text-secondary">Log Out</span>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
