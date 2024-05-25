import { BsFillPersonLinesFill, BsFillPersonPlusFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

function FriendsMenu() {
  const location = useLocation();

  function isActive(path: string) {
    return location.pathname === path;
  }

  return (
    <div className="bg-primary flex w-full flex-col gap-4 p-4 sm:w-1/3">
      <div className="text-2xl font-bold">Friends</div>
      <div className="flex flex-col gap-1">
        <Link
          to="/friends"
          className={`text-secondary flex cursor-pointer items-center justify-between rounded-md px-2 py-2.5 text-lg ${
            isActive("/friends") ? "bg-tertiary" : "hover:bg-tertiary-hover"
          }`}
        >
          <div className="flex flex-row items-center gap-2">
            <div className="bg-tertiary rounded-full p-1.5 lg:p-2">
              <BsFillPersonLinesFill className="text-xl lg:text-2xl" />
            </div>
            <span className="whitespace-nowrap text-base lg:text-lg">
              All friends
            </span>
          </div>
          <IoIosArrowForward className="text-xl lg:text-2xl" />
        </Link>
        <Link
          to="/friends/requests"
          className={`text-secondary flex cursor-pointer items-center justify-between rounded-md px-2 py-2.5 text-lg ${
            isActive("/friends/requests")
              ? "bg-tertiary"
              : "hover:bg-tertiary-hover"
          }`}
        >
          <div className="flex flex-row items-center gap-2">
            <div className="bg-tertiary rounded-full p-1.5 lg:p-2">
              <BsFillPersonPlusFill className="text-xl lg:text-2xl" />
            </div>
            <span className="whitespace-nowrap text-base lg:text-lg">
              Friend Requests
            </span>
          </div>
          <IoIosArrowForward className="text-xl lg:text-2xl" />
        </Link>
      </div>
    </div>
  );
}

export default FriendsMenu;
