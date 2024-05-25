import { Outlet } from "react-router-dom";
import FriendsMenu from "../features/friends/FriendsMenu";

function FriendsLayout() {
  return (
    <div className="text-secondary separator bg-secondary flex w-full flex-col border-t sm:flex-row">
      <FriendsMenu />
      <Outlet />
    </div>
  );
}

export default FriendsLayout;
