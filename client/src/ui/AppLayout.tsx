import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { getProfile } from "../features/profile/profileSlice";
import { getUser } from "../features/user/userSlice";
import { AppDispatch } from "../store";
import Header from "./Header";

function AppLayout() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector(getUser);
  const location = useLocation();

  useEffect(() => {
    if (user && !location.pathname.startsWith("/profile")) {
      dispatch(getProfile(user.username));
    }
  }, [dispatch, user, location]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="bg-secondary mt-[55px] flex flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
