import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ProfileHeader from "../features/profile/ProfileHeader";
import {
  getError,
  getLoading as getLoadingProfile,
  getProfile,
} from "../features/profile/profileSlice";
import { getUser } from "../features/user/userSlice";
import { AppDispatch } from "../store";
import Spinner from "./Spinner";

function ProfileLayout() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useParams();

  const user = useSelector(getUser);
  const loading = useSelector(getLoadingProfile);
  const error = useSelector(getError);

  const profileUsername = username || user?.username;

  useEffect(() => {
    if (profileUsername) dispatch(getProfile(profileUsername));

    if (error) navigate("/profile");
  }, [dispatch, profileUsername, error, navigate]);

  if (loading) return <Spinner />;

  return (
    <div className="w-full">
      <ProfileHeader />
      <Outlet />
    </div>
  );
}

export default ProfileLayout;
